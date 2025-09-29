import axios from "axios"

const filterLoader = async () => {
    const url = import.meta.env.VITE_API_URL
    try {
        const response = await axios.get(`${url}/api/products/`);
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export { filterLoader }