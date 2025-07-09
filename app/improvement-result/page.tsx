'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { useState } from 'react';
import { HiOutlineArrowUp } from 'react-icons/hi';
import { HiOutlineArrowDown } from 'react-icons/hi';
import { LuArrowDownUp } from 'react-icons/lu';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';

const tabs = ['A案', 'B案', 'C案', 'D案', 'E案', 'F案', 'G案', 'H案', 'I案'];
type SimpleAccordionItemProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  onClick: () => void;
};

function SimpleAccordionItem({
  title,
  children,
  open,
  onClick,
}: SimpleAccordionItemProps) {
  return (
    <div>
      <button
        className="mt-4 flex w-full items-center justify-between border-t text-base font-medium transition focus:outline-none"
        onClick={onClick}
        tabIndex={0}
        aria-expanded={open}
      >
        <span className="py-4">{title}</span>
        <span
          className={`flex cursor-pointer items-center justify-center rounded-full border border-[#CCCCCC] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <polyline
              points="6 8 10 12 14 8"
              fill="none"
              stroke="#327EF7"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {open && <div>{children}</div>}
      <div className="mb-4 border-b"></div>
    </div>
  );
}

export default function ImprovementProposal() {
  const [tab, setTab] = useState('A案');
  const [openSection, setOpenSection] = useState<number | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="mt-5 text-2xl font-bold">改善案作成結果</h2>
        <Button
          type="button"
          className="flex cursor-pointer items-center rounded-full py-5 text-sm font-medium shadow-xl"
        >
          <span className="ml-9">ダウンロード</span>
          <span className="ml-[32px]">
            <Image src="/download.svg" alt="pin" width={12} height={12} />
          </span>
        </Button>
      </div>

      <div className="mt-5 rounded-xl bg-[#edf6fd] px-15 py-6 shadow">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg- w-full justify-between">
            {tabs.map((name) => (
              <TabsTrigger
                key={name}
                value={name}
                className={`px-7 py-2 font-medium ${
                  tab === name
                    ? 'border-b-2 border-blue-400 text-black'
                    : 'text-gray-400'
                } rounded-none bg-transparent`}
              >
                {name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <table className="mt-12 w-full border-collapse border border-[#e4e7ec] text-sm">
          <tbody className="text-xs">
            <tr>
              <td className="w-48 border border-[#e4e7ec] bg-white p-3 align-middle font-medium">
                訴求方針
              </td>
              <td className="border border-[#e4e7ec] p-3 align-middle">
                1.積極化戦略
              </td>
            </tr>
            <tr>
              <td className="border border-[#e4e7ec] bg-white p-3 align-middle font-medium">
                方向性
              </td>
              <td className="border border-[#e4e7ec] p-3 align-middle">
                購買前(まだ商品について詳しくないが、商品の情報収集を実施している状態)
              </td>
            </tr>
            <tr>
              <td className="border border-[#e4e7ec] bg-white p-3 align-middle font-medium">
                訴求テーマ
              </td>
              <td className="border border-[#e4e7ec] p-3 align-middle">
                親子で一緒に！、スマホ料金を節約しよう。
              </td>
            </tr>
            <tr>
              <td className="border border-[#e4e7ec] bg-white p-3 align-middle font-medium">
                vsオリジナル
              </td>
              <td className="border border-[#e4e7ec] p-3 align-middle">勝ち</td>
            </tr>
            <tr>
              <td className="border border-[#e4e7ec] bg-white p-3 align-middle font-medium">
                改善ポテンシャル
              </td>
              <td className="border border-[#e4e7ec] p-3 align-middle">
                <span className="align-middle text-2xl text-yellow-400">★</span>
                <span className="align-middle text-2xl text-gray-300">★</span>
                <span className="align-middle text-2xl text-gray-300">★</span>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6 rounded-xl bg-[#f5f9fd] px-10 py-4">
          <div className="mb-2 py-2 text-base font-bold">提案ストーリー</div>
          <div className="mr-[-40px] mb-6 ml-[-40px] border-b"></div>
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse border border-[#e4e7ec] text-sm">
              <tbody className="text-xs">
                <tr>
                  <td className="w-1/3 border border-[#e4e7ec] bg-white p-3 align-top font-medium">
                    競合LPを全体としたときの
                    <br />
                    市場ニーズや業界のトレンドの把握
                  </td>
                  <td className="w-2/3 border border-[#e4e7ec] p-3 align-top">
                    業界トレンド：「デジタル革新の加速」「リテールDXの推進」「クリエイティブとテクノロジーの融合」が各社共通する訴求コンテンツであり、市場ニーズ：デジタル革新を求める企業、リテールDXを推進したい企業、クリエイティブな広告を求める企業、未来の成長を共に築く
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#e4e7ec] bg-white p-3 align-top font-medium">
                    会社の商品の・サービスやポイントの見極め
                    <br />
                    ＝自社が足りてない部分や問題点
                  </td>
                  <td className="border border-[#e4e7ec] p-3 align-top">
                    強み：「クリエイティビティとテクノロジーの融合」「クライアント企業の事業成長パートナー」は業界トレンドと一致し、クライアント企業の成長に寄与。特に、「国内最大規模の統合デジタルファーム」はクリエイティブとテクノロジーの融合が評価できるパートナーとして選ばれているという一層価値を高めておる他、信頼性が高まる。
                    <br />
                    弱み：「生活者に寄り添うアプローチ」「未来を提案するメディア」ことは、生活者の期待に応えられない可能性がある。
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#e4e7ec] bg-white p-3 align-top font-medium">
                    競合他社のコミュニケーションを参考に
                    <br />
                    打開策はあるか
                  </td>
                  <td className="border border-[#e4e7ec] p-3 align-top">
                    王道：クリエイティビティとテクノロジーの融合に焦点を当て、クライアント企業の事業成長パートナーを訴求するコミュニケーションが多い
                    <br />
                    多歩：生活者に寄り添うアプローチに焦点を当て、クライアント企業の事業成長パートナーを訴求するコミュニケーションも数組見られる。
                  </td>
                </tr>
                <tr>
                  <td className="border border-[#e4e7ec] bg-white p-3 align-top font-medium">
                    新規顧客獲得（競合LPに勝つLP構成）は
                    <br />
                    どうすべきか
                  </td>
                  <td className="border border-[#e4e7ec] p-3 align-top">
                    デジタル戦略の横断に関する訴求を中心に、統合ソリューションの提供を強調した広告LPを展開し、簡単な操作でデジタル革新を求める企業
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="py-12 text-xl font-bold">改善案</h2>

        <div className="flex items-start justify-between">
          {/* <Image
            src="/screenshot.png"
            alt="ss"
            width={500}
            height={800}
            className="ml-8"
          /> */}
          <img
            src="/screenshot.png"
            alt="ss"
            className="ml-8 h-[4182px] w-[375px]"
          ></img>

          <div className="flex flex-col space-y-10">
            <div className="w-[630px] rounded-xl border-gray-200 bg-white px-10 py-6">
              <h2 className="mb-2 py-2 text-base font-bold">FV</h2>
              <div className="-mx-10 mb-6 border-b" />
              <h2 className="mb-6 text-base font-bold">FVの構成意図</h2>

              <div className="overflow-x-auto">
                <table className="mb-6 w-full table-fixed border border-gray-200 text-[13px]">
                  <tbody className="text-xs">
                    <tr>
                      <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                        FV構成
                      </td>
                      <td className="border border-gray-200 p-2">
                        まず、メインコピーでは「デジタル戦略を模索する企業に、統合ソリューションを提供します。」とし、企業が直面するデジタル化の課題に対する解決策を提示することで、ターゲットの関心を引きつける狙いがある。次にサブコピーでは「デジタル革新で新たな可能性を開く。企業の未来を強化するデジタル統合。進化し続ける市場に迅速適応。」とし、デジタル革新による未来の可能性を強調し、企業の成長を支援する姿勢を示すことで、信頼感を醸成する狙いがある。最後にCTAでは「今すぐ詳細を確認,最先端の統合ソリューションを確認しましょう。」とし、具体的な行動を促すことで、ターゲットに対して即時の行動を喚起する狙いがある。
                      </td>
                    </tr>
                    <tr>
                      <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                        UI/UX
                      </td>
                      <td className="border border-gray-200 p-2">
                        UX/UX観点から、自社の強みを活かし、具体的なサービス内容と事例をファーストビューに追加する。
                        競合はファーストビューで商材の強みを明確にし、広告訴求と一致させている。
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <SimpleAccordionItem
                  title="FVの改善案"
                  open={openSection === 0}
                  onClick={() => setOpenSection(openSection === 0 ? null : 0)}
                >
                  <div className="overflow-x-auto">
                    <table className="mb-4 w-full table-fixed border border-gray-200 text-[13px]">
                      <tbody>
                        <tr>
                          <td
                            rowSpan={4}
                            className="w-[124px] border border-gray-200 bg-gray-50 p-2 align-top font-semibold"
                          >
                            コピー
                          </td>
                          <td className="w-28 border border-gray-200 bg-gray-50 p-2 font-semibold">
                            メインコピー
                          </td>
                          <td className="border border-gray-200 p-2">
                            AI技術でビジネスを革新し、未来の成長を共に築く
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 bg-gray-50 p-2 font-semibold">
                            サブコピー1
                          </td>
                          <td className="border border-gray-200 p-2">
                            デジタルトランスフォーメーションを加速するためのパートナーシップ
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 bg-gray-50 p-2 font-semibold">
                            サブコピー2
                          </td>
                          <td className="border border-gray-200 p-2">
                            AIを通じて企業の潜在能力を解き放つ
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 bg-gray-50 p-2 font-semibold">
                            サブコピー3
                          </td>
                          <td className="border border-gray-200 p-2">
                            次世代のビジネスチャンスを掴むためのソリューションを提供
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 bg-gray-50 p-2 font-semibold">
                            ビジュアル
                          </td>
                          <td className="border border-gray-200 bg-gray-50 p-2 font-semibold">
                            作成指示
                          </td>
                          <td className="border border-gray-200 p-2">
                            AI技術のテーマを反映した未来的な都市の写真に、デジタルデータやフローを上から重ねてください。
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 bg-gray-50 p-2 font-semibold">
                            CTAボタン
                          </td>
                          <td className="border border-gray-200 bg-gray-50 p-2 font-semibold">
                            ボタンテキスト
                          </td>
                          <td className="border border-gray-200 p-2">
                            詳しく知る
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 bg-gray-50 p-2 font-semibold"></td>
                          <td className="border border-gray-200 bg-gray-50 p-2 font-semibold">
                            マイクロコピー
                          </td>
                          <td className="border border-gray-200 p-2">
                            AI技術で次のステップを踏み出す
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 bg-gray-50 p-2 font-semibold">
                            権威付け
                          </td>
                          <td className="border border-gray-200 bg-gray-50 p-2 font-semibold">
                            作成指示
                          </td>
                          <td className="border border-gray-200 p-2">
                            AIの専門家チームによる研究と開発の事例紹介を掲載してください。
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </SimpleAccordionItem>
              </div>

              <div>
                <SimpleAccordionItem
                  title="制作意図"
                  open={openSection === 1}
                  onClick={() => setOpenSection(openSection === 1 ? null : 1)}
                >
                  <div className="mb-6 text-xs">
                    <h3 className="font-bold">制作理由</h3>
                    <h3>
                      この構成案で制作すべき納得できる具体的な理由は、AI技術を活用したビジネス革新のビジョンを明確に提示し、顧客の興味を引きつけることができる点である。また、具体的な価値提案を示すことで、顧客の期待感を高め、信頼感を醸成することができる。
                    </h3>
                  </div>
                  <div className="mb-6 text-xs">
                    <h3 className="font-bold">ユーザーへもたらす影響</h3>
                    <h3>
                      この構成案がCV獲得のためにユーザーへどのように影響をもたらすのかは、明確なメッセージと具体的な価値提案により、ユーザーの興味を引きつけ、行動を促すことができる点である。さらに、心理的ハードルを下げる工夫を施すことで、ユーザーがよりスムーズにコンバージョンに至ることが期待できる。
                    </h3>
                  </div>
                  <div className="mb-6 text-xs">
                    <h3 className="font-bold">制作時の留意点</h3>
                    <h3>
                      制作の際に留意すべきことは、専門用語を減らし、ユーザー目線の言葉を使用してメッセージを明確化することである。また、CTAの配置やデザインを改善し、ユーザーが行動を起こしやすいように心理的負担を軽減することが重要である。
                    </h3>
                  </div>
                </SimpleAccordionItem>
              </div>
            </div>

            <div className="relative w-[630px] rounded-xl border-gray-200 bg-white px-10 py-6">
              <div className="absolute top-[-15px] ml-100 h-[283px] w-[262px] rounded-xl bg-[#FFFFFF] p-6 shadow">
                <div className="flex w-full items-center justify-between">
                  <h2 className="text-[14px] font-bold">LPの構成</h2>
                  <CgClose className="mt-[-25px] mr-[-6px] cursor-pointer text-lg text-[#777777]" />
                </div>
                <div className="mr-[-25px] ml-[-25px] border-b py-1"></div>

                <div className="mt-4 mb-6 flex flex-col space-y-4 text-xs font-medium">
                  <h2>FV</h2>

                  <div className="flex w-full justify-between">
                    <h2>商品/サービスの特徴</h2>
                    <div className="flex gap-3">
                      <HiOutlineArrowUp className="text-[15px] text-[#777777]" />
                      <HiOutlineArrowDown className="text-[15px] text-[#CCCCCC]" />
                      <FiEye className="text-[15px] text-[#CCCCCC]" />
                    </div>
                  </div>

                  <div className="flex w-full justify-between">
                    <h2>問題提起/共感</h2>
                    <div className="flex gap-3">
                      <HiOutlineArrowUp className="text-[15px] text-[#CCCCCC]" />
                      <HiOutlineArrowDown className="text-[15px] text-[#CCCCCC]" />
                      <FiEyeOff className="text-[15px] text-[#777777]" />
                    </div>
                  </div>

                  <div className="flex w-full justify-between">
                    <h2>ニュース/更新情報</h2>
                    <div className="flex gap-3">
                      <HiOutlineArrowUp className="text-[15px] text-[#CCCCCC]" />
                      <HiOutlineArrowDown className="text-[15px] text-[#CCCCCC]" />
                      <FiEyeOff className="text-[15px] text-[#777777]" />
                    </div>
                  </div>

                  <div className="flex w-full justify-between">
                    <h2>ご利用の流れ/ステップ</h2>
                    <div className="flex gap-3">
                      <HiOutlineArrowUp className="text-[15px] text-[#CCCCCC]" />
                      <HiOutlineArrowDown className="text-[15px] text-[#CCCCCC]" />
                      <FiEyeOff className="text-[15px] text-[#777777]" />
                    </div>
                  </div>
                </div>

                <div className="mr-[-25px] ml-[-25px] border-b"></div>
                <div className="mt-2 ml-[-8px] flex items-center">
                  <img
                    src="/reload.svg"
                    alt="ss"
                    className="h-7 w-7 cursor-pointer"
                  ></img>
                  <h3 className="text-[11px] text-[#777777]">リセット</h3>
                </div>
              </div>

              <div className="absolute top-[280px] right-[-70px] z-20 cursor-pointer rounded-full bg-[#056BE9] p-3 text-2xl text-white">
                <LuArrowDownUp />
              </div>

              <h2 className="mb-2 py-2 text-base font-bold">商品/サービスの特徴</h2>
              <div className="-mx-10 mb-6 border-b" />
                  <div className="overflow-x-auto">
                    <table className="mb-6 w-full table-fixed border border-gray-200 text-[13px]">
                      <tbody className="text-xs">
                        <tr>
                          <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                            見出し
                          </td>
                          <td className="border border-gray-200 p-2">
                            デジタルソリューションの役割
                          </td>
                        </tr>
                        <tr>
                          <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                            内容
                          </td>
                          <td className="border border-gray-200 p-2">
                            革新的なAI技術を活用し、企業の変革を支援します。この技術は意思決定を迅速化し、顧客体験の向上をサポートします。また、効率的なデータ分析により、戦略的な事業の推進を可能にします。さらに、柔軟なシステムがビジネスの成長を促進します。
                          </td>
                        </tr>
                        <tr>
                          <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                            見出し
                          </td>
                          <td className="border border-gray-200 p-2">
                            マーケティングのデジタル革新
                          </td>
                        </tr>
                        <tr>
                          <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                            内容
                          </td>
                          <td className="border border-gray-200 p-2">
                            最新のテクノロジーを活用し、ターゲットとなる顧客層へのアプローチを革新します。デジタル広告の効果を最大化するため、データに基づく戦略を策定します。これにより、顧客とのエンゲージメントを強化し、ブランド価値の向上を図ります。当社はさらに、複雑なマーケティングの統合を支援し、成果を出すことに注力しています。
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              <div>

              </div>

              <div>
                <SimpleAccordionItem
                  title="制作意図"
                  open={openSection === 3}
                  onClick={() => setOpenSection(openSection === 3 ? null : 3)}
                >
                  <div className="mb-6 text-xs">
                    <h3 className="font-bold">制作理由</h3>
                    <h3>
                      この構成案は、AI技術を活用したデジタル変革の重要性を強調し、企業の成長を支援するという明確なメッセージを伝えるために必要である。特に、競合との差別化ポイントであるクリエイティビティとテクノロジーの統合を強調することで、クライアント企業の事業成長パートナーとしての地位を確立することができる。
                    </h3>
                  </div>
                  <div className="mb-6 text-xs">
                    <h3 className="font-bold">ユーザーへもたらす影響</h3>
                    <h3>
                      この構成案は、ユーザーに対してデジタル変革の具体的なメリットを示すことで、興味を引き、信頼を築くことができる。さらに、専門用語を減らし、具体的な事例を増やすことで、ユーザーが情報を理解しやすくなり、コンバージョン率の向上につながる。
                    </h3>
                  </div>
                  <div className="mb-6 text-xs">
                    <h3 className="font-bold">制作時の留意点</h3>
                    <h3>
                      制作の際には、専門用語を減らし、ユーザー目線の言葉を使用することが重要である。また、情報を整理し、図やイラストを活用して視覚的に理解しやすいコンテンツを提供することが求められる。
                    </h3>
                  </div>
                </SimpleAccordionItem>
              </div>

              <h2 className="mt-15 mb-6 text-base font-bold">問題提起/共感</h2>
              <div className="overflow-x-auto">
                <table className="mb-6 w-full table-fixed border border-gray-200 text-[13px]">
                  <tbody className="text-xs">
                    <tr>
                      <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                        見出し
                      </td>
                      <td className="border border-gray-200 p-2">
                        AI技術によるトップページ編集の自由化
                      </td>
                    </tr>
                    <tr>
                      <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                        内容
                      </td>
                      <td className="border border-gray-200 p-2">
                        AI技術を活用したトップページ編集では、自由なカスタマイズが可能です。これにより、企業のニーズに適応し、瞬時に変化する市場ニーズに応えます。企業全体のデジタル変革を促進し、持続的な成長をサポートします。
                      </td>
                    </tr>
                    <tr>
                      <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                        注釈
                      </td>
                      <td className="border border-gray-200 p-2">
                        ※トップページのカスタマイズには専門知識が要りません。
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <SimpleAccordionItem
                  title="制作意図"
                  open={openSection === 4}
                  onClick={() => setOpenSection(openSection === 4 ? null : 4)}
                >
                  <div className="mb-6 text-xs">
                    <h3 className="font-bold">制作理由</h3>
                    <h3>
                      この構成案で制作すべき理由は、デジタル変革の自由度を高める編集を強調することで、企業のニーズに応じた柔軟な対応が可能であることを示すためである。また、AI技術を活用したカスタマイズの容易さを訴求することで、専門知識が不要であることを明確にし、ユーザーの心理的ハードルを下げることができる。
                    </h3>
                  </div>
                  <div className="mb-6 text-xs">
                    <h3 className="font-bold">ユーザーへもたらす影響</h3>
                    <h3>
                      この構成案は、ユーザーに対してAI技術によるカスタマイズの自由度を強調することで、企業のデジタル変革を促進し、持続的な成長をサポートするという信頼感を与える。これにより、ユーザーは自社の成長に直結する価値を感じ、コンバージョンに繋がる可能性が高まる。
                    </h3>
                  </div>
                  <div className="mb-6 text-xs">
                    <h3 className="font-bold">制作時の留意点</h3>
                    <h3>
                      制作の際に留意すべきことは、専門用語を減らし、ユーザー目線の言葉を使用することで心理的ハードルを下げることが重要である。また、情報を整理し、図やイラストを活用して視覚的に理解しやすい構成にすることで、ユーザーの興味を引き続けることが求められる。
                    </h3>
                  </div>
                </SimpleAccordionItem>
              </div>

              <h2 className="mt-15 mb-6 text-base font-bold">News/更新情報</h2>
              <div className="overflow-x-auto">
                <table className="mb-6 w-full table-fixed border border-gray-200 text-[13px]">
                  <tbody className="text-xs">
                    <tr>
                      <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                        タイトル
                      </td>
                      <td className="border border-gray-200 p-2">
                        電通デジタルの最新活動
                      </td>
                    </tr>
                    <tr>
                      <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                        内容
                      </td>
                      <td className="border border-gray-200 p-2">
                        マイナビニュースに掲載された大学寄附講座は、未来のリーダー育成を目指します。2035年のトレンド予測を元にした経営戦略で、新しいビジネスチャンスを創出します。また、Pinterest主催のコンテストで最優秀賞を受賞しました。
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <SimpleAccordionItem
                  title="制作意図"
                  open={openSection === 5}
                  onClick={() => setOpenSection(openSection === 5 ? null : 5)}
                >
                  <div className="mb-6 text-xs">
                    <h3 className="font-bold">制作理由</h3>
                    <h3>
                      この構成案で制作すべき理由は、デジタル変革の自由度を高める編集を強調することで、企業のニーズに応じた柔軟な対応が可能であることを示すためである。また、AI技術を活用したカスタマイズの容易さを訴求することで、専門知識が不要であることを明確にし、ユーザーの心理的ハードルを下げることができる。
                    </h3>
                  </div>
                  <div className="mb-6 text-xs">
                    <h3 className="font-bold">ユーザーへもたらす影響</h3>
                    <h3>
                      この構成案は、ユーザーに対してAI技術によるカスタマイズの自由度を強調することで、企業のデジタル変革を促進し、持続的な成長をサポートするという信頼感を与える。これにより、ユーザーは自社の成長に直結する価値を感じ、コンバージョンに繋がる可能性が高まる。
                    </h3>
                  </div>
                  <div className="mb-6 text-xs">
                    <h3 className="font-bold">制作時の留意点</h3>
                    <h3>
                      制作の際に留意すべきことは、専門用語を減らし、ユーザー目線の言葉を使用することで心理的ハードルを下げることが重要である。また、情報を整理し、図やイラストを活用して視覚的に理解しやすい構成にすることで、ユーザーの興味を引き続けることが求められる。
                    </h3>
                  </div>
                </SimpleAccordionItem>
              </div>

              <h2 className="mt-15 mb-6 text-base font-bold">
                ご利用の流れ/ステップ
              </h2>
              <div className="overflow-x-auto">
                <table className="mb-6 w-full table-fixed border border-gray-200 text-[13px]">
                  <tbody className="text-xs">
                    <tr>
                      <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                        ステップ
                      </td>
                      <td className="border border-gray-200 p-2">
                        ステップ1: ご案内
                      </td>
                    </tr>
                    <tr>
                      <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                        内容
                      </td>
                      <td className="border border-gray-200 p-2">
                        最新のAI技術を基にした事業成長の可能性について解説し、ご自身のニーズに合ったサポートステップを提案します。
                      </td>
                    </tr>
                    <tr>
                      <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                        注釈
                      </td>
                      <td className="border border-gray-200 p-2">
                        ご案内は個別相談も可能です。お気軽にお問合せください。
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto">
                <table className="mb-6 w-full table-fixed border border-gray-200 text-[13px]">
                  <tbody className="text-xs">
                    <tr>
                      <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                        ステップ
                      </td>
                      <td className="border border-gray-200 p-2">
                        ステップ2: 資料ダウンロード
                      </td>
                    </tr>
                    <tr>
                      <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                        内容
                      </td>
                      <td className="border border-gray-200 p-2">
                        AI活用の具体例を含む最新の資料を提供し、どのように技術を利用して発展を遂げるかを学んでいただきます。
                      </td>
                    </tr>
                    <tr>
                      <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                        注釈
                      </td>
                      <td className="border border-gray-200 p-2">
                        資料はすべて無料で提供しています。詳細には我々の取り組みと成功事例が含まれます。
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto">
                <table className="mb-6 w-full table-fixed border border-gray-200 text-[13px]">
                  <tbody className="text-xs">
                    <tr>
                      <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                        ステップ
                      </td>
                      <td className="border border-gray-200 p-2">
                        ステップ3: メールマガジン登録
                      </td>
                    </tr>
                    <tr>
                      <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                        内容
                      </td>
                      <td className="border border-gray-200 p-2">
                        定期的にAI技術の最新情報や業界動向をお届けし、デジタル変革の一助となる情報を提供します。
                      </td>
                    </tr>
                    <tr>
                      <td className="w-[124px] border border-gray-200 bg-gray-50 p-2 font-semibold">
                        注釈
                      </td>
                      <td className="border border-gray-200 p-2">
                        メールマガジンは無料で購読可能です。登録後いつでも解除できます。
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <SimpleAccordionItem
                  title="制作意図"
                  open={openSection === 6}
                  onClick={() => setOpenSection(openSection === 6 ? null : 6)}
                >
                  <div className="mb-8 text-xs">
                    <h3 className="font-bold">制作理由</h3>
                    <h3>
                      この構成案は、AI技術を活用したデジタル変革のステップを明確に示すことで、ユーザーに具体的な行動を促すことができる。さらに、個別相談や無料資料提供、メールマガジン登録といったステップを設けることで、ユーザーの関心を段階的に高め、コンバージョンへとつなげることができる。
                    </h3>
                  </div>
                  <div className="mb-6 text-xs">
                    <h3 className="font-bold">ユーザーへもたらす影響</h3>
                    <h3>
                      この構成案は、ユーザーがAI技術の具体的な活用方法を理解しやすくすることで、心理的ハードルを下げ、行動を促進する。ステップごとに明確な行動を示すことで、ユーザーが次に何をすべきかを理解しやすくし、コンバージョン率の向上に寄与する。
                    </h3>
                  </div>
                  <div className="mb-6 text-xs">
                    <h3 className="font-bold">制作時の留意点</h3>
                    <h3>
                      制作の際には、専門用語を減らし、ユーザー目線の言葉を使用することが重要である。また、図やイラストを活用して視覚的に情報を伝え、情報の整理を行い、ユーザーが必要な情報をすぐに見つけられるようにすることが求められる。
                    </h3>
                  </div>
                </SimpleAccordionItem>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
