import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Handle text inputs
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object if you need to handle files in future
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);

    try {
      const response = await axios.post(`https://tome2.onrender.com/api/v1/user/register`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative text-center flex justify-center items-center lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Register Image"
            src="https://res.cloudinary.com/di0egnojl/image/upload/v1723787786/tasteofmiddleeast/dcce9dd1jgje9vakus69.jpg"
            className="absolute inset-0 h-full p-20 w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Create Your Account
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Register a new account to get started.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name<sup className="text-red-500 text-sm">*</sup>
                </label>
                <input
                  type="text"
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Enter Full Name'
                  className="mt-1 py-2 pl-2
                  w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address<sup className="text-red-500 text-sm">*</sup>
                </label>
                <input
                  type="email"
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Enter Email Address'
                  className="mt-1 py-2 pl-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password<sup className="text-red-500 text-sm">*</sup>
                </label>
                <input
                  type="password"
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='Enter Password'
                  className="mt-1 py-2 pl-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <button
                  type="submit"
                  className="inline-block w-full rounded-md border border-[#da9858] bg-[#da9858] px-12 py-3 text-sm font-medium text-white transition hover:bg-[#da9858] hover:text-white focus:outline-none focus:ring active:text-white"
                >
                  Register
                </button>
              </div>

              <div className="col-span-6 text-center">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <a href="/login" className="text-gray-700 underline">
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Register;
