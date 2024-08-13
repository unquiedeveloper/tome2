import React, { useState, useEffect } from "react"; // Import useState and useEffect
import axios from "axios";
import v1 from "../assets/2.jpg";
import video from "../assets/videomain.mp4";
import he1 from "../assets/he1.webp";
import he2 from "../assets/he2.webp"

function Home() {
  const [products, setProducts] = useState([]);
  const [categorizedProducts, setCategorizedProducts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Fetch all products when the component mounts
    axios
      .get("http://localhost:4000/api/v1/product/getall") // Adjust the URL to your actual endpoint
      .then((response) => {
        const fetchedProducts = response.data.products;

        // Categorize products
        const categorized = fetchedProducts.reduce((acc, product) => {
          const { category } = product;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {});

        setProducts(fetchedProducts);
        setCategorizedProducts(categorized);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const getProductsForCategory = () => {
    if (selectedCategory === "All") {
      return products;
    }
    return categorizedProducts[selectedCategory] || [];
  };
  return (
    <>
      {/* video */}
      <div className="relative h-screen w-full overflow-hidden">
        <video
          src={video}
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        {/* Main Content */}
        <div className="flex h-screen p-8">
          {/* Left Side */}
          <div
            className="w-1/2 p-4 relative"
            style={{ height: "calc(100vh - 2rem)" }}
          >
            <div className="relative w-full h-full">
              <img
                src="https://img.freepik.com/free-photo/arabic-street-food-shaurma-lavash_114579-3059.jpg?size=626&ext=jpg&ga=GA1.1.1654925732.1722419942&semt=ais_hybrid"
                alt="Food"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="absolute bottom-4 left-4">
                <span
                  className="bg-white text-black text-sm font-bold p-2 px-4 border-2 border-black border-dashed"
                  style={{ transform: "rotate(12deg)" }}
                >
                  Shawarma Rolls
                </span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div
            className="w-1/2 p-4 flex flex-col space-y-4"
            style={{ height: "calc(100vh - 2rem)" }}
          >
            <div className="relative w-full h-1/2 flex gap-2">
              <div className="relative w-full h-full">
                <img
                  src= {he2}
                  alt="Skewers"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute bottom-4 left-4">
                  <span
                    className="bg-white text-black text-sm font-bold p-2 px-4 border-2 border-black border-dashed"
                    style={{ transform: "rotate(2deg)" }}
                  >
                    Platters
                  </span>
                </div>
              </div>
              <div className="flex w-[50%] justify-center">
                <div className="text-center">
                  <h1 className="font-bold text-3xl mt-6 ml-3">
                    Taste of Middle East
                  </h1>
                  <p className="text-lg mt-2">
                    Exquisite dishes and impeccable service
                  </p>
                  <div className="text-center mt-4">
                  <a href="/menu">
                  <button className="bg-[#da9858] px-6 py-4 rounded-full text-white">
                      View Menu
                    </button>

                  </a>

                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full h-1/2">
              <img
                src= {he1}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="absolute bottom-4 left-4">
                <span
                  className="bg-white text-black text-sm font-bold p-2 px-4 border-2 border-black border-dashed"
                  style={{ transform: "rotate(100deg)" }}
                >
                  Chicken Mandi
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="p-4 flex gap-2 mt-40">
        <div className="w-[50%] flex pl-12">
          <div className="mt-8">
            <h1 className="text-6xl font-semibold ml-2">About</h1>
            <p className="mt-12">
              Welcome to <span className="font-bold">Taste of Middle East</span>{" "}
              where the rich flavors and warm hospitality of the Arab world come
              alive in every bite and every detail. Our restaurant is dedicated
              to serving authentic Arabic cuisine in an atmosphere that
              transports you to the vibrant souks and majestic architecture of
              the Middle East.
            </p>
            <p className="mt-2">
              Our chefs are passionate about crafting dishes that are true to
              their Arabic heritage. From tender shawarma and flavorful falafel
              to rich machboos and fragrant kebabs, every bite is a taste of
              tradition and authenticity.
            </p>
            <button className="border-2 border-black px-4 py-2 rounded-full mt-8">
              Learn More
            </button>
          </div>
        </div>
        <div className="w-[50%] flex gap-5">
          <div className="w-[50%] -mt-12">
            <img
              src="https://images.pexels.com/photos/5718129/pexels-photo-5718129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="About Image 1"
            />
          </div>
          <div className="w-[50%]">
            <img src={v1} alt="About Image 2" />
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="mt-40 px-10 pb-10 border-b-2 border-dashed border-gray-500">
  <h1 className="text-6xl font-semibold mb-8">Menu</h1>
  <div className="text-xl mb-12">
    {Object.keys(categorizedProducts).map((category, index, array) => (
      <span
        key={category}
        className={`cursor-pointer mx-4 ${selectedCategory === category ? "text-yellow-600" : ""}`}
        onClick={() => handleCategoryClick(category)}
      >
        {category}
        {index < array.length - 1 && " / "}
      </span>
    ))}
    <span
      className={`cursor-pointer mx-4 ${selectedCategory === "All" ? "text-yellow-600" : ""}`}
      onClick={() => handleCategoryClick("All")}
    >
      All
    </span>
  </div>
  <div className="grid grid-cols-2 gap-8">
    <div className="col-span-1">
      <img
        src="https://images.pexels.com/photos/6546034/pexels-photo-6546034.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="Dish"
        className="w-full h-[70%] object-cover"
      />
    </div>
    <div className="col-span-1">
      {getProductsForCategory().slice(0, 3).map((product) => (
        <div
          key={product._id}
          className="mb-4 border-dashed border-b-2 border-black pb-4"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-lg mt-1">{product.description}</p>
            </div>
            <div>
              <p className="text-xl">₹{product.price}</p>
            </div>
          </div>

        </div>
        
      ))}
      <div className="text-right"> 
          <a href="/menu" className="hover:text-yellow-600 ">see more</a>
          
          </div>
    </div>
  </div>
</div>

      {/* Special Dishes Section */}
      {/* <section>
        <div className="mx-auto max-w-screen-xl px-4 py-2 -mt-32 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Speical Dishes{" "}
            </h2>

            <p className="mt-4 max-w-md text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
              praesentium cumque iure dicta incidunt est ipsam, officia dolor
              fugit natus?
            </p>
          </header>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <a href="#" className="group relative block overflow-hidden">
              <img
                src={v1}
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />

              <div className="relative border border-gray-100 bg-white p-6">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Robot Toy
                </h3>

                <p className="mt-1.5 text-sm text-gray-700">$14.99</p>

                <form className="mt-4">
                  <button className="block w-full rounded bg-[#da9858] text-white  p-4 text-sm font-medium transition hover:scale-105">
                    Add to Cart
                  </button>
                </form>
              </div>
            </a>

            <li>
              <a href="#" className="group relative block overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
                  alt=""
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                />

                <div className="relative border border-gray-100 bg-white p-6">
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Robot Toy
                  </h3>

                  <p className="mt-1.5 text-sm text-gray-700">$14.99</p>

                  <form className="mt-4">
                    <button className="block w-full rounded bg-[#da9858] text-white p-4 text-sm font-medium transition hover:scale-105">
                      Add to Cart
                    </button>
                  </form>
                </div>
              </a>
            </li>

            <li>
              <a href="#" className="group relative block overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
                  alt=""
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                />

                <div className="relative border border-gray-100 bg-white p-6">
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Robot Toy
                  </h3>

                  <p className="mt-1.5 text-sm text-gray-700">$14.99</p>

                  <form className="mt-4">
                    <button className="block w-full rounded bg-[#da9858] text-white p-4 text-sm font-medium transition hover:scale-105">
                      Add to Cart
                    </button>
                  </form>
                </div>
              </a>
            </li>

            <li>
              <a href="#" className="group relative block overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
                  alt=""
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                />

                <div className="relative border border-gray-100 bg-white p-6">
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    Robot Toy
                  </h3>

                  <p className="mt-1.5 text-sm text-gray-700">$14.99</p>

                  <form className="mt-4">
                    <button className="block w-full rounded bg-[#da9858] text-white p-4 text-sm font-medium transition hover:scale-105">
                      Add to Cart
                    </button>
                  </form>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section> */}
    </>
  );
}

export default Home;
