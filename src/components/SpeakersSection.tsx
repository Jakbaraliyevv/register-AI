import { Linkedin, Twitter } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function SpeakersSection() {
  const speakers = [
    { name: 'Dr. Sarah Chen', role: 'Sun’iy intellekt bo‘yicha bosh olim', company: 'TechCorp AI', image: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg' },
    { name: 'Prof. Michael Rodriguez', role: 'ML tadqiqotlari direktori', company: 'Stanford AI Lab', image: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg' },
    { name: 'Elena Volkov', role: 'Sun’iy neyron tarmoqlar bo‘yicha rahbar', company: 'DeepMind', image: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg' },
    { name: 'Dr. James Park', role: 'AI innovatsiyalari bo‘yicha vitse-prezident', company: 'Google Brain', image: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg' },
    { name: 'Aisha Mohammed', role: 'AI etikasi bo‘yicha yetakchi', company: 'OpenAI', image: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg' },
    { name: 'Dr. Kenji Tanaka', role: 'Robototexnika va AI direktori', company: 'Sony Research', image: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg' },
    { name: 'Maria Garcia', role: 'NLP tadqiqotlari bo‘yicha yetakchi', company: 'Meta AI', image: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg' },
    { name: 'Dr. Thomas Wright', role: 'Kompyuter ko‘rish bo‘yicha ekspert', company: 'NVIDIA Research', image: 'https://images.unsplash.com/photo-1762968274962-20c12e6e8ecd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg' },
  ];

  return (
    <section id="nutqchilar" className="relative py-24 lg:py-32 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: `linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-900/30 border border-purple-500/50 rounded-full text-purple-400 mb-6">
            Dunyo darajasidagi spikerlar
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Tanishing{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Vizyonerlarga
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Sun’iy intellekt kelajagini shakllantirayotgan pionerlar bilan o‘rganing
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {speakers.map((speaker, index) => (
            <div key={index} className="group relative cursor-pointer">
              {/* Neon Frame */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />

              {/* Card */}
              <div className="relative bg-gradient-to-b from-gray-900 to-black border border-purple-500/30 rounded-2xl overflow-hidden backdrop-blur-sm group-hover:border-purple-500/60 transition-all hover:-translate-y-2">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  {/* Social Links */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 bg-purple-600/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                      <Linkedin size={16} className="text-white" />
                    </button>
                    <button className="w-8 h-8 bg-cyan-600/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors">
                      <Twitter size={16} className="text-white" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 text-center">
                  <h3 className="text-white font-semibold text-lg mb-1">{speaker.name}</h3>
                  <p className="text-purple-400 text-sm mb-1 h-[30px]">{speaker.role}</p>
                  <p className="text-gray-500 text-sm">{speaker.company}</p>
                </div>

                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
