import App from "@/App";
import { useQuery } from "@tanstack/react-query";

import { productsQueryOptions } from "./utils";
import { ClipLoader } from "react-spinners";

const Root = () => {
    const { data: products, isLoading, error } = useQuery(productsQueryOptions);

    
    if (isLoading) return <div className="h-screen grid place-items-center"><ClipLoader/></div>;

     if (error) {
      console.log(error)
      throw error
    
    }
    

   
    return (
        <>
          <App data={products}/>
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