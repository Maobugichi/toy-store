import { handleLoginSuccess } from '@/auth/hook';
import { useAuth } from '@/context/authContext';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useAuth();

    useEffect(() => {
        const handleCallback = async () => {
            const authStatus = searchParams.get('auth');
            
            if (authStatus !== 'success') {
                navigate('/login?error=auth_failed', { replace: true });
                return;
            }

            const urlData = searchParams.get('data');
            
            if (urlData) {
                try {
                    const userData = JSON.parse(decodeURIComponent(urlData));
                    
                    login(userData);
                    await handleLoginSuccess();
                    console.log('Auth successful:', userData);
                    navigate('/', { replace: true });
                } catch (error) {
                    console.error('Error parsing auth data:', error);
                    navigate('/login?error=parse_failed', { replace: true });
                }
            } else {
                console.error('No auth data found');
                navigate('/login?error=no_data', { replace: true });
            }
        };

        handleCallback();
    }, [navigate, searchParams]);

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