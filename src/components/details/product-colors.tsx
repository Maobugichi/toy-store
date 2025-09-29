const Colors = () => {
    return(
        <div>
              <h3 className="text-lg font-semibold mb-3">Color: {selectedColor}</h3>
              <div className="flex gap-3">
                {products?.colors.map((color:any) => (
                  <button
                    key={color.name}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      selectedColor === color.name 
                        ? 'border-black scale-110' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                  >
                    {color.name === 'White' && <div className="w-full h-full rounded-full border border-gray-200" />}
                  </button>
                ))}
              </div>
            </div>
    )
}