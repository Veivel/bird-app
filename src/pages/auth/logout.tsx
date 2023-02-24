import { InteractionContext } from '@/components/context/InteractionContext';
import { useContext, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { logout } from '../../utils/authutils';

export default function LogoutPage(): JSX.Element {
    // const { setToken } = useContext(InteractionContext)
    
    useEffect(() => {
        logout();
    }, []);

    return(
        <>
            <h1>Logout</h1>
            <p>You have been logged out.</p>
        </>
    );
}