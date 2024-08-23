import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Menu() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch all products from the API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/product/getall');
        const fetchedProducts = response.data.products;

        // Standardize category names (e.g., for "Kebabs")
        const standardizedProducts = fetchedProducts.map(product => {
          if (product.category.toLowerCase().includes('kebab')) {
            product.category = 'Kebabs';
          }
          return product;
        });

        setProducts(standardizedProducts);
        setFilteredProducts(standardizedProducts);

        // Extract unique categories from products
        const uniqueCategories = [...new Set(standardizedProducts.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected category and price range
  useEffect(() => {
    const filtered = products.filter(product => {
      const withinCategory = selectedCategory ? product.category === selectedCategory : true;
      const withinPriceRange = product.price >= priceRange.min && product.price <= priceRange.max;
      return withinCategory && withinPriceRange;
    });
    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, products]);

  // Function to handle adding a product to the cart
  const addToCart = async (product) => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage

    if (!token) {
      alert("Please log in to add items to the cart.");
      navigate("/login"); // Redirect to the login page
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/cart/add-to-cart', {
        productId: product._id,
        quantity: 1,
      }, {
        headers: {
          Authorization: `Bearer ${token}`  // Send the token in the Authorization header
        }
      });

      if (response.status === 200) {
        alert('Added to cart successfully!');
      } else {
        console.error('Failed to add to cart:', response.data.message);
        alert('Failed to add to cart.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart.');
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Menu</h2>
          <p className="mt-4 max-w-md text-gray-500">
            Explore our menu. Filter by category or price to find your favorite dish!
          </p>
        </header>

        <div className="mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
          <div className="hidden lg:block p-4 border border-gray-300 rounded-lg">
            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-700 mb-2">Category</label>
              <select
                className="w-full rounded border-gray-300 text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <label className="block text-xs font-medium text-gray-700 mb-2">Price Range</label>
              <div className="flex justify-between gap-4">
                <input
                  type="number"
                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  placeholder="From"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                />
                <input
                  type="number"
                  className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                  placeholder="To"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <li key={product._id} className="bg-white shadow rounded-lg overflow-hidden">
                  <a href="#" className="block overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-[200px] w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="p-4">
                      <h3 className="text-sm text-gray-700 font-semibold group-hover:underline">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        {product.description}
                      </p>
                      <p className="mt-2 text-lg font-bold text-gray-900">
                        ₹{product.price}
                      </p>
                      <button
                        className="mt-4 w-full rounded bg-[#da9858] px-6 py-2 text-sm font-medium text-white hover:bg-[#e89571]"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;
