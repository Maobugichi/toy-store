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
      <span className="animate-pulse">loading products...</span>
    </div>
  );
}

export default Root;