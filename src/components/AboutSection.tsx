import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
// ❗ Lucide-react NPM paketda versiya bilan import qilinmaydi
import { Brain, Cpu, Network, Zap, Users, Globe, Award, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutSection() {
  const features = [
    { icon: Brain, text: 'Sun’iy intellekt va mashina o‘rganish' },
    { icon: Network, text: 'Neyron tarmoqlar' },
    { icon: Cpu, text: 'Chuqur o‘rganish' },
    { icon: Zap, text: 'Ilg‘or tadqiqotlar' },
  ];

  const stats = [
    { icon: Users, value: 500, suffix: '+', label: 'AI mutaxassislari' },
    { icon: Globe, value: 40, suffix: '+', label: 'Davlatlar' },
    { icon: Award, value: 50, suffix: '+', label: 'Sessiyalar' },
    { icon: Calendar, value: 3, suffix: '', label: 'Kunlar' },
  ];

  function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
      if (!isInView) return;

      let start = 0;
      const increment = value / (2000 / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [isInView, value]);

    return <span ref={ref}>{count}{suffix}</span>;
  }

  return (
    <section id="haqida" className="relative py-20 lg:py-32 bg-black overflow-hidden mt-2 mb-2">
      
      {/* Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/20 via-transparent to-cyan-600/20 bg-[length:200%_100%] animate-wave" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-purple-900/30 border border-purple-500/50 rounded-full text-purple-400 mb-6">
              Konferensiya haqida
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-6 text-white leading-tight">
              Sun’iy Intellektning{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Kelajagi
              </span>
            </h2>

            <p className="text-gray-400 mb-6 text-sm sm:text-base">
              AI Conference 2025 dunyoning yetakchi mutaxassislari, tadqiqotchilari va innovatorlarini birlashtiradi.
              Uch kun davomida mashina o‘rganish, neyron tarmoqlar va kognitiv hisoblashdagi so‘nggi yutuqlarni o‘rganing.
            </p>

            <p className="text-gray-400 mb-10 text-sm sm:text-base mb-6">
              Sanoat yetakchilari bilan tarmoq yarating, ilg‘or yechimlarni kashf eting va AIning turli sohalarga ta’sirini o‘rganing.
            </p>

            {/* Features – Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 ">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 
                  border border-purple-500/20 rounded-xl backdrop-blur-sm"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-lg flex items-center justify-center">
                    <feature.icon className="text-white" size={20} />
                  </div>
                  <span className="text-gray-300 text-sm sm:text-base">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats – Responsive */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="mb-2 flex justify-center">
                    <div className="p-3 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-full border border-purple-500/30">
                      <stat.icon className="text-cyan-400" size={24} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div> */}
          </motion.div>

          {/* RIGHT – IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl opacity-20 blur-3xl" />

            <div className="relative rounded-3xl overflow-hidden border-2 border-purple-500/30 backdrop-blur-sm 
            w-full h-[300px] sm:h-[380px] md:h-[430px] lg:h-[500px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1756908992154-c8a89f5e517f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
                alt="Sun’iy Intellekt Texnologiyasi"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-30 blur-2xl animate-floatSoft" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full opacity-30 blur-2xl animate-floatSoft" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
