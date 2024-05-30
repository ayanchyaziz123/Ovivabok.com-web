'use client'
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../config/FirebaseConfig';
import Loader from '@/app/components/Loader';

const JobDetailsPage = () => {
  const [job, setJob] = useState(null);
  const { id } = useParams(); // Use useParams to get the job ID

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        if (id) {
          const jobDocRef = doc(db, 'job', id); // Reference to the job document in Firestore
          const jobDocSnap = await getDoc(jobDocRef); // Fetch the job document
          if (jobDocSnap.exists()) {
            setJob(jobDocSnap.data()); // Set the job data to the state
          } else {
            console.error('Job not found');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobDetails(); // Fetch job details when the component mounts
  }, [id]); // Re-fetch job details when the job ID changes

  if (!job) {
    return (
      <div className="container mx-auto flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto flex-grow">
          <div className="p-4">
            <Loader/>
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
