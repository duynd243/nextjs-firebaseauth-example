import { useRouter } from "next/router";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);
    return (
        <>
            {user && children}
        </>
    )
}

export default ProtectedRoute;