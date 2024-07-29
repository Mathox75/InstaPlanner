'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [message, setMessage] = useState('Bienvenue à InstaPlanner!');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <Head>
        <title>InstaPlanner</title>
        <meta name="description" content="InstaPlanner - Planifiez vos posts Instagram" />
      </Head>
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome to InstaPlanner!</h1>
        <p className="mt-3 text-2xl">{message}</p>
      </main>
    </div>
  );
}
