import React, { useState } from 'react';
import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter 
} from '@/components/ui/dialog';
import type { FilterState ,  ExpandedSections, ProductFilterDialogProps } from './types';
import { applyFilters, clearFilters, resetTempFilters, toggleTempArrayFilter, updateTempFilter } from './utils';



const ProductFilterDialog: React.FC<ProductFilterDialogProps> = ({ 
  onFiltersChange, 
  maxPrice = 50000,
  filterOptions
}) => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    priceRange: [0],
    materials: [],
    sizes: [],
    categories: [],
    colors: [],
    inStock: false,
    featured: false
  });

  const [tempFilters, setTempFilters] = useState<FilterState>(filters);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    price: true,
    material: true,
    size: true,
    category: true,
    color: true,
    availability: true
  });

  

   const activeFiltersCount: number = [
    filters.search,
    ...filters.materials,
    ...filters.sizes,
    ...filters.categories,
    ...filters.colors,
    filters.inStock,
    filters.featured,
    filters.priceRange[0] > 0
  ].filter(Boolean).length;

  const handleDialogOpen = (open: boolean): void => {
    if (open) {
      setTempFilters(filters);
    }
    setIsDialogOpen(open);
  };

  const toggleSection = (section: keyof ExpandedSections): void => {
    setExpandedSections((previousState: ExpandedSections) => ({
      ...previousState,
      [section]: !previousState[section]
    }));
  };

  return (
    <Dialog  open={isDialogOpen} onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Filter Products</DialogTitle>
          <DialogDescription>
            Customize your product search with the filters below.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[50vh] pr-4">
          <div className="space-y-6">
          
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

            <Separator />

          
            <Collapsible defaultOpen={expandedSections.price}>
              <CollapsibleTrigger 
                className="flex items-center justify-between w-full"
                onClick={() => toggleSection('price')}
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

            <Separator />

            {/* Material Filter */}
            {filterOptions.materials.length > 0 && (
              <>
                <Collapsible defaultOpen={expandedSections.material}>
                  <CollapsibleTrigger 
                    className="flex items-center justify-between w-full"
                    onClick={() => toggleSection('material')}
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

            {/* Size Filter */}
            {filterOptions.sizes.length > 0 && (
              <>
                <Collapsible defaultOpen={expandedSections.size}>
                  <CollapsibleTrigger 
                    className="flex items-center justify-between w-full"
                    onClick={() => toggleSection('size')}
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

          
            {filterOptions.categories.length > 0 && (
              <>
                <Collapsible defaultOpen={expandedSections.category}>
                  <CollapsibleTrigger 
                    className="flex items-center justify-between w-full"
                    onClick={() => toggleSection('category')}
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
                <Separator />
              </>
            )}

          
            {filterOptions.colors.length > 0 && (
              <>
                <Collapsible defaultOpen={expandedSections.color}>
                  <CollapsibleTrigger 
                    className="flex items-center justify-between w-full"
                    onClick={() => toggleSection('color')}
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

            {/* Availability Filters */}
            <Collapsible defaultOpen={expandedSections.availability}>
              <CollapsibleTrigger 
                className="flex items-center justify-between w-full"
                onClick={() => toggleSection('availability')}
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
          </div>
        </ScrollArea>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => clearFilters(setFilters,setTempFilters , onFiltersChange)}>
            Clear All
          </Button>
          <Button variant="outline" onClick={() => resetTempFilters(setTempFilters,filters)}>
            Reset
          </Button>
          <Button onClick={() => applyFilters(setFilters,tempFilters,onFiltersChange,setIsDialogOpen)}>
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFilterDialog;