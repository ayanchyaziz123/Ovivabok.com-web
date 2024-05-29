// JobDetailsPage.js
'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const JobDetailsPage = () => {
  const [job, setJob] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) { // Check if router is ready
      // Fetch job details based on the ID
      const fetchJobDetails = async () => {
        try {
          const response = await fetch(`/api/jobs/${router.query.id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch job details');
          }
          const data = await response.json();
          setJob(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchJobDetails();
    }
  }, [router.isReady]); // Only fetch details when router is ready

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p>{job.description}</p>
        <p>Location: {job.location}</p>
        <p>Wage: {job.wage}</p>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetailsPage;
