import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { useProductFilterDialog } from "../../hooks/useProductFilters"
import type { FilterState } from "../../types/filter.types";

interface DilaogFooterProps {
    onFiltersChange?:(filters: FilterState) => void;
}

export const FilterDialogFooter:React.FC<DilaogFooterProps> = () => {
    const { clearAll , resetTemp, apply } = useProductFilterDialog();
    return(
         <DialogFooter className="gap-2">
          <Button variant="outline" onClick={clearAll}>
            Clear All
          </Button>
          <Button variant="outline" onClick={resetTemp}>
            Reset
          </Button>
          <Button onClick={apply}>
            Apply Filters
          </Button>
        </DialogFooter>
    )
}