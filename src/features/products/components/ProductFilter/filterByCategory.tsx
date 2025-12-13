import { toggleSection } from "@/components/refractored/filterpage/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { ChevronDown } from "lucide-react"
import { toggleTempArrayFilter } from "../../utils/filterDialogUtils"
import type { FilterOptions } from "../../types/filter.types"
import { useProductFilterDialog } from "../../hooks/useProductFilters"


interface CategoryProps {
    filterOptions:FilterOptions
}

export const FilterByCategory:React.FC<CategoryProps> = ({filterOptions }) => {
  const { expandedSections , tempFilters , setTempFilters , setExpandedSections } = useProductFilterDialog();
    return(
        <>
           {filterOptions.categories.length > 0 && (
              <>
                <Collapsible defaultOpen={expandedSections.category}>
                  <CollapsibleTrigger 
                    className="flex items-center justify-between w-full"
                    onClick={() => toggleSection('category',setExpandedSections)}
                  >
                    <Label className="text-sm font-medium">Category</Label>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.category ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 mt-3">
                    {filterOptions.categories.map((category: string) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={tempFilters.categories.includes(category)}
                          onCheckedChange={() => toggleTempArrayFilter('categories', category,setTempFilters)}
                        />
                        <Label 
                          htmlFor={`category-${category}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </>
            )}
        </>
    )
}