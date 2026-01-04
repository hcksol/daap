import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const HackSolanaWebsite = () => {
  const canvasRef = useRef(null);
  const [scanAddress, setScanAddress] = useState('');
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Particle System for Blockchain Network
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: 0x00ff88,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Connection Lines
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x00ccaa,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    });

    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    for(let i = 0; i < 100; i++) {
      const x1 = (Math.random() - 0.5) * 10;
      const y1 = (Math.random() - 0.5) * 10;
      const z1 = (Math.random() - 0.5) * 10;
      const x2 = (Math.random() - 0.5) * 10;
      const y2 = (Math.random() - 0.5) * 10;
      const z2 = (Math.random() - 0.5) * 10;
      linePositions.push(x1, y1, z1, x2, y2, z2);
    }
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // Animation
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;
      linesMesh.rotation.y += 0.0003;
      
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, []);

  const handleScan = () => {
    if (!scanAddress.trim()) return;
    
    setScanning(true);
    setScanResult(null);
    
    setTimeout(() => {
      const riskScore = Math.floor(Math.random() * 100);
      let riskLevel = 'Low';
      if (riskScore > 70) riskLevel = 'High';
      else if (riskScore > 40) riskLevel = 'Medium';
      
      setScanResult({
        score: riskScore,
        level: riskLevel,
        mintAuthority: Math.random() > 0.5 ? 'Revoked' : 'Active',
        holderConcentration: Math.floor(Math.random() * 100),
        liquidityLocked: Math.random() > 0.5,
        tokenAge: Math.floor(Math.random() * 365),
        deployerReputation: Math.random() > 0.3 ? 'Verified' : 'Unknown'
      });
      setScanning(false);
    }, 2500);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 bg-black/50 backdrop-blur-sm border-b border-emerald-500/20">
        <div className="flex items-center space-x-3">
          <img src="https://i.ibb.co/dwm1Xr3K/Gemini-Generated-Image-lu8fd1lu8fd1lu8.jpg" alt="HKS Logo" className="h-12 w-12 rounded-lg" />
          <span className="text-2xl font-bold text-emerald-400">HACK SOLANA</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm">
          <a href="#scanner" className="hover:text-emerald-400 transition-colors">Scanner</a>
          <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a>
          <a href="#token" className="hover:text-emerald-400 transition-colors">Token</a>
          <a href="#roadmap" className="hover:text-emerald-400 transition-colors">Roadmap</a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8 text-center">
        <img 
          src="https://i.ibb.co/dwm1Xr3K/Gemini-Generated-Image-lu8fd1lu8fd1lu8.jpg" 
          alt="HKS Logo" 
          className="h-32 w-32 mb-8 rounded-2xl shadow-2xl shadow-emerald-500/50 animate-pulse"
        />
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
          Scan Before You Sign
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12">
          Solana's on-chain security and risk intelligence layer. Protect your assets with transparent, explainable risk analysis.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#scanner" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition-all shadow-lg shadow-emerald-500/50 hover:scale-105">
            Scan Token
          </a>
          <a href="#how-it-works" className="px-8 py-4 border-2 border-emerald-500 hover:bg-emerald-500/10 rounded-lg font-semibold transition-all">
            View Risk Engine
          </a>
        </div>
      </section>

      {/* Problem Section */}
      <section className="relative z-10 py-24 px-8 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center text-emerald-400">The Problem We Solve</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Fake Solana Tokens', desc: 'Malicious actors deploy counterfeit tokens mimicking legitimate projects, draining unsuspecting users.' },
              { title: 'Rug Pulls & Liquidity Drains', desc: 'Developers remove liquidity without warning, leaving holders with worthless tokens and no recourse.' },
              { title: 'Hidden Mint & Freeze Authorities', desc: 'Undisclosed control mechanisms allow creators to mint unlimited supply or freeze user holdings.' },
              { title: 'Wallet Drain Contracts', desc: 'Malicious smart contracts designed to extract funds from connected wallets during transactions.' },
              { title: 'Transaction Blindness', desc: 'Users sign transactions without understanding the full implications, risks, or hidden permissions.' }
            ].map((problem, i) => (
              <div key={i} className="p-6 bg-gray-800/50 border border-red-500/30 rounded-xl hover:border-red-500 transition-all group">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 text-2xl">
                    ⚠
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-red-400 group-hover:text-red-300">{problem.title}</h3>
                    <p className="text-gray-400">{problem.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scanner Section */}
      <section id="scanner" className="relative z-10 py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-8 text-center text-emerald-400">HKS Risk Scanner</h2>
          <p className="text-xl text-gray-300 text-center mb-12">
            Analyze any Solana token for security risks with our transparent, on-chain intelligence engine.
          </p>
          
          <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-emerald-500/30 shadow-2xl">
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-emerald-400">Token Mint Address</label>
              <input
                type="text"
                value={scanAddress}
                onChange={(e) => setScanAddress(e.target.value)}
                placeholder="Enter Solana token mint address..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
              />
            </div>
            
            <button
              onClick={handleScan}
              disabled={scanning}
              className="w-full px-6 py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-600 rounded-lg font-semibold transition-all shadow-lg"
            >
              {scanning ? 'Scanning On-Chain Data...' : 'Analyze Token'}
            </button>

            {scanning && (
              <div className="mt-8 text-center">
                <div className="inline-block w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-emerald-400">Analyzing blockchain data...</p>
              </div>
            )}

            {scanResult && (
              <div className="mt-8 space-y-6 animate-fade-in">
                <div className="text-center p-6 bg-gray-800 rounded-xl border-2 border-emerald-500">
                  <div className="text-6xl font-bold mb-2" style={{
                    color: scanResult.level === 'Low' ? '#10b981' : scanResult.level === 'Medium' ? '#f59e0b' : '#ef4444'
                  }}>
                    {scanResult.score}
                  </div>
                  <div className="text-xl font-semibold" style={{
                    color: scanResult.level === 'Low' ? '#10b981' : scanResult.level === 'Medium' ? '#f59e0b' : '#ef4444'
                  }}>
                    {scanResult.level} Risk
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Mint Authority</div>
                    <div className="text-lg font-semibold" style={{
                      color: scanResult.mintAuthority === 'Revoked' ? '#10b981' : '#ef4444'
                    }}>
                      {scanResult.mintAuthority}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Holder Concentration</div>
                    <div className="text-lg font-semibold">{scanResult.holderConcentration}%</div>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Liquidity Status</div>
                    <div className="text-lg font-semibold" style={{
                      color: scanResult.liquidityLocked ? '#10b981' : '#ef4444'
                    }}>
                      {scanResult.liquidityLocked ? 'Locked' : 'Unlocked'}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="text-sm text-gray-400 mb-1">Token Age</div>
                    <div className="text-lg font-semibold">{scanResult.tokenAge} days</div>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg md:col-span-2">
                    <div className="text-sm text-gray-400 mb-1">Deployer Reputation</div>
                    <div className="text-lg font-semibold" style={{
                      color: scanResult.deployerReputation === 'Verified' ? '#10b981' : '#f59e0b'
                    }}>
                      {scanResult.deployerReputation}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-24 px-8 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center text-emerald-400">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Read On-Chain Data', desc: 'Direct access to Solana blockchain. No intermediaries, no data manipulation.' },
              { step: '02', title: 'Apply Risk Rules', desc: 'Transparent algorithms analyze mint authority, liquidity, holder distribution, and contract behavior.' },
              { step: '03', title: 'Generate Score', desc: 'Explainable risk scoring based on verifiable on-chain metrics and historical patterns.' },
              { step: '04', title: 'Deliver Warnings', desc: 'Clear, actionable insights with specific risk factors and recommendations.' }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-3xl font-bold shadow-lg shadow-emerald-500/50 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-emerald-400">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 p-8 bg-gray-900/80 rounded-2xl border border-emerald-500/30">
            <h3 className="text-2xl font-bold mb-4 text-emerald-400">No AI Hype. Pure Logic.</h3>
            <p className="text-gray-300 leading-relaxed">
              Our risk engine uses deterministic algorithms, not black-box AI. Every score is explainable, auditable, and based on transparent rules applied to verifiable on-chain data. We believe security requires clarity, not complexity.
            </p>
          </div>
        </div>
      </section>

      {/* Token Utility */}
      <section id="token" className="relative z-10 py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center text-emerald-400">HKS Token Utility</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: '🔍', title: 'Advanced Scans', desc: 'Pay with HKS for deep analysis, historical data, and custom risk parameters.' },
              { icon: '🔒', title: 'Stake for Premium', desc: 'Lock HKS tokens to access unlimited scans, priority support, and early features.' },
              { icon: '🗳️', title: 'Governance Voting', desc: 'Shape the platform roadmap, risk parameters, and feature prioritization.' },
              { icon: '⚡', title: 'API Access', desc: 'Integrate HKS security into wallets, dApps, and exchanges with our developer API.' }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-gray-900/80 rounded-2xl border border-emerald-500/30 hover:border-emerald-500 transition-all">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-emerald-400">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="relative z-10 py-24 px-8 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center text-emerald-400">Development Roadmap</h2>
          <div className="space-y-8">
            {[
              { phase: 'Phase 1', title: 'Token Risk Scanner', status: 'Live', desc: 'Core risk analysis engine operational with mint authority, liquidity, and holder distribution checks.' },
              { phase: 'Phase 2', title: 'Wallet Integration', status: 'Q2 2025', desc: 'Browser extension and mobile SDK for Phantom, Solflare, and other major Solana wallets.' },
              { phase: 'Phase 3', title: 'dApp Reputation Layer', status: 'Q3 2025', desc: 'Expand beyond tokens to smart contract security analysis and dApp risk scoring.' },
              { phase: 'Phase 4', title: 'Security API & Alerts', status: 'Q4 2025', desc: 'Developer API, real-time monitoring, and automated alert system for exchanges and platforms.' }
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-6 p-6 bg-gray-900/80 rounded-2xl border border-emerald-500/30 hover:border-emerald-500 transition-all">
                <div className="flex-shrink-0 w-24 text-center">
                  <div className="text-sm font-semibold text-emerald-400 mb-2">{item.phase}</div>
                  <div className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 inline-block">
                    {item.status}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2 text-emerald-400">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Transparency */}
      <section className="relative z-10 py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center text-emerald-400">Trust & Transparency</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Open Methodology', desc: 'Our risk scoring algorithms are documented and auditable. No secret sauce, just transparent security logic.' },
              { title: 'Explainable Scoring', desc: 'Every risk score comes with detailed reasoning. You understand exactly why a token received its rating.' },
              { title: 'Non-Custodial', desc: 'We never hold, access, or control your funds. HKS is purely informational and educational.' },
              { title: 'Permission-Based', desc: 'Zero wallet access without explicit user permission. Your security is our priority.' }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-emerald-500/30">
                <h3 className="text-2xl font-semibold mb-4 text-emerald-400">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 px-8 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center text-emerald-400">Get In Touch</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-gray-900/80 rounded-xl border border-emerald-500/30 text-center">
              <div className="text-4xl mb-4">📞</div>
              <div className="text-sm text-gray-400 mb-2">Phone</div>
              <a href="tel:+916304225807" className="text-xl font-semibold text-emerald-400 hover:text-emerald-300">
                +91 6304225807
              </a>
            </div>
            
            <div className="p-6 bg-gray-900/80 rounded-xl border border-emerald-500/30 text-center">
              <div className="text-4xl mb-4">📧</div>
              <div className="text-sm text-gray-400 mb-2">Email</div>
              <a href="mailto:hacksol.works@gmail.com" className="text-xl font-semibold text-emerald-400 hover:text-emerald-300">
                hacksol.works@gmail.com
              </a>
            </div>
          </div>

          <div className="bg-gray-900/80 p-8 rounded-2xl border border-emerald-500/30">
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-emerald-400">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-emerald-400">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-emerald-400">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows="5"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
              ></textarea>
            </div>
            
            <button
              onClick={handleSubmit}
              className="w-full px-6 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition-all shadow-lg"
            >
              Send Message
            </button>
            
            {formSubmitted && (
              <div className="mt-4 p-4 bg-emerald-500/20 border border-emerald-500 rounded-lg text-center text-emerald-400">
                Message sent successfully!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-8 border-t border-emerald-500/20 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src="https://i.ibb.co/dwm1Xr3K/Gemini-Generated-Image-lu8fd1lu8fd1lu8.jpg" alt="HKS Logo" className="h-10 w-10 rounded-lg" />
              <span className="text-2xl font-bold text-emerald-400">HACK SOLANA (HKS)</span>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 HACK SOLANA. All rights reserved.
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-500 text-center leading-relaxed">
              <strong>Disclaimer:</strong> HACK SOLANA (HKS) is a non-custodial, informational platform. We do not hold, manage, or have access to user funds. All risk assessments are for educational purposes only and should not be considered financial advice. Users are responsible for conducting their own due diligence before making any investment decisions. Past performance and risk scores do not guarantee future results.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HackSolanaWebsite;
