'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-red-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div>
            <Link href="/" className="text-white">Home</Link>
          </div>
          <div>
            <Link href="/login" className="text-white mr-4">Login</Link>
            <Link href="/register" className="text-white">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}