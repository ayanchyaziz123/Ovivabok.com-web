'use client'
import React, { useState } from 'react';
import { MdHome, MdWork, MdEvent, MdFavorite } from 'react-icons/md';
import Link from 'next/link';

const categories = [
  { name: 'Jobs', icon: <MdWork /> },
  { name: 'Housing', icon: <MdHome /> },
  { name: 'Events', icon: <MdEvent /> },
  { name: 'Matrimony', icon: <MdFavorite /> },
];

const posts = {
  Jobs: [
    { title: 'Software Engineer', description: 'Looking for a software engineer', location: 'New York', wage: '$120,000/year' },
    { title: 'Server', description: 'Need a server for a restaurant', location: 'Manhattan', wage: '$15.50/hour' },
    { title: 'Graphic Designer', description: 'Creative graphic designer needed', location: 'Los Angeles', wage: '$50,000/year' },
    { title: 'Project Manager', description: 'Experienced project manager', location: 'Chicago', wage: '$85,000/year' },
    { title: 'Data Scientist', description: 'Data scientist with Python skills', location: 'San Francisco', wage: '$130,000/year' },
    { title: 'Marketing Specialist', description: 'Marketing specialist for online campaigns', location: 'Miami', wage: '$60,000/year' },
  ],
  Housing: [
    { title: 'Apartment for Rent', description: '2-bedroom apartment in downtown', location: 'San Francisco', wage: '$3,000/month' },
    { title: 'House for Sale', description: '4-bedroom house with garden', location: 'Los Angeles', wage: '$900,000' },
    { title: 'Studio Apartment', description: 'Cozy studio apartment', location: 'New York', wage: '$2,500/month' },
    { title: 'Condo for Sale', description: '3-bedroom condo with amenities', location: 'Miami', wage: '$650,000' },
    { title: 'Townhouse for Rent', description: 'Spacious townhouse', location: 'Boston', wage: '$4,000/month' },
    { title: 'Beach House', description: 'Beautiful beach house', location: 'San Diego', wage: '$5,000/month' },
  ],
  Events: [
    { title: 'Concert', description: 'Rock concert in the park', location: 'Chicago', wage: 'Free' },
    { title: 'Workshop', description: 'Photography workshop', location: 'Seattle', wage: '$50' },
    { title: 'Food Festival', description: 'Annual food festival', location: 'New York', wage: 'Free' },
    { title: 'Tech Conference', description: 'Leading tech conference', location: 'San Francisco', wage: '$300' },
    { title: 'Art Exhibition', description: 'Modern art exhibition', location: 'Los Angeles', wage: 'Free' },
    { title: 'Marathon', description: 'City marathon', location: 'Boston', wage: '$100' },
  ],
  Matrimony: [
    { title: 'Bride', description: 'Looking for a bride', location: 'San Francisco', wage: 'N/A' },
    { title: 'Groom', description: 'Looking for a groom', location: 'New York', wage: 'N/A' },
    { title: 'Matchmaking Event', description: 'Join our matchmaking event', location: 'Los Angeles', wage: 'Free' },
    { title: 'Online Matrimony Service', description: 'Sign up for online matrimony services', location: 'Chicago', wage: '$100' },
    { title: 'Marriage Counselor', description: 'Experienced marriage counselor', location: 'Miami', wage: '$70/hour' },
    { title: 'Wedding Planner', description: 'Professional wedding planner', location: 'Boston', wage: '$2000/event' },
  ],
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Jobs');
  const [filterLocation, setFilterLocation] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('USA');

  const handleFilterChange = (e) => {
    setFilterLocation(e.target.value);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const filteredPosts = posts[selectedCategory].filter((post) =>
    post.location.toLowerCase().includes(filterLocation.toLowerCase())
  );

  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Ovivabok.com</h1>
        <div>
          <Link href="/pages/login">
            Login
          </Link>
        </div>
      </header>
      <div className="bg-gray-200 p-4">
        <label className="block text-lg font-bold mb-2 text-gray-800">Country:</label>
        <select
          value={selectedCountry}
          onChange={handleCountryChange}
          className="p-2 border border-gray-300 rounded w-full lg:w-1/3 text-gray-800"
        >
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="UK">UK</option>
          <option value="Australia">Australia</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="India">India</option>
          {/* Add more countries as needed */}
        </select>
  
      </div>
      <div className="flex-1 lg:flex">
        <aside className="w-full lg:w-1/4 bg-gray-800 p-4">
          <ul className="flex lg:flex-col flex-wrap">
            {categories.map((category) => (
              <li key={category.name} className="w-1/2 lg:w-full mb-2">
                <button
                  className={`flex items-center p-2 w-full text-left text-white ${selectedCategory === category.name ? 'bg-gray-400' : ''}`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{selectedCategory}</h2>
            <Link href="/pages/job/post_job">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Post {selectedCategory}</button>
            </Link>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Filter by location"
              value={filterLocation}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded w-full lg:w-1/3 text-gray-800"
            />
          </div>
          <ul>
            {filteredPosts.map((post, index) => (
              <li key={index} className="mb-4 p-4 bg-white shadow rounded text-gray-800">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p>{post.description}</p>
                <p className="text-gray-600">{post.location}</p>
                <p className="text-gray-600">{post.wage}</p>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}
