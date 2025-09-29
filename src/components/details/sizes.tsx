const Sizes = () => {
    return(
         <div>
              <h3 className="text-lg font-semibold mb-3">Size: {selectedSize}</h3>
              <div className="flex gap-2">
                {products?.sizes.map((size:any) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className="min-w-[3rem] h-12"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
              <button className="text-sm text-blue-600 hover:underline mt-2">
                Size Guide
              </button>
            </div>
    )
}