import Image from 'next/image';
import { ModeToggle } from '@/components/theme-toggle';

export function AppBar() {
  return (
    <div className="flex items-center justify-between bg-white px-4 py-2 dark:bg-zinc-900">
      <div className="flex items-center space-x-6 font-medium">
        <div>
          <Image
            src="/logo.svg"
            alt="logo"
            width={80}
            height={40}
            priority={true}
            className="h-auto w-full"
          />
        </div>
        <div className="text-zinc-700 dark:text-zinc-100">
          <a href="#">∞AI Ads</a>
        </div>
        <div className="relative text-zinc-900 dark:text-zinc-100">
          <a href="#">∞AI LP</a>
          <div className="absolute bottom-[-6px] mt-2 h-[3px] w-full rounded-lg bg-blue-500"></div>
        </div>
        <div className="text-zinc-700 dark:text-zinc-100">
          <a href="#">LAB</a>
        </div>
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}
