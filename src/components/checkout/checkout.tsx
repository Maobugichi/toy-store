import React, { useState } from 'react';
import { 
 
  Shield, 
  Lock, 
  ChevronRight, 
  Check, 
 
  Trash2, 
  Plus,
  Minus,
  Tag,
  Gift,
 

} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import axios from 'axios';
import StepOne from './steps/step-one';
import StepTwo from './steps/step-two';
import StepThree from './steps/step-three';

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [shippingMethod, setShippingMethod] = useState<string>('standard');
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [giftMessage, setGiftMessage] = useState<string>('');
  const [saveInfo, setSaveInfo] = useState<boolean | 'indeterminate'>(true);
  const [newsletter, setNewsletter] = useState<boolean | 'indeterminate'>(false);
  const { items } = useCart();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Urban Hoodie",
      color: "Black",
      size: "M",
      price: 149.99,
      originalPrice: 199.99,
      quantity: 1,
      image: "/api/placeholder/100/100",
      inStock: true
    },
    {
      id: 2,
      name: "Classic Denim Jacket",
      color: "Blue",
      size: "L",
      price: 89.99,
      originalPrice: 120.99,
      quantity: 2,
      image: "/api/placeholder/100/100",
      inStock: true
    }
  ]);

  const [shippingInfo, setShippingInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    country: 'United States',
    state: '',
    zip: '',
    phone: ''
  });

  const [billingInfo, setBillingInfo] = useState({
    sameAsShipping: true,
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    country: 'United States',
    state: '',
    zip: ''
  });


  

const handleCheckout = async () => {
  try {
    const payload = {
      cartItems: items.map((item) => ({
        product_id: item.id,  
        quantity: item.quantity,
        price: item.price,
      })),
      shippingInfo,
      billingInfo,
      shippingMethod,
      promoCode: promoApplied ? promoCode : null,
    };
      const url = import.meta.env.VITE_API_URL;
      const response = await axios.post(
      `${url}/api/checkout`,
      payload,
      { withCredentials: true }
    );

    if (response.data.success) {
      alert(`Order created! ID: ${response.data.orderId}`);
      
    }
  } catch (error: any) {
    console.error(error);
    alert(error.response?.data?.error || "Checkout failed");
  }
};

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const steps = [
    { number: 1, title: "Information", description: "Contact & shipping" },
    { number: 2, title: "Shipping", description: "Delivery method" },
    { number: 3, title: "Payment", description: "Payment details" }
  ];

  const shippingOptions = [
    {
      id: "standard",
      name: "Standard Delivery (NIPOST / Courier)",
      price: 4000,
      time: "3–5 business days (nationwide)",
      description: "Free delivery for orders over ₦100,000",
    },
    {
      id: "express",
      name: "Express Delivery (GIG Logistics)",
      price: 6500,
      time: "1–2 business days (major cities)",
      description: "Fast tracked delivery to Lagos, Abuja, Port Harcourt, etc.",
    },
    {
      id: "same_day",
      name: "Same Day Delivery (Lagos Only)",
      price: 8000,
      time: "Same day (orders before 12PM)",
      description: "Delivered same day within Lagos metro areas.",
    },
    {
      id: "pickup",
      name: "Pickup Station (DHL Partner)",
      price: 3000,
      time: "1–3 business days",
      description: "Pick up your order from a nearby DHL or partner location.",
    },
  ];

   const calculateSubtotal = (price: string, quantity: number): number => {
    return parseFloat(price) * quantity;
  };

  const calculateTotal = (): number => {
    return items.reduce((sum, item) => sum + calculateSubtotal(item.price, item.quantity), 0);
  };


 // 🧮 Subtotal (cart total)
const subtotal = calculateTotal();


const discount = promoApplied ? subtotal * 0.1 : 0;


const selectedShipping = shippingOptions.find(
  (option) => option.id === shippingMethod
);
const shippingCost = subtotal >= 100000 ? 0 : selectedShipping?.price ?? 4000;


const total = subtotal - discount + shippingCost;


const formatPrice = (amount: number): string =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);


  const updateQuantity = (id:number, change:any) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

   

 

  
  const removeItem = (id:number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
    }
  };

  const handleInputChange = (section:string, field:any, value:any) => {
    if (section === 'shipping') {
      setShippingInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'billing') {
      setBillingInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'payment') {
      setPaymentInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step.number 
                ? 'bg-black border-black text-white' 
                : 'border-gray-300 text-gray-400'
            }`}>
              {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
            </div>
            <div className="ml-3 hidden sm:block">
              <div className={`text-sm font-medium ${
                currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {step.title}
              </div>
              <div className="text-xs text-gray-500">{step.description}</div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <ChevronRight className="w-5 h-5 text-gray-400 mx-4" />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your purchase securely</p>
        </div>

        <StepIndicator />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
          <div className="lg:col-span-2">
           
            <StepOne currentStep={currentStep} setCurrentStep={setCurrentStep}/>
            <StepTwo subtotal={subtotal} shippingOptions={shippingOptions} currentStep={currentStep} shippingMethod={shippingMethod} setCurrentStep={setCurrentStep} setShippingMethod={setShippingMethod}/>

           
           <StepThree currentStep={currentStep} setCurrentStep={setCurrentStep} subtotal={subtotal} shippingCost={shippingCost}/>
          </div>

         
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.images.primary}
                        alt={item.base_name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.base_name}</h4>
                       
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border rounded">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-2 text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => updateQuantity(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                       <p className="font-medium">
                          ${ (parseFloat(item.price) * item.quantity).toFixed(2) }
                        </p>

                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

              
                <div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    {!promoApplied ? (
                      <Button variant="outline" onClick={applyPromoCode}>
                        Apply
                      </Button>
                    ) : (
                      <Button variant="outline" className="bg-green-50 text-green-700">
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {promoApplied && (
                    <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      SAVE10 applied - 10% off
                    </p>
                  )}
                </div>

                <Separator />

              
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free (₦0)' : formatPrice(shippingCost)}</span>
                  </div>
                 
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Label htmlFor="giftMessage" className="text-sm flex items-center gap-2">
                    <Gift className="h-4 w-4" />
                    Gift Message (optional)
                  </Label>
                  <textarea
                    id="giftMessage"
                    className="w-full mt-2 p-2 border rounded-md text-sm"
                    rows={3}
                    placeholder="Add a personal message..."
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                  />
                </div>

               
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>SSL encrypted checkout</span>
                  </div>
                 
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Lock className="h-4 w-4 text-purple-600" />
                    <span>Secure payment processing</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;