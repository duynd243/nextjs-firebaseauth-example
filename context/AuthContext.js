import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingProgress from "../components/LoadingProgress";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [serverUser, setServerUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                console.log('Firebase User: ', firebaseUser);
                console.log('Server User: ', serverUser);

                if (serverUser?.email !== firebaseUser?.email) {
                    console.log('Call backend for getting user data...');
                    try {
                        const serverU = await handleServerAuthentication(firebaseUser);
                        setServerUser(serverU);
                        console.log('Server user: ', serverU);
                    } catch (err) {
                        console.log(err);
                    }
                }
            } else {
                console.log('Logout?');
                setUser(null);
                setServerUser(null);
            }
            const timer = setTimeout(() => {
                setAuthLoading(false);
            }, 700);
            return () => clearTimeout(timer);

        });
        return () => unsubscribe();
    }, [auth, serverUser]);

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                console.log('Google Sign In: ', result);
                Swal.fire({
                    icon: 'success',
                    title: `Welcome ${result?.user?.displayName}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleGithubSignIn = () => {
        signInWithPopup(auth, new GithubAuthProvider())
            .then(async (result) => {
                console.log('Github Sign In: ', result);
                Swal.fire({
                    icon: 'success',
                    title: `Welcome ${result?.user?.displayName}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                })
            })
    }


    const logOut = () => {
        signOut(auth)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged Out',
                    showConfirmButton: false,
                    timer: 1500
                });
                localStorage.removeItem('accessToken');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleServerAuthentication = (firebaseUser) => {
        return new Promise((resolve, reject) => {
            // fetch(`${process.env.baseUrl}/api/auth`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         email: user.email,
            //         name: user.displayName,
            //         photo: user.photoURL
            //     })
            // })
            //     .then(res => res.json())
            //     .then(data => {
            //         setServerUser(data);
            //         resolve(data);
            //     })
            //     .catch(err => {
            //         console.log(err);
            //         reject(err);
            //     })

            resolve({ email: firebaseUser?.email });
        })
    }


    return (
        <AuthContext.Provider value={{ user, serverUser, handleGoogleSignIn, handleGithubSignIn, logOut }}>
            {authLoading ? <LoadingProgress />
                : children}
        </AuthContext.Provider>
    )
}