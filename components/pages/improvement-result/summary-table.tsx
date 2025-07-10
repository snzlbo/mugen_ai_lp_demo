import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export default function SummaryTable() {
  return (
    <Table className="w-full border-collapse border border-[#ccc] text-sm">
      <TableBody className="text-xs">
        <TableRow>
          <TableCell className="w-48 border border-[#e4e7ec] p-3 align-middle font-medium">
            戦略
          </TableCell>
          <TableCell className="border border-[#e4e7ec] p-3 align-middle">
            積極化戦略（強み×機会）
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border border-[#e4e7ec] p-3 align-middle font-medium">
            方向性
          </TableCell>
          <TableCell className="border border-[#e4e7ec] p-3 align-middle">
            購買前（まだ商品について詳しくないが、商品の情報収集を実施している状態）
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border border-[#e4e7ec] p-3 align-middle font-medium">
            訴求テーマ
          </TableCell>
          <TableCell className="border border-[#e4e7ec] p-3 align-middle">
            親子で一緒に！​スマホ料金を節約しよう。​
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border border-[#e4e7ec] p-3 align-middle font-medium">
            コンテンツ 構成意図
          </TableCell>
          <TableCell className="border border-[#e4e7ec] p-3 align-middle">
            まず、上部では統合ソリューションの特徴と詳細情報を提示し、企業のデジタル戦略支援を強調する。次に中部では、クリエイティビティとテクノロジーの統合を示し、競合との差別化を図る。最後に下部では、最新ニュースと実行ステップを示し、信頼感と行動意欲を高める。
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border border-[#e4e7ec] p-3 align-middle font-medium">
            UI/UX 改善案
          </TableCell>
          <TableCell className="border border-[#e4e7ec] p-3 align-middle">
            <p>
              UX/UX観点から、興味を引くタイトルを活かし、視覚的要素と具体例で情報を整理する。
            </p>
            <p>
              競合は視覚的に整理された情報と具体的な事例でユーザーの理解を助けている。
            </p>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="border border-[#e4e7ec] p-3 align-middle font-medium">
            <p>FV</p>
            <p>構成意図</p>
          </TableCell>
          <TableCell className="border border-[#e4e7ec] p-3 align-middle">
            <ol className='list-disc px-4'>
              <li>
                まず、メインコピーでは「デジタル戦略を模索する企業に、統合ソリューションを提供します。」とし、企業が直面するデジタル化の課題に対する解決策を提示することで、ターゲットの関心を引きつける狙いがある。 
              </li>
              <li>
                次にサブコピーでは「デジタル革新で新たな可能性を開く。企業の未来を強化するデジタル統合。進化し続ける市場に迅速適応。」とし、デジタル革新による未来の可能性を強調し、企業の成長を支援する姿勢を示すことで、信頼感を醸成する狙いがある。 
              </li>
              <li>
                最後にCTAでは「今すぐ詳細を確認,最先端の統合ソリューションを確認しましょう。」とし、具体的な行動を促すことで、ターゲットに対して即時の行動を喚起する狙いがある。
              </li>
            </ol>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
