import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { gradeConversion } from '@/services/grade-conversion';
import { useResultStore } from '@/store/result';
import { useState } from 'react';
import { SummaryDialogContent } from './summary-dialog-content';

export default function DetailSummary() {
  const { ownCategoryScores, urlCategoryScores } = useResultStore();
  const [dialog, setDialog] = useState(false);
  const { urlMapping, scoreTotal } = useResultStore();

  return (
    <div className="mb-5 flex w-[360px] flex-col rounded-xl bg-white/80 xl:w-[416px]">
      <div className="text-primary-text max-h-[24rem] w-full space-y-4 overflow-auto p-6">
        <div className="flex flex-wrap items-center justify-between">
          <div className="text-2xl font-bold">自社の結果</div>
          <div className="flex items-center">
            <Button className="cursor-pointer rounded-full px-4 text-xs" size="sm" onClick={() => setDialog(true)}>
              サマリーを確認する
            </Button>
          </div>
        </div>
        <Separator className="bg-zinc-50" />
        <div className="mb-4 flex flex-col items-start space-y-2 xl:flex-row xl:items-center xl:space-y-0 xl:space-x-4">
          <div className="flex items-center space-x-18 xl:space-x-2">
            <div className="text-xs font-medium whitespace-nowrap text-[#212121]">
              自社総合
              <br className="hidden xl:block 2xl:block" />
              スコア
            </div>
            <div className="mb-2 flex items-end">
              {ownCategoryScores &&
              typeof ownCategoryScores === 'object' &&
              '総括' in ownCategoryScores &&
              typeof ownCategoryScores.総括 === 'number' ? (
                (() => {
                  let avg: number | null = null;
                  if (urlCategoryScores && urlCategoryScores.平均 && typeof urlCategoryScores.平均 === 'object') {
                    const values = Object.values(urlCategoryScores.平均).filter((v) => typeof v === 'number') as number[];
                    if (values.length > 0) {
                      avg = values.reduce((a, b) => a + b, 0) / values.length;
                    }
                  }
                  const own = ownCategoryScores.総括;
                  const isLower = avg !== null && own < avg;
                  const [intPart, decPart] = String(own).split('.');
                  return (
                    <>
                      <span className={`text-5xl leading-none font-bold ${isLower ? 'text-[#DA2A2A]' : 'text-primary-text'}`}>{intPart}</span>
                      {decPart !== undefined && (
                        <span className={`text-3xl leading-none font-bold ${isLower ? 'text-[#DA2A2A]' : 'text-primary-text'}`}>.{decPart}</span>
                      )}
                    </>
                  );
                })()
              ) : (
                <span className="text-5xl font-bold text-[#DA2A2A]">-</span>
              )}
            </div>
          </div>

          <div className="hidden h-8 w-[1px] border-r border-black xl:block"></div>

          <div className="flex items-center space-x-23 xl:space-x-2">
            <div className="text-xs font-medium whitespace-nowrap text-[#212121]">
              平均
              <br className="hidden xl:block 2xl:block" />
              スコア
            </div>
            <div className="flex items-end">
              {(() => {
                const competitorScores =
                  urlMapping && scoreTotal
                    ? urlMapping
                        .slice(1)
                        .filter(
                          (item): item is { url: string } => typeof item.url === 'string' && scoreTotal && typeof scoreTotal[item.url] === 'number',
                        )
                        .map((item) => scoreTotal[item.url])
                    : [];

                const ownScore =
                  urlMapping && urlMapping[0] && typeof urlMapping[0].url === 'string' && scoreTotal ? scoreTotal[urlMapping[0].url] : undefined;
                const allScores = typeof ownScore === 'number' ? [ownScore, ...competitorScores] : competitorScores;
                const avgAll = allScores.length > 0 ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(2) : '-';
                const [intPart, decPart] = String(avgAll).split('.');

                return (
                  <>
                    <span className="text-primary-text !text-[24px] leading-none font-bold">{intPart}</span>
                    {decPart !== undefined && <span className="text-primary-text !text-[14px] leading-none font-bold">.{decPart}</span>}
                  </>
                );
              })()}
            </div>
          </div>

          <div className="hidden h-8 w-2 border-r border-black xl:block"></div>

          <div className="flex items-center space-x-31 xl:space-x-2">
            <div className="!text-[10px] font-medium whitespace-nowrap text-[#212121]">評価</div>
            <div className="flex items-center gap-2">
              <div className="!text-[20px]">{gradeConversion(Number(ownCategoryScores?.総括) ?? 0)}</div>
              <div className="!text-[12px] whitespace-nowrap">
                {typeof ownCategoryScores?.総括 === 'number'
                  ? ownCategoryScores.総括 >= 75
                    ? '高評価'
                    : ownCategoryScores.総括 >= 50
                      ? '及第点'
                      : ownCategoryScores.総括 > 25
                        ? '伸びしろ'
                        : '要改善'
                  : '要改善'}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-6">
          <div className="text-sm font-medium">
            自社LPは
            {typeof ownCategoryScores?.総括 === 'number'
              ? ownCategoryScores.総括 >= 75
                ? '高評価で'
                : ownCategoryScores.総括 >= 50
                  ? '及第点で'
                  : ownCategoryScores.総括 > 25
                    ? '伸びしろが'
                    : '要改善点が'
              : '要改善点が'}
            あり、
            {(() => {
              const own = typeof ownCategoryScores?.総括 === 'number' ? ownCategoryScores.総括 : null;
              const avg =
                urlCategoryScores && urlCategoryScores.平均 && typeof urlCategoryScores.平均 === 'object'
                  ? (() => {
                      const values = Object.values(urlCategoryScores.平均).filter((v) => typeof v === 'number') as number[];
                      if (values.length === 0) return null;
                      return values.reduce((a, b) => a + b, 0) / values.length;
                    })()
                  : null;
              if (own === null || avg === null)
                return (
                  <>
                    平均 -。
                    <br />
                  </>
                );
              if (own > avg + 5)
                return (
                  <>
                    平均 より優れていた。
                    <br />
                  </>
                );
              if (own >= avg - 5 && own <= avg + 5)
                return (
                  <>
                    平均 と同等だった。
                    <br />
                  </>
                );
              if (own < avg - 5)
                return (
                  <>
                    平均 より劣っていた。
                    <br />
                  </>
                );
              return (
                <>
                  平均 -。
                  <br />
                </>
              );
            })()}
            {(() => {
              if (!ownCategoryScores || !urlCategoryScores || !urlCategoryScores.平均) {
                return <span className="text-[#DA2A2A]">［FV/CTA/コンテンツ/クリエイティブ/アクセシビリティ］を見直すと良い。</span>;
              }

              // カテゴリ名のマッピング
              const categoryLabels: Record<string, string> = {
                FV: 'FV',
                CTA: 'CTA',
                CONTENTS: 'コンテンツ',
                CREATIVE: 'クリエイティブ',
                ACCESSIBILITY: 'アクセシビリティ',
              };

              type CategoryKey = keyof typeof categoryLabels;
              const categories: CategoryKey[] = Object.keys(categoryLabels) as CategoryKey[];

              const lowerCategories = categories.filter((cat) => {
                const own = ownCategoryScores[cat];
                const avg = urlCategoryScores.平均[cat as keyof typeof urlCategoryScores.平均];
                return typeof own === 'number' && typeof avg === 'number' && own < avg - 5;
              });

              const allAboveAvg = categories.every((cat) => {
                const own = ownCategoryScores[cat];
                const avg = urlCategoryScores.平均[cat as keyof typeof urlCategoryScores.平均];
                return typeof own === 'number' && typeof avg === 'number' && own >= avg;
              });

              if (lowerCategories.length > 0) {
                return (
                  <>
                    <span className="text-[#212121]">特に点数を押し下げている</span>
                    <span className="text-[#DA2A2A]">{lowerCategories.map((cat) => categoryLabels[cat]).join('、')}を見直すと良い。</span>
                  </>
                );
              }

              if (allAboveAvg) {
                let minCategory: CategoryKey | null = null;
                let minScore = Infinity;

                categories.forEach((cat) => {
                  const own = ownCategoryScores[cat];
                  if (typeof own === 'number' && own < minScore) {
                    minScore = own;
                    minCategory = cat;
                  }
                });

                return minCategory ? (
                  <>
                    <span className="text-[#212121]">特に点数を押し下げている</span>
                    <span className="text-[#DA2A2A]">{categoryLabels[minCategory]}は改善の余地あり。</span>
                  </>
                ) : (
                  <span className="text-[#DA2A2A]">
                    特に点数を押し下げている［FV/CTA/コンテンツ/クリエイティブ/アクセシビリティ］を見直すと良い。
                  </span>
                );
              }

              return (
                <span className="text-[#DA2A2A]">特に点数を押し下げている［FV/CTA/コンテンツ/クリエイティブ/アクセシビリティ］を見直すと良い。</span>
              );
            })()}
          </div>
          <div>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1">
              <div className="text-sm-2 font-bold">FV :</div>
              <div className="col-span-2 flex items-center">
                <div className="w-8">
                  <span
                    className={`text-[14px] font-bold ${
                      ownCategoryScores &&
                      typeof ownCategoryScores.FV === 'number' &&
                      typeof urlCategoryScores?.平均?.FV === 'number' &&
                      ownCategoryScores.FV < urlCategoryScores.平均.FV
                        ? 'text-red-600'
                        : ''
                    }`}
                  >
                    {ownCategoryScores && typeof ownCategoryScores.FV === 'number' ? ownCategoryScores.FV : '-'}
                  </span>
                </div>
                <span className="text-sm-2">
                  （平均スコア <b>{urlCategoryScores?.平均.FV}</b>）
                </span>
              </div>

              <div className="text-sm-2 font-bold">CTA :</div>
              <div className="col-span-2 flex items-center">
                <div className="w-8">
                  <span
                    className={`text-[14px] font-bold ${
                      ownCategoryScores &&
                      typeof ownCategoryScores.CTA === 'number' &&
                      typeof urlCategoryScores?.平均?.CTA === 'number' &&
                      ownCategoryScores.CTA < urlCategoryScores.平均.CTA
                        ? 'text-red-600'
                        : ''
                    }`}
                  >
                    {ownCategoryScores && typeof ownCategoryScores.CTA === 'number' ? ownCategoryScores.CTA : '-'}
                  </span>
                </div>
                <span className="text-sm-2">
                  （平均スコア <b>{urlCategoryScores?.平均.CTA}</b>）
                </span>
              </div>

              <div className="text-sm-2 font-bold">コンテンツ :</div>
              <div className="col-span-2 flex items-center">
                <div className="w-8">
                  <span
                    className={`text-center text-[14px] font-bold ${
                      ownCategoryScores &&
                      typeof ownCategoryScores.CONTENTS === 'number' &&
                      typeof urlCategoryScores?.平均?.CONTENTS === 'number' &&
                      ownCategoryScores.CONTENTS < urlCategoryScores.平均.CONTENTS
                        ? 'text-red-600'
                        : ''
                    }`}
                  >
                    {ownCategoryScores && typeof ownCategoryScores.CONTENTS === 'number' ? ownCategoryScores.CONTENTS : '-'}
                  </span>
                </div>
                <span className="text-sm-2">
                  （平均スコア <b>{urlCategoryScores?.平均.CONTENTS}</b>）
                </span>
              </div>

              <div className="text-sm-2 font-bold whitespace-nowrap">クリエイティブ:</div>
              <div className="col-span-2 flex items-center">
                <div className="w-8">
                  <span
                    className={`text-center text-[14px] font-bold ${
                      ownCategoryScores &&
                      typeof ownCategoryScores.CREATIVE === 'number' &&
                      typeof urlCategoryScores?.平均?.CREATIVE === 'number' &&
                      ownCategoryScores.CREATIVE < urlCategoryScores.平均.CREATIVE
                        ? 'text-red-600'
                        : ''
                    }`}
                  >
                    {ownCategoryScores && typeof ownCategoryScores.CREATIVE === 'number' ? ownCategoryScores.CREATIVE : '-'}
                  </span>
                </div>
                <span className="text-sm-2">
                  （平均スコア <b>{urlCategoryScores?.平均.CREATIVE}</b>）
                </span>
              </div>

              <div className="text-sm-2 font-bold whitespace-nowrap">アクセシビリティ:</div>
              <div className="col-span-2 flex items-center">
                <div className="w-8">
                  <span
                    className={`text-[14px] font-bold ${
                      ownCategoryScores &&
                      typeof ownCategoryScores.ACCESSIBILITY === 'number' &&
                      typeof urlCategoryScores?.平均?.ACCESSIBILITY === 'number' &&
                      ownCategoryScores.ACCESSIBILITY < urlCategoryScores.平均.ACCESSIBILITY
                        ? 'text-red-600'
                        : ''
                    }`}
                  >
                    {ownCategoryScores && typeof ownCategoryScores.ACCESSIBILITY === 'number' ? ownCategoryScores.ACCESSIBILITY : '-'}
                  </span>
                </div>
                <span className="text-[13px]">
                  （平均スコア <b>{urlCategoryScores?.平均.ACCESSIBILITY}</b>）
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent className="sm:max-w-[1184px]" onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogDescription />
            <DialogTitle className="text-left text-2xl font-bold">自社と競合のサマリ</DialogTitle>
            <Separator className="my-4" />
            <SummaryDialogContent />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
