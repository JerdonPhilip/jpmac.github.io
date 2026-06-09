'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const PixiMap = dynamic(() => import('../src/components/PixiMap'), { ssr: false });
const AccessibilityOverlay = dynamic(() => import('../src/components/AccessibilityOverlay'), { ssr: false });

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);

  const handleProjectClick = (project: any) => {
    setCurrentProject(project);
    setShowModal(true);
  };

  return (
    <main className="w-full h-screen overflow-hidden bg-[#4a3520]">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 z-50 w-full h-16 bg-[#2a1f14] border-b-4 border-[#8b6b4a] flex items-center justify-between px-6">
        <div className="text-white font-bold text-xl font-pixel">JPMAC.DEV</div>
        <div className="flex gap-6 text-white font-pixel">
          <button className="hover:text-[#f0c060] transition-colors">Home</button>
          <button className="hover:text-[#f0c060] transition-colors">Worlds</button>
          <button className="hover:text-[#f0c060] transition-colors">About</button>
          <button className="hover:text-[#f0c060] transition-colors">Contact</button>
        </div>
      </nav>

      {/* TEMPORARY TAILWIND TEST - REMOVE AFTER CONFIRMING */}
      <div className="fixed top-1/2 left-1/2 z-[999] bg-red-500 text-white p-4 rounded-lg shadow-2xl text-3xl font-bold border-4 border-yellow-400">
        ✅ TAILWIND IS WORKING
      </div>

      {/* Map with click handler */}
      <div className="absolute inset-0 z-10">
        <PixiMap onProjectClick={handleProjectClick} />
      </div>

      {/* Accessibility Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <AccessibilityOverlay />
      </div>

      {/* Bottom Sheet Modal - now using a smaller height with Tailwind classes */}
<div 
  className={`fixed bottom-0 left-0 w-full z-[100] bg-[#2a1f14] border-t-4 border-[#8b6b4a] transition-all duration-300 shadow-2xl ${
    showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
  }`}
  style={{ height: '150px' }}
>
  <div className="p-4 h-full flex flex-col justify-between">
    <div>
      <h2 className="text-lg font-bold font-pixel mb-1 text-white">
        {currentProject?.name || 'Current Project'}
      </h2>
      <p className="text-sm font-pixel text-gray-300">
        {currentProject?.description || 'Project details will go here.'}
      </p>
    </div>
    <div className="flex gap-3">
      <button 
        onClick={() => setShowModal(false)}
        className="px-4 py-1 bg-[#f0c060] text-[#2a1f14] font-bold font-pixel text-sm rounded hover:bg-[#e0b050] transition-colors"
      >
        Close
      </button>
      <button className="px-4 py-1 bg-[#4a6b8a] text-white font-bold font-pixel text-sm rounded hover:bg-[#5a7b9a] transition-colors">
        View Project
      </button>
    </div>
  </div>
</div>
    </main>
  );
}