import { useEffect } from "react";

export function ScrollProgress() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / docHeight;

      // Yuqori progress bar uchun
      document.documentElement.style.setProperty("--scroll", `${scrollFraction}`);

      // Pastki aylana indikator uchun
      const circle = document.querySelector<SVGCircleElement>(".scroll-circle");
      if (circle) {
        const circumference = 2 * Math.PI * 25; // r = 25
        const offset = circumference - scrollFraction * circumference;
        circle.style.strokeDashoffset = `${offset}`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Yuqori progress bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 z-50 origin-left scale-x-[var(--scroll)]" />

      {/* Pastki aylana indikator */}
      <div className="fixed bottom-6 left-6 z-40 hidden lg:block w-14 h-14">
        <svg width="60" height="60" viewBox="0 0 60 60" className="transform -rotate-90">
          <circle
            cx="30"
            cy="30"
            r="25"
            stroke="rgba(168,85,247,0.15)"
            strokeWidth="4"
            fill="none"
          />
          <circle
            className="scroll-circle"
            cx="30"
            cy="30"
            r="25"
            stroke="url(#scrollGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 25}
            strokeDashoffset={2 * Math.PI * 25}
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
          <defs>
            <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xs bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          AI
        </div>
      </div>
    </>
  );
}
