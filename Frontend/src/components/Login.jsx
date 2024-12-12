import React from 'react';
import { useAuth } from './AuthContext';
function Login() {
const {login,loginHandler} = useAuth();
console.log(loginHandler);

  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
      <div className="sm:w-[300px] sm:h-[350px] lg:w-[400px] lg:h-[400px] bg-white shadow-md rounded-lg p-6">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button 
          onClick={loginHandler}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
