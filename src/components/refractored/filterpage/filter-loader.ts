import api from "@/config/axios-config";


const filterLoader = async () => {
    
    try {
        const response = await api.get(`/api/products/`);
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