import { SlidersHorizontal } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const FilterSort = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal size={18} />
          Filter and sort
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filter & Sort Options</DialogTitle>
          <DialogDescription>
            Adjust filters and sorting preferences below.
          </DialogDescription>
        </DialogHeader>

        {/* Your filter/sort form goes here */}
        <div className="space-y-4 py-2">
          <div>
            <label className="text-sm font-medium">Sort by</label>
            <select className="w-full border rounded-md px-2 py-1 mt-1">
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <select className="w-full border rounded-md px-2 py-1 mt-1">
              <option value="all">All</option>
              <option value="fashion">Fashion</option>
              <option value="tech">Tech</option>
              <option value="home">Home</option>
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline">
            Reset
          </Button>
          <Button type="submit">Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FilterSort
