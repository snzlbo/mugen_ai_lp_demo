import ScoreSwitch from '@/components/pages/detail/score-switch';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { gradeConversion } from '@/services/grade-conversion';
import { useResultStore } from '@/store/result';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function DetailAnalysis() {
  const { scoreDict, urlMapping, scoreTotal, urlCategoryScores, showPercentage, swotTable } = useResultStore();
  const [colWidth, setColWidth] = useState(0);
  const tableRef = useRef<HTMLTableElement>(null);
  useEffect(() => {
    if (tableRef.current) {
      const tableWidth = tableRef.current.offsetWidth - 250;
      const widthDivided = (urlMapping?.length ?? 0) < 4 ? 4 : (urlMapping?.length ?? 0);
      const newColWidth = Math.floor(tableWidth / widthDivided);
      setColWidth(newColWidth);
    }
  }, [tableRef, urlMapping?.length]);
  const [fvOpen, setFvOpen] = useState(false);
  const [ctaOpen, setCtaOpen] = useState(false);
  const [contentsOpen, setContentsOpen] = useState(false);
  const [creativeOpen, setCreativeOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-4 rounded-xl bg-white/80 p-8">
      <div className="flex items-center justify-between space-x-4">
        <div className="text-primary-text text-xl font-bold">競合比較詳細</div>
        <div>
          <ScoreSwitch />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full table-fixed border-separate border-spacing-0" ref={tableRef}>
          <TableHeader className="bg-zinc-100">
            <TableRow>
              <TableHead className="sticky left-0 z-10 w-[250px] border-r border-b bg-zinc-100 px-4 py-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">タイトル</div>
                  <Image src="/pin.svg" alt="pin" width={24} height={24} className="size-6 items-center" />
                </div>
              </TableHead>
              <TableHead
                style={{
                  width: `${colWidth}px`,
                }}
                className="sticky left-[250px] z-10 border-r-4 border-b border-double bg-zinc-100 px-4 py-2"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm">自社</div>
                  <Image src="/pin.svg" alt="pin" width={24} height={24} className="size-6 items-center" />
                </div>
              </TableHead>
              {urlMapping?.slice(1).map((_, index) => (
                <TableHead
                  key={index}
                  style={{
                    width: `${colWidth}px`,
                  }}
                  className="border-r border-b px-4 py-2 last:border-r-0"
                >
                  競合{index + 1}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="h-16 min-h-16">
              <TableCell className="sticky left-0 z-10 border-r border-b bg-[#F8FBFD] p-4 align-middle font-medium">サービス名</TableCell>
              <TableCell className="sticky left-[250px] z-10 border-r-4 border-b border-double bg-[#F8FBFD] p-4 align-middle font-medium underline underline-offset-2">
                <Link href={scoreDict?.[urlMapping?.[0].url ?? '']?.url ?? ''} target="_blank">
                  {scoreDict?.[urlMapping?.[0].url ?? '']?.title ?? ''}
                </Link>
              </TableCell>
              {urlMapping?.slice(1).map((item, index) => (
                <TableCell
                  key={index}
                  className={cn(
                    'border-r border-b p-4 align-middle font-medium break-all whitespace-normal underline underline-offset-2 last:border-r-0',
                  )}
                >
                  <Link href={item.url ?? ''} target="_blank">
                    {scoreDict?.[item.url ?? '']?.title ?? ''}
                  </Link>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="sticky left-0 z-10 border-r border-b bg-[#F8FBFD] p-4 align-middle font-medium">サムネイル</TableCell>
              <TableCell className="sticky left-[250px] z-10 border-r-4 border-b border-double bg-[#F8FBFD] p-4">
                <div className="border-non-color mx-auto max-h-[253px] w-[129px] overflow-hidden border">
                  <Image
                    src={
                      typeof scoreDict?.[urlMapping?.[0].url ?? '']?.image_full === 'string' &&
                      scoreDict?.[urlMapping?.[0].url ?? '']?.image_full.startsWith('/dummy')
                        ? scoreDict?.[urlMapping?.[0].url ?? '']?.image_full
                        : `data:image/png;base64,${scoreDict?.[urlMapping?.[0].url ?? '']?.image_full}`
                    }
                    alt="thumbnail"
                    width={500}
                    height={500}
                    className="h-auto w-full"
                    priority={true}
                  />
                </div>
              </TableCell>
              {urlMapping?.slice(1).map((item, index) => (
                <TableCell key={index} className={cn('border-r border-b p-4 last:border-r-0')}>
                  <div className="border-non-color mx-auto max-h-[253px] w-[129px] overflow-hidden border">
                    <Image
                      src={
                        typeof scoreDict?.[item.url ?? '']?.image_full === 'string' && scoreDict?.[item.url ?? '']?.image_full.startsWith('/dummy')
                          ? scoreDict?.[item.url ?? '']?.image_full
                          : `data:image/png;base64,${scoreDict?.[item.url ?? '']?.image_full}`
                      }
                      alt="thumbnail"
                      width={500}
                      height={500}
                      className="h-auto w-full"
                      priority={true}
                    />
                  </div>
                </TableCell>
              ))}
            </TableRow>
            <TableRow className="h-16">
              <TableCell className="sticky left-0 z-10 border-r border-b bg-[#F8FBFD] p-4 align-middle font-medium">
                <div className="flex h-[22px] items-center space-x-1">
                  <div>総合スコア</div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="bg-secondary-text mt-[2px] flex h-4 w-4 cursor-pointer items-center justify-center rounded-full text-xs text-white">
                          ?
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="w-[250px] max-w-[250px] p-4 text-center text-xs font-medium">
                        <p>
                          5つのカテゴリ別スコアを合計し、全体の達成度を100を上限とする数値で評価したもの。総合スコアが高いほど優れたUI/UXと言える。
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
              <TableCell className="text-corporate sticky left-[250px] z-10 border-r-4 border-b border-double bg-[#F8FBFD] p-4 text-center align-middle text-2xl font-medium">
                {scoreTotal?.[urlMapping?.[0].url ?? ''] ?? 'N/A'}
              </TableCell>
              {urlMapping?.slice(1).map((item, index) => (
                <TableCell key={index} className={cn('border-r border-b p-4 text-center align-middle text-2xl font-medium last:border-r-0')}>
                  {scoreTotal?.[item.url ?? ''] ?? 'N/A'}
                </TableCell>
              ))}
            </TableRow>

            <TableRow className="h-16">
              <TableCell className="sticky left-0 z-10 border-r border-b bg-[#F8FBFD] p-4 align-middle font-medium">
                <div className="flex w-full items-center justify-between">
                  FV
                  <Button variant="none" size="sm" className="cursor-pointer" onClick={() => setFvOpen(!fvOpen)}>
                    <div className="border-non-color rounded-full border bg-transparent p-1 hover:bg-white hover:shadow">
                      {fvOpen ? <ChevronUp className="h-4 w-4 text-blue-500" /> : <ChevronDown className="h-4 w-4 text-blue-500" />}
                    </div>
                    <span className="sr-only">Toggle</span>
                  </Button>
                </div>
              </TableCell>
              <TableCell className="sticky left-[250px] z-10 border-r-4 border-b border-double bg-[#F8FBFD] p-4 align-middle font-medium">
                <div className="text-corporate text-center">
                  {showPercentage
                    ? gradeConversion(urlCategoryScores?.[urlMapping?.[0].url ?? '']?.FV ?? 0)
                    : (urlCategoryScores?.[urlMapping?.[0].url ?? '']?.FV ?? 'N/A')}
                </div>
              </TableCell>
              {urlMapping?.slice(1).map((item, index) => (
                <TableCell key={index} className={cn('border-r border-b p-4 align-middle font-medium last:border-r-0')}>
                  <div className="text-center">
                    {showPercentage
                      ? gradeConversion(urlCategoryScores?.[item.url ?? '']?.FV ?? 0)
                      : (urlCategoryScores?.[item.url ?? '']?.FV ?? 'N/A')}
                  </div>
                </TableCell>
              ))}
            </TableRow>
            {fvOpen && (
              <>
                {scoreDict?.[urlMapping?.[0].url ?? '']?.result
                  ?.filter((r) => r.category === 'FV')
                  ?.map((r, qIndex) => (
                    <TableRow
                      key={qIndex}
                      className={cn('font-medium transition-all', fvOpen ? 'animate-collapsible-down' : 'animate-collapsible-up')}
                    >
                      <TableCell className="sticky left-0 z-10 border-r border-b bg-[#F8FBFD] p-4 align-middle">{r.question}</TableCell>
                      <TableCell
                        className={cn(
                          'text-corporate sticky left-[250px] z-10 border-r-4 border-b border-double p-4',
                          r.score < 2 ? 'bg-[#F6F0F2]' : 'bg-[#F8FBFD]',
                        )}
                      >
                        {r.score < 2 && <Image src="/bad.svg" alt="pin" width={32} height={32} className="mx-auto mb-1 size-8" />}
                        {r.analysis}
                        <br />
                        {r.advice}
                      </TableCell>
                      {urlMapping?.slice(1).map((item, index) => (
                        <TableCell
                          key={index}
                          className={cn(
                            'border-r border-b p-4 last:border-r-0',
                            (scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                              ?.score ?? 0) < 2
                              ? 'bg-[#F6F0F2]'
                              : 'bg-[#F8FBFD]',
                          )}
                        >
                          {(scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                            ?.score ?? 0) < 2 && <Image src="/bad.svg" alt="pin" width={32} height={32} className="mx-auto mb-1 size-8" />}
                          {scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                            ?.analysis ?? 'N/A'}
                          <br />
                          {scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                            ?.advice ?? ''}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </>
            )}
            <TableRow className="h-16">
              <TableCell className="sticky left-0 z-10 border-r border-b bg-[#F8FBFD] p-4 align-middle font-medium">
                <div className="flex w-full items-center justify-between">
                  CTA
                  <Button variant="none" size="sm" className="cursor-pointer" onClick={() => setCtaOpen(!ctaOpen)}>
                    <div className="border-non-color rounded-full border bg-transparent p-1 hover:bg-white hover:shadow">
                      {ctaOpen ? <ChevronUp className="h-4 w-4 text-blue-500" /> : <ChevronDown className="h-4 w-4 text-blue-500" />}
                    </div>
                    <span className="sr-only">Toggle</span>
                  </Button>
                </div>
              </TableCell>
              <TableCell className="sticky left-[250px] z-10 border-r-4 border-b border-double bg-[#F8FBFD] p-4 text-center align-middle font-medium">
                <div className="text-corporate text-center">
                  {showPercentage
                    ? gradeConversion(urlCategoryScores?.[urlMapping?.[0].url ?? '']?.CTA ?? 0)
                    : (urlCategoryScores?.[urlMapping?.[0].url ?? '']?.CTA ?? 'N/A')}
                </div>
              </TableCell>
              {urlMapping?.slice(1).map((item, index) => (
                <TableCell key={index} className={cn('border-r border-b p-4 text-center align-middle font-medium last:border-r-0')}>
                  <div className="text-center">
                    {showPercentage
                      ? gradeConversion(urlCategoryScores?.[item.url ?? '']?.CTA ?? 0)
                      : (urlCategoryScores?.[item.url ?? '']?.CTA ?? 'N/A')}
                  </div>
                </TableCell>
              ))}
            </TableRow>
            {ctaOpen && (
              <>
                {scoreDict?.[urlMapping?.[0].url ?? '']?.result
                  ?.filter((r) => r.category === 'CTA')
                  ?.map((r, qIndex) => (
                    <TableRow
                      key={qIndex}
                      className={cn('font-medium transition-all', ctaOpen ? 'animate-collapsible-down' : 'animate-collapsible-up')}
                    >
                      <TableCell className="sticky left-0 z-10 border-r border-b bg-[#F8FBFD] p-4 align-middle">{r.question}</TableCell>
                      <TableCell
                        className={cn(
                          'text-corporate sticky left-[250px] z-10 border-r-4 border-b border-double p-4',
                          r.score < 2 ? 'bg-[#F6F0F2]' : 'bg-[#F8FBFD]',
                        )}
                      >
                        {r.score < 2 && <Image src="/bad.svg" alt="pin" width={32} height={32} className="mx-auto mb-1 size-8" />}
                        {r.analysis}
                        <br />
                        {r.advice}
                      </TableCell>
                      {urlMapping?.slice(1).map((item, index) => (
                        <TableCell
                          key={index}
                          className={cn(
                            'border-r border-b p-4 last:border-r-0',
                            (scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                              ?.score ?? 0) < 2
                              ? 'bg-[#F6F0F2]'
                              : 'bg-[#F8FBFD]',
                          )}
                        >
                          {(scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                            ?.score ?? 0) < 2 && <Image src="/bad.svg" alt="pin" width={32} height={32} className="mx-auto mb-1 size-8" />}
                          {scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                            ?.analysis ?? 'N/A'}
                          <br />
                          {scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                            ?.advice ?? ''}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </>
            )}
            <TableRow className="h-16">
              <TableCell className="sticky left-0 z-10 border-r border-b bg-[#F8FBFD] p-4 align-middle font-medium">
                <div className="flex w-full items-center justify-between">
                  コンテンツ
                  <Button variant="none" size="sm" className="cursor-pointer" onClick={() => setContentsOpen(!contentsOpen)}>
                    <div className="border-non-color rounded-full border bg-transparent p-1 hover:bg-white hover:shadow">
                      {contentsOpen ? <ChevronUp className="h-4 w-4 text-blue-500" /> : <ChevronDown className="h-4 w-4 text-blue-500" />}
                    </div>
                    <span className="sr-only">Toggle</span>
                  </Button>
                </div>
              </TableCell>
              <TableCell className="sticky left-[250px] z-10 border-r-4 border-b border-double bg-[#F8FBFD] p-4 text-center align-middle font-medium">
                <div className="text-corporate text-center">
                  {showPercentage
                    ? gradeConversion(urlCategoryScores?.[urlMapping?.[0].url ?? '']?.CONTENTS ?? 0)
                    : (urlCategoryScores?.[urlMapping?.[0].url ?? '']?.CONTENTS ?? 'N/A')}
                </div>
              </TableCell>
              {urlMapping?.slice(1).map((item, index) => (
                <TableCell key={index} className={cn('border-r border-b p-4 text-center align-middle font-medium last:border-r-0')}>
                  <div className="text-center">
                    {showPercentage
                      ? gradeConversion(urlCategoryScores?.[item.url ?? '']?.CONTENTS ?? 0)
                      : (urlCategoryScores?.[item.url ?? '']?.CONTENTS ?? 'N/A')}
                  </div>
                </TableCell>
              ))}
            </TableRow>
            {contentsOpen && (
              <>
                {scoreDict?.[urlMapping?.[0].url ?? '']?.result
                  ?.filter((r) => r.category === 'CONTENTS')
                  ?.map((r, qIndex) => (
                    <TableRow
                      key={qIndex}
                      className={cn('font-medium transition-all', contentsOpen ? 'animate-collapsible-down' : 'animate-collapsible-up')}
                    >
                      <TableCell className="sticky left-0 z-10 border-r border-b bg-[#F8FBFD] p-4 align-middle">{r.question}</TableCell>
                      <TableCell
                        className={cn(
                          'text-corporate sticky left-[250px] z-10 border-r-4 border-b border-double p-4',
                          r.score < 2 ? 'bg-[#F6F0F2]' : 'bg-[#F8FBFD]',
                        )}
                      >
                        {r.score < 2 && <Image src="/bad.svg" alt="pin" width={32} height={32} className="mx-auto mb-1 size-8" />}
                        {r.analysis}
                        <br />
                        {r.advice}
                      </TableCell>
                      {urlMapping?.slice(1).map((item, index) => (
                        <TableCell
                          key={index}
                          className={cn(
                            'border-r border-b p-4 last:border-r-0',
                            (scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                              ?.score ?? 0) < 2
                              ? 'bg-[#F6F0F2]'
                              : 'bg-[#F8FBFD]',
                          )}
                        >
                          {(scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                            ?.score ?? 0) < 2 && <Image src="/bad.svg" alt="pin" width={32} height={32} className="mx-auto mb-1 size-8" />}
                          {scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                            ?.analysis ?? 'N/A'}
                          <br />
                          {scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                            ?.advice ?? ''}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </>
            )}
            <TableRow className="h-16">
              <TableCell className="sticky left-0 z-10 border-r border-b bg-[#F8FBFD] p-4 align-middle font-medium">
                <div className="flex w-full items-center justify-between">
                  クリエイティブ
                  <Button variant="none" size="sm" className="cursor-pointer" onClick={() => setCreativeOpen(!creativeOpen)}>
                    <div className="border-non-color rounded-full border bg-transparent p-1 hover:bg-white hover:shadow">
                      {creativeOpen ? <ChevronUp className="h-4 w-4 text-blue-500" /> : <ChevronDown className="h-4 w-4 text-blue-500" />}
                    </div>
                    <span className="sr-only">Toggle</span>
                  </Button>
                </div>
              </TableCell>
              <TableCell className="sticky left-[250px] z-10 border-r-4 border-b border-double bg-[#F8FBFD] p-4 text-center align-middle font-medium">
                <div className="text-corporate text-center">
                  {showPercentage
                    ? gradeConversion(urlCategoryScores?.[urlMapping?.[0].url ?? '']?.CREATIVE ?? 0)
                    : (urlCategoryScores?.[urlMapping?.[0].url ?? '']?.CREATIVE ?? 'N/A')}
                </div>
              </TableCell>
              {urlMapping?.slice(1).map((item, index) => (
                <TableCell key={index} className={cn('border-r border-b p-4 text-center align-middle font-medium last:border-r-0')}>
                  <div className="text-center">
                    {showPercentage
                      ? gradeConversion(urlCategoryScores?.[item.url ?? '']?.CREATIVE ?? 0)
                      : (urlCategoryScores?.[item.url ?? '']?.CREATIVE ?? 'N/A')}
                  </div>
                </TableCell>
              ))}
            </TableRow>
            {creativeOpen && (
              <>
                {scoreDict?.[urlMapping?.[0].url ?? '']?.result
                  ?.filter((r) => r.category === 'CREATIVE')
                  ?.map((r, qIndex) => (
                    <TableRow
                      key={qIndex}
                      className={cn('font-medium transition-all', creativeOpen ? 'animate-collapsible-down' : 'animate-collapsible-up')}
                    >
                      <TableCell className="sticky left-0 z-10 border-r border-b bg-[#F8FBFD] p-4 align-middle">{r.question}</TableCell>
                      <TableCell
                        className={cn(
                          'text-corporate sticky left-[250px] z-10 border-r-4 border-b border-double p-4',
                          r.score < 2 ? 'bg-[#F6F0F2]' : 'bg-[#F8FBFD]',
                        )}
                      >
                        {r.score < 2 && <Image src="/bad.svg" alt="pin" width={32} height={32} className="mx-auto mb-1 size-8" />}
                        {r.analysis}
                        <br />
                        {r.advice}
                      </TableCell>
                      {urlMapping?.slice(1).map((item, index) => (
                        <TableCell
                          key={index}
                          className={cn(
                            'border-r border-b p-4 last:border-r-0',
                            (scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                              ?.score ?? 0) < 2
                              ? 'bg-[#F6F0F2]'
                              : 'bg-[#F8FBFD]',
                          )}
                        >
                          {(scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                            ?.score ?? 0) < 2 && <Image src="/bad.svg" alt="pin" width={32} height={32} className="mx-auto mb-1 size-8" />}
                          {scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                            ?.analysis ?? 'N/A'}
                          <br />
                          {scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                            ?.advice ?? ''}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </>
            )}
            <TableRow className="h-16">
              <TableCell className="sticky left-0 z-10 border-r border-b bg-[#F8FBFD] p-4 align-middle font-medium">
                <div className="flex w-full items-center justify-between">
                  アクセシビリティ
                  <Button variant="none" size="sm" className="cursor-pointer" onClick={() => setAccessibilityOpen(!accessibilityOpen)}>
                    <div className="border-non-color rounded-full border bg-transparent p-1 hover:bg-white hover:shadow">
                      {accessibilityOpen ? <ChevronUp className="h-4 w-4 text-blue-500" /> : <ChevronDown className="h-4 w-4 text-blue-500" />}
                    </div>
                    <span className="sr-only">Toggle</span>
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-corporate sticky left-[250px] z-10 border-r-4 border-b border-double bg-[#F8FBFD] p-4 text-center align-middle font-medium">
                {showPercentage
                  ? gradeConversion(urlCategoryScores?.[urlMapping?.[0].url ?? '']?.ACCESSIBILITY ?? 0)
                  : (urlCategoryScores?.[urlMapping?.[0].url ?? '']?.ACCESSIBILITY ?? 'N/A')}
              </TableCell>
              {urlMapping?.slice(1).map((item, index) => (
                <TableCell key={index} className={cn('border-r border-b p-4 text-center align-middle font-medium last:border-r-0')}>
                  <div className="text-center">
                    {showPercentage
                      ? gradeConversion(urlCategoryScores?.[item.url ?? '']?.ACCESSIBILITY ?? 0)
                      : (urlCategoryScores?.[item.url ?? '']?.ACCESSIBILITY ?? 'N/A')}
                  </div>
                </TableCell>
              ))}
            </TableRow>
            {accessibilityOpen && (
              <>
                {scoreDict?.[urlMapping?.[0].url ?? '']?.result
                  ?.filter((r) => r.category === 'ACCESSIBILITY')
                  ?.map((r, qIndex) => (
                    <TableRow
                      key={qIndex}
                      className={cn('font-medium transition-all', accessibilityOpen ? 'animate-collapsible-down' : 'animate-collapsible-up')}
                    >
                      <TableCell className="sticky left-0 z-10 border-r border-b bg-[#F8FBFD] p-4 align-middle">{r.question}</TableCell>
                      <TableCell
                        className={cn(
                          'text-corporate sticky left-[250px] z-10 border-r-4 border-b border-double p-4',
                          r.score < 2 ? 'bg-[#F6F0F2]' : 'bg-[#F8FBFD]',
                        )}
                      >
                        {r.score < 2 && <Image src="/bad.svg" alt="pin" width={32} height={32} className="mx-auto mb-1 size-8" />}
                        {r.analysis}
                        <br />
                        {r.advice}
                      </TableCell>
                      {urlMapping?.slice(1).map((item, index) => (
                        <TableCell
                          key={index}
                          className={cn(
                            'border-r border-b p-4 last:border-r-0',
                            (scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                              ?.score ?? 0) < 2
                              ? 'bg-[#F6F0F2]'
                              : 'bg-[#F8FBFD]',
                          )}
                        >
                          {(scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                            ?.score ?? 0) < 2 && <Image src="/bad.svg" alt="pin" width={32} height={32} className="mx-auto mb-1 size-8" />}
                          {scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                            ?.analysis ?? 'N/A'}
                          <br />
                          {scoreDict?.[item.url ?? '']?.result?.filter((r2) => r2.category === r.category)?.find((r2) => r2.question === r.question)
                            ?.advice ?? ''}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-10 flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <div className="text-primary-text text-xl font-bold">ポジショニング分析</div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-secondary-text mt-[2px] flex h-4 w-4 cursor-pointer items-center justify-center rounded-full text-xs text-white">
                  ?
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-4 text-xs font-medium">
                <p>自社・他社URLのOCR抽出情報を元に分析を実施した結果</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="text-sm font-medium">{swotTable?.概要}</div>
      <div className="overflow-x-auto">
        <Table className="w-full table-auto border-collapse">
          <TableHeader className="bg-zinc-100">
            <TableRow>
              <TableHead className="w-1/3 border-t border-r px-4 py-2">PoD：自社が選ばれる理由・強み</TableHead>
              <TableHead className="w-1/3 border-t border-r px-4 py-2">PoP：競合に揃えるべきポイント</TableHead>
              <TableHead className="w-1/3 border-t px-4 py-2">PoF：顧客離脱のリスク</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="border-r border-b p-4">
                <ul className="list-inside list-disc">{swotTable?.PoD.map((item, index) => <li key={index}>{item}</li>)}</ul>
              </TableCell>
              <TableCell className="border-r border-b p-4">
                <ul className="list-inside list-disc">{swotTable?.PoP.map((item, index) => <li key={index}>{item}</li>)}</ul>
              </TableCell>
              <TableCell className="border-b p-4">
                <ul className="list-inside list-disc">{swotTable?.PoF.map((item, index) => <li key={index}>{item}</li>)}</ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
