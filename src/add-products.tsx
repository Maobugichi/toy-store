import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, ImageIcon, Loader2, AlertCircle, Plus, Trash2, Eye, Edit, Save, ShoppingBag } from 'lucide-react';
import axios from "axios";

const MultipleImageUpload = ({ productId, existingImages = [], onUploadComplete }:any) => {
  const [files, setFiles] = useState<any>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<any>(null);


  const handleDrag = useCallback((e:any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e:any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const imageFiles = droppedFiles.filter((file:any) => file.type.startsWith('image/'));
    
    if (imageFiles.length !== droppedFiles.length) {
      setError('Only image files are allowed');
    }
    
    addFiles(imageFiles);
  }, []);

  const validateFiles = (fileList:any) => {
    const maxSize = 5 * 1024 * 1024; 
    const maxFiles = 10;
    
    if (fileList.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`);
      return false;
    }
    
    for (let file of fileList) {
      if (file.size > maxSize) {
        setError(`${file.name} is too large. Max 5MB per image.`);
        return false;
      }
    }
    
    setError('');
    return true;
  };

  const addFiles = (newFiles:any) => {
    if (!validateFiles(newFiles)) return;
    
    const filesWithPreview = newFiles.map((file:any) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      status: 'pending'
    }));

    setFiles((prev:any) => [...prev, ...filesWithPreview]);
  };

  const removeFile = (id:any) => {
    setFiles((prev:any) => {
      const fileToRemove = prev.find((f:any) => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f:any) => f.id !== id);
    });
  };

  const handleFileInput = (e:any) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
    e.target.value = '';
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;
    if (!productId) {
      setError('Product ID is required');
      return;
    }

    setUploading(true);
    setError('');
    
    const formData = new FormData();
    files.forEach(({ file }:any) => {
      formData.append('images', file);
    });

    try {
      const response = await axios.post(`http://localhost:3000/api/products/${productId}/images`, formData);

      const result = await response.data;

      if (result.success) {
        onUploadComplete(result.images);
       
        files.forEach((f:any) => URL.revokeObjectURL(f.preview));
        setFiles([]);
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error:any) {
      console.error('Upload failed:', error);
      setError(error.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragActive 
            ? 'border-blue-500 bg-blue-50 scale-105' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="flex justify-center">
            <ImageIcon className="h-12 w-12 text-gray-400" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop images here or{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700 underline font-semibold"
              >
                browse files
              </button>
            </p>
            <p className="text-sm text-gray-500">
              Support: JPG, PNG, WebP • Max 5MB each • Up to 10 images
            </p>
          </div>
        </div>
      </div>

     
      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Selected Images ({files.length})
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {files.map((fileObj:any) => (
              <div key={fileObj.id} className="relative group bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:border-gray-300 transition-colors">
                <div className="aspect-square">
                  <img
                    src={fileObj.preview}
                    alt={fileObj.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Remove button */}
                <button
                  onClick={() => removeFile(fileObj.id)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <X className="h-4 w-4" />
                </button>
                
                {/* File info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs font-medium truncate">{fileObj.name}</p>
                  <p className="text-xs text-gray-300">{(fileObj.size / 1024 / 1024).toFixed(1)}MB</p>
                </div>
              </div>
            ))}
          </div>

          {/* Upload button */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={uploadFiles}
              disabled={uploading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors shadow-sm disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  Upload {files.length} Images
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Existing Images Preview */}
      {existingImages?.gallery?.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Current Images ({existingImages.gallery.length})
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {existingImages.gallery.map((image:any, index:number) => (
              <div key={index} className="relative group bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
                <div className="aspect-square">
                  <img
                    src={image.medium || image.thumbnail}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Primary badge */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    PRIMARY
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// =============================================
// PRODUCT FORM COMPONENT
// =============================================
const ProductForm = ({ product, onSave, onCancel }:any) => {
  const [formData, setFormData] = useState<any>({
    name: '',
    base_name: '',
    price: '',
    compare_at_price: '',
    description: '',
    short_description: '',
    category_id: '',
    color: '',
    size: '',
    material: '',
    sku: '',
    stock_quantity: '',
    tags: [],
    ...product
  });

  const [saving, setSaving] = useState<boolean>(false);
  const [tagInput, setTagInput] = useState<string>('');

  const handleInputChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev:any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev:any) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove:any) => {
    setFormData((prev:any) => ({
      ...prev,
      tags: prev.tags.filter((tag:any) => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">
          {product?.id ? 'Edit Product' : 'Add New Product'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Cool Brand Hat - Black - One Size"
          />
        </div>

        {/* Base Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Base Name *
          </label>
          <input
            type="text"
            name="base_name"
            value={formData.base_name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Cool Brand Hat"
          />
        </div>

        {/* SKU */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SKU *
          </label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="HAT-BLK-OS-001"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              step="0.01"
              min="0"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="29.99"
            />
          </div>
        </div>

        {/* Compare At Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Compare At Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              name="compare_at_price"
              value={formData.compare_at_price}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="39.99"
            />
          </div>
        </div>

        {/* Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Black"
          />
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size
          </label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="One Size"
          />
        </div>

        {/* Material */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Material
          </label>
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="100% Cotton"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock Quantity *
          </label>
          <input
            type="number"
            name="stock_quantity"
            value={formData.stock_quantity}
            onChange={handleInputChange}
            required
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="25"
          />
        </div>

        {/* Short Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description
          </label>
          <textarea
            name="short_description"
            value={formData.short_description}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Brief product description..."
          />
        </div>

        {/* Full Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Detailed product description..."
          />
        </div>

        {/* Tags */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add a tag..."
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag:any, index:number) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-blue-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Product
            </>
          )}
        </button>
      </div>
    </form>
  );
};

const ProductAdminPanel = () => {
  const [products, setProducts] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showImageUpload, setShowImageUpload] = useState<boolean>(false);

 useEffect(() => {
  let isMounted = true; 

  async function getProducts() {
    try {
      const response = await axios.get('http://localhost:3000/api/products/');
      console.log(response)
      if (isMounted) {
        setProducts(response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (isMounted) setLoading(false);
    }
  }

  // simulate loading for UX
  const timer = setTimeout(() => {
    getProducts();
  }, 1000);

  return () => {
    isMounted = false;
    clearTimeout(timer);
  };
}, []);


  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowForm(true);
    setShowImageUpload(false);
  };

  const handleEditProduct = (product:any) => {
    setSelectedProduct(product);
    setShowForm(true);
    setShowImageUpload(false);
  };

  const handleManageImages = (product:any) => {
    
    setSelectedProduct(product);
    setShowForm(false);
    setShowImageUpload(true);
  };

  const handleSaveProduct = async (productData:any) => {
    
     await axios.post("http://localhost:3000/api/products/upload-product", productData);
     alert("✅ Category created successfully!");
    if (selectedProduct?.id) {
      // Update existing
      setProducts((prev:any) => prev.map((p:any) => 
        p.id === selectedProduct.id ? { ...p, ...productData } : p
      ));
    } else {
      // Add new
      const newProduct = {
        ...productData,
        id: Math.max(...products.map((p:any) => p.id), 0) + 1
      };
      setProducts((prev:any) => [...prev, newProduct]);
    }
    
    setShowForm(false);
    setSelectedProduct(null);
  };

  const handleImageUploadComplete = (images:any) => {
    console.log('Images uploaded:', images);
    // Update the product with new images
    if (selectedProduct) {
      setProducts((prev:any) => prev.map((p:any) => 
        p.id === selectedProduct.id ? { ...p, images } : p
      ));
      setSelectedProduct((prev:any) => ({ ...prev, images }));
    }
  };

  const handleDeleteProduct = (productId:any) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts((prev:any) => prev.filter((p:any) => p.id !== productId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
            </div>
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
            >
              <Plus className="h-5 w-5" />
              Add Product
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <ProductForm
            product={selectedProduct}
            onSave={handleSaveProduct}
            onCancel={() => {
              setShowForm(false);
              setSelectedProduct(null);
            }}
          />
        ) : showImageUpload ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Manage Images: {selectedProduct?.name}
              </h2>
              <button
                onClick={() => {
                  setShowImageUpload(false);
                  setSelectedProduct(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <MultipleImageUpload
              productId={selectedProduct?.id}
              existingImages={selectedProduct?.images}
              onUploadComplete={handleImageUploadComplete}
            />
          </div>
        ) : (
          <>
            {/* Products List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Products ({products.length})
                </h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Variants
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product:any) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-12 w-12 flex-shrink-0">
                              <img
                                className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                                src={product.images?.primary || 'https://via.placeholder.com/50x50'}
                                alt={product.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                SKU: {product.sku || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${product.price}
                          </div>
                          {product.compare_at_price && (
                            <div className="text-sm text-gray-500 line-through">
                              ${product.compare_at_price}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            product.stock_quantity > 10
                              ? 'bg-green-100 text-green-800'
                              : product.stock_quantity > 0
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.stock_quantity} in stock
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex flex-wrap gap-1">
                            {product.color && (
                              <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                                {product.color}
                              </span>
                            )}
                            {product.size && (
                              <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                                {product.size}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Product"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleManageImages(product)}
                              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                              title="Manage Images"
                            >
                              <ImageIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {products.length === 0 && (
                <div className="text-center py-12">
                  <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                  <p className="text-gray-500 mb-4">Get started by adding your first product.</p>
                  <button
                    onClick={handleAddProduct}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    Add Product
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductAdminPanel;