import { Geist, Geist_Mono, Syne, Orbitron, BBH_Hegarty, Bricolage_Grotesque, Black_Han_Sans, Roboto } from "next/font/google";
import { TicketProvider } from "./state_management/ticket_store"
import "./globals.css";

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
  description: "Step in, become an AI-native founder.",
  icons: {
    icon: {
      url: "/favicon.png?v=1",
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${orbitron.variable} ${bbh.variable} ${bricolage.variable} ${blackHanSans.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col"><TicketProvider>{children}</TicketProvider></body>
    </html>
  );
}
