import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import './globals.css';
import CursorGlow from '@/components/ui/CursorGlow';
import Navbar from '@/components/layout/Navbar';
import BootLoader from '@/components/ui/BootLoader';
import TerminalWidget from '@/components/ui/TerminalWidget';
import SystemStatus from '@/components/ui/SystemStatus';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' });

export const metadata: Metadata = {
  title: 'Yash Bhosale | Cybersecurity Engineer',
  description: 'Premium cybersecurity portfolio showcasing red teaming, vulnerability hunting, and secure development.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${firaCode.variable} antialiased selection:bg-neon-green/30 selection:text-neon-green bg-bg-main text-text-main relative min-h-screen`}>
        <BootLoader />
        <CursorGlow />
        <Navbar />
        {children}
        <SystemStatus />
        <TerminalWidget />
      </body>
    </html>
  );
}
