import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const isUserAuthenticated = () => {
    console.log(localStorage.getItem('isLoggedIn') !== null);
    
    return localStorage.getItem('isLoggedIn') !== null;
};

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = async () => {
            const authenticated = isUserAuthenticated();
            setIsAuthenticated(authenticated);

            if (authenticated) {
                router.push('/home');
            }
        };

        checkAuthentication();
    }, [router]);

    return { isAuthenticated };
};

export default useAuth;
