'use client';

import Navbar from '../components/navbar';
import '../app/globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
