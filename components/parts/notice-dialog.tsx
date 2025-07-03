'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useGlobalStore } from '@/store/global';
import Image from 'next/image';
import { useEffect } from 'react';

const notices = [
  {
    image: '/notice/1.png',
    text: 'JS設定によってキャプチャが取得できないページ',
    index: '①',
  },
  {
    image: '/notice/2.png',
    text: 'FVにカルーセルや動画が表示されているページ',
    index: '②',
  },
  {
    image: '/notice/3.png',
    text: 'ページアクセスと同時にポップアップが表示されるページ',
    index: '③',
  },
];
const NoticeView: React.FC<{ image: string; text: string; index: string }> = ({ image, text, index }) => {
  return (
    <div className="flex flex-col space-y-4">
      <Image src={image} alt="" width={200} height={200} priority={true} loading="eager" className="h-[212px] w-[120px] self-center object-cover" />
      <div className="flex space-x-1">
        <div className="text-sm">{index}</div>
        <div className="text-sm font-medium">{text}</div>
      </div>
    </div>
  );
};

export function NoticeDialog() {
  const state = useGlobalStore((state) => state.noticeDialog);
  const setNoticeDialog = useGlobalStore((state) => state.setNoticeDialog);

  useEffect(() => {
    setNoticeDialog(true);
  }, [setNoticeDialog]);

  const handleDialog = (state: boolean) => {
    setNoticeDialog(state);
    localStorage.setItem('terms', 'true');
  };

  return (
    <Dialog open={state} onOpenChange={handleDialog}>
      <DialogContent
        className="space-y-4 p-0 shadow-none outline-2 outline-offset-0 outline-red-500 outline-solid sm:max-w-[720px]"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        onInteractOutside={(e) => {
          e.preventDefault();
          const dialog = document.querySelector('[data-slot="dialog-content"]') as HTMLElement;
          dialog.classList.remove('animate-shake');
          void dialog.offsetWidth; // Trigger reflow to restart animation
          dialog.classList.add('animate-shake');
        }}
      >
        <DialogHeader className="space-y-4">
          <DialogTitle className="flex items-center justify-center space-x-2 px-4 pt-6">
            <Image src="/attention.svg" alt="attention" width={32} height={32} className="size-8 items-center" />
            <div className="text-center text-2xl">ご利用前の注意</div>
          </DialogTitle>
          <Separator />
          <DialogDescription className="text-sm-2 text-primary-text my-0! px-8 pb-12 text-[13px] font-medium">
            以下のようなページは一部の項目で分析ができない可能性があります
          </DialogDescription>
          <div className="flex flex-col space-y-4 px-12">
            <div className="grid grid-cols-3 gap-8">
              {notices.map((notice, index) => (
                <NoticeView key={index} image={notice.image} text={notice.text} index={notice.index} />
              ))}
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="mb-10 flex px-8 sm:justify-center">
          <Button
            type="submit"
            className="cursor-pointer self-center rounded-full px-17 py-5 text-sm font-medium text-white shadow-xl disabled:shadow-none"
            onClick={() => handleDialog(false)}
          >
            同意する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
