import {useRouter} from "next/router";
import {useEffect} from "react";
import {useAuth} from "../../context/AuthContext";

const LoginPage = () => {
    const { user, handleGoogleSignIn, handleGithubSignIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/profile');
        }
    }, [user, router])

    return (
        <>
            {!user &&
                <div className='flex flex-col gap-3 justify-center items-center h-screen'>
                    <a onClick={handleGoogleSignIn}
                        className='cursor-pointer bg-red-500 text-white px-4 py-3 rounded-md font-medium'>
                        Login with Google
                    </a>
                    <a onClick={handleGithubSignIn}
                        className='cursor-pointer bg-black text-white px-4 py-3 rounded-md font-medium'>
                        Login with Github
                    </a>
                </div>
            }
        </>

    )
};

export default LoginPage;