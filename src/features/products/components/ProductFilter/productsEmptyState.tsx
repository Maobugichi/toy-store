import { Button } from "@/components/ui/button"
import { useProductFilterDialog } from "../../hooks/useProductFilters"

interface ProductsEmptyStateProps  {
    filterType:string
}

export const ProductsEmptyState:React.FC<ProductsEmptyStateProps> = ({filterType}) => {
    const { clearAll } = useProductFilterDialog();
    return(
        <div className="text-center py-12">
         <div className="text-gray-500 text-lg">
            {filterType === 'newArrivals' 
            ? 'No new arrivals in the last 30 days.' 
            : 'No products match your current filters.'}
         </div>
         <Button
            onClick={clearAll}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
         </Button>
        </div> 
    )
}

