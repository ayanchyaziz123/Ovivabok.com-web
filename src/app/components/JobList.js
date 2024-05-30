'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../config/FirebaseConfig'; // Adjust the path as necessary
import Loader from './Loader';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobCollection = collection(db, "job");
        const jobSnapshot = await getDocs(jobCollection);
        const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(jobList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <ul className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => (
          <li key={job.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <Link href={`/pages/jobs/${job.id}`}>

                <h3 className="text-2xl font-semibold mb-2 text-blue-600">{job.title}</h3>
                <p className="text-gray-700 mb-4">{job.description}</p>
                <div className="flex justify-between items-center text-gray-600">
                  <span><strong>Location:</strong> {job.location}</span>
                  <span><strong>Wage:</strong> {job.wage}</span>
                </div>

            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
