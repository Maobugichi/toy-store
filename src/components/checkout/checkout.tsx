import React, { useState } from 'react';
import { 
  CreditCard, 
  Truck, 
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

import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCart } from '@/hooks/useCart';

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
      id: 'standard', 
      name: 'Standard Shipping', 
      price: 0, 
      time: '5-7 business days',
      description: 'Free shipping on orders over $75' 
    },
    { 
      id: 'express', 
      name: 'Express Shipping', 
      price: 9.99, 
      time: '2-3 business days',
      description: 'Faster delivery' 
    },
    { 
      id: 'overnight', 
      name: 'Overnight Delivery', 
      price: 19.99, 
      time: 'Next business day',
      description: 'Get it tomorrow' 
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const selectedShipping = shippingOptions.find(option => option.id === shippingMethod);
  const shippingCost = subtotal >= 75 && shippingMethod === 'standard' ? 0 : selectedShipping?.price || 0;
  const tax = (subtotal - discount + shippingCost) * 0.08;
  const total = subtotal - discount + shippingCost + tax;

  const updateQuantity = (id:number, change:any) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

   const formatPrice = (price: string): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(parseFloat(price));
  };

  const calculateSubtotal = (price: string, quantity: number): number => {
    return parseFloat(price) * quantity;
  };

  const calculateTotal = (): number => {
    return items.reduce((sum, item) => sum + calculateSubtotal(item.price, item.quantity), 0);
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
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={shippingInfo.email}
                      onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex items-center space-x-2 mt-2">
                      <Checkbox 
                        id="newsletter" 
                        checked={newsletter}
                        onCheckedChange={setNewsletter}
                      />
                      <Label htmlFor="newsletter" className="text-sm text-gray-600">
                        Subscribe to our newsletter for exclusive offers
                      </Label>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-4">Shipping Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={shippingInfo.firstName}
                          onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={shippingInfo.lastName}
                          onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="company">Company (optional)</Label>
                      <Input
                        id="company"
                        placeholder="Acme Inc."
                        value={shippingInfo.company}
                        onChange={(e) => handleInputChange('shipping', 'company', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        placeholder="123 Main Street"
                        value={shippingInfo.address}
                        onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                      <Input
                        id="apartment"
                        placeholder="Apt 4B"
                        value={shippingInfo.apartment}
                        onChange={(e) => handleInputChange('shipping', 'apartment', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          placeholder="New York"
                          value={shippingInfo.city}
                          onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          placeholder="NY"
                          value={shippingInfo.state}
                          onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP Code *</Label>
                        <Input
                          id="zip"
                          placeholder="10001"
                          value={shippingInfo.zip}
                          onChange={(e) => handleInputChange('shipping', 'zip', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <Button 
                      onClick={() => setCurrentStep(2)}
                      className="bg-black hover:bg-gray-800"
                    >
                      Continue to Shipping
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Shipping */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    Shipping Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                    {shippingOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={option.id} className="font-medium cursor-pointer">
                              {option.name}
                            </Label>
                            <span className="font-semibold">
                              {option.price === 0 && subtotal >= 75 ? 'FREE' : `$${option.price}`}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{option.time}</p>
                          <p className="text-xs text-gray-500">{option.description}</p>
                        </div>
                        <Truck className="h-5 w-5 text-gray-400" />
                      </div>
                    ))}
                  </RadioGroup>

                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      All shipments are insured and tracked. You'll receive tracking information via email.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-between pt-6">
                    <Button 
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                    >
                      Back to Information
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(3)}
                      className="bg-black hover:bg-gray-800"
                    >
                      Continue to Payment
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      <TabsTrigger value="apple">Apple Pay</TabsTrigger>
                    </TabsList>

                    <TabsContent value="card" className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={paymentInfo.cvv}
                            onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="nameOnCard">Name on Card *</Label>
                        <Input
                          id="nameOnCard"
                          placeholder="John Doe"
                          value={paymentInfo.nameOnCard}
                          onChange={(e) => handleInputChange('payment', 'nameOnCard', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="paypal" className="space-y-4">
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CreditCard className="h-8 w-8 text-blue-600" />
                        </div>
                        <p className="text-gray-600 mb-4">You'll be redirected to PayPal to complete your payment</p>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          Continue with PayPal
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="apple" className="space-y-4">
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CreditCard className="h-8 w-8 text-gray-600" />
                        </div>
                        <p className="text-gray-600 mb-4">Use Touch ID or Face ID to pay with Apple Pay</p>
                        <Button className="bg-black hover:bg-gray-800">
                          Pay with Apple Pay
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Billing Address */}
                  <div className="pt-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox 
                        id="sameAsShipping" 
                        checked={billingInfo.sameAsShipping}
                        onCheckedChange={(checked) => setBillingInfo((prev:any) => ({ ...prev, sameAsShipping: checked }))}
                      />
                      <Label htmlFor="sameAsShipping">Billing address same as shipping</Label>
                    </div>

                    {!billingInfo.sameAsShipping && (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium">Billing Address</h4>
                        {/* Billing form fields - similar to shipping */}
                        <div className="grid grid-cols-2 gap-4">
                          <Input placeholder="First Name" />
                          <Input placeholder="Last Name" />
                        </div>
                        <Input placeholder="Address" />
                        <div className="grid grid-cols-3 gap-4">
                          <Input placeholder="City" />
                          <Input placeholder="State" />
                          <Input placeholder="ZIP" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 pt-4">
                    <Checkbox 
                      id="saveInfo" 
                      checked={saveInfo}
                      onCheckedChange={setSaveInfo}
                    />
                    <Label htmlFor="saveInfo" className="text-sm">
                      Save payment information for future purchases
                    </Label>
                  </div>

                  <Alert>
                    <Lock className="h-4 w-4" />
                    <AlertDescription>
                      Your payment information is encrypted and secure. We never store your full card details.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-between pt-6">
                    <Button 
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                    >
                      Back to Shipping
                    </Button>
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => console.log('Complete Order')}
                    >
                      Complete Order - ${total.toFixed(2)}
                      <Lock className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
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

                {/* Promo Code */}
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

                {/* Order Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(calculateTotal().toString())}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>{tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
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

                {/* Security Badges */}
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>SSL encrypted checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span>Free returns within 30 days</span>
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