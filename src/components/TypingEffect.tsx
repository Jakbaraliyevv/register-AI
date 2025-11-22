// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// interface TypingEffectProps {
//   text: string;
//   delay?: number;
//   speed?: number;
//   className?: string;
// }

// export function TypingEffect({ text, delay = 0, speed = 50, className = '' }: TypingEffectProps) {
//   const [displayedText, setDisplayedText] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isStarted, setIsStarted] = useState(false);

//   useEffect(() => {
//     const startTimer = setTimeout(() => {
//       setIsStarted(true);
//     }, delay);

//     return () => clearTimeout(startTimer);
//   }, [delay]);

//   useEffect(() => {
//     if (!isStarted) return;

//     if (currentIndex < text.length) {
//       const timeout = setTimeout(() => {
//         setDisplayedText(prev => prev + text[currentIndex]);
//         setCurrentIndex(prev => prev + 1);
//       }, speed);

//       return () => clearTimeout(timeout);
//     }
//   }, [currentIndex, text, speed, isStarted]);

//   return (
//     <span className={className}>
//       {displayedText}
//       {currentIndex < text.length && (
//         <motion.span
//           animate={{ opacity: [1, 0, 1] }}
//           transition={{ duration: 0.8, repeat: Infinity }}
//           className="inline-block w-0.5 h-5 bg-cyan-400 ml-1"
//         />
//       )}
//     </span>
//   );
// }
