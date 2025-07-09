import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import Image from 'next/image';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getPox, getScore, getSummary, getVisScore } from '@/services/gradio';
import { useGlobalStore } from '@/store/global';
import { useInputStore } from '@/store/input';
import { useResultStore } from '@/store/result';
import { useStateStore } from '@/store/state';
import { useUserStore } from '@/store/user';
import {
  DownloadData,
  InputData,
  OwnCategoryScores,
  ResultData,
  ScoreTotal,
  SummaryBaseData,
  SummaryData,
  SwotData,
  SwotTable,
  TempImages,
  UrlCategoryScores,
} from '@/types/api';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function PreAnalysisCheck() {
  const [isFieldsChanged, setIsFieldsChanged] = useState(false);
  const { dummyMode } = useGlobalStore();
  const { user } = useUserStore();
  const router = useRouter();
  const tableRef = useRef<HTMLTableElement>(null);
  const [colWidth, setColWidth] = useState(0);
  const { ownUrl, competitionUrls } = useInputStore();
  const [localOwnUrl] = useState(ownUrl);
  const [localCompetitionUrls] = useState(competitionUrls);
  const [localUpdatedCompetitionUrls, setLocalUpdatedCompetitionUrls] = useState<string[]>([]);
  const {
    setDownloadData,
    setScoreDict,
    setCommonDict,
    setScoreTotal,
    setUrlCategoryScores,
    setOwnCategoryScores,
    setSummaryData,
    setSummaryBaseData,
    setSwotData75,
    setSwotData78,
    setSwotData79,
    setSwotTable,
    tempImages,
  } = useResultStore();

  useEffect(() => {
    if (ownUrl !== localOwnUrl) {
      setIsFieldsChanged(true);
    } else {
      setIsFieldsChanged(false);
    }
  }, [ownUrl]);

  useEffect(() => {
    setLocalUpdatedCompetitionUrls([]);
    if (JSON.stringify(competitionUrls) !== JSON.stringify(localCompetitionUrls) || competitionUrls.length !== localCompetitionUrls.length) {
      setIsFieldsChanged(true);
    } else {
      setIsFieldsChanged(false);
    }
  }, [competitionUrls, localCompetitionUrls]);

  useEffect(() => {
    if (tableRef.current) {
      const tableWidth = tableRef.current.offsetWidth - 250;
      const numColumns = Math.max(4, competitionUrls?.length + 1);
      const newColWidth = Math.floor(tableWidth / numColumns);
      setColWidth(Math.max(newColWidth, 250));
    }
  }, [tableRef, competitionUrls?.length]);

  const { setGetScoreLoading } = useStateStore();

  let imagesForScore: { [url: string]: { img: string; name?: string } } = {};
  if (Array.isArray(tempImages) && typeof tempImages[2] === 'object') {
    imagesForScore = tempImages[2] as { [url: string]: { img: string; name?: string } };
  }

  const response = tempImages[2] as unknown as TempImages;
  const onSubmit = async () => {
    if (localCompetitionUrls.length < 3) {
      return;
    }
    setGetScoreLoading(true);
    try {
      let scoreResult: [DownloadData, unknown, ResultData, InputData];
      let visScore: [ScoreTotal, UrlCategoryScores, OwnCategoryScores];
      let summaryResult: [SummaryData, unknown, SummaryBaseData];
      let swotResult: [SwotData, SwotData, string, SwotTable, string, string];

      if (dummyMode && typeof window !== 'undefined') {
        const [scoreRes, visRes, summaryRes, swotRes] = await Promise.all([
          fetch('/dummy/get_score.json'),
          fetch('/dummy/get_vis_score.json'),
          fetch('/dummy/get_summary.json'),
          fetch('/dummy/get_pox.json'),
        ]);

        scoreResult = await scoreRes.json();
        visScore = await visRes.json();
        summaryResult = await summaryRes.json();
        swotResult = await swotRes.json();
        console.log('scoreResult: ', scoreResult);
        console.log('visScore: ', visScore);
        console.log('summaryResult: ', summaryResult);
        console.log('swotResult: ', swotResult);
      } else {
        scoreResult = (await getScore(
          {
            ownUrl,
            urlText: localCompetitionUrls,
            tempImages: imagesForScore,
          },
          user?.user?.email || '',
        )) as [DownloadData, unknown, ResultData, InputData];
        console.log('scoreResult: ', scoreResult);

        visScore = (await getVisScore(
          {
            commonDict: scoreResult[3],
            scoreDict: scoreResult[2],
          },
          user?.user?.email || '',
        )) as [ScoreTotal, UrlCategoryScores, OwnCategoryScores];
        console.log('visScore: ', visScore);

        summaryResult = (await getSummary(
          {
            commonDict: scoreResult[3],
            scoreDict: scoreResult[2],
            score_total: visScore[0],
            url_category_scores: visScore[1],
            own_category_score: visScore[2],
          },
          user?.user?.email || '',
        )) as [SummaryData, unknown, SummaryBaseData];
        console.log('summaryResult: ', summaryResult);

        swotResult = (await getPox(
          {
            commonDict: scoreResult[3],
            scoreDict: scoreResult[2],
            score_total: visScore[0],
          },
          user?.user?.email || '',
        )) as [SwotData, SwotData, string, SwotTable, string, string];
        console.log('getPox: ', swotResult);
      }

      setDownloadData(scoreResult[0]);
      setScoreDict(scoreResult[2]);
      setCommonDict(scoreResult[3]);
      setScoreTotal(visScore[0]);
      setUrlCategoryScores(visScore[1]);
      setOwnCategoryScores(visScore[2]);
      setSummaryData(summaryResult[0]);
      setSummaryBaseData(summaryResult[2]);
      setSwotData75(swotResult[0]);
      setSwotData78(swotResult[1]);
      setSwotData79(swotResult[2]);
      setSwotTable(swotResult[3]);
      router.push('/detail');
    } catch {
      router.push('/error');
    } finally {
      setGetScoreLoading(false);
    }
  };

  return (
    <div className="mt-10 flex flex-col space-y-8">
      <div className="flex items-center space-x-4">
        <h2 className="text-primary-text text-2xl font-bold">分析するLPを確認</h2>
        <div className="text-secondary-text text-sm">※ 差し替えたい時は上部からURLを変更し、「確認する」を再度実行してください。</div>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full table-fixed border-separate border-spacing-0" ref={tableRef}>
          <TableHeader className="bg-zinc-100">
            <TableRow>
              <TableHead className="border-non-color sticky left-0 z-10 w-[250px] border-r border-b bg-zinc-100 px-4 py-2">
                <div className="flex items-center justify-between">
                  <div className="text-sm">タイトル</div>
                  <Image src="/pin.svg" alt="pin" width={24} height={24} className="size-6 items-center" />
                </div>
              </TableHead>
              <TableHead
                style={{
                  width: `${colWidth}px`,
                }}
                className="border-non-color sticky left-[250px] z-10 border-r-4 border-b border-double bg-zinc-100 px-4 py-2"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm">自社</div>
                  <Image src="/pin.svg" alt="pin" width={24} height={24} className="size-6 items-center" />
                </div>
              </TableHead>
              {competitionUrls.map((_, index) => (
                <TableHead
                  key={index}
                  className="border-r border-b px-4 py-2 last:border-r-0"
                  style={{
                    width: `${colWidth}px`,
                  }}
                >
                  競合{index + 1}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="h-16 min-h-16">
              <TableCell className="border-non-color sticky left-0 z-10 border-r border-b bg-[#F8FBFD] p-4 font-medium">分析対象</TableCell>
              <TableCell className="border-non-color sticky left-[250px] z-10 border-r-4 border-b border-double bg-[#F8FBFD] p-4"></TableCell>
              {competitionUrls.map((url, index) => (
                <TableCell
                  key={index}
                  className={cn(
                    'border-r border-b p-4! text-center last:border-r-0',
                    localUpdatedCompetitionUrls.includes(url) ? 'bg-corporate/5' : '',
                  )}
                >
                  <Checkbox
                    className="cursor-pointer bg-white"
                    checked={localUpdatedCompetitionUrls.includes(url)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setLocalUpdatedCompetitionUrls([...localUpdatedCompetitionUrls, url]);
                      } else {
                        setLocalUpdatedCompetitionUrls(localUpdatedCompetitionUrls.filter((item) => item !== url));
                      }
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="border-non-color sticky left-0 z-10 border-r border-b bg-[#F8FBFD] p-4 align-middle font-medium">
                サムネイル
              </TableCell>
              <TableCell className="border-non-color sticky left-[250px] z-10 border-r-4 border-b border-double bg-[#F8FBFD] p-4">
                <div className="border-non-color mx-auto max-h-[253px] w-[129px] overflow-hidden border">
                  <Image
                    src={
                      typeof response[ownUrl] === 'string' && response[ownUrl].startsWith('/dummy')
                        ? response[ownUrl]
                        : `data:image/png;base64,${response[ownUrl]}`
                    }
                    alt="thumbnail"
                    width={500}
                    height={500}
                    className="h-auto w-full"
                  />
                </div>
              </TableCell>
              {competitionUrls.map((url, index) => (
                <TableCell
                  key={index}
                  className={cn('border-r border-b p-4 last:border-r-0', localUpdatedCompetitionUrls.includes(url) ? 'bg-corporate/5' : '')}
                >
                  {localCompetitionUrls.includes(url) ? (
                    <div className="border-non-color mx-auto max-h-[253px] w-[129px] overflow-hidden border">
                      <Image
                        src={
                          typeof response[url] === 'string' && response[url].startsWith('/dummy')
                            ? response[url]
                            : `data:image/png;base64,${response[url]}`
                        }
                        alt="thumbnail"
                        width={500}
                        height={500}
                        className="h-auto w-full"
                      />
                    </div>
                  ) : (
                    <div className="border-non-color mx-auto flex h-[253px] w-[129px] items-center justify-center border bg-gray-100">
                      {/* blank placeholder */}
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {localUpdatedCompetitionUrls.length < 3 || isFieldsChanged ? (
        <Button
          type="button"
          className="bg-disabled hover:bg-main-button/90 self-center rounded-full px-16 py-6 text-base font-medium text-white shadow-none"
        >
          競合分析する
        </Button>
      ) : (
        <Button
          type="button"
          className="bg-main-button disabled:bg-disabled hover:bg-main-button/90 cursor-pointer self-center rounded-full px-16 py-6 text-base font-medium text-white shadow-xl disabled:shadow-none"
          onClick={onSubmit}
        >
          競合分析する
        </Button>
      )}
      {isFieldsChanged && (
        <div className="mx-auto mt-1 flex items-center space-x-1 text-xs text-red-500">
          <Image src="/alert.svg" alt="pin" width={16} height={16} className="size-4 items-center" />
          <span className="text-primary-text text-[13px] leading-none font-medium">分析前実行からやり直してください</span>
        </div>
      )}
    </div>
  );
}
