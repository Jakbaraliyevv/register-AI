import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { SpeakersSection } from "./components/SpeakersSection";
import { ScheduleSection } from "./components/ScheduleSection";
import { LocationSection } from "./components/LocationSection";
import { SponsorsSection } from "./components/SponsorsSection";
import { Footer } from "./components/Footer";
import { AIParticlesBackground } from "./components/AIParticlesBackground";
import { ScrollReveal } from "./components/ScrollReveal";
import { DigitalRain } from "./components/DigitalRain";
import { ScrollProgress } from "./components/ScrollProgress";
import { ModalProvider } from "./context/context";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Register from "./components/register";
import { BigBanner } from "./components/BigBanner";
import "./App.css";
export default function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <ScrollProgress />
        {/* <DigitalRain /> */}
        <AIParticlesBackground />

        {/* Container: full-screen, flex column */}
        <div className="min-h-screen flex flex-col bg-black text-white antialiased">
          {/* NAVBAR */}
          <Navigation />

          {/* MAIN CONTENT */}
          <div className="flex-1">
            <Routes>
              <Route path="/register/:id" element={<Register />} />

              <Route
                path="/"
                element={
                  <main className="flex-1 w-full">
                    <HeroSection />
                    <ScrollReveal direction="up" delay={0.04}>
                      <BigBanner />
                    </ScrollReveal>
                    {/* <ScrollReveal className='my-6' direction="up" delay={0.04}>
                      <CountdownTimer targetDate="2025-11-29T00:00:00" />
                    </ScrollReveal> */}
                    <ScrollReveal direction="up">
                      <AboutSection />
                    </ScrollReveal>
                    {/* <ScrollReveal direction="up" delay={0.04}>
                      <SpeakersSection />
                    </ScrollReveal> */}
                    {/* <ScrollReveal direction="up" delay={0.04}>
                      <ScheduleSection />
                    </ScrollReveal> */}
                    <ScrollReveal direction="up" delay={0.04}>
                      <LocationSection />
                    </ScrollReveal>
                    <ScrollReveal direction="up">
                      <SponsorsSection />
                    </ScrollReveal>
                    <Footer />
                  </main>
                }
              />
            </Routes>
          </div>

          {/* FOOTER doim pastda */}
        </div>
      </BrowserRouter>
    </ModalProvider>
  );
}

import ai from "./assets/ai.png";
import { CountdownTimer } from "./components/ui/CountdownTimer";
const blocks = [
  {
    id: 1,
    title: "AI Texnologiyalar",
    desc: "Sun'iy intellektning yangi chegaralarini kashf qiling.",
    image: ai,
    size: "large",
    link: "/register/ai",
  },
];

// export function BigBanner() {
//   return (
//     <div className="max-w-7xl mx-auto">
//       <div className="relative rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row h-[18rem] md:h-[20rem] lg:h-[22rem]">
//         <div className="w-full md:w-1/2 h-48 md:h-full overflow-hidden">
//           <img
//             src={ai}
//             alt="AI Texnologiyalar"
//             className="w-full h-full object-cover transition-transform duration-500 ease-out transform hover:scale-105 filter"
//           />
//         </div>

//         <div className="w-full md:w-1/2 flex flex-col justify-center p-6 bg-black/55 backdrop-blur-sm">
//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
//             AI Day (prompt)
//           </h2>
//           <p className="text-gray-300 mb-4">
//             Sun'iy intellektning yangi chegaralarini kashf qiling. Seminarlardan amaliy mashgʻulotlargacha — hammasi shu erda.
//           </p>
//           <div className="flex gap-3">
//             <Link
//               to="/register/ai"
//               className="px-5 p-4 rounded-xl bg-purple-600 hover:bg-purple-500 transition shadow-lg font-semibold"
//             >
//               Ro‘yxatdan o‘ting →
//             </Link>
//           </div>
//         </div>

//         <div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-purple-500/15" />
//       </div>
//     </div>
//   );
// }

export function BigBanner() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl  flex flex-col md:flex-row bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-black border border-purple-500/20">
        {/* Left side - Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-gradient-to-br from-purple-800/20 to-transparent">
          <div className="relative">
            <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse" />
            <img
              src={ai}
              alt="Robot Sumo"
              className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="w-full md:w-1/2 flex  flex-col p-4  justify-center  md:p-12 lg:p-16">
          <h2 className="text-2xl md:text-4xl flex items-center justify-center lg:text-5xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent mb-4">
            AI Day (prompt)
          </h2>

          <p className="text-gray-300  flex items-center justify-center text-base md:text-lg mb-8 leading-relaxed">
            Robotlarning kuchli to'qnashuv janglari.
          </p>

          <a
            href="/register/robo-sumo"
            className="px-8 py-4 flex justify-center items-center rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 font-semibold text-lg transform hover:scale-105"
          >
            Ro'yxatdan o'ting
          </a>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl" />

        {/* Border glow effect */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none border border-purple-400/30" />
      </div>
    </div>
  );
}
