import { AuthWrapper } from '@/components/auth-wrapper';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Noto_Sans_JP, Noto_Sans_Mono } from 'next/font/google';
import './globals.css';

const notoSans = Noto_Sans_JP({
  variable: '--font-noto-sans',
  subsets: ['latin'],
  adjustFontFallback: false,
});

const notoMono = Noto_Sans_Mono({
  variable: '--font-noto-mono',
  subsets: ['latin'],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: '∞AI LP',
  description: '∞AI LP',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${notoSans.variable} ${notoMono.variable} flex min-h-screen flex-col font-sans antialiased`}>
        <AuthWrapper>{children}</AuthWrapper>
        <Toaster />
      </body>
    </html>
  );
}
