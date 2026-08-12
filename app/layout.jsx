import { Geist, Geist_Mono, Syne, Orbitron, BBH_Hegarty, Bricolage_Grotesque, Black_Han_Sans, Roboto } from "next/font/google";
import { TicketProvider } from "./state_management/ticket_store"
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const bbh = BBH_Hegarty({
  variable: "--font-bbh",
  subsets: ["latin"],
  adjustFontFallback: false,
  weight: "400",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

const blackHanSans = Black_Han_Sans({
  variable: "--font-blackhan",
  subsets: ["latin"],
  weight: ["400"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "InnovateX Connect'26",
  description: "Largest DevConference of InnovateX ever.",
  keywords: ['Connect', 'InnovateX', "InnovateX Community", "InnovateXcom", "DevConference", "JIS Kolkata", "Kolkata events", "events"],
  icons: {
    icon: {
      url: "/favicon.png?v=1",
    },
  },
};


export const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  'name': 'InnovateX Community DevConference',
  'startDate': '2026-10-05T09:00:00+05:30', // Use ISO 8601 date format (YYYY-MM-DD)
  'endDate': '2026-10-05T18:00:00+05:30',
  'eventAttendanceMode': 'physical', // Physical event
  'eventStatus': 'registrations open',
  'location': {
    '@type': 'Place',
    'name': 'JIS College of Engineering (or specific JIS campus)',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Block A, Phase III, Kalyani', // Update with exact campus address
      'addressLocality': 'Kolkata',
      'addressRegion': 'WB',
      'postalCode': '741235',
      'addressCountry': 'IN'
    }
  },
  'image': [
    'https://connect.innovatexcom.xyz/banner.png' // High-res event banner
  ],
  'description': 'The ultimate tech community gathering and developer conference in Kolkata.',
  'offers': {
    '@type': 'Offer',
    'url': 'https://connect.innovatexcom.xyz/dashboard', // Link to your registration/ticket page
    'price': '0', // Set price, or "500" if it is a paid event
    'priceCurrency': 'INR',
    'availability': 'available',
    'validFrom': '2026-08-12'
  },
  'performer': {
    '@type': 'Organization',
    'name': 'InnovateX Community'
  },
  'organizer': {
    '@type': 'Organization',
    'name': 'InnovateX',
    'url': 'https://innovatexcom.xyz'
  }
};


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${orbitron.variable} ${bbh.variable} ${bricolage.variable} ${blackHanSans.variable} ${roboto.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col"><TicketProvider>{children}</TicketProvider>  <script dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} id="root-event-schema"
        type="application/ld+json" strategy="afterInteractive" ></script>  <Navbar /></body>

    </html>
  );
}
