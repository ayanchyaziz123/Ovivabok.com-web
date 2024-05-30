// src/pages/login.js
'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword
import firebase from '../../../../config/FirebaseConfig'; // Make sure this is the correct path to your firebase.js file

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for handling errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(firebase);
      await signInWithEmailAndPassword(auth, email, password); // Sign in with email and password
      // Redirect to home page or dashboard after successful login
      // For now, let's just log a success message
      console.log('Logged in successfully!');
    } catch (error) {
      // Handle login errors
      console.error('Login error:', error);
      setError(error.message); // Set error state to display error message to user
    }
  };

  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-300" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-300" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200 mb-4"
            >
              Login
            </button>
            <Link href="create_account" className="block text-center text-blue-500 hover:underline">
              Don't have an account? Sign up
            </Link>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message if there's an error */}
        </div>
      </div>
    </div>
  );
}
