'use client';

import DetailAnalysis from '@/components/pages/detail/analysis';
import DetailChart from '@/components/pages/detail/chart';
import DetailLegends from '@/components/pages/detail/legends';
import DetailSummary from '@/components/pages/detail/summary';
import { Button } from '@/components/ui/button';
import { useResultStore } from '@/store/result';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Detail() {
  const { downloadData } = useResultStore();
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // function downloadFile(downloadData?: { url?: string; orig_name?: string | null }) {
  //   const downloadUrl = downloadData?.url;
  //   const origName = downloadData?.orig_name ?? 'download.xlsx';
  //   if (!downloadUrl) return;

  //   fetch(downloadUrl)
  //     .then((res) => res.blob())
  //     .then((blob) => {
  //       const blobUrl = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = blobUrl;
  //       a.download = origName;
  //       document.body.appendChild(a);
  //       a.click();
  //       document.body.removeChild(a);
  //       window.URL.revokeObjectURL(blobUrl);
  //     });
  // }

  function downloadFile(downloadData?: { url?: string; orig_name?: string | null }) {
    if (!downloadData) return;

    if (downloadData.url) {
        fetch(downloadData.url)
          .then(res => {
            if(!res.ok) throw new Error(`File not found: ${res.statusText}`);
            return res.blob();
          })
          .then(blob => {
              console.log("mime:", blob.type);
              const blobUrl = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = blobUrl;
              a.download = downloadData.orig_name ?? 'download.xlsx';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(blobUrl);
          })
          .catch(e => alert(e.message));
    } 
    else if (downloadData instanceof ArrayBuffer || downloadData instanceof Uint8Array) {
        const file = new Blob([downloadData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const a = document.createElement('a');
        const blobUrl = window.URL.createObjectURL(file);
        a.href = blobUrl;
        a.download = downloadData.orig_name ?? 'output.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
    } 
}

  return (
    <div className="flex flex-col space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-primary-text text-3xl font-bold">競合分析結果</h1>
        <Button
          type="button"
          onClick={() => downloadFile(downloadData ?? undefined)}
          className="flex cursor-pointer items-center rounded-full py-5 text-sm font-medium shadow-xl"
        >
          <span className="ml-9">ダウンロード</span>
          <span className="ml-[32px]">
            <Image src="/download.svg" alt="pin" width={12} height={12} />
          </span>
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-1 self-end">
          <DetailLegends />
        </div>
        <div className="col-span-3 min-w-[630px]">
          <DetailChart />
        </div>
        <div className="col-span-2 flex flex-col items-end justify-end space-y-4">
          <DetailSummary />
        </div>
      </div>
      <Link href="/refresh-moments" className="self-end">
        <Button type="button" className="bg-main-button hover:bg-corporate/90 cursor-pointer rounded-full px-16 py-5 text-sm font-medium shadow-xl">
          改善案を生成
        </Button>
      </Link>
      <DetailAnalysis />
    </div>
  );
}
