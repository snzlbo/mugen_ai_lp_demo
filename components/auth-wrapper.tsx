'use client';
import { AppBar } from '@/components/parts/app-bar';
import { Bread } from '@/components/parts/bread';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useStateStore } from '@/store/state';
import { type UserState, useUserStore } from '@/store/user';
import { SessionProvider, signIn, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <InnerAuthWrapper>{children}</InnerAuthWrapper>
    </SessionProvider>
  );
}

function InnerAuthWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const { setUser } = useUserStore();
  useEffect(() => {
    setUser(session as UserState);
  }, [session, setUser]);
  const pathname = usePathname();
  const { getScoreLoading, getMomentLoading } = useStateStore();
  const showBreadOnPages = ['/', '/detail', '/refresh-moments', '/refresh-moments/result'];

  return (
    <>
      <AppBar email={session?.user?.email ?? ''} />
      <main className="relative flex grow flex-col space-y-2">
        <video
          className={cn('background-video', pathname === '/error' || getScoreLoading ? 'opacity-20' : 'opacity-50')}
          src="/background.mp4"
          autoPlay
          loop
          playsInline
          muted
        />
        <div className="z-10 flex grow flex-col p-12">
          {!getScoreLoading && !getMomentLoading && showBreadOnPages.includes(pathname) ? <Bread /> : null}
          {children}
        </div>
      </main>
    </>
  );

  if (status === 'loading') {
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-500 border-t-transparent"></div>
    </div>;
  }

  if (!session && status !== 'loading') {
    return (
      <div className="mx-auto grid min-h-screen max-w-xl items-center">
        <Button onClick={() => signIn('okta')}>Sign in with Okta</Button>
      </div>
    );
  } else if (session) {
    return (
      <>
        <AppBar email={session?.user?.email ?? ''} />
        <main className="relative flex grow flex-col space-y-2">
          <video
            className={cn('background-video', pathname === '/error' || getScoreLoading ? 'opacity-20' : 'opacity-50')}
            src="/background.mp4"
            autoPlay
            loop
            playsInline
            muted
          />
          <div className="z-10 flex grow flex-col p-12">
            {!getScoreLoading && !getMomentLoading && showBreadOnPages.includes(pathname) ? <Bread /> : null}
            {children}
          </div>
        </main>
      </>
    );
  }
}
