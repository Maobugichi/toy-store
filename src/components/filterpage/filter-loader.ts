import axios from "axios"

const filterLoader = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/products/');
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export { filterLoader }