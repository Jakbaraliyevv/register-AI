import { Brain, Cpu, Zap, Network, Bot, Sparkles } from "lucide-react@0.487.0";

export function AIParticlesBackground() {
  const icons = [
    { Icon: Brain, color: "text-purple-400", left: 12, top: 18, delay: 0 },
    { Icon: Cpu, color: "text-cyan-400", left: 26, top: 28, delay: 1 },
    { Icon: Zap, color: "text-pink-400", left: 40, top: 38, delay: 2 },
    { Icon: Network, color: "text-blue-400", left: 54, top: 48, delay: 3 },
    { Icon: Bot, color: "text-violet-400", left: 68, top: 58, delay: 4 },
    { Icon: Sparkles, color: "text-fuchsia-400", left: 82, top: 68, delay: 5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      
      {/* Gradient bloblar */}
      <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-purple-600 rounded-full blur-[80px] sm:blur-[120px] opacity-[0.06] animate-blob" />
      <div className="absolute bottom-1/3 right-1/3 w-48 sm:w-64 h-48 sm:h-64 bg-cyan-600 rounded-full blur-[80px] sm:blur-[120px] opacity-[0.06] animate-blob" />

      {/* Floating iconlar */}
      {icons.map(({ Icon, color, left, top, delay }, i) => (
        <div
          key={i}
          className="absolute hidden lg:block animate-floatSoft"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`,
          }}
        >
          <div className="p-3 bg-gradient-to-br from-purple-900/20 to-transparent backdrop-blur-sm border border-purple-500/20 rounded-xl">
            <Icon className={color} size={26} />
          </div>
        </div>
      ))}

      {/* Grid pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "55px 55px",
          }}
        />
      </div>

      {/* Scanning line */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-10 animate-scanSoft" />
    </div>
  );
}
