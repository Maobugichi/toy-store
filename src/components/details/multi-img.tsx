const MultiImage = () => {
    return(
         <div className="grid grid-cols-4 gap-3">
              {products.images?.map((image:any, index:number) => (
                <button
                  key={index}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-black' : 'border-transparent hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${products.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
    )
}