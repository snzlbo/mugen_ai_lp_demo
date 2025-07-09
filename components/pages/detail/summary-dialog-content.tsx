import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { gradeConversion } from '@/services/grade-conversion';
import { useResultStore } from '@/store/result';

export function SummaryDialogContent() {
  const { summaryData, ownCategoryScores } = useResultStore();
  return (
    <div className="max-h-[612px] overflow-auto">
      <Table className="w-full table-fixed border-separate border-spacing-0 font-medium">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[128px] border-r border-b bg-zinc-100">カテゴリー</TableHead>
            <TableHead className="w-[90px] border-r border-b bg-zinc-100">評価</TableHead>
            <TableHead className="border-r border-b bg-zinc-100">長所</TableHead>
            <TableHead className="border-r border-b bg-zinc-100">改善点</TableHead>
            <TableHead className="border-b bg-zinc-100">競合優位</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="border-r border-b bg-white p-4 align-middle">FV</TableCell>
            <TableCell
              className={cn(
                'space-y-1 border-r border-b bg-white p-4 text-center align-middle',
                Number(ownCategoryScores?.FV) < 25 ? 'text-[#DA2A2A]' : '',
              )}
            >
              <div className="text-lg">{gradeConversion(Number(ownCategoryScores?.FV) ?? 0)}</div>
              <div
                className="text-sm"
                style={{
                  color: typeof ownCategoryScores?.FV === 'number' && ownCategoryScores.FV > 25 ? undefined : '#DA2A2A',
                }}
              >
                {typeof ownCategoryScores?.FV === 'number'
                  ? ownCategoryScores.FV >= 75
                    ? '高評価'
                    : ownCategoryScores.FV >= 50
                      ? '及第点'
                      : ownCategoryScores.FV > 25
                        ? '伸びしろ'
                        : '要改善'
                  : '要改善'}
              </div>
            </TableCell>
            <TableCell className="border-r border-b bg-white p-4">
              <div className="!text-[13px]">{summaryData?.FV.自社長所 !== '' ? summaryData?.FV.自社長所 : 'なし'}</div>
            </TableCell>
            <TableCell className="border-r border-b bg-white p-4">
              <div className="!text-[13px]">{summaryData?.FV.自社改善点 !== '' ? summaryData?.FV.自社改善点 : 'なし'} </div>
            </TableCell>
            <TableCell className="border-r border-b bg-white p-4">
              <div
                className="!text-[13px]"
                dangerouslySetInnerHTML={{
                  __html: summaryData?.FV.competitors_advantage !== '' ? (summaryData?.FV.competitors_advantage ?? '') : 'なし',
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border-r border-b bg-white p-4 align-middle">CTA</TableCell>
            <TableCell
              className={cn(
                'space-y-1 border-r border-b bg-white p-4 text-center align-middle',
                Number(ownCategoryScores?.CTA) < 25 ? 'text-[#DA2A2A]' : '',
              )}
            >
              <div className="text-lg">{gradeConversion(Number(ownCategoryScores?.CTA) ?? 0)}</div>
              <div
                className="text-sm"
                style={{
                  color: typeof ownCategoryScores?.CTA === 'number' && ownCategoryScores.CTA > 25 ? undefined : '#DA2A2A',
                }}
              >
                {typeof ownCategoryScores?.CTA === 'number'
                  ? ownCategoryScores.CTA >= 75
                    ? '高評価'
                    : ownCategoryScores.CTA >= 50
                      ? '及第点'
                      : ownCategoryScores.CTA > 25
                        ? '伸びしろ'
                        : '要改善'
                  : '要改善'}
              </div>
            </TableCell>
            <TableCell className="border-r border-b bg-white p-4">
              <div className="!text-[13px]">{summaryData?.CTA.自社長所 !== '' ? summaryData?.CTA.自社長所 : 'なし'}</div>
            </TableCell>
            <TableCell className="border-r border-b bg-white p-4 align-top">
              <div className="!text-[13px]">{summaryData?.CTA.自社改善点 !== '' ? summaryData?.CTA.自社改善点 : 'なし'}</div>
            </TableCell>
            <TableCell className="border-r border-b bg-white p-4 align-top">
              <div
                className="!text-[13px]"
                dangerouslySetInnerHTML={{
                  __html: summaryData?.CTA.competitors_advantage !== '' ? (summaryData?.CTA.competitors_advantage ?? '') : 'なし',
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border-r border-b bg-white p-4 align-middle">コンテンツ</TableCell>
            <TableCell
              className={cn(
                'space-y-1 border-r border-b bg-white p-4 text-center align-middle',
                Number(ownCategoryScores?.CONTENTS) < 25 ? 'text-[#DA2A2A]' : '',
              )}
            >
              <div className="text-lg">{gradeConversion(Number(ownCategoryScores?.CONTENTS) ?? 0)}</div>
              <div
                className="text-sm"
                style={{
                  color: typeof ownCategoryScores?.CONTENTS === 'number' && ownCategoryScores.CONTENTS > 25 ? undefined : '#DA2A2A',
                }}
              >
                {typeof ownCategoryScores?.CONTENTS === 'number'
                  ? ownCategoryScores.CONTENTS >= 75
                    ? '高評価'
                    : ownCategoryScores.CONTENTS >= 50
                      ? '及第点'
                      : ownCategoryScores.CONTENTS > 25
                        ? '伸びしろ'
                        : '要改善'
                  : '要改善'}
              </div>
            </TableCell>
            <TableCell className="border-r border-b bg-white p-4 align-top">
              <div className="!text-[13px]">{summaryData?.CONTENTS.自社長所 !== '' ? summaryData?.CONTENTS.自社長所 : 'なし'}</div>
            </TableCell>
            <TableCell className="border-r border-b bg-white p-4 align-top">
              <div className="!text-[13px]">{summaryData?.CONTENTS.自社改善点 !== '' ? summaryData?.CONTENTS.自社改善点 : 'なし'}</div>
            </TableCell>
            <TableCell className="border-r border-b bg-white p-4 align-top">
              <div
                className="!text-[13px]"
                dangerouslySetInnerHTML={{
                  __html: summaryData?.CONTENTS.competitors_advantage !== '' ? (summaryData?.CONTENTS.competitors_advantage ?? '') : 'なし',
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border-r border-b bg-white p-4 align-middle">クリエイティブ</TableCell>
            <TableCell
              className={cn(
                'space-y-1 border-r border-b bg-white p-4 text-center align-middle',
                Number(ownCategoryScores?.CREATIVE) < 25 ? 'text-[#DA2A2A]' : '',
              )}
            >
              <div className="text-lg">{gradeConversion(Number(ownCategoryScores?.CREATIVE) ?? 0)}</div>
              <div
                className="text-sm"
                style={{
                  color: typeof ownCategoryScores?.CREATIVE === 'number' && ownCategoryScores.CREATIVE > 25 ? undefined : '#DA2A2A',
                }}
              >
                {typeof ownCategoryScores?.CREATIVE === 'number'
                  ? ownCategoryScores.CREATIVE >= 75
                    ? '高評価'
                    : ownCategoryScores.CREATIVE >= 50
                      ? '及第点'
                      : ownCategoryScores.CREATIVE > 25
                        ? '伸びしろ'
                        : '要改善'
                  : '要改善'}
              </div>
            </TableCell>
            <TableCell className="border-r border-b bg-white p-4 align-top">
              <div className="!text-[13px]">{summaryData?.CREATIVE.自社長所 !== '' ? summaryData?.CREATIVE.自社長所 : 'なし'}</div>
            </TableCell>
            <TableCell className="border-r border-b bg-white p-4 align-top">
              <div className="!text-[13px]">{summaryData?.CREATIVE.自社改善点 !== '' ? summaryData?.CREATIVE.自社改善点 : 'なし'}</div>
            </TableCell>
            <TableCell className="border-r border-b bg-white p-4 align-top">
              <div
                className="!text-[13px]"
                dangerouslySetInnerHTML={{
                  __html: summaryData?.CREATIVE.competitors_advantage !== '' ? (summaryData?.CREATIVE.competitors_advantage ?? '') : 'なし',
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border-r border-b bg-white p-4 align-middle">アクセシビリティ</TableCell>
            <TableCell
              className={cn(
                'space-y-1 border-r border-b bg-white p-4 text-center align-middle',
                Number(ownCategoryScores?.ACCESSIBILITY) < 25 ? 'text-[#DA2A2A]' : '',
              )}
            >
              <div className="text-lg">{gradeConversion(Number(ownCategoryScores?.ACCESSIBILITY) ?? 0)}</div>
              <div
                className="text-sm"
                style={{
                  color: typeof ownCategoryScores?.ACCESSIBILITY === 'number' && ownCategoryScores.ACCESSIBILITY > 25 ? undefined : '#DA2A2A',
                }}
              >
                {typeof ownCategoryScores?.ACCESSIBILITY === 'number'
                  ? ownCategoryScores.ACCESSIBILITY >= 75
                    ? '高評価'
                    : ownCategoryScores.ACCESSIBILITY > 50
                      ? '及第点'
                      : ownCategoryScores.ACCESSIBILITY > 25
                        ? '伸びしろ'
                        : '要改善'
                  : '要改善'}
              </div>
            </TableCell>
            <TableCell className="border-r border-b bg-white p-4 align-top">
              <div className="!text-[13px]">{summaryData?.ACCESSIBILITY.自社長所 !== '' ? summaryData?.ACCESSIBILITY.自社長所 : 'なし'}</div>
            </TableCell>
            <TableCell className="border-r border-b bg-white p-4 align-top">
              <div className="!text-[13px]">{summaryData?.ACCESSIBILITY.自社改善点 !== '' ? summaryData?.ACCESSIBILITY.自社改善点 : 'なし'}</div>
            </TableCell>
            <TableCell className="border-r border-b bg-white p-4 align-top">
              <div
                className="!text-[13px]"
                dangerouslySetInnerHTML={{
                  __html: summaryData?.ACCESSIBILITY.competitors_advantage !== '' ? (summaryData?.ACCESSIBILITY.competitors_advantage ?? '') : 'なし',
                }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
