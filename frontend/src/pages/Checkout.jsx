import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    zip: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [subtotal, setSubtotal] = useState(0);
  const [VAT, setVAT] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCartItems();
    fetchAddressData();
  }, []);

  const fetchCartItems = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to view your cart.");
      return;
    }

    try {
      const response = await axios.get('http://localhost:4000/api/v1/cart/cart-items', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const items = response.data;

      // Calculate totals
      const subtotal = items.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);
      const VAT = subtotal * 0.1;
      const discount = 50; // Set or fetch discount as needed
      const total = subtotal + VAT - discount;

      setCartItems(items);
      setSubtotal(subtotal);
      setVAT(VAT);
      setDiscount(discount);
      setTotal(total);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const fetchAddressData = async () => {
    try {
      const userId = 'your-user-id'; // Replace with actual user ID
      const response = await axios.get(`/api/address/${userId}`);
      const userAddress = response.data[0]; // Assuming the first address
      setAddress({
        firstName: userAddress.name.split(' ')[0],
        lastName: userAddress.name.split(' ')[1],
        email: userAddress.email,
        phone: userAddress.phoneNo,
        addressLine1: userAddress.addressLine1,
        addressLine2: userAddress.addressLine2,
        city: userAddress.city,
        zip: userAddress.postalCode,
      });
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const userId = 'your-user-id'; // Replace with actual user ID
      const orderData = {
        userId,
        email: address.email,
        name: `${address.firstName} ${address.lastName}`,
        phoneNo: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        postalCode: address.zip,
        paymentMethod,
        cartItems,
        subtotal,
        VAT,
        discount,
        total,
      };

      await axios.post('http://localhost:4000/api/v1/order/checkout', orderData);
      alert('Order placed successfully');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Details Form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Billing Details</h2>
          <form className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Form Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={address.firstName}
                onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                required
                className="mt-1 px-2 py-3 pl-2 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                value={address.lastName}
                onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                required
                className="mt-1 px-2 py-3 pl-2 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={address.email}
                onChange={(e) => setAddress({ ...address, email: e.target.value })}
                required
                className="mt-1 px-2 py-3 pl-2 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={address.addressLine1}
                onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                required
                className="mt-1 px-2 py-3 pl-2 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
              <input
                type="text"
                value={address.addressLine2}
                onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                className="mt-1 px-2 py-3 pl-2 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City/Town</label>
              <input
                type="text"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                required
                className="mt-1 px-2 py-3 pl-2 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ZIP</label>
              <input
                type="text"
                value={address.zip}
                onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                required
                className="mt-1 px-2 py-3 pl-2 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                required
                className="mt-1 px-2 py-3 pl-2 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </form>
        </div>

        {/* Order Summary and Payment Options */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
            <table className="w-full mt-4 border-separate border-spacing-4">
              <thead>
                <tr className="text-left text-sm font-medium text-gray-700">
                  <th className="py-2">Item</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">Quantity</th>
                  <th className="py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="text-sm text-gray-700">
                    <td className="py-2 flex items-center space-x-4">
                      <img
                        src={item.productId.image || 'placeholder.jpg'}
                        alt={item.productId.name}
                        className="h-16 w-16 rounded object-cover"
                      />
                      <span>{item.productId.name}</span>
                    </td>
                    <td className="py-2">₹{item.productId.price.toFixed(2)}</td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">₹{(item.productId.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <div className="flex justify-between text-sm font-medium text-gray-800">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-800">
                <span>VAT (10%)</span>
                <span>₹{VAT.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-800">
                <span>Discount</span>
                <span>₹{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 mt-4">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800">Payment Method</h2>
            <div className="mt-4 flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Cash on Delivery
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                Credit/Debit Card
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                PayPal
              </label>
            </div>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="mt-8 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
