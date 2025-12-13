import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import type {  FilterOptions } from "../../types/filter.types";
import { toggleSection } from "@/components/refractored/filterpage/utils";
import { toggleTempArrayFilter } from "../../utils/filterDialogUtils";
import { Separator } from "@/components/ui/separator";
import { useProductFilterDialog } from "../../hooks/useProductFilters";


interface ColorCategoryProps {
    filterOptions:FilterOptions
  
}

export const FilterByColor:React.FC<ColorCategoryProps> = ({ filterOptions })  => {
    const { expandedSections , tempFilters , setTempFilters , setExpandedSections } = useProductFilterDialog();
    return(
        <>
           {filterOptions.colors.length > 0 && (
              <>
                <Collapsible defaultOpen={expandedSections.color}>
                  <CollapsibleTrigger 
                    className="flex items-center justify-between w-full"
                    onClick={() => toggleSection('color',setExpandedSections)}
                  >
                    <Label className="text-sm font-medium">Color</Label>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.color ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 mt-3">
                    {filterOptions.colors.map((color: string) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox
                          id={`color-${color}`}
                          checked={tempFilters.colors.includes(color)}
                          onCheckedChange={() => toggleTempArrayFilter('colors', color,setTempFilters)}
                        />
                        <Label 
                          htmlFor={`color-${color}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {color}
                        </Label>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
                <Separator />
              </>
            )}
        </>
    )
}