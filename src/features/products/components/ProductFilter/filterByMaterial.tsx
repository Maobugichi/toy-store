import { toggleSection } from "@/components/refractored/filterpage/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { ChevronDown } from "lucide-react";
import { toggleTempArrayFilter } from "../../utils/filterDialogUtils";
import { Checkbox } from "@/components/ui/checkbox";
import type { FilterOptions } from "../../types/filter.types";
import { Separator } from "@/components/ui/separator";
import { useProductFilterDialog } from "../../hooks/useProductFilters";

interface MaterialCategoryProps {
    filterOptions:FilterOptions
   
}


export const FilterByMaterial:React.FC<MaterialCategoryProps> = ({filterOptions}) => {
    const { expandedSections , setTempFilters , tempFilters , setExpandedSections } = useProductFilterDialog()
    return(
        <>
           {filterOptions.materials.length > 0 && (
              <>
                <Collapsible defaultOpen={expandedSections.material}>
                  <CollapsibleTrigger 
                    className="flex items-center justify-between w-full"
                    onClick={() => toggleSection('material',setExpandedSections)}
                  >
                    <Label className="text-sm font-medium">Material</Label>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.material ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 mt-3">
                    {filterOptions.materials.map((material: string) => (
                      <div key={material} className="flex items-center space-x-2">
                        <Checkbox
                          id={`material-${material}`}
                          checked={tempFilters.materials.includes(material)}
                          onCheckedChange={() => toggleTempArrayFilter('materials', material,setTempFilters)}
                        />
                        <Label 
                          htmlFor={`material-${material}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {material}
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