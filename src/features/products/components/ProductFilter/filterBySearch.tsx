import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import type { FilterState } from "../../types/filter.types";
import { useProductFilterDialog } from "../../hooks/useProductFilters";

interface FilterBySearchProps  {
  updateTempFilter: <K extends keyof FilterState>(
    key: K, 
    value: FilterState[K], 
    setter: React.Dispatch<React.SetStateAction<FilterState>>
  ) => void;
 
}
export const FilterBySearch:React.FC<FilterBySearchProps> = ({updateTempFilter }) => {
  const { tempFilters , setTempFilters } = useProductFilterDialog()
    return(
         <div className="space-y-2">
            <Label htmlFor="search">Search Products</Label>
            <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
             id="search"
             placeholder="Search products..."
             value={tempFilters.search}
             onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
             updateTempFilter('search', event.target.value, setTempFilters)
             }
             className="pl-10"
            />
            </div>
        </div>
    )
}