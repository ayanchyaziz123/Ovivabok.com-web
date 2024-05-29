'use client'
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">
        <Link href="/">
          Ovivabok.com
        </Link>
      </h1>
      <div>
        <Link href="/pages/login">
          Login
        </Link>
      </div>
    </header>
  );
}
