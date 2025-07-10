import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { GlobeIcon, LightbulbIcon } from 'lucide-react';
export default function Item1Table() {
  return (
    <div className="w-full rounded-xl bg-white">
      <h2 className="mb-2 border-b border-[#ccc] px-8 pt-6 pb-4 text-base font-bold">
        FV
      </h2>
      <div className="overflow-x-auto px-8 py-6">
        <Table className="mb-6 w-full table-fixed border border-[#ccc] bg-white">
          <TableBody className="text-xs">
            <TableRow>
              <TableCell
                className="border border-[#ccc] bg-[#fafafa] align-middle font-semibold"
                colSpan={1}
                rowSpan={4}
              >
                コピー
              </TableCell>
              <TableCell
                colSpan={1}
                className="border border-[#ccc] bg-[#fafafa] font-semibold"
              >
                メインコピー
              </TableCell>
              <TableCell
                colSpan={3}
                className="border border-[#ccc] bg-white p-2"
              >
                AI技術でビジネスを革新し、未来の成長を共に築く
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={1}
                className="border border-[#ccc] bg-[#fafafa] font-semibold"
              >
                サブコピー1
              </TableCell>
              <TableCell
                colSpan={3}
                className="border border-[#ccc] bg-white p-2"
              >
                デジタルトランスフォーメーションを加速するためのパートナーシップ
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={1}
                className="border border-[#ccc] bg-[#fafafa] font-semibold"
              >
                サブコピー2
              </TableCell>
              <TableCell
                colSpan={3}
                className="border border-[#ccc] bg-white p-2"
              >
                AIを通じて企業の潜在能力を解き放つ
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={1}
                className="border border-[#ccc] bg-[#fafafa] font-semibold"
              >
                サブコピー3
              </TableCell>
              <TableCell
                colSpan={3}
                className="border border-[#ccc] bg-white p-2"
              >
                次世代のビジネスチャンスを掴むためのソリューションを提供
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={1}
                className="border border-[#ccc] bg-[#fafafa] align-middle font-semibold"
              >
                ビジュアル
              </TableCell>
              <TableCell
                colSpan={1}
                className="border border-[#ccc] bg-[#fafafa] align-middle font-semibold"
              >
                作成指示
              </TableCell>
              <TableCell
                colSpan={3}
                className="border border-[#ccc] bg-white p-2"
              >
                <div className="flex flex-row items-center justify-between space-x-2 text-xs">
                  <p>
                    AI技術のテーマを反映した未来的な都市の写真に、デジタルデータやフローを上から重ねてください。
                  </p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="size-5">
                        <GlobeIcon className="size-3" stroke="#777" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      情報ソース： https://wwwwwwwwwwwwwwwwwwwww
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={1}
                rowSpan={2}
                className="border border-[#ccc] bg-[#fafafa] align-middle font-semibold"
              >
                CTAボタン
              </TableCell>
              <TableCell
                colSpan={1}
                className="border border-[#ccc] bg-[#fafafa] font-semibold"
              >
                ボタンテキスト
              </TableCell>
              <TableCell
                colSpan={3}
                className="border border-[#ccc] bg-white p-2"
              >
                詳しく知る
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={1}
                className="border border-[#ccc] bg-[#fafafa] font-semibold"
              >
                マイクロコピー
              </TableCell>
              <TableCell
                colSpan={3}
                className="border border-[#ccc] bg-white p-2"
              >
                <div className="flex flex-row items-center justify-between space-x-2 text-xs">
                  <p>AI技術で次のステップを踏み出す</p>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="size-5">
                        <LightbulbIcon className="size-3" stroke="#777" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      AIのアイデア： AIのアイデアAIのアイデアAIのアイデアAIの
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={1}
                className="border border-[#ccc] bg-[#fafafa] align-middle font-semibold"
              >
                権威付け
              </TableCell>
              <TableCell
                colSpan={1}
                className="border border-[#ccc] bg-[#fafafa] align-middle font-semibold"
              >
                作成指示
              </TableCell>
              <TableCell
                colSpan={3}
                className="border border-[#ccc] bg-white p-2"
              >
                <div className="flex flex-row items-center space-x-2 text-xs">
                  <p>
                    AI技術のテーマを反映した未来的な都市の写真に、デジタルデータやフローを上から重ねてください。
                  </p>
                  <Tooltip>
                    <TooltipTrigger asChild disabled>
                      <Button variant="outline" size="icon" className="size-5">
                        <GlobeIcon className="size-3" stroke="#ccc" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      AIのアイデア： AIのアイデアAIのアイデアAIのアイデアAIの
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Separator />
      </div>
    </div>
  );
}
