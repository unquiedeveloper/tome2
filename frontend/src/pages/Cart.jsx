import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please log in to view your cart.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/api/v1/cart/cart-items', {
          headers: {
            Authorization: `Bearer ${token}`  
          }
        });
        setCartItems(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
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
      setCartItems(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const increaseQuantity = async (itemId) => {
    try {
      await axios.patch(`http://localhost:4000/api/v1/cart/increase-quantity/${itemId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      await fetchCartItems();
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const decreaseQuantity = async (itemId) => {
    try {
      await axios.patch(`http://localhost:4000/api/v1/cart/decrease-quantity/${itemId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      await fetchCartItems();
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/cart/remove-from-cart/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      await fetchCartItems();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(cartItems)) {
    return <div>Unexpected data format.</div>;
  }

  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.productId?.price || 0;
    return acc + itemPrice * (item.quantity || 0);
  }, 0);

  const VAT = subtotal * 0.1;
  const discount = 50;
  const total = subtotal + VAT - discount;

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Your Cart</h1>
          </header>

          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Item</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <tr key={item._id} className="text-sm text-gray-500">
                    <td className="px-6 py-4">
                      <img
                        src={item.productId?.image || '/path/to/fallback-image.jpg'}
                        alt={item.productId?.name || 'Product Image'}
                        className="w-20 h-20 object-cover"
                        onError={(e) => e.target.src = '/path/to/fallback-image.jpg'}
                      />
                    </td>
                    <td className="px-6 py-4">{item.productId?.name || 'Unknown Item'}</td>
                    <td className="px-6 py-4">{item.productId?.price || 'N/A'}</td>
                    <td className="px-6 py-4 flex items-center">
                      <button onClick={() => decreaseQuantity(item._id)}>-</button>
                      <span className="mx-2">{item.quantity || 0}</span>
                      <button onClick={() => increaseQuantity(item._id)}>+</button>
                    </td>
                    <td className="px-6 py-4">
                      {(item.productId?.price || 0) * (item.quantity || 0)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <div className="flex justify-between">
              <span className="font-bold">Subtotal:</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">VAT (10%):</span>
              <span>{VAT.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Discount:</span>
              <span>{discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{total.toFixed(2)}</span>
            </div>
            <div className="mt-4 text-end">
            <a href='/checkout'>
            <button className="bg-[#da9858] mt-2 px-6 text-white py-2">
                Proceed For Payment
              </button>

            </a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
