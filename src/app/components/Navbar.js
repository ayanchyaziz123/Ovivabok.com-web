import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; // Import Firebase authentication modules
import { firebaseClient } from '../../config/FirebaseConfig'; // Import Firebase configuration

export default function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(firebaseClient); // Get the auth instance

    // Set up an authentication state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user); // Set the current user when authentication state changes
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  const logout = async () => {
    try {
      const auth = getAuth(firebaseClient); // Get the auth instance
      await signOut(auth); // Sign out the user
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">
        <Link href="/">
          Ovivabok.com
        </Link>
      </h1>
      {currentUser ? (
        <div className="flex items-center">
          <p className="text-white mr-4">{currentUser.email}</p>
          <button onClick={logout} className="text-white">Logout</button>
        </div>
      ) : (
        <Link href="/pages/auth/login" className="text-white">
          Login
        </Link>
      )}
    </header>
  );
}
