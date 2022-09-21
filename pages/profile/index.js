import Link from 'next/link';
import React from 'react';
import {useAuth} from '../../context/AuthContext';

const ProfilePage = () => {
    const { user, serverUser, logOut } = useAuth();

    console.log('Server: ', serverUser);
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            {user &&
                <>
                    <div className='mb-4'>Hello, {user?.displayName}</div>
                    <button onClick={logOut} className='bg-red-600 text-white px-4 py-3 rounded-md font-medium'>Logout</button>
                </>
            }
        </div>

    )
};

export default ProfilePage;
