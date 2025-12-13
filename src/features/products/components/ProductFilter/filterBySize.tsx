import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { FilterOptions } from "../../types/filter.types";
import { toggleSection } from "@/components/refractored/filterpage/utils";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleTempArrayFilter } from "../../utils/filterDialogUtils";
import { Separator } from "@/components/ui/separator";
import { useProductFilterDialog } from "../../hooks/useProductFilters";

interface SizeCategoryProps {
    filterOptions:FilterOptions
   
}


export const FilterBySize:React.FC<SizeCategoryProps> = ({ filterOptions }) => {
  const { expandedSections , setTempFilters , tempFilters ,setExpandedSections } = useProductFilterDialog()
    return(
        <>
           {filterOptions.sizes.length > 0 && (
              <>
                <Collapsible defaultOpen={expandedSections.size}>
                  <CollapsibleTrigger 
                    className="flex items-center justify-between w-full"
                    onClick={() => toggleSection('size', setExpandedSections)}
                  >
                    <Label className="text-sm font-medium">Size</Label>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.size ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3">
                    <div className="flex gap-2 flex-wrap">
                      {filterOptions.sizes.map((size: string) => (
                        <Button
                          key={size}
                          variant={tempFilters.sizes.includes(size) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleTempArrayFilter('sizes', size , setTempFilters)}
                          className="h-8 capitalize"
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
                <Separator />
              </>
            )}
        </>
    )
}