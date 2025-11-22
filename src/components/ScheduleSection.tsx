import { Calendar, Clock, MapPin, Users } from 'lucide-react';

export function ScheduleSection() {
  const schedule = [
    {
      day: '1-kun',
      date: '15-iyun, 2025',
      sessions: [
        {
          time: '09:00 - 10:00',
          title: 'Ochilish keynote: AI inqilobi',
          speaker: 'Dr. Sarah Chen',
          location: 'Bosh zal',
          attendees: '500+',
        },
        {
          time: '10:30 - 12:00',
          title: 'Deep Learning arxitekturalari',
          speaker: 'Prof. Michael Rodriguez',
          location: 'Zal A',
          attendees: '200+',
        },
      ],
    },
    {
      day: '2-kun',
      date: '16-iyun, 2025',
      sessions: [
        {
          time: '09:00 - 10:30',
          title: 'Kompyuter ko‘rish yangiliklari',
          speaker: 'Dr. Thomas Wright',
          location: 'Bosh zal',
          attendees: '400+',
        },
      ],
    },
  ];

  function addToCalendar(session: {
  title: string;
  time: string;
  location: string;
}) {
  // Vaqtni formatlash (oddiy misol, ISO formatda)
  const [startTime, endTime] = session.time.split(' - ');
  const start = new Date(`2025-06-15T${startTime}:00`);
  const end = new Date(`2025-06-15T${endTime}:00`);

  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${session.title}
DTSTART:${start.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${end.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
LOCATION:${session.location}
DESCRIPTION:${session.title}
END:VEVENT
END:VCALENDAR
`;

  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${session.title}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

  return (
    <section id="jadval" className="relative py-24 lg:py-32 bg-black overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(168, 85, 247, 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-900/30 border border-purple-500/50 rounded-full text-purple-400 mb-6">
            Tadbir jadvali
          </div>
          <h2 className="text-4xl lg:text-5xl mb-4 text-white">
            3 kunlik{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              innovatsiya
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Insightlar, workshoplar va networking imkoniyatlari bilan to‘la
          </p>
        </div>

        {/* Schedule Timeline */}
        <div className="space-y-16">
          {schedule.map((day, dayIndex) => (
            <div key={dayIndex}>
              {/* Day Header */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-full flex items-center justify-center">
                    <Calendar className="text-white" size={24} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl text-white">{day.day}</h3>
                  <p className="text-purple-400">{day.date}</p>
                </div>
                <div className="hidden sm:block flex-grow h-px bg-gradient-to-r from-purple-500/50 to-transparent ml-4" />
              </div>

              {/* Sessions */}
              <div className="space-y-4 ml-0 sm:ml-8 border-l-0 sm:border-l-2 border-purple-500/30 pl-0 sm:pl-8">
                {day.sessions.map((session, sessionIndex) => (
                  <div
                    key={sessionIndex}
                    className="relative group hover:translate-x-2 transition-transform duration-300"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[37px] top-6 w-3 h-3 bg-purple-600 rounded-full border-2 border-black group-hover:bg-cyan-400 transition-colors" />

                    {/* Session Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm group-hover:border-purple-500/60 transition-all">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-2 text-cyan-400">
                              <Clock size={16} />
                              <span className="text-sm">{session.time}</span>
                            </div>
                          </div>
                          <h4 className="text-white text-xl mb-2">{session.title}</h4>
                          <p className="text-purple-400 mb-3">{session.speaker}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <MapPin size={14} />
                              {session.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users size={14} />
                              {session.attendees}
                            </div>
                          </div>
                        </div>

                        <button onClick={() => addToCalendar(session)} className="px-6 py-3 bg-purple-600/20 border border-purple-500/50 rounded-full text-purple-400 hover:bg-purple-600 hover:text-white transition-all whitespace-nowrap mt-4 lg:mt-0">
                          Kalendarga qo‘shish
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
