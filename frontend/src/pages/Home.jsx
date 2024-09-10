import React, { useState, useEffect } from "react"; // Import useState and useEffect
import axios from "axios";
import v1 from "../assets/2.jpg";
import video from "../assets/headervideo.mp4";
import he1 from "../assets/he1.webp";
import he2 from "../assets/he2.webp";
import banner from "../assets/banner.jpg";
import Slider from "react-slick";
function Home() {
  const [products, setProducts] = useState([]);
  const [categorizedProducts, setCategorizedProducts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Fetch all products when the component mounts
    axios
      .get("https://tome2.onrender.com/api/v1/product/getall") // Adjust the URL to your actual endpoint
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      {/* Slider Section */}
      <Slider {...sliderSettings} className="h-300">
        {/* Video Slide */}
        <div className="relative h-[200px] lg:h-[500px]  w-full overflow-hidden ">
          <video
            src={video}
            autoPlay
            muted
            loop
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        {/* Banner Slide */}
        <div className="relative h-[200px] lg:h-[500px] w-full">
          <img
            src={banner}
            alt="Banner"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          {/* <div className="absolute inset-0 bg-black opacity-30"></div> */}
          <div className="absolute bottom-10 left-10 text-white">
            {/* <h1 className="text-4xl font-bold">Welcome to Our Restaurant</h1>
            <p className="text-lg mt-4">
              Experience the taste of authentic Middle Eastern cuisine.
            </p> */}
          </div>
        </div>
      </Slider>

      <div className="p-4 ">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row h-screen p-8 space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Left Side */}
          <div
            className="w-full lg:w-1/2 p-4 relative"
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
                  className="bg-[#da9858] text-white text-sm font-bold p-2 px-4 border-2 border-white border-dashed"
                  style={{ transform: "rotate(12deg)" }}
                >
                  Shawarma Rolls
                </span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div
            className="w-full lg:w-1/2 p-4 flex flex-col space-y-4"
            style={{ height: "calc(100vh - 2rem)" }}
          >
            <div className="relative w-full h-[50%] lg:flex lg:gap-2">
              <div className="relative w-full h-full">
                <img
                  src={he2}
                  alt="Skewers"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute bottom-4 left-4">
                  <span
                    className="bg-[#da9858] text-white text-sm font-bold p-2 px-4 border-2 border-white border-dashed"
                    style={{ transform: "rotate(2deg)" }}
                  >
                    Platters
                  </span>
                </div>
              </div>
              <div className="flex w-full lg:w-[50%] justify-center items-center">
                <div className="text-center">
                  <h1 className="font-bold text-2xl lg:text-3xl mt-6 ml-3">
                    Taste of Middle East
                  </h1>
                  <p className="text-base lg:text-lg mt-2">
                    Exquisite dishes and impeccable service
                  </p>
                  <div className="text-center mt-4">
                    <a href="/menu">
                      <button className="bg-[#da9858] px-6 py-3 lg:py-4 rounded-full text-white">
                        View Menu
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full h-[50%]">
              <img src={he1} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="absolute bottom-4 left-4">
                <span
                  className="bg-[#da9858] text-white text-sm font-bold p-2 px-4 border-2 border-white border-dashed"
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
      <div className="p-4 flex flex-col lg:flex-row gap-2 mt-64 lg:mt-40">
        {/* Left Side */}
        <div className="w-full lg:w-[50%] flex pl-4 lg:pl-12">
          <div className="mt-8">
            <h1 className="text-4xl lg:text-6xl font-semibold ml-2 mt-48 lg:mt-0">
              About
            </h1>
            <p className="mt-6 lg:mt-12">
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
            <a href="/about">
              <button className="border-2 bg-[#da9858] text-white border-[#da9858] px-4 py-2 rounded-full mt-6 lg:mt-8">
                Learn More
              </button>
            </a>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-[50%] flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[50%] pt-4">
            <img
              src="https://res.cloudinary.com/di0egnojl/image/upload/v1723787793/tasteofmiddleeast/h9s9ujqu6oxmi5hjgrtr.jpg"
              alt="About Image 1"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-full lg:w-[50%] pt-8 lg:pt-20">
            <img
              src="https://res.cloudinary.com/di0egnojl/image/upload/v1723787785/tasteofmiddleeast/pohkuo9zbbsruwrbg507.jpg"
              alt="About Image 2"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* // Menu Section */}
      <div className="mt-40 mb-40 px-6 border-gray-500">
        <h1 className="text-4xl font-semibold mb-6">Menu</h1>

        {/* Category Filter */}
        <div className="text-lg mb-8">
          {Object.keys(categorizedProducts).map((category, index, array) => (
            <span
              key={category}
              className={`cursor-pointer mx-3 ${
                selectedCategory === category ? "text-yellow-600" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
              {index < array.length - 1 && " / "}
            </span>
          ))}
          <span
            className={`cursor-pointer ${
              selectedCategory === "All" ? "text-yellow-600" : ""
            }`}
            onClick={() => handleCategoryClick("All")}
          >
            All
          </span>
        </div>

        {/* Products Display */}
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <img
              src="https://images.pexels.com/photos/6546034/pexels-photo-6546034.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Dish"
              className="w-full h-[40vh] object-cover"
            />
          </div>

          <div className="col-span-1">
            {getProductsForCategory()
              .reduce((acc, product) => {
                if (
                  !acc.some(
                    (p) =>
                      p.category === product.category && p._id === product._id
                  )
                ) {
                  acc.push(product);
                }
                return acc;
              }, [])
              .slice(0, 3)
              .map((product) => (
                <div
                  key={product._id}
                  className="mb-3 border-dashed border-b-2 border-black pb-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-base font-semibold">
                        {product.name}
                      </h2>
                      <p className="text-base mt-1">{product.description}</p>
                    </div>
                    <div>
                      <p className="text-lg">₹{product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            <div className="text-right">
              <a href="/menu" className="hover:text-yellow-600">
                see more
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
