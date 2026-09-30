import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventDetails } from './components/EventDetails';
import { Directions } from './components/Directions';
import { Atmosphere } from './components/Atmosphere';
import { CinematicBreak } from './components/CinematicBreak';
import { Gallery } from './components/Gallery';
import { RsvpForm } from './components/RsvpForm';
import { Footer } from './components/Footer';
import { AudioPlayer } from './components/AudioPlayer';

export const App: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-[#1E1C1A] flex flex-col items-center selection:bg-[#C5A059]/25 selection:text-[#254436]">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="w-full flex flex-col items-center">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. When & Where Details */}
        <EventDetails />

        {/* 3. Directions & On-site Parking */}
        <Directions />

        {/* 4. Atmosphere & Family Gathering */}
        <Atmosphere />

        {/* 5. Full-width Cinematic Break */}
        <CinematicBreak />

        {/* 6. Cinematic Memories Gallery */}
        <Gallery />

        {/* 7. RSVP Confirmation Form */}
        <RsvpForm />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Ambient Audio Player */}
      <AudioPlayer />
    </div>
  );
};

export default App;
