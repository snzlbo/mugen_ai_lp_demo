import { AppBar } from '@/components/parts/app-bar';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
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
      <body
        className={`${notoSans.variable} ${notoMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppBar />
          <main className="flex grow flex-col space-y-2 min-h-screen bg-gradient-to-b from-[#c9e8ff] to-[#89bcff] px-12 py-6">
            {/* <Bread /> */}
            <div>{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
