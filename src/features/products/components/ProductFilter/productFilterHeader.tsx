import type { Product } from "../../types/product.types"

interface ProductFilterHeaderProps  {
    filterType:string
    data:Product[]
    filteredProducts:any
}


export const ProductFilterHeader:React.FC<ProductFilterHeaderProps> = ({filterType, data , filteredProducts}) => {
    return(
        <div>
            <h1 className="text-2xl font-bold text-gray-900">
                {filterType === 'newArrivals' ? 'New Arrivals' : 'Products'}
            </h1>
            <p className="text-gray-600 mt-1">
                {filteredProducts.length} of {data?.length || 0} products
                {filterType === 'newArrivals' && ' • Added in the last 30 days'}
            </p>
        </div>
    )
}