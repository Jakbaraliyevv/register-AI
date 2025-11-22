import { useMemo } from "react";
import { Cpu, Brain, Zap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { RegistrationModal } from "./RegistrationModal";
import { useModal } from "../context/context";
import { CountdownTimer } from "./ui/CountdownTimer";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ScrollReveal } from "./ScrollReveal";

export function FiveBlocks() {
  const { blocks } = useModal();
  const allBlocks = [...blocks]; // original massivni saqlab qo'yish
  const mainBlock = allBlocks.shift(); // birinchi elementni olib olamiz
  const smallBlocks = allBlocks;
  console.log(smallBlocks, "4567890-8589");
  return (
    <div className="w-full mt-![20px]">
      <ScrollReveal className="mt-6 mt-10" direction="up" delay={0.04}>
        <CountdownTimer targetDate="2025-11-29T00:00:00" />
      </ScrollReveal>
      <section className="w-full bg-gray-950 py-16 flex flex-col gap-px-9  px-4 sm:px-6 lg:px-10 mt-10 lg:mt-20">
        <div className="w-full mx-auto mt-px-10">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {smallBlocks.map((item) => (
              <article
                key={item.id}
                className="group relative rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto md:h-72 lg:h-80 xl:h-96 bg-gradient-to-br from-black/40 to-black/10 border border-white/10 backdrop-blur-sm"
              >
                <div className="w-full md:w-1/2 h-52 md:h-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-90"
                  />
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center gap-3 p-6 sm:p-8 bg-black/50 backdrop-blur-md">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 mt-3 mb-5 text-sm sm:text-base">
                    {item.desc}
                  </p>

                  <div className="flex items-center justify-center  mt-auto min-sm:justify-center">
                    {item.link === "/register/contest" ? (
                      <a
                        href="https://raqamliavlod.uz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 p-2 rounded-lg bg-purple-600 hover:bg-purple-500 mt-2 transition font-semibold"
                      >
                        Ro‘yxatdan o‘ting
                      </a>
                    ) : (
                      <Link
                        to={item.link}
                        className="px-5 p-2 rounded-lg bg-purple-600 hover:bg-purple-500 mt-2 transition font-semibold"
                      >
                        Ro‘yxatdan o‘ting
                      </Link>
                    )}
                  </div>
                </div>

                <div className="absolute inset-0 rounded-3xl pointer-events-none border border-purple-500/20 group-hover:border-purple-400/40 transition" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function HeroSection() {
  const { showRegister, setShowRegister } = useModal();

  const particles = useMemo(
    () =>
      [...Array(20)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2,
      })),
    []
  );

  const floatingIcons = [
    {
      icon: Brain,
      top: "25%",
      left: "33%",
      from: "purple",
      to: "transparent",
      border: "purple-500/30",
    },
    {
      icon: Cpu,
      top: "66%",
      left: "25%",
      from: "cyan",
      to: "transparent",
      border: "cyan-500/30",
    },
    {
      icon: Zap,
      top: "33%",
      left: "66%",
      from: "pink",
      to: "transparent",
      border: "pink-500/30",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://www.sercansolmaz.com/content/images/2025/02/DALL-E-2025-02-10-00.30.24---A-16_9-cover-image-with-a-deep-midnight-blue-gradient-background.-Overlay-an-abstract-neural-network-or-circuit-board-pattern-in-neon-blue-and-purple-.webp"
          alt="AI Neural Network"
          className="w-full h-full object-cover opacity-40 max-w-none"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-purple-900/20 to-black" />
      </div>

      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-40 animate-floatSoft"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-2xl opacity-20 animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600 rounded-full filter blur-2xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      /> */}

      {floatingIcons.map(({ icon: Icon, top, left, from, to, border }, i) => (
        <div key={i} className="absolute hidden md:block" style={{ top, left }}>
          <div
            className={`p-4 bg-gradient-to-br from-${from}-600/20 to-${to} backdrop-blur-sm border ${border} rounded-2xl animate-floatSoft`}
          >
            <Icon className={`text-${from}-400`} size={40} />
          </div>
        </div>
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <FiveBlocks />
      </div>
    </section>
  );
}
