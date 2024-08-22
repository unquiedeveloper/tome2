import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const userDetails = { email, password };

    try {
      const response = await fetch(`http://localhost:4000/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();
      if (response.ok) {
        const token = data.token;
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <section className="bg-white  ">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12 ">
        <aside className="relative text-center  flex justify-center  items-center  h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Login Image"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full p-20 w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Welcome Back!
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500">
              Please login to your account to continue.
            </p>

            <form className="mt-8 grid grid-cols-6 gap-6">
              <div className="col-span-6">
                <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 py-2 pl-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full py-2 pl-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div>

              <div className="col-span-6">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="inline-block py-2 pl-2 w-full rounded-md border border-[#da9858] bg-[#da9858] px-12  text-sm font-medium text-white transition hover:bg-[#dda66e] hover:text-white focus:outline-none focus:ring active:text-white"
                >
                  Login
                </button>
              </div>

              <div className="col-span-6 text-center">
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <a href="/register " className="text-gray-700 underline">
                    Sign up
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

export default Login;
