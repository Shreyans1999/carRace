// src/pages/index.js
import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Game from '../components/Game/Game'; // Import the Game component

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Header />
      <main className="flex-grow p-0 relative">
        {/* Integrate the Game component */}
        <Game />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
