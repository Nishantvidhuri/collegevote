import { useMemo, useState } from "react";
import InstagramLogin from "./components/InstagramLogin";

// Design tokens (flat, neutral)
const BRAND = "Rankline";
const ACCENT = "indigo"; // keep one accent family

// Vote options data
const OPTIONS = [
  {
    key: "option2",
    name: "Mayank",
    subtitle: "The Energy Master",
    emoji: "⚡",
    img: "https://dev-surefy.s3.ap-south-1.amazonaws.com/upload/7613bb8e-a601-4e06-ba53-35f0ca6e19c3_1755236465021.jpg",
  },
  {
    key: "option1",
    name: "Shreya Kaushik",
    subtitle: "The Cosmic Explorer",
    emoji: "🚀",
    img: "https://images.unsplash.com/photo-1683184673811-5b87198a78f6?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "option3",
    name: "Shyam Sharma",
    subtitle: "The Fire Lord",
    emoji: "🔥",
    img: "https://images.unsplash.com/photo-1710410798859-6791f87c2e9d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "option4",
    name: "Mansi Bansal",
    subtitle: "The Diamond King",
    emoji: "💎",
    img: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

/* ------------------------------- UI PARTS ------------------------------- */

function Header({ isDark, onToggleTheme, onStart }) {
  return (
    <header className={`${isDark ? "bg-zinc-950/95 backdrop-blur-sm" : "bg-white/95 backdrop-blur-sm"} border-b ${isDark ? "border-zinc-800/50" : "border-slate-200/50"} sticky top-0 z-40`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <button
          className="inline-flex items-center gap-3 group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={`${BRAND} home`}
        >
          <div className="relative">
            <img 
              src="/logolike-removebg-preview.png" 
              alt="Rankline Logo" 
              className="w-9 h-9 object-contain transition-transform duration-200 group-hover:scale-110"
            />
            <div className={`absolute inset-0 rounded-full ${isDark ? "bg-indigo-500/20" : "bg-indigo-500/10"} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-extrabold tracking-tight text-lg bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              {BRAND}
            </span>
            <span className={`text-xs ${isDark ? "text-zinc-400" : "text-slate-500"} font-medium`}>
              Voting Platform
            </span>
          </div>
        </button>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className={`text-sm font-medium transition-colors duration-200 ${isDark ? "text-zinc-300 hover:text-indigo-400" : "text-slate-700 hover:text-indigo-600"}`}>
            Home
          </a>
          <a href="#about" className={`text-sm font-medium transition-colors duration-200 ${isDark ? "text-zinc-300 hover:text-indigo-400" : "text-slate-700 hover:text-indigo-600"}`}>
            About
          </a>
          <a href="#contact" className={`text-sm font-medium transition-colors duration-200 ${isDark ? "text-zinc-300 hover:text-indigo-400" : "text-slate-700 hover:text-indigo-600"}`}>
            Contact
          </a>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2.5 rounded-lg border transition-all duration-200 hover:scale-105 ${
              isDark 
                ? "border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600" 
                : "border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Get Started Button */}
          <button
            onClick={onStart}
            className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 hover:scale-105 ${
              isDark
                ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-lg shadow-indigo-500/25"
                : "bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 shadow-lg shadow-indigo-500/25"
            }`}
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer({ isDark }) {
  return (
    <footer className={`${isDark ? "bg-zinc-950" : "bg-white"} border-t ${isDark ? "border-zinc-900" : "border-slate-200"}`}>
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between text-xs">
        <p className={isDark ? "text-zinc-400" : "text-slate-500"}>© 2025 {BRAND}. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          {["About", "Contact", "Privacy"].map((l) => (
            <button key={l} className={`hover:underline ${isDark ? "text-zinc-300" : "text-slate-700"}`}>{l}</button>
          ))}
        </nav>
      </div>
    </footer>
  );
}

function WelcomePopup({ isDark, onClose }) {
  const items = [
    "Vote honestly.",
    "No spam or vote manipulation.",
    "Be respectful.",
    "We don't store passwords.",
    "Report anything suspicious.",
  ];
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-md rounded-xl ${isDark ? "bg-zinc-950 border border-zinc-800" : "bg-white border border-slate-200"}`}>
        <div className="p-5 border-b last:border-0">
          <h3 className="text-lg font-bold">Welcome</h3>
          <p className={`${isDark ? "text-zinc-400" : "text-slate-600"} text-sm mt-1`}>
            Quick guidelines before you start:
          </p>
        </div>
        <ul className="p-5 space-y-3">
          {items.map((t, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`mt-0.5 inline-block w-1.5 h-1.5 rounded-full bg-${ACCENT}-600`} />
              <span className={`${isDark ? "text-zinc-200" : "text-slate-800"} text-sm`}>{t}</span>
            </li>
          ))}
        </ul>
        <div className="p-5 border-t">
          <button
            onClick={onClose}
            className={`w-full py-2 rounded-md border font-semibold
            ${isDark ? "border-zinc-700 text-zinc-100 hover:bg-zinc-900" : "border-slate-300 text-slate-900 hover:bg-slate-100"}`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function ApplicantCard({ option, votes, total, onVote }) {
  const pct = total ? Math.round((votes / total) * 100) : 0;
  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
      {/* Background Image */}
      <img 
        src={option.img} 
        alt={option.name} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
      />
      
      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      
      {/* Profile Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-2xl font-bold">{option.name}</h3>
          <span className="text-lg">{option.emoji}</span>
        </div>
        <p className="text-lg text-gray-200 mb-4">{option.subtitle}</p>
        
        {/* Vote Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Live Voting</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{votes.toLocaleString()}</div>
            <div className="text-sm text-gray-300">votes ({pct}%)</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        
        {/* Main Vote Button */}
        <div className="flex justify-center mb-4">
          <button 
            onClick={onVote}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold text-lg rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-indigo-500/25 border-2 border-white/20 backdrop-blur-sm"
          >
             Vote 
          </button>
        </div>
      </div>
      
      {/* Top Right Badge */}
      <div className="absolute top-4 right-4">
        <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
          <span className="text-sm font-medium text-white">#{option.key.slice(-1)}</span>
        </div>
      </div>
    </div>
  );
}

function Landing({ isDark, onStart, total, votes }) {
  return (
    <section className={`${isDark ? "bg-zinc-950" : "bg-slate-50"} border-b ${isDark ? "border-zinc-900" : "border-slate-200"}`}>
      <div className="max-w-7xl mx-auto px-5 py-14">
        {/* NIFT Organization Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img 
              src="/NIFT_Logo.svg.png" 
              alt="NIFT Logo" 
              className="w-16 h-16 object-contain"
            />
            <div className="text-left">
              <h2 className={`text-2xl font-bold ${isDark ? "text-zinc-100" : "text-slate-900"}`}>
                Organized by
              </h2>
              <h3 className={`text-xl font-semibold ${isDark ? "text-indigo-400" : "text-indigo-600"}`}>
                NIFT Hauz Khas
              </h3>
              <p className={`text-sm ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
                New Delhi, Delhi 110016
              </p>
            </div>
          </div>
          <div className={`w-24 h-0.5 mx-auto ${isDark ? "bg-indigo-500" : "bg-indigo-600"} rounded-full`}></div>
        </div>

        {/* Applicants */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Top 4 Applicants</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {OPTIONS.map((o) => (
              <ApplicantCard
                key={o.key}
                option={o}
                votes={votes[o.key]}
                total={total}
                onVote={onStart}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- APP --------------------------------- */

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [votes, setVotes] = useState({
    option1: 102, // Shreya Kaushik - 102 votes (1st place)
    option2: 100, // Mayank - 100 votes (2nd place - starts with 100)
    option3: 98,  // Shyam Sharma - 98 votes
    option4: 95,  // Mansi Bansal - 95 votes
  });

  const total = useMemo(() => Object.values(votes).reduce((a, b) => a + b, 0), [votes]);

  // Function to increase Mayank's votes to 103
  const increaseMayankVotes = () => {
    console.log("Increasing Mayank's votes to 103");
    setVotes(prev => {
      const newVotes = {
        ...prev,
        option2: 103 // Mayank gets 103 votes
      };
      console.log("New votes:", newVotes);
      return newVotes;
    });
  };

  // Show Instagram login when vote button is clicked
  if (showLogin) return <InstagramLogin onBack={() => setShowLogin(false)} onLoginSuccess={increaseMayankVotes} />;

  return (
    <div className={`min-h-screen ${isDark ? "bg-zinc-950 text-zinc-100" : "bg-white text-slate-900"} font-['Nunito', 'sans-serif']`}>
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark((v) => !v)}
        onStart={() => setShowLogin(true)}
      />

      <Landing
        isDark={isDark}
        onStart={() => setShowLogin(true)}
        total={total}
        votes={votes}
      />

      {showWelcome && <WelcomePopup isDark={isDark} onClose={() => setShowWelcome(false)} />}

      <Footer isDark={isDark} />
    </div>
  );
}
