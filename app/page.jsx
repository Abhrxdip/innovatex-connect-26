import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyAttendSection from './components/WhyAttendSection';
import AboutGrid from './components/AboutGrid';
import SpeakersSection from './components/SpeakersSection';
import AgendaSection from './components/AgendaSection';
import TicketSection from './components/TicketSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#F8FAFC] bg-grid-pattern flex flex-col justify-between overflow-x-hidden font-display">

      {/* Soft Radial Blue/Purple Glows - Adjusted for Light Theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/25 blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-250/20 blur-[170px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[30%] left-[40%] w-[35%] h-[35%] rounded-full bg-cyan-155/25 blur-[125px] pointer-events-none" />

      {/* Header / Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Why Attend Section - Second Hero */}
      <WhyAttendSection />

      {/* Ticket Perforation Transition and Next Section */}
      <div className="w-full relative z-30 flex flex-col mt-0 sm:mt-4">

        {/* The thick horizontal royal-blue strip (#3B34A8) with Perforated Edge */}
        <div className="w-full ticket-perforation-top h-14" />

        {/* Overlapping large white content container with rounded top corners. */}
        <section className="relative z-40 -translate-y-5 bg-white bg-graph-pattern rounded-t-[32px] sm:rounded-t-[42px] shadow-[0_-15px_40px_rgba(0,0,0,0.12)] pt-16 sm:pt-20 pb-10 px-3 sm:px-6 md:px-12 border-t border-slate-100">

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

          {/* Blueprint separator line with + markers */}
          <div className="relative w-full flex items-center justify-between px-4 mt-4 mb-2 select-none opacity-45">
            <span className="text-slate-400 font-mono text-sm font-bold">+</span>
            <div className="flex-1 h-px border-t border-dashed border-slate-355 mx-2" />
            <span className="text-slate-400 font-mono text-sm font-bold">+</span>
          </div>

          {/* Scalloped Bottom Edge of the white section */}
          <div
            className="absolute -bottom-[6px] left-0 w-full h-[12px] z-40 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 10px 0px, #FFF 5.5px, transparent 6px)',
              backgroundSize: '20px 12px',
              backgroundRepeat: 'repeat-x'
            }}
          />

        </section>

      </div>

      {/* Footer Section */}
      <Footer />

    </div>
  );
}
