import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingProgress from "../components/LoadingProgress";
const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({ firebase: firebaseUser });
            } else {
                setUser(null);
            }
            const timer = setTimeout(() => {
                setAuthLoading(false);
            }, 700);
            return () => clearTimeout(timer);

        });
        return () => unsubscribe();
    }, [auth]);

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                let loginUser = {};
                loginUser.firebase = result?.user;
                // Call backend
                //handleServerAuthentication();
                Swal.fire({
                    icon: 'success',
                    title: `Welcome ${loginUser.firebase.displayName}`,
                    showConfirmButton: false,
                    timer: 1500
                })
                setUser(loginUser);

            })
            .catch((err) => {
                console.log(err);
            })
    }


    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
                localStorage.clear();
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleServerAuthentication = () => {
        fetch('')
            .then(res => res.json())
            .then(data => {
                // Check status code, role, ...
                // Save accessToken to localStorage
            })
            .catch(err => {

            })
    }


    return (
        <AuthContext.Provider value={{ user, handleGoogleSignIn, logout }}>
            {authLoading ? <LoadingProgress />
                : children}
        </AuthContext.Provider>
    )
}