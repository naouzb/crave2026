import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CRAVE2026 | Sensory Food Discovery & Restaurant Management Engine',
  description: 'Next-generation sensory food discovery platform with dark aesthetic, real-time chef chat, and business management.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-foreground antialiased selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
