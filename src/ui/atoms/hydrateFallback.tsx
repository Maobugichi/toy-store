import { ClipLoader } from "react-spinners";

interface HydrateProps {
  message?:string
}

export function HydrateFallback({message = 'loading products...'}:HydrateProps) {
  return (
    <div style={{ 
      display: 'flex',
      gap:20, 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <ClipLoader />
      <p className="animate-pulse text-lg text-gray-500">{message}</p>
    </div>
  );
}