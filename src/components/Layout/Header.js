// src/components/Layout/Header.js
import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Game Title</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">
              <a className="hover:text-gray-400">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/game">
              <a className="hover:text-gray-400">Game</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
