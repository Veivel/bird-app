import { InteractionContext } from '@/components/context/InteractionContext';
import { useContext, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { logout } from '../../utils/authutils';
import { useRouter } from 'next/router';

export default function LogoutPage(): JSX.Element {
    const { token, setToken } = useContext(InteractionContext)
    const router = useRouter()    

    useEffect(() => {
        if (token === "-") {
            router.push("/")
        } else {
            logout();
            window.location.replace("/auth/logout")
        }
    }, []);

    return(
        <>
            <h1>Logout</h1>
            <p>You have been logged out.</p>
        </>
    );
}