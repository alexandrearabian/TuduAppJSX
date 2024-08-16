import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useEffect, useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../authentication/FirebaseConfig';
import { faLinkedin, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import TuduLogo from '../assets/TuduLogoInvert.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SignIn({ onChangeAuth }) {

    const [value, setValue] = useState(null);


    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    const handleClick = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                if (user?.email) {
                    setValue(user.email);
                    localStorage.setItem("email", user.email);
                    onChangeAuth();
                }

            })
            .catch((error) => {
                console.error("Error signing in with Google:", error);
            });
    };

    useEffect(() => {
        const email = localStorage.getItem("email");
        if (email) {
            setValue(email);
        }
    }, []);

    return (
        <div className='signInPage'>
            <div style={{
                marginLeft: '20%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                width: '300px',
                marginRight: '50px'
            }}>
                <Avatar sx={{
                    width: '78px',
                    height: '78px',
                    bgcolor: 'var(--mainColor)'
                }}>
                    <LockOutlinedIcon sx={{
                        width: '48px',
                        height: '48px'
                    }} />
                </Avatar>

                <h1 style={{ whiteSpace: 'nowrap' }}>Sign In</h1>

                <div component="form" onSubmit={handleSubmit} noValidate style={{
                    alignItems: 'center',
                    marginTop: '16px'
                }}>
                    <button
                        type="submit"
                        variant="contained"
                        style={{
                            width: '258px',
                            height: '48px',
                            whiteSpace: 'nowrap',
                            backgroundColor: 'var(--mainColor)'
                        }}
                        onClick={handleClick}
                    >
                        <span>
                            <FontAwesomeIcon icon={faGoogle} /> Sign In With Google
                        </span>
                    </button>
                </div>
            </div>
            <div>
                <img src={TuduLogo} alt='Logo' style={{ marginLeft: '50px', width: '90%' }} />
            </div>
        </div>
    );

}