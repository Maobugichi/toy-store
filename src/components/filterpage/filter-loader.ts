import axios from "axios"

const filterLoader = async () => {
    const url = import.meta.env.VITE_API_URL
    try {
        const response = await axios.get(`${url}/api/products/`, { withCredentials:true });
        const products = response.data;

        for (let i = products.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [products[i], products[j]] = [products[j], products[i]];
        }

        return products;
    } catch (err) {
        console.log(err)
        return []; 
    }
}

export { filterLoader }