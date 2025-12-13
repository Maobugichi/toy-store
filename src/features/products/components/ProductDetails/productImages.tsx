import { useState } from 'react';

interface ProductImagesProps {
  primaryImage: string;
  productName: string;
  gallery?: string[];
}

export const ProductImages = ({ primaryImage, productName, gallery }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(primaryImage);
  
  const galleryImages = gallery || [primaryImage, primaryImage, primaryImage, primaryImage];

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
        <img 
          src={selectedImage} 
          alt={productName}
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {galleryImages.slice(0, 4).map((img, i) => (
          <div 
            key={i} 
            onClick={() => setSelectedImage(img)}
            className={`aspect-square rounded-lg overflow-hidden bg-slate-100 cursor-pointer border-2 transition-colors ${
              selectedImage === img ? 'border-primary' : 'border-transparent hover:border-primary'
            }`}
          >
            <img 
              src={img} 
              alt={`${productName} view ${i + 1}`}
              className="w-full h-full object-fit"
            />
          </div>
        ))}
      </div>
    </div>
  );
};