'use client';

import AnalysisTable from '@/components/pages/improvement-result/analysis-table';
import Item1Table from '@/components/pages/improvement-result/item1-table';
import Item2Table from '@/components/pages/improvement-result/item2-table';
import Item3Table from '@/components/pages/improvement-result/item3-table';
import SummaryTable from '@/components/pages/improvement-result/summary-table';
import { Bread } from '@/components/parts/bread';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  ArrowDown,
  ArrowDownUp,
  ArrowUp,
  DownloadIcon,
  Eye,
  EyeOff,
} from 'lucide-react';
import Image from 'next/image';
import { JSX, useState } from 'react';
import { HiQuestionMarkCircle } from 'react-icons/hi';

const tabs = ['A案', 'B案', 'C案', 'D案', 'E案', 'F案', 'G案', 'H案', 'I案'];
interface Items {
  title: string;
  key: string;
  index: number;
  show: boolean;
  content: JSX.Element;
  imgSrc: string;
}

export default function ImprovementProposal() {
  const [tab, setTab] = useState('A案');
  const [displayItems, setDisplayItems] = useState<Items[]>([
    {
      title: 'FVの改善案',
      key: 'fv',
      index: 0,
      show: true,
      content: Item1Table(),
      imgSrc: '/improvement-result/image1.png',
    },
    {
      title: '商品/サービスの特徴',
      key: 'characteristics',
      index: 1,
      show: true,
      content: Item2Table(),
      imgSrc: '/improvement-result/image2.png',
    },
    {
      title: '問題提起/共感',
      key: 'issues',
      index: 2,
      show: true,
      content: Item3Table(),
      imgSrc: '/improvement-result/image3.png',
    },
  ]);

  const handleDisplayItemsVisibility = (index: number) => {
    setDisplayItems((prevItems) =>
      prevItems.map((item) =>
        item.index === index ? { ...item, show: !item.show } : item,
      ),
    );
  };

  const handleDisplayItemsIndex = (
    index: number,
    direction: 'asc' | 'desc',
  ) => {
    setDisplayItems((prevItems) => {
      const newIndex = direction === 'asc' ? index - 1 : index + 1;

      if (newIndex >= 0 && newIndex < prevItems.length) {
        const items = [...prevItems];

        [items[index], items[newIndex]] = [items[newIndex], items[index]];

        items[index].index = index;
        items[newIndex].index = newIndex;
        return items;
      }

      return prevItems; // Return the current state if swap is not possible
    });
  };

  return (
    <div className="flex flex-col space-y-10">
      <Bread />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">改善案生成結果</h2>
        <div className="flex gap-3">
          <Button className="flex h-10 min-w-[192px] cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-6 text-[12px] font-semibold text-[#212121] shadow-none hover:bg-white hover:text-[#212121]">
            レギュレーションチェック
          </Button>
          <Button className="cursor-pointer flex h-10 min-w-[192px] items-center justify-center gap-2 text-[12px] rounded-full bg-[#212121] pl-[24px] font-semibold text-white shadow-none pr-[5px]">
          改善案をダウンロード
            <DownloadIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <AnalysisTable />
      <div className="space-y-6 rounded-xl bg-[#f3fafd]">
        <Tabs
          value={tab}
          onValueChange={setTab}
          className="border-b px-12 pt-8"
        >
          <TabsList className="w-full justify-between p-0">
            {tabs.map((name) => (
              <TabsTrigger
                key={name}
                value={name}
                className={cn(
                  'rounded-none bg-none px-7 py-2 font-medium data-[state=active]:bg-none data-[state=active]:shadow-none',
                  tab === name &&
                    'border-x-0 border-t-0 border-b-2 border-blue-400 text-black',
                )}
              >
                {name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex flex-col space-y-4 px-12 font-bold">
          <h1 className="text-xl">{tab}</h1>
          <p>
            デジタル戦略の模索に関する訴求を中心に、統合ソリューションの提供を強調した広告LPを展開し、簡単な操作でデジタル革新を求める企業をターゲットにする戦略を提案。企業の成長を加速させるソリューションを提供することで、企業のデジタル戦略の実現を支援し、CVが今よりも増加する可能性がある。
          </p>
        </div>
        <div className="px-12">
          <SummaryTable />
        </div>
        <div className="relative flex flex-col space-y-6 px-12 pb-8">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center space-x-2">
              <h2 className="text-xl font-bold">改善案（モックアップ）</h2>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <HiQuestionMarkCircle fill="#777777" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  AIによる情報自動抽出処理の都合上、元の情報と異なる点が含まれる可能性があります。
                </TooltipContent>
              </Tooltip>
            </div>
            <div>
              <Button variant="link">
                <DownloadIcon stroke="#0186C9" />
                画像をダウンロード
              </Button>
              <Button variant="link">
                <DownloadIcon stroke="#0186C9" />
                コードをダウンロード
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1 flex flex-col">
              {displayItems.map((item, index) => (
                <Image
                  key={index}
                  height={0}
                  width={375}
                  src={item.imgSrc}
                  alt={item.title}
                  className="h-auto w-full"
                />
              ))}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="fixed top-1/2 right-6 bg-[#056BE9] text-white hover:bg-[#0c58c1] hover:text-white"
                  variant="outline"
                  size="icon"
                >
                  <ArrowDownUp />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>LPの構成</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {displayItems.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      onSelect={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div className="flex w-full flex-row items-center justify-between">
                        <p className="text-sm">{item.title}</p>
                        <div className="flex flex-row space-x-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-6"
                            disabled={item.index === 0}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDisplayItemsIndex(item.index, 'asc');
                            }}
                          >
                            <ArrowUp />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-6"
                            disabled={item.index === displayItems.length - 1}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDisplayItemsIndex(item.index, 'desc');
                            }}
                          >
                            <ArrowDown />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="size-6"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDisplayItemsVisibility(item.index);
                            }}
                          >
                            {item.show ? <Eye /> : <EyeOff />}
                          </Button>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="col-span-2 flex flex-col space-y-10">
              {displayItems.map(
                (item, index) =>
                  item.show && (
                    <div key={index} className="transition-all duration-300">
                      {item.content}
                    </div>
                  ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
