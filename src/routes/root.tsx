import App from "@/App";
import { useQuery } from "@tanstack/react-query";
import { productsQueryOptions } from "./utils";
import { ClipLoader } from "react-spinners";

const Root = () => {
    const { data: products, isLoading, error } = useQuery(productsQueryOptions);


     if (error) {
     
      throw error
    
    }
    

   
    return (
        <>
          <App data={products} isLoading={isLoading}/>
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