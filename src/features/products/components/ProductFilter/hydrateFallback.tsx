import { ClipLoader } from "react-spinners";

export function FilterHydrateFallback() {
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