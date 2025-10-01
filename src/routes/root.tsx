import App from "@/App";
import { useLoaderData } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Root = () => {
    const data = useLoaderData();
    
    if (!data) return <ClipLoader/>
    return (
        <>
          <App data={data}/>
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