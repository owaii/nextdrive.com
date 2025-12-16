// layout.tsx
import "../styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Libre_Baskerville } from "next/font/google";
import ClientToaster from "@/components/ClientToaster";

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jazdy doszkalające Najtaniej na rynku Warszawa",
  description: "Najlepsze oraz Najtańsze Jazdy Doszkalające w Warszawie",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

// layout.tsx stays **server component**
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Render Toaster as a Client Component */}
        <ClientToaster />
        {children}
      </body>
    </html>
  );
}
