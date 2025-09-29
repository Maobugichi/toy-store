import App from "@/App";
import { useLoaderData } from "react-router-dom";


const Root = () => {
    const data = useLoaderData();
    console.log(data)
    return (
        <>
          <App data={data}/>
        </>
    )
}

export default Root