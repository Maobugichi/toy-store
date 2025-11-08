import { useAuth } from '@/context/authContext';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthCallback = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const handleCallback = async () => {
            const authStatus = searchParams.get('auth');
            console.log('Auth status:', authStatus);
            
            if (authStatus !== 'success') {
                navigate('/login?error=auth_failed', { replace: true });
                return;
            }

            const urlData = searchParams.get('data');
            console.log('URL data:', urlData);
            
            if (urlData) {
                // Development mode - data in URL
                try {
                    const userData = JSON.parse(decodeURIComponent(urlData));
                    
                    login(userData)
                    console.log('Auth successful:', userData);
                    navigate('/', { replace: true });
                } catch (error) {
                    console.error('Error parsing auth data:', error);
                    navigate('/login?error=parse_failed', { replace: true });
                }
            } else {
                // Production mode - data in cookie
                const authData = getCookie('auth_data');
                
                if (authData) {
                    try {
                        const userData = JSON.parse(decodeURIComponent(authData));
                        
                        login(userData)
                        document.cookie = 'auth_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.thetoyshop.net.ng';
                        
                        navigate('/', { replace: true });
                    } catch (error) {
                        console.error('Error parsing cookie data:', error);
                        navigate('/login?error=parse_failed', { replace: true });
                    }
                } else {
                    console.error('No auth data found in URL or cookies');
                    navigate('/login?error=no_data', { replace: true });
                }
            }
        };

        handleCallback();
    }, [navigate, searchParams]);

    const getCookie = (name: string): string | null => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const cookieValue = parts.pop()?.split(';').shift();
            return cookieValue || null;
        }
        return null;
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                <p>Completing authentication...</p>
            </div>
        </div>
    );
};

export default AuthCallback;