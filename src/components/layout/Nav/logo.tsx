import { CLOUDINARY_BASE_URL } from '@/config/constants';
import { Link } from 'react-router-dom';

const LOGO_URL = `${CLOUDINARY_BASE_URL}/image/upload/v1759248907/toy-logoo_qt8unk.png`

export const Logo = () => {
  return (
    <div className="flex md:w-auto w-32 items-center">
      <Link to="/" className="flex items-center w-20 space-x-2">
        <img 
          src={LOGO_URL} 
          alt="Toyshop logo" 
          className="object-cover w-full"
        />
      </Link>
    </div>
  );
};