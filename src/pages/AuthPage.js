// src/AuthPage.js
import React from 'react';

const AuthPage = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <h1 className="text-3xl mt-10">Sign In</h1>
      <form className="flex flex-col mt-4 w-full max-w-md">
        <input type="email" placeholder="Email" className="border border-gray-300 rounded mb-2 px-2 py-1" required />
        <input type="password" placeholder="Password" className="border border-gray-300 rounded mb-2 px-2 py-1" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
      <p className="mt-4">Don't have an account? <a href="/signup" className="text-blue-600">Sign Up</a></p>
    </div>
  );
};

export default AuthPage;
