import App from "@/App";
import { ClipLoader } from "react-spinners";

const Root = () => {
    return (
        <>
          <App />
        </>
    )
}

export function HydrateFallback() {
  return (
    <div style={{ 
      display: 'flex',
      gap:20, 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <ClipLoader />
      <p className="animate-pulse text-lg text-gray-500">loading products...</p>
    </div>
  );
}

export default Root;