import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useRef, useState } from 'react';

export default function PreAnalysisCheck() {
  const tableRef = useRef<HTMLTableElement>(null);
  const [colWidth, setColWidth] = useState(0);
  useEffect(() => {
    if (tableRef.current) {
      const tableWidth = tableRef.current.offsetWidth - 250;
      const numColumns = Math.max(4, +1);
      const newColWidth = Math.floor(tableWidth / numColumns);
      setColWidth(Math.max(newColWidth, 250));
    }
  }, [tableRef]);
  return (
    <div className="mt-10 flex flex-col space-y-8">
      <div className="flex items-center space-x-4">
        <h2 className="text-primary-text text-2xl font-bold">分析するLPを確認</h2>
        <div className="text-secondary-text text-sm">※ 差し替えたい時は上部からURLを変更し、「確認する」を再度実行してください。</div>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full table-fixed border-separate border-spacing-0" ref={tableRef}>
          <TableHeader className="bg-zinc-100">
            <TableRow>
              <TableHead className="border-non-color sticky left-0 z-10 w-[250px] border-r border-b bg-zinc-100 px-4 py-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">タイトル</div>
                  <Image src="/pin.svg" alt="pin" width={24} height={24} className="size-6 items-center" />
                </div>
              </TableHead>
              <TableHead
                style={{
                  width: `${colWidth}px`,
                }}
                className="border-non-color sticky left-[250px] z-10 border-r-4 border-b border-double bg-zinc-100 px-4 py-2"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm">自社</div>
                  <Image src="/pin.svg" alt="pin" width={24} height={24} className="size-6 items-center" />
                </div>
              </TableHead>
              {Array.from({ length: 3 }).map((_, idx) => (
                <TableHead key={idx} className="border-r border-b px-4 py-2 last:border-r-0" style={{ width: `${colWidth}px` }}>
                  競合{idx + 1}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="h-16 min-h-16">
              <TableCell className="border-non-color sticky left-0 z-10 border-r border-b bg-[#F8FBFD] p-4 font-medium">分析対象</TableCell>
              <TableCell className="border-non-color sticky left-[250px] z-10 border-r-4 border-b border-double bg-[#F8FBFD] p-4"></TableCell>
              {Array.from({ length: 3 }).map((_, idx) => (
                <TableCell key={idx} className="border-r border-b p-4! text-center last:border-r-0">
                  <Checkbox className="cursor-pointer bg-white" />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="border-non-color sticky left-0 z-10 border-r border-b bg-[#F8FBFD] p-4 align-middle font-medium">
                サムネイル
              </TableCell>
              <TableCell className="border-non-color sticky left-[250px] z-10 border-r-4 border-b border-double bg-[#F8FBFD] p-4">
                <div className="border-non-color mx-auto max-h-[253px] w-[129px] overflow-hidden border">
                  <div className="border-non-color mx-auto max-h-[253px] w-[129px] overflow-hidden border">
                    <Image src="/test.png" alt="thumbnail" width={500} height={500} className="h-auto w-full" />
                  </div>
                </div>
              </TableCell>
              {Array.from({ length: 3 }).map((_, idx) => (
                <TableCell key={idx} className="border-r border-b p-4 last:border-r-0">
                  <div className="border-non-color mx-auto max-h-[253px] w-[129px] overflow-hidden border">
                    <Image src="/test.png" alt="thumbnail" width={500} height={500} className="h-auto w-full" />
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Button
        type="button"
        className="bg-disabled hover:bg-main-button/90 self-center rounded-full px-16 py-6 text-base font-medium text-white shadow-none"
      >
        競合分析する
      </Button>
    </div>
  );
}
