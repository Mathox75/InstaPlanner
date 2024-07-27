'use client';

import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <p className="bg-pink-200 text-red-600 p-2">You are not logged in.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Profile</h1>
      <p>Email: {user}</p>
      {/* Ajoutez plus de détails du profil ici */}
    </div>
  );
}
