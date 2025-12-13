import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ChevronDown } from "lucide-react"
import { updateTempFilter } from "../../utils/filterDialogUtils"
import { toggleSection } from "@/components/refractored/filterpage/utils"
import { useProductFilterDialog } from "../../hooks/useProductFilters"



export const FilterByAvailability = () => {
  const { expandedSections , tempFilters , setTempFilters , setExpandedSections } = useProductFilterDialog();
    return(
         <Collapsible defaultOpen={expandedSections.availability}>
              <CollapsibleTrigger 
                className="flex items-center justify-between w-full"
                onClick={() => toggleSection('availability', setExpandedSections)}
              >
                <Label className="text-sm font-medium">Availability</Label>
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.availability ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="in-stock" className="text-sm font-normal">
                    In Stock Only
                  </Label>
                  <Switch
                    id="in-stock"
                    checked={tempFilters.inStock}
                    onCheckedChange={(checked: boolean) => updateTempFilter('inStock', checked,setTempFilters)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured" className="text-sm font-normal">
                    Featured Products
                  </Label>
                  <Switch
                    id="featured"
                    checked={tempFilters.featured}
                    onCheckedChange={(checked: boolean) => updateTempFilter('featured', checked,setTempFilters)}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>
    )
}