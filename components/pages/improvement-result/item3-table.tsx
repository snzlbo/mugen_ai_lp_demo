import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Item1Table() {
  return (
    <div className="w-full rounded-xl bg-white">
      <h2 className="mb-2 border-b border-[#ccc] px-8 pt-6 pb-4 text-base font-bold">
        問題提起/共感
      </h2>
      <div className="overflow-x-auto px-8 pt-6">
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
                <p>自社</p>
                <p>
                  AI技術を活用したトップページ編集では、自由なカスタマイズが可能です。これにより、企業のニーズに適応し、瞬時に変化する市場ニーズに応えます。企業全体のデジタル変革を促進し、持続的な成長をサポートします。
                </p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={1}
                className="border border-[#ccc] bg-[#fafafa] align-middle font-semibold"
              >
                注釈
              </TableCell>
              <TableCell
                colSpan={8}
                className="border border-[#ccc] bg-white p-2"
              >
                <p>自社</p>
                <p className="text-gray-500">
                  ※トップページのカスタマイズには専門知識が要りません。
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="px-8 pb-6">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>制作意図</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p className="font-bold">制作理由</p>
              <p>
                この構成案で制作すべき理由は、デジタル変革の自由度を高める編集を強調することで、企業のニーズに応じた柔軟な対応が可能であることを示すためである。また、AI技術を活用したカスタマイズの容易さを訴求することで、専門知識が不要であることを明確にし、ユーザーの心理的ハードルを下げることができる。
              </p>
              <p className="font-bold">ユーザーへもたらす影響</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
