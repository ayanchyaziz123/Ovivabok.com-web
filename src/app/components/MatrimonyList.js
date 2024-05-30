'use client'

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/FirebaseConfig'; // Adjust the path as necessary
import Loader from './Loader';

export default function MatrimonyList() {
  const [matrimonies, setMatrimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatrimonies = async () => {
      try {
        const matrimonyCollection = collection(db, "matrimony"); // Assuming the collection name is "matrimony"
        const matrimonySnapshot = await getDocs(matrimonyCollection);
        const matrimonyList = matrimonySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMatrimonies(matrimonyList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatrimonies();
  }, []);

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <ul>
        {matrimonies.map((matrimony) => (
          <li key={matrimony.id} className="mb-4 p-4 border border-gray-700 rounded bg-gray-700 text-white">
            <h3 className="text-xl font-bold">{matrimony.title}</h3>
            <p>{matrimony.description}</p>
            <p><strong>Location:</strong> {matrimony.partnerLocation}</p>
            <p><strong>Partner Name:</strong> {matrimony.partnerName}</p>
            <p><strong>Partner Age:</strong> {matrimony.partnerAge}</p>
            <p><strong>Partner Occupation:</strong> {matrimony.partnerOccupation}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
