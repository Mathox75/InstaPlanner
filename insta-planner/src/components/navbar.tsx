'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-white text-lg">Home</a>
        </Link>
        <div>
          {user ? (
            <>
              <Link href="/profile" legacyBehavior>
                <a className="text-white mx-2">Profile</a>
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" legacyBehavior>
                <a className="text-white mx-2">Login</a>
              </Link>
              <Link href="/register" legacyBehavior>
                <a className="text-white mx-2">Register</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
