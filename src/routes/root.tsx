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
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh' 
    }}>
      <ClipLoader />
    </div>
  );
}

export default Root;