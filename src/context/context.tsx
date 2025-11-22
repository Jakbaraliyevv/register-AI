import robosumo from '../assets/robosumo.png';
import futbol from '../assets/futbol.png';
import ai from '../assets/ai.png';
import constest from '../assets/contest.png';
import idea from '../assets/idea.png';
import React, { createContext, useState, useContext } from "react";

// Block turi
interface BlockType {
  id: number;
  title: string;
  desc: string;
  image: string;
  size: 'small' | 'large';
  link: string;
  gifts?: string[]; // yangi property sovg‘alar uchun
}

// Modal kontekst turi
interface ModalContextType {
  showRegister: boolean;
  setShowRegister: (value: boolean) => void;
  blocks: BlockType[];
}

// KONTEXT yaratish
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// BLOCKS DATA
const blocks: BlockType[] = [
  {
    id: 1,
    title: "AI Texnologiyalar",
    desc: "Sun'iy intellektning yangi chegaralarini kashf qiling.",
    image: ai,
    size: "large",
    link: "/register/ai",
    gifts: ["iPhone 17", "Planshet", "Smart soat", "Naushnik", "Klaviatura"]
  },
  {
    id: 2,
    title: 'Robo Sumo',
    desc: 'Robotlarning kuchli to‘qnashuv janglari.',
    image: robosumo,
    size: 'small',
    link: '/register/rsumo',
    gifts: ["Naushnik", "Powerbank", "Mini dron"]
  },
  {
    id: 3,
    title: 'DG Contest',
    desc: 'Innovatsion musobaqalar va g‘oyalar.',
    image: constest,
    size: 'small',
    link: '/register/contest',
    gifts: ["Klaviatura", "Planshet", "Smart lamp"]
  },
  {
    id: 4,
    title: 'Robo Futbol',
    desc: 'Robotlar futbol maydonida jang qiladi.',
    image: futbol,
    size: 'small',
    link: '/register/rfutbol',
    gifts: ["Mini futbol to‘pi", "Naushnik", "Water bottle"]
  },
  {
    id: 5,
    title: 'Foydali Ixtirolar',
    desc: 'Yangi g‘oyalarni amalga oshiring.',
    image: idea,
    size: 'small',
    link: '/register/fixtirolar',
    gifts: ["Planner", "Smart soat", "Desk lamp"]
  },
];
// PROVIDER
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showRegister, setShowRegister] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ showRegister, setShowRegister, blocks }}>
      {children}
    </ModalContext.Provider>
  );
};

// CUSTOM HOOK
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};
