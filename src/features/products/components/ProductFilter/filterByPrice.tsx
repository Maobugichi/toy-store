import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ChevronDown } from "lucide-react";
import { toggleSection, updateTempFilter } from "@/components/refractored/filterpage/utils";
import { useProductFilterDialog } from "../../hooks/useProductFilters";


interface PriceRangeProps {
    maxPrice:number,
}

export const FilterByPrice:React.FC<PriceRangeProps> = ({maxPrice}) => {
    const { expandedSections , setTempFilters , tempFilters , setExpandedSections } = useProductFilterDialog()
    return(
        <Collapsible defaultOpen={expandedSections.price}>
            <CollapsibleTrigger 
            className="flex items-center justify-between w-full"
            onClick={() => toggleSection('price' , setExpandedSections)}
            >
            <Label className="text-sm font-medium">Price Range</Label>
            <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3">
            <Slider
                value={tempFilters.priceRange}
                onValueChange={(value: number[]) => updateTempFilter('priceRange', value,setTempFilters)}
                max={maxPrice}
                step={1000}
                className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
                <span>₦0</span>
                <span>₦{tempFilters.priceRange[0].toLocaleString()}</span>
            </div>
            </CollapsibleContent>
        </Collapsible>
    )
}