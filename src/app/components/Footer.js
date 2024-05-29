'use client'
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 text-white text-center">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Ovivabok.com. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link href="/about">
            About Us
          </Link>
          <Link href="/contact">
            Contact
          </Link>
          <Link href="/privacy">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
