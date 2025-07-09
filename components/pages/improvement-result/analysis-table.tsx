import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function AnalysisTable() {
  return (
    <div className="flex flex-col space-y-6 rounded-xl bg-[#edf6fd] px-12 py-8">
      <>
        <h1 className="mb-3 text-xl font-bold text-gray-900">
          分析に基づく改善アプローチ
        </h1>
        <p className="text-sm leading-relaxed text-gray-700">
          デジタル革新を求める企業、リテールDXを推進したい企業、クリエイティブな広告を求める企業、未来の成長を共に築くデジタル革新を求める企業。リテールDXを推進したい企業、クリエイティブな広告を求める企業、未来の成長を共に築く
        </p>
      </>

      <Table className="table-fixed border border-[#ccc]">
        <TableHeader>
          <TableRow>
            <TableHead
              className="text-foreground border-r border-b border-[#ccc] bg-[#D6EBF7] text-start text-lg font-semibold"
              rowSpan={2}
              colSpan={3}
            >
              クロスSWOT分析
            </TableHead>
            <TableHead
              className="text-foreground border-b border-[#ccc] bg-[#CAE5F7] text-center text-base font-bold"
              colSpan={6}
            >
              内部要因
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead
              colSpan={3}
              rowSpan={1}
              className="text-foreground h-auto border-r border-b border-[#ccc] bg-[#D6EBF7] px-4! py-3! text-center font-bold"
            >
              <h1 className="text-lg font-semibold">Strength 強み</h1>
              <p className="text-sm">
                クリエイティビティとテクノロジーを統合できる点
              </p>
            </TableHead>
            <TableHead
              colSpan={3}
              className="text-foreground h-auto border-r border-b border-[#ccc] bg-[#D6EBF7] px-4! py-3! text-center font-bold"
            >
              <h1 className="text-lg font-semibold">Weakness 弱み</h1>
              <p className="text-sm">
                競合に対してサステナビリティ対応が遅れている点
              </p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="w-full">
            <TableCell
              className="text-foreground border-r border-[#ccc] bg-[#CAE5F7] text-start align-middle text-lg font-semibold"
              rowSpan={2}
              colSpan={1}
            >
              外部要因
            </TableCell>
            <TableCell
              className="space-y-2 border-r border-b border-[#ccc] bg-[#D6EBF7] text-center align-middle font-bold"
              colSpan={2}
            >
              <p className="text-lg font-semibold">Opportunity</p>
              <p className="text-lg font-semibold">機会</p>
              <ol>
                <li>サステナビリティへの需要増加</li>
                <li>サステナビリティへの需要増加</li>
              </ol>
            </TableCell>
            <TableCell
              className="space-y-2 border-r border-b border-[#ccc] text-center font-bold"
              colSpan={3}
            >
              <p className="text-lg font-semibold text-[#0186C9]">積極化戦略</p>
              <p className="text-lg font-semibold">
                スキル評価でキャリアを加速させる
              </p>
              <p className="text-start text-sm">
                クライアント企業は迅速な対応を期待しており、迅速な提案と実行が事業成長を加速させ、信頼感を高める。
              </p>
              <div className="flex w-full justify-center space-x-6">
                <div className="rounded-sm border border-[#ccc] px-6 py-1">
                  A案
                </div>
                <div className="rounded-sm border border-[#ccc] px-6 py-1">
                  B案
                </div>
                <div className="rounded-sm border border-[#ccc] px-6 py-1">
                  C案
                </div>
              </div>
            </TableCell>
            <TableCell
              className="space-y-2 border-r border-b border-[#ccc] text-center font-bold"
              colSpan={3}
            >
              <p className="text-lg font-semibold text-[#0186C9]">改善戦略</p>
              <p className="text-lg font-semibold">
                シンプルな登録でスムーズな転職支援
              </p>
              <p className="text-start text-sm">
                クライアント企業は迅速な対応を期待しており、迅速な提案と実行が事業成長を加速させ、信頼感を高める。
              </p>
              <div className="flex w-full justify-center space-x-6">
                <div className="rounded-sm border border-[#ccc] px-6 py-1">
                  G案
                </div>
                <div className="rounded-sm border border-[#ccc] px-6 py-1">
                  H案
                </div>
                <div className="rounded-sm border border-[#ccc] px-6 py-1">
                  I案
                </div>
              </div>
            </TableCell>
          </TableRow>
          <TableRow className="w-full">
            <TableCell
              className="space-y-2 border-r border-b border-[#ccc] bg-[#D6EBF7] text-center align-middle font-bold"
              colSpan={2}
            >
              <p className="text-lg font-semibold">Threat</p>
              <p className="text-lg font-semibold">脅威</p>
              <ol>
                <li>生成AIを求めるユーザーの増加</li>
                <li>生成AIを求めるユーザーの増加</li>
              </ol>
            </TableCell>
            <TableCell
              className="space-y-2 border-r border-b border-[#ccc] text-center font-bold"
              colSpan={3}
            >
              <p className="text-lg font-semibold text-[#0186C9]">防衛戦略</p>
              <p className="text-lg font-semibold">
                技術を活かし転職潜在層を開拓
              </p>
              <p className="text-start text-sm">
                クライアント企業は迅速な対応を期待しており、迅速な提案と実行が事業成長を加速させ、信頼感を高める。
              </p>
              <div className="flex w-full justify-center space-x-6">
                <div className="rounded-sm border border-[#ccc] px-6 py-1">
                  E案
                </div>
                <div className="rounded-sm border border-[#ccc] px-6 py-1">
                  F案
                </div>
                <div className="rounded-sm border border-[#ccc] px-6 py-1">
                  G案
                </div>
              </div>
            </TableCell>
            <TableCell
              className="space-y-2 border-r border-b bg-[#ccc] align-middle text-center font-bold"
              colSpan={3}
            >
              防衛戦略
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
