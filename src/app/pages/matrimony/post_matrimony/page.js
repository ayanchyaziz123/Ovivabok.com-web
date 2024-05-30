'use client'
// src/pages/post-matrimony.js
import Navbar from '@/app/components/Navbar';
import React, { useState, useEffect } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; 
import { db, firebaseClient } from '../../../../config/FirebaseConfig';

export default function PostMatrimonyPage() {
  const router = useRouter();
  const [partnerName, setPartnerName] = useState('');
  const [partnerAge, setPartnerAge] = useState('');
  const [partnerLocation, setPartnerLocation] = useState('');
  const [partnerOccupation, setPartnerOccupation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth(firebaseClient);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/pages/auth/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const col = collection(db, "matrimony");
      await addDoc(col, {
        partnerName: partnerName,
        partnerAge: partnerAge,
        partnerLocation: partnerLocation,
        partnerOccupation: partnerOccupation,
        description: description
      });
      alert("Successfully added");
      setPartnerName('');
      setPartnerAge('');
      setPartnerLocation('');
      setPartnerOccupation('');
      setDescription('');
    } catch (error) {
      alert("Not successfully added");
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Post a Matrimony</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-300" htmlFor="partnerName">
                Partner Name
              </label>
              <input
                type="text"
                id="partnerName"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-300" htmlFor="partnerAge">
                Partner Age
              </label>
              <input
                type="number"
                id="partnerAge"
                value={partnerAge}
                onChange={(e) => setPartnerAge(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-300" htmlFor="partnerLocation">
                Partner Location
              </label>
              <input
                type="text"
                id="partnerLocation"
                value={partnerLocation}
                onChange={(e) => setPartnerLocation(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded bg-gray-700 text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-300" htmlFor="partnerOccupation">
                Partner Occupation
              </label>
              <input
                type="text"
                id="partnerOccupation"
                value={partnerOccupation}
                onChange={(e) => setPartnerOccupation(e.target.value)}
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
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post Matrimony'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
