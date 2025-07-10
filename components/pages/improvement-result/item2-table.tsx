import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
export default function Item1Table() {
  return (
    <div className="w-full rounded-xl bg-white">
      <h2 className="mb-2 border-b border-[#ccc] px-8 pt-6 pb-4 text-base font-bold">
        商品/サービスの特徴
      </h2>
      <div className="overflow-x-auto px-8 py-6">
        <Table className="mb-6 w-full table-fixed border border-[#ccc] bg-white">
          <TableBody className="text-xs">
            <TableRow>
              <TableCell
                colSpan={1}
                className="border border-[#ccc] bg-[#fafafa] align-middle font-semibold"
              >
                見出し
              </TableCell>
              <TableCell
                colSpan={8}
                className="border border-[#ccc] bg-white p-2"
              >
                <p>他社：https://dentsu.co.jp/</p>
                <p>デジタルソリューションの役割</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={1}
                className="border border-[#ccc] bg-[#fafafa] align-middle font-semibold"
              >
                内容
              </TableCell>
              <TableCell
                colSpan={8}
                className="border border-[#ccc] bg-white p-2"
              >
                <p>他社：https://dentsu.co.jp/</p>
                <p>
                  革新的なAI技術を活用し、企業の変革を支援します。この技術は意思決定を迅速化し、顧客体験の向上をサポートします。また、効率的なデータ分析により、戦略的な事業の推進を可能にします。さらに、柔軟なシステムがビジネスの成長を促進します。
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table className="mb-6 w-full table-fixed border border-[#ccc] bg-white">
          <TableBody className="text-xs">
            <TableRow>
              <TableCell
                colSpan={1}
                className="border border-[#ccc] bg-[#fafafa] align-middle font-semibold"
              >
                見出し
              </TableCell>
              <TableCell
                colSpan={8}
                className="border border-[#ccc] bg-white p-2"
              >
                <p>他社：https://dentsu.co.jp/</p>
                <p>マーケティングのデジタル革新</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={1}
                className="border border-[#ccc] bg-[#fafafa] align-middle font-semibold"
              >
                内容
              </TableCell>
              <TableCell
                colSpan={8}
                className="border border-[#ccc] bg-white p-2"
              >
                <p>他社：https://dentsu.co.jp/</p>
                <p>
                  最新のテクノロジーを活用し、ターゲットとなる顧客層へのアプローチを革新します。デジタル広告の効果を最大化するため、データに基づく戦略を策定します。これにより、顧客とのエンゲージメントを強化し、ブランド価値の向上を図ります。当社はさらに、複雑なマーケティングの統合を支援し、成果を出すことに注力しています。
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
