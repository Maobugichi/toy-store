import { useAuth } from "@/context/authContext";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { handleLoginSuccess } from "@/services/mergecartService";

export const useAuthCallback = () => {
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
    }, [navigate, searchParams , login]);
}