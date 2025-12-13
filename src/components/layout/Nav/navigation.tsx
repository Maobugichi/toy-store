import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CategoryDropdown } from './categoryDropdown';
import { useNavigation } from '@/hooks/useNavigation';

export const Navigation = () => {
  const { handleNewArrivals } = useNavigation();

  return (
    <div className="hidden mt-3 lg:flex items-center space-x-1">
      <Link to="/filter">
        <Button variant="ghost" className="font-medium">
          Shop All
        </Button>
      </Link>

      <CategoryDropdown />

      <Button 
        variant="ghost" 
        className="relative font-medium"
        onClick={handleNewArrivals}
      >
        New Arrivals
        <Badge 
          variant="secondary" 
          className="ml-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs"
        >
          New
        </Badge>
      </Button>
    </div>
  );
};