import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

function SponsorForm({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, company });
    onClose();
    setName('');
    setEmail('');
    setCompany('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-black rounded-2xl p-6 sm:p-8 w-11/12 max-w-md border border-purple-500/50 shadow-lg">
        <h3 className="text-2xl text-white mb-4 text-center">Sponsor bo‘ling</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Ismingiz"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-lg bg-purple-900/30 text-white border border-purple-500/50 placeholder-gray-400"
            required
          />
          <input
            type="email"
            placeholder="Email manzilingiz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-purple-900/30 text-white border border-purple-500/50 placeholder-gray-400"
            required
          />
          <input
            type="text"
            placeholder="Kompaniya nomi"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="p-3 rounded-lg bg-purple-900/30 text-white border border-purple-500/50 placeholder-gray-400"
            required
          />
          <div className="flex justify-end gap-4 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-full border border-purple-500 text-purple-400 hover:bg-purple-500/20 transition-colors"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:shadow-lg transition-shadow"
            >
              Jo‘natish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function SponsorsSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section id="homiylar" className="relative py-24 lg:py-32 bg-black overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl mb-4 text-white">
            Digital Generation of Uzbekistan
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            O‘zbekistondagi raqamli innovatsiyalar yetakchisi
          </p>
        </div>

        {/* Sponsor Card */}
        <div className="flex flex-col items-center">
          <div className="relative group mb-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative flex flex-col items-center p-6 bg-gradient-to-br from-gray-900 to-black border border-purple-500/50 rounded-2xl backdrop-blur-sm">
              <ImageWithFallback
                src="https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_2,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/sponsors/DG-LOGO20200.png"
                alt="Digital Generation of Uzbekistan"
                className="object-contain mb-4"
              />
              <span className="text-xl text-white font-semibold text-center">
                Digital Generation of Uzbekistan
              </span>
            </div>
          </div>
        </div>

        {/* Sponsor Form Modal */}
        <SponsorForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      </div>
    </section>
  );
}
