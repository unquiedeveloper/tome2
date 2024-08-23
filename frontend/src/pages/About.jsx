import React from 'react';
import swiggy from "../assets/swi.jpeg"
function About() {
  return (
    <div className="bg-gradient-to-r from-white-100 to-[#da9858] min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            About Us
          </h1>
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
            <p className="mt-2">
              At <span className="font-bold">Taste of Middle East</span>{" "}
              we're proud to share the warmth and generosity of Arabic culture with 
              our community.
              Join us for a meal that's not just a taste of the Middle East but a journey 
              through its heart and soul.
            </p>
        </div>
        <div className="lg:w-1/2 flex flex-wrap justify-center lg:justify-end items-center gap-8">
          <div className="flex flex-col justify-center items-center gap-8 -mt-20">
            <img 
              src="https://res.cloudinary.com/di0egnojl/image/upload/v1723787799/tasteofmiddleeast/oerbxnpdtp8sveg8szwd.jpg" 
              alt="Image 1" 
              className="rounded-lg shadow-lg w-40 h-40 object-cover" 
            />
            <img 
              src="https://res.cloudinary.com/di0egnojl/image/upload/v1723787799/tasteofmiddleeast/udw008bz6c6xvup6ubja.jpg" 
              alt="Image 2" 
              className="rounded-lg shadow-lg w-40 h-50 object-cover" 
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-8 mt-20">
            <img 
              src="https://res.cloudinary.com/di0egnojl/image/upload/v1723787794/tasteofmiddleeast/pieauwo8vvv1nxo1dvsj.jpg" 
              alt="Image 3" 
              className="rounded-lg shadow-lg w-40 h-40 object-cover" 
            />
            <img 
              src="https://res.cloudinary.com/di0egnojl/image/upload/v1723787792/tasteofmiddleeast/u9hbzbthncrcwzomvkqy.jpg" 
              alt="Image 4" 
              className="rounded-lg shadow-lg w-40 h-40 object-cover" 
            />
          </div>
          <div className="flex flex-col justify-center items-center -mt-20 gap-8">
            <img 
              src="https://res.cloudinary.com/di0egnojl/image/upload/v1723787786/tasteofmiddleeast/tbscfikhjisl6v8ptvc0.jpg" 
              alt="Image 5" 
              className="rounded-lg shadow-lg w-40 h-40 object-cover" 
            />
            <img 
              src="https://res.cloudinary.com/di0egnojl/image/upload/v1723787785/tasteofmiddleeast/pohkuo9zbbsruwrbg507.jpg" 
              alt="Image 6" 
              className="rounded-lg shadow-lg w-40 h-40 object-cover" 
            />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-8 text-center mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Order Now
        </h2>
        <div className="flex justify-center items-center gap-8">
          <a href="https://www.zomato.com/ncr/taste-of-middle-east-indirapuram-ghaziabad" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Zomato_logo.png/1200px-Zomato_logo.png" 
              alt="Zomato" 
              className="w-40 h-40 object-contain" 
            />
          </a>
          <a href="https://www.swiggy.com/city/noida-1/taste-of-middle-east-vaibhav-khand-indirapuram-rest684084" target="_blank" rel="noopener noreferrer">
            <img 
              src={swiggy}
              alt="Swiggy" 
              className="w-40 h-40 object-contain" 
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
