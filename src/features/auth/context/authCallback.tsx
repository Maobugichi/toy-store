import { useAuthCallback } from '../../../features/auth/hooks/useAuthCallback';
import { HydrateFallback } from '@/ui/atoms/hydrateFallback';

const AuthCallback = () => {
  useAuthCallback();
  return <HydrateFallback message="Completing authentication..." />;
};

export default AuthCallback;
