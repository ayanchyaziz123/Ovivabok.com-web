'use client'
import React, { useState } from 'react';
import { MdHome, MdWork, MdEvent, MdFavorite } from 'react-icons/md';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import JobList from './components/JobList';
import Link from 'next/link';

// import HousingList from './components/HousingList'; // You would need to create this component
// import EventsList from './components/EventsList'; // You would need to create this component
import MatrimonyList from './components/MatrimonyList'; // You would need to create this component

const categories = [
  { name: 'Jobs', icon: <MdWork />, href:'/pages/jobs/post_job' },
  { name: 'Matrimony', icon: <MdFavorite />, href:'/pages/matrimony/post_matrimony' },
  { name: 'Housing', icon: <MdHome />, href:'/pages/Housing/housing' },
  { name: 'Events', icon: <MdEvent />, href:'/pages/Events/post_event' },
 
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Jobs');
  const [filterLocation, setFilterLocation] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [href, setHref] = useState('/pages/jobs/post_job')

  const handleFilterChange = (e) => {
    setFilterLocation(e.target.value);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    setHref(category.href);
  };

  const renderCategoryList = () => {
    switch (selectedCategory) {
      case 'Jobs':
        return <JobList filterLocation={filterLocation} />;
      // case 'Housing':
      //   return <HousingList filterLocation={filterLocation} />;
      // case 'Events':
      //   return <EventsList filterLocation={filterLocation} />;
      case 'Matrimony':
        return <MatrimonyList filterLocation={filterLocation} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <Navbar />
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
                  onClick={() => handleCategoryClick(category)}
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
            <Link href={href}>
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
          {renderCategoryList()}
        </main>
      </div>
      <Footer />
    </div>
  );
}
