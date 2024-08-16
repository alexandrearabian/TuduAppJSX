import { clearData } from '../functions/LocalStorageFunctions';
import { signOut } from 'firebase/auth';
import { auth } from '../authentication/FirebaseConfig';

function LogOut() {
    const logout = () => {
        signOut(auth)
            .then(() => {
                clearData();
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    };

    return <button style={{marginTop:'90px'}}onClick={logout}>Logout</button>;
}

export default LogOut;