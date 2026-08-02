import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutGrid from './components/AboutGrid';
import SpeakersSection from './components/SpeakersSection';
import AgendaSection from './components/AgendaSection';
import TicketSection from './components/TicketSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white bg-grid-pattern flex flex-col justify-between overflow-x-hidden font-display">
      
      {/* Soft Radial Blue/Purple Glows - Adjusted for Light Theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/25 blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-250/20 blur-[170px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[30%] left-[40%] w-[35%] h-[35%] rounded-full bg-cyan-155/25 blur-[125px] pointer-events-none" />

      {/* Header / Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Ticket Perforation Transition and Next Section */}
      <div className="w-full relative z-30 flex flex-col mt-12">
        
        {/* The thick horizontal royal-blue strip (#3B34A8) with Perforated Edge */}
        <div className="w-full ticket-perforation-top h-14" />
        
        {/* 
          Overlapping large white content container with rounded top corners.
          Using repeating graph paper background.
        */}
        <section className="relative z-40 -translate-y-5 bg-white bg-graph-pattern rounded-t-[42px] shadow-[0_-15px_40px_rgba(0,0,0,0.12)] pt-20 pb-28 px-6 md:px-12 border-t border-slate-100">
          
          {/* About Grid */}
          <AboutGrid />

          {/* Speakers Section */}
          <SpeakersSection />

          {/* Agenda / Event Schedule Section */}
          <AgendaSection />

          {/* Ticket / Carnival Pass Section */}
          <TicketSection />

          {/* FAQ Section */}
          <FaqSection />

          {/* Inquiry / Contact Section */}
          <ContactSection />

        </section>

      </div>

      {/* Footer Section */}
      <Footer />

    </div>
  );
}
