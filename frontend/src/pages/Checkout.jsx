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
      const response = await axios.get('https://tome2.onrender.com/api/v1/cart/cart-items', {
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
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Please log in to place an order.");
      return;
    }
  
    try {
      const products = cartItems.map(item => ({
        productId: item.productId._id,  // Ensure this matches your schema
        quantity: item.quantity,
        price: item.productId.price // Include price for each product
      }));
  
      const orderData = {
        email: address.email,
        products: products,
        amount: total,
        address: {
          userId: 'your-user-id', // Replace with actual user ID
          email: address.email,
          name: `${address.firstName} ${address.lastName}`,
          phoneNo: address.phone,
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          city: address.city,
          state: 'State', // Replace with actual state value
          country: 'Country', // Replace with actual country value
          postalCode: address.zip,
        },
        paymentMethod: paymentMethod,
      };
  
      const response = await axios.post('http://localhost:4000/api/v1/order/checkout', orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      alert('Order placed successfully');
    } catch (error) {
      console.error('Error placing order:', error.response?.data || error.message);
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
            <div className="sm:col-span-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstName"
                value={address.firstName}
                onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={address.lastName}
                onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={address.email}
                onChange={(e) => setAddress({ ...address, email: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                id="phone"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
              <input
                type="text"
                id="addressLine1"
                value={address.addressLine1}
                onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">Address Line 2</label>
              <input
                type="text"
                id="addressLine2"
                value={address.addressLine2}
                onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
              <input
                type="text"
                id="zip"
                value={address.zip}
                onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
                  <tr key={item.productId._id}>
                    <td className="py-2">{item.productId.name}</td>
                    <td className="py-2">${item.productId.price.toFixed(2)}</td>
                    <td className="py-2">{item.quantity}</td>
                    <td className="py-2">${(item.productId.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <div className="flex justify-between py-2">
                <span className="text-sm font-medium text-gray-700">Subtotal:</span>
                <span className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm font-medium text-gray-700">VAT (10%):</span>
                <span className="text-sm font-medium text-gray-900">${VAT.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm font-medium text-gray-700">Discount:</span>
                <span className="text-sm font-medium text-gray-900">-${discount.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between py-2">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
