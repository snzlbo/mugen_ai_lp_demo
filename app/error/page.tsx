'use client';
import { Button } from '@/components/ui/button';
import { TriangleAlertIcon } from 'lucide-react';

export default function ErrorPage() {
  function goTop() {
    window.location.href = '/';
  }
  return (
    <div className="flex grow flex-col items-center justify-center space-y-4">
      <div className="flex items-center space-x-4">
        <div>
          <TriangleAlertIcon className="size-8 text-[#DA2A2A]" />
        </div>
        <div>エラーになりました。最初からやり直してください。</div>
      </div>
      <Button
        className="bg-main-button hover:bg-corporate/90 cursor-pointer self-center rounded-full px-16 py-5 text-sm font-medium shadow"
        onClick={goTop}
      >
        トップに戻る
      </Button>
    </div>
  );
}
