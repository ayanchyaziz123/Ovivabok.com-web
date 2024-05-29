// src/pages/post-job.js
'use client'
import Navbar from '@/app/components/Navbar';
import React, { useState } from 'react';

export default function PostJobPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [wage, setWage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle job posting logic here
    console.log('Job Title:', title);
    console.log('Description:', description);
    console.log('Location:', location);
    console.log('Wage:', wage);
  };

  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Post a Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-300" htmlFor="title">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-300" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-300" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-300" htmlFor="wage">
              Wage
            </label>
            <input
              type="text"
              id="wage"
              value={wage}
              onChange={(e) => setWage(e.target.value)}
              className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
