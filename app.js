import React, { useState } from 'react';
import '@/App.css';
import { Hero } from '@/components/Hero';
import { Problem } from '@/components/Problem';
import { RiskScanner } from '@/components/RiskScanner';
import { HowItWorks } from '@/components/HowItWorks';
import { TokenUtility } from '@/components/TokenUtility';
import { Roadmap } from '@/components/Roadmap';
import { Trust } from '@/components/Trust';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const handleScanClick = () => {
    document.getElementById('risk-engine')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App min-h-screen bg-background text-foreground">
      <Hero onScanClick={handleScanClick} />
      <Problem />
      <RiskScanner />
      <HowItWorks />
      <TokenUtility />
      <Roadmap />
      <Trust />
      <Contact />
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
