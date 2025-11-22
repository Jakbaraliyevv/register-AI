import { MapPin, Navigation, Phone, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LocationSection() {
  return (
    <section
      id="manzil"
      className="relative py-24 lg:py-32 bg-gradient-to-b from-black via-purple-950/10 to-black overflow-hidden"
    >
      {/* Fon Grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(168,85,247,0.5) 2px, transparent 2px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sarlavha */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-900/30 border border-purple-500/50 rounded-full text-purple-400 mb-6">
            Manzil
          </div>
          <h2 className="text-4xl lg:text-5xl mb-4 text-white">
            Bizni konferensiyamizga tashrif buyuring: {' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Toshkent
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            O‘zbekiston poytaxtining markazida zamonaviy konferensiya markazi
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chap taraf: Venue rasmi */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl opacity-20 blur-3xl group-hover:opacity-30 transition-opacity" />
            <div className="relative rounded-3xl overflow-hidden border-2 border-purple-500/30 backdrop-blur-sm">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1761823486862-86a65c032559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB2ZW51ZSUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjM0ODU4MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Konferensiya markazi"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent backdrop-blur-sm">
                <h3 className="text-white text-2xl mb-2">
                  Toshkent Xalqaro Konferensiya Markazi
                </h3>
                <p className="text-purple-400">
                  1000+ ishtirokchi sig‘imi bilan zamonaviy jihozlar
                </p>
              </div>
            </div>
          </div>

          {/* O‘ng taraf: Ma’lumotlar va xarita */}
          <div className="space-y-6">
            {/* Manzil kartasi */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-white mb-2">Manzil</h4>
                  <p className="text-gray-400">
                    Amir Temur ko‘chasi, 107A<br />
                    Toshkent, O‘zbekiston<br />
                    100084
                  </p>
                </div>
              </div>
            </div>

            {/* Xarita */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-purple-500/30 backdrop-blur-sm h-64 sm:h-80 lg:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1781.3374929711977!2d69.21711479512696!3d41.33407887277547!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b6d335ad179%3A0xb4aa336cdfa29db8!2sPedagogik%20mahorat%20va%20xalqaro%20baholash%20ilmiy-amaliy%20markazi!5e0!3m2!1sru!2s!4v1763512091504!5m2!1sru!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </div>

            {/* Aloqa ma’lumotlari */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-xl p-4 backdrop-blur-sm hover:border-purple-500/60 transition-all cursor-pointer flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <Phone className="text-purple-400" size={18} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Telefon</p>
                  <p className="text-white">+998 71 123 4567</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-xl p-4 backdrop-blur-sm hover:border-purple-500/60 transition-all cursor-pointer flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-600/20 rounded-lg flex items-center justify-center">
                  <Mail className="text-cyan-400" size={18} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-white">info@aiconf.uz</p>
                </div>
              </div>
            </div>

            {/* Yo‘nalish olish tugmasi */}
            <a
              href="https://maps.app.goo.gl/DWX5yqWCeTPzSozi6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full text-white flex items-center justify-center gap-2 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-shadow"
            >
              <Navigation size={20} />
              Yo'lga tushish
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
