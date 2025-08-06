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
    <div className="flex flex-col space-y-6 rounded-xl bg-[#f3fafd] px-12 py-8">
      <>
        <h1 className="mb-3 text-xl font-bold text-gray-900">
          分析に基づく改善アプローチ
        </h1>
        <p className="text-[14px] leading-relaxed font-bold text-[#212121]">
          競合分析で抽出したLP情報を活用してクロスSWOT分析を行い、戦略的な改善アプローチを導き出しました。
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
              className="text-foreground border-b border-[#ccc] bg-[#CDE7F5] text-center text-[14px] font-bold"
              colSpan={6}
            >
              内部要因
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead
              colSpan={3}
              rowSpan={1}
              className="text-foreground h-auto border-r border-b border-[#ccc] bg-[#E2F0F9] px-4! py-3! text-center font-bold"
            >
              <h1 className="text-lg font-semibold">Strength 強み</h1>
              <p className="text-[11px] font-medium">
                クリエイティビティとテクノロジーを統合できる点
              </p>
            </TableHead>
            <TableHead
              colSpan={3}
              className="text-foreground h-auto border-r border-b border-[#ccc] bg-[#E2F0F9] px-4! py-3! text-center font-bold"
            >
              <h1 className="text-lg font-semibold">Weakness 弱み</h1>
              <p className="text-[11px] font-medium">
                競合に対してサステナビリティ対応が遅れている点
              </p>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="w-full">
            <TableCell
              className="text-foreground border-r border-[#ccc] bg-[#CDE7F5] align-middle text-[14px] font-bold py-[8px] px-[16px]"
              rowSpan={2}
              colSpan={1}
            >
              外部要因
            </TableCell>
            <TableCell
              className="space-y-2 border-r border-b border-[#ccc] bg-[#E2F0F9] text-center align-middle font-bold px-[16px] py-[8px]"
              colSpan={2}
            >
              <p className="text-lg font-semibold">Opportunity</p>
              <p className="text-lg font-semibold">機会</p>
              <ul className="flex flex-col items-center space-y-1 text-[11px] font-medium">
                <li className="mb-[2px] flex items-center text-[11px] leading-[20px] font-medium">
                  <span className="mr-2 inline-block h-1 w-1 rounded-full bg-[#212121]"></span>
                  サステナビリティへの需要増加
                </li>
                <li className="flex items-center text-[11px] leading-[20px] font-medium">
                  <span className="mr-2 inline-block h-1 w-1 rounded-full bg-[#212121]"></span>
                  サステナビリティへの需要増加
                </li>
              </ul>
            </TableCell>
            <TableCell
              className="space-y-2 border-r border-b border-[#ccc] px-[16px] py-[8px] text-center font-bold bg-[#F8FBFE]"
              colSpan={3}
            >
              <p className="text-lg font-semibold text-[#0186C9]">積極化戦略</p>
              <p className="text-[13px] font-semibold">
                スキル評価でキャリアを加速させる
              </p>
              <p className="text-start text-[11px] font-medium">
                クライアント企業は迅速な対応を期待しており、迅速な提案と実行が事業成長を加速させ、信頼感を高める。
              </p>
              <div className="flex w-full justify-center space-x-4">
                <div className="text-sm rounded-xs flex justify-center items-center border border-[#ccc] px-[8px] py-[8px] w-[65px] h-[24px] bg-[#FFFFFF]">
                  A案
                </div>
                <div className="text-sm rounded-xs flex justify-center items-center border border-[#ccc] px-[8px] py-[8px] w-[65px] h-[24px] bg-[#FFFFFF]">
                  B案
                </div>
                <div className="text-sm rounded-xs flex justify-center items-center border border-[#ccc] px-[8px] py-[8px] w-[65px] h-[24px] bg-[#FFFFFF]">
                  C案
                </div>
              </div>
            </TableCell>
            <TableCell
              className="space-y-2 border-r border-b border-[#ccc] px-[16px] py-[8px] text-center font-bold bg-[#F8FBFE]"
              colSpan={3}
            >
              <p className="text-lg font-semibold text-[#0186C9]">改善戦略</p>
              <p className="text-[13px] font-semibold">
                シンプルな登録でスムーズな転職支援
              </p>
              <p className="text-start text-[11px] font-medium">
                クライアント企業は迅速な対応を期待しており、迅速な提案と実行が事業成長を加速させ、信頼感を高める。
              </p>
              <div className="flex w-full justify-center space-x-4">
                <div className="text-sm text-[12px] rounded-xs flex justify-center items-center border border-[#ccc] px-[8px] py-[8px] w-[65px] h-[24px] bg-[#FFFFFF]">
                  G案
                </div>
                <div className="text-sm text-[12px] rounded-xs flex justify-center items-center border border-[#ccc] px-[8px] py-[8px] w-[65px] h-[24px] bg-[#FFFFFF]">
                  H案
                </div>
                <div className="text-sm text-[12px] rounded-xs flex justify-center items-center border border-[#ccc] px-[8px] py-[8px] w-[65px] h-[24px] bg-[#FFFFFF]">
                  I案
                </div>
              </div>
            </TableCell>
          </TableRow>
          <TableRow className="w-full">
            <TableCell
              className="space-y-2 border-r border-b border-[#ccc] bg-[#E2F0F9] text-center align-middle font-bold px-[16px] py-[8px]"
              colSpan={2}
            >
              <p className="text-lg font-semibold">Threat</p>
              <p className="text-lg font-semibold">脅威</p>
              <ul className="flex flex-col items-center space-y-1 text-[11px] font-medium">
                <li className="mb-[2px] flex items-center text-[11px] leading-[20px] font-medium">
                  <span className="mr-2 inline-block h-1 w-1 rounded-full bg-[#212121]"></span>
                  生成AIを求めるユーザーの増加
                </li>
                <li className="flex items-center text-[11px] leading-[20px] font-medium">
                  <span className="mr-2 inline-block h-1 w-1 rounded-full bg-[#212121]"></span>
                  生成AIを求めるユーザーの増加
                </li>
              </ul>
            </TableCell>
            <TableCell
              className="space-y-2 border-r border-b border-[#ccc] text-center font-bold py-[8px] px-[16px] bg-[#F8FBFE]"
              colSpan={3}
            >
              <p className="text-lg font-semibold text-[#0186C9]">防衛戦略</p>
              <p className="text-[13px] font-semibold">
                技術を活かし転職潜在層を開拓
              </p>
              <p className="text-start text-[11px] font-medium">
                クライアント企業は迅速な対応を期待しており、迅速な提案と実行が事業成長を加速させ、信頼感を高める。
              </p>
              <div className="flex w-full justify-center space-x-4">
                <div className="text-sm rounded-xs flex justify-center items-center border border-[#ccc] px-[8px] py-[8px] w-[65px] h-[24px] bg-[#FFFFFF]">
                  E案
                </div>
                <div className="text-sm rounded-xs flex justify-center items-center border border-[#ccc] px-[8px] py-[8px] w-[65px] h-[24px] bg-[#FFFFFF]">
                  F案
                </div>
                <div className="text-sm rounded-xs flex justify-center items-center border border-[#ccc] px-[8px] py-[8px] w-[65px] h-[24px] bg-[#FFFFFF]">
                  G案
                </div>
              </div>
            </TableCell>
            <TableCell
              className="space-y-2 border-r border-b bg-[#edf2f8] text-center align-middle font-bold py-[8px] px-[16px]"
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
