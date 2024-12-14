// src/app/layout.js
import { Work_Sans } from 'next/font/google';
import './globals.css';

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://citu.ci'),
  title: {
    default: 'citu | Premier Real Estate Platform in Ivory Coast',
    template: '%s | Citu'
  },
  description: 'Discover luxury properties in Abidjan - Cocody, Plateau, Riviera. Modern apartments, houses, and villas for sale and rent in Côte d\'Ivoire.',
  keywords: 'real estate Ivory Coast, properties Abidjan, apartments Cocody, Plateau properties, Riviera villas, houses for sale Abidjan, immobilier Côte d\'Ivoire',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-verification-code',
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'fr': '/fr',
    },
  },
  openGraph: {
    siteName: 'Citu',
    type: 'website',
    title: 'Citu - Find Your Dream Property in Ivory Coast',
    description: 'Browse luxury properties in Abidjan\'s prime locations - Cocody, Plateau, Riviera. Modern living spaces in Côte d\'Ivoire.',
    images: [
      {
        url: '/images/hero.png',
        width: 1200,
        height: 630,
        alt: 'Citu - Real Estate Platform',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html className={workSans.variable}>
      <body className="min-h-screen w-full m-0 p-0 bg-white font-work-sans">
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}