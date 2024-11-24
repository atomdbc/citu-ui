// app/layout.js
import { Work_Sans } from 'next/font/google';
import './globals.css';

const workSans = Work_Sans({ 
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
});

export const metadata = {
  title: 'citu',
  description: 'Find your dream property in Ivory Coast',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={workSans.variable}>
      <body className="min-h-screen w-full m-0 p-0 bg-white font-work-sans">
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}