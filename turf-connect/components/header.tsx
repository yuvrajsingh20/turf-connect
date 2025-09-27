import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className="bg-primary p-4">
      <h1 className="text-xl font-bold">
        <Link href="/">Turf Connect</Link>
      </h1>
      <nav className="mt-2">
        <ul className="flex space-x-4">
          <li>
            <Link href="/auth">Auth</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};