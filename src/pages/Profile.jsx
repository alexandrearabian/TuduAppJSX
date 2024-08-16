import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../authentication/FirebaseConfig';
import LogOut from '../components/LogOut';
import Element from '../components/Element';
import { setData, getData } from '../functions/LocalStorageFunctions';
import avatar from '../assets/react.svg'

export default function Profile() {

    const initialProfileData = {
        name: 'name',
        age: 'age',
        email: localStorage.getItem('email'),
        // email: storageFunctions.getData('email'),
    };

    const [profileData, setProfileData] = useState(() => {
        const data = getData('profileData');
        return data || initialProfileData;
    });

    useEffect(() => {
        setData('profileData', profileData);
    }, [profileData]);

    function editData(index, newValue) {
        setProfileData(prev => ({
            ...prev,
            [index]: newValue,
        }));
    }

    return (
        <>
            <div className='profile-page'>
                <h1>Profile</h1>
                <img style={{
                    border: ' 1px solid var(--white)',
                    borderRadius: '50%',
                }} src={avatar} />

                <Element
                    element={profileData.name}
                    onRename={(newName) => editData('name', newName)}
                />
                <Element
                    element={profileData.age}
                    onRename={(newAge) => editData('age', newAge)}
                />
                <Element
                    element={profileData.email}
                    onRename={(newEmail) => editData('email', newEmail)}
                />

            </div>
            <LogOut />
        </>
    );
}
