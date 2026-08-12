import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyAttendSection from './components/WhyAttendSection';
import AboutGrid from './components/AboutGrid';
import SpeakersSection from './components/SpeakersSection';
import CommunityPartnersSection from './components/CommunityPartnersSection';
import AgendaSection from './components/AgendaSection';
import TicketSection from './components/TicketSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ComingSoon from './components/ComingSoon';

function MarqueeBanner({ words, speed = 'normal', variant = 'default' }) {
  const repeated = [...words, ...words, ...words, ...words, ...words, ...words];
  const speedClass = speed === 'fast' ? 'animate-marquee-fast' : speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee';

  if (variant === 'bold') {
    return (
      <div className="w-full overflow-hidden select-none py-5 sm:py-6 bg-[#EE4B15] relative z-20">
        <div className={`flex whitespace-nowrap ${speedClass}`}>
          {repeated.map((word, i) => (
            <span key={i} className="inline-flex items-center gap-4 sm:gap-6 mx-4 sm:mx-6">
              <span className="text-sm sm:text-base md:text-lg font-blackhan uppercase tracking-wider text-white">{word}</span>
              <span className="text-white/60 text-xs">✦</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'outline') {
    return (
      <div className="w-full overflow-hidden select-none py-6 sm:py-8 relative z-20">
        <div className={`flex whitespace-nowrap ${speedClass}`}>
          {repeated.map((word, i) => (
            <span key={i} className="inline-flex items-center gap-5 sm:gap-8 mx-5 sm:mx-8">
              <span
                className="text-3xl sm:text-4xl md:text-5xl font-blackhan uppercase tracking-tight"
                style={{
                  WebkitTextStroke: '1.5px #FF8A50',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {word}
              </span>
              <span className="text-[#FF8A50] text-sm">✦</span>
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden select-none py-4 sm:py-5 border-y border-white/5 relative z-20">
      <div className={`flex whitespace-nowrap ${speedClass}`}>
        {repeated.map((word, i) => (
          <span key={i} className="inline-flex items-center gap-3 sm:gap-5 mx-3 sm:mx-5">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-slate-400">{word}</span>
            <span className="text-[#EE4B15] text-[8px]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (

    <div className="relative min-h-screen bg-[#090D2B] flex flex-col justify-between overflow-x-hidden font-display noise-overlay">

      {/* Fixed dot grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-80"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* Ambient glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(238,75,21,0.06),transparent_50%)] pointer-events-none z-0" />

      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Bold Orange Marquee Banner */}
      <MarqueeBanner
        words={['INNOVATEX CONNECT 26', 'DEV CONFERENCE', 'BOOTCAMP', 'COMMUNITY MEETUP', 'NETWORKING', 'BUILD • SHIP • DEMO']}
        variant="bold"
        speed="normal"
      />

      {/* About Section */}
      <AboutGrid />

      {/* Large Outline Text Marquee */}
      <MarqueeBanner
        words={['NETWORKING', 'INSPIRING TALKS', 'OPPORTUNITIES', 'SWAGS & GOODIES', 'TECH DEMOS']}
        variant="outline"
        speed="slow"
      />

      {/* Why Attend Section */}
      <WhyAttendSection />

      {/* Subtle Marquee Divider */}
      <MarqueeBanner
        words={['REACT', 'NEXT.JS', 'AI/ML', 'OPEN SOURCE', 'DEVOPS', 'SYSTEM DESIGN', 'STARTUPS', 'WEB3', 'MOBILE', 'CLOUD']}
        speed="fast"
      />

      {/* Coming Soon Section */}
      <ComingSoon />
      {/* Speakers Section */}
      {/* <div className="max-w-6xl mx-auto w-full px-3 sm:px-6 md:px-12 relative z-10">
        <SpeakersSection />
      </div> */}

      {/* Bold Orange Marquee Before Agenda
      <MarqueeBanner
        words={['PROBLEM DISCOVERY', 'RAPID BUILDING', 'PROJECT SHOWCASE', 'PEER FEEDBACK', 'LIVE DEMOS', 'EXECUTION']}
        variant="bold"
        speed="fast"
      /> */}

      {/* Community Partners */}
      <CommunityPartnersSection />

      {/* Agenda Section */}
      {/* <div className="max-w-6xl mx-auto w-full px-3 sm:px-6 md:px-12 relative z-10">
        <AgendaSection />
      </div> */}

      {/* Ticket Section */}
      <div className="max-w-6xl mx-auto w-full px-3 sm:px-6 md:px-12 relative z-10">
        <TicketSection />
      </div>

      {/* Outline Marquee Before FAQ */}
      <MarqueeBanner
        words={['GOT QUESTIONS?', 'WE GOT ANSWERS', 'FAQ', 'SUPPORT', 'HELP']}
        variant="bold"
        speed="slow"
      />

      {/* FAQ Section */}
      <div className="px-3 sm:px-6 md:px-12 relative z-10">
        <FaqSection />
      </div>

      {/* Contact Section */}
      {/* <div className="px-3 sm:px-6 md:px-12 relative z-10">
        <ContactSection />
      </div> */}

      {/* Footer */}
      <Footer />

    </div>
  );
}
