import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';
import Link from 'next/link';

export function AppBar({ email }: { email?: string }) {
  return (
    <div className="flex items-center justify-between bg-white px-12 py-[4px]">
      <div className="flex items-center space-x-24 font-medium">
        <a href="https://mugen-ai-ad.d-cri.jp/" target="_blank" rel="noopener noreferrer">
          <Image src="/logo.svg" alt="logo" width={80} height={40} />
        </a>
        <div className="group text-primary-text relative">
          <Link href="/">∞AI LP</Link>
          <div className="absolute bottom-[-14px] mt-2 h-[3px] w-full rounded-lg bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
        </div>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-pointer rounded-full p-2 hover:bg-zinc-50">
              <Image src="/account_circle.svg" alt="pin" width={24} height={24} className="size-6" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="p-8" align="end">
            <div className="text-secondary-text text-lg">{email}</div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
