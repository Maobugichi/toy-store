import React from 'react';
import {  SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  
} from '@/components/ui/dialog';
import type { ProductFilterDialogProps } from '../../../../components/refractored/filterpage/types';
import { useProductFilterDialog } from '../../hooks/useProductFilters';
import { FilterBySearch } from '@/features/products/components/ProductFilter/filterBySearch';
import { FilterDialogFooter } from '@/features/products/components/ProductFilter/filterDialogFooter';
import { FilterByPrice } from '@/features/products/components/ProductFilter/filterByPrice';
import { FilterByMaterial } from '@/features/products/components/ProductFilter/filterByMaterial';
import { FilterBySize } from '@/features/products/components/ProductFilter/filterBySize';
import { FilterByCategory } from '@/features/products/components/ProductFilter/filterByCategory';
import { FilterByColor } from '@/features/products/components/ProductFilter/filterByColors';
import { FilterByAvailability } from '@/features/products/components/ProductFilter/filterByAvailability';



const ProductFilterDialog: React.FC<ProductFilterDialogProps> = ({ 
  maxPrice = 50000,
  filterOptions
}) => {
  console.log(filterOptions)
  const  {
      isDialogOpen,
      handleDialogOpen,
      updateTempFilter,
      activeFiltersCount,
    } = useProductFilterDialog()
 

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
         
            <FilterBySearch
              updateTempFilter={updateTempFilter}             
            />

            <Separator />

           
            <FilterByPrice maxPrice={maxPrice}/>

           <Separator />
           <FilterByMaterial filterOptions={filterOptions}/>

           <FilterBySize filterOptions={filterOptions}/>

           <FilterByCategory filterOptions={filterOptions}/>

           <FilterByColor filterOptions={filterOptions}/>

           <FilterByAvailability/>
          </div>
        </ScrollArea>
        
       <FilterDialogFooter/>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFilterDialog;