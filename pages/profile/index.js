import React from 'react';
import LoadingProgress from '../../components/LoadingProgress';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            {user &&
                <>
                    <div className='mb-4'>Hello, {user?.firebase?.displayName}</div>
                    <button onClick={logout} className='bg-red-600 text-white px-4 py-3 rounded-md font-medium'>Logout</button>
                </>
            }
        </div>

    )
};

export default ProfilePage;
