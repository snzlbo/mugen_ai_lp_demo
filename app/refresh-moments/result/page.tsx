'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useResultStore } from '@/store/result';
import { useEffect, useRef, useState } from 'react';

export default function MomentResultPage() {
  const tableRef = useRef<HTMLTableElement>(null);
  const [colWidth, setColWidth] = useState(0);
  const { momentResult } = useResultStore();
  useEffect(() => {
    if (tableRef.current) {
      setColWidth(tableRef.current.offsetWidth / 4);
    }
  }, [tableRef, momentResult]);
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
  return (
    <div className="flex h-full grow flex-col space-y-8">
      <div className="space-y-8">
        <h1 className="text-primary-text text-3xl font-bold">訴求テーマの確認</h1>
        <div className="flex flex-col space-y-8 rounded-xl bg-white/80 p-8">
          <div className="self-center">
            <div className="w-[24rem] space-y-4 px-8 py-4">
              <div className="relative flex w-full items-center justify-between">
                <div className="bg-non-color absolute top-2/4 left-0 h-0.5 w-full -translate-y-2/4"></div>
                <div className="bg-non-color absolute top-2/4 left-0 h-0.5 w-full -translate-y-2/4 transition-all duration-500"></div>
                <div className="bg-non-color relative z-10 grid h-9 w-9 place-items-center rounded-full font-bold text-white transition-all duration-300">
                  1<div className="text-secondary-text absolute -bottom-6 w-max text-center text-sm font-medium">モーメントの確認</div>
                </div>

                <div className="bg-corporate relative z-10 grid h-6 w-6 place-items-center rounded-full font-bold text-white transition-all duration-300">
                  <div className="z-10">2</div>
                  <div className="bg-corporate/40 absolute z-0 size-9 rounded-full"></div>
                  <div className="absolute -bottom-[1.9rem] w-max text-center text-sm font-medium text-black!">訴求テーマの確認</div>
                </div>

                <div className="bg-non-color relative z-10 grid h-9 w-9 place-items-center rounded-full font-bold text-white transition-all duration-300">
                  3<div className="text-secondary-text absolute -bottom-6 w-max text-center text-sm font-medium">改善案作成</div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-primary-text text-2xl font-bold">訴求テーマの確認</h2>
            <div className="font-medium">修正したい場合は上部の「モーメントの確認」を編集し、再度実行してください。</div>
          </div>
          <Table className="w-full table-fixed border-separate border-spacing-0" ref={tableRef}>
            <TableHeader className="bg-zinc-100">
              <TableRow>
                <TableHead
                  className="border-r border-b"
                  style={{
                    width: colWidth,
                  }}
                >
                  方針
                </TableHead>
                {Array.from({
                  length: Array.isArray(momentResult?.data) ? momentResult.data.length : 0,
                }).map((_, index) => (
                  <TableHead
                    key={index}
                    className="border-r border-b last:border-r-0"
                    style={{
                      width: `${colWidth}px`,
                    }}
                  >
                    {index + 1}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {momentResult?.headers.map((header, index) => (
                <TableRow key={index}>
                  <TableCell className="border-r border-b px-4 py-2 last:border-r-0">{header}</TableCell>
                  {momentResult?.data.map((data, index) => (
                    <TableCell key={index} className="border-r border-b px-4 py-2 last:border-r-0">
                      {data[index]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
