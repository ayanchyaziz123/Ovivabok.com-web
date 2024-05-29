// JobDetailsPage.js
'use client'
// JobDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const JobDetailsPage = () => {
  const [job, setJob] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
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
  }, [router.isReady]);

  if (!job) {
    return (

        <div className="container mx-auto flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto flex-grow">
          <div className="p-4">
            <h1 className="text-2xl font-bold">Need a bartender</h1>
            <p className="my-4">
              This job requires someone with experience in bartending. Responsibilities may include mixing and serving drinks,
              interacting with customers, maintaining cleanliness and organization behind the bar, and ensuring customer satisfaction.
              The ideal candidate should be friendly, reliable, and able to work efficiently in a fast-paced environment.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <p className="text-gray-600">Location: Manhattan</p>
              <p className="text-gray-600">Wage: $18</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-grow">
        <div className="p-4">
          <h1 className="text-2xl font-bold">{job.title}</h1>
          <p className="my-4">{job.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <p className="text-gray-600">Location: {job.location}</p>
            <p className="text-gray-600">Wage: {job.wage}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetailsPage;
