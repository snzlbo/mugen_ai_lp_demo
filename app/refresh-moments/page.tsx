'use client';
import { LoadingPulse } from '@/components/parts/loading-pulse';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { isAllowedUser } from '@/lib/utils';
import { getRefreshMoment, getThemeByMoment } from '@/services/gradio-with-dummy';
import { useGlobalStore } from '@/store/global';
import { useResultStore } from '@/store/result';
import { useStateStore } from '@/store/state';
import { useUserStore } from '@/store/user';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RefreshMomentsPage() {
  const { dummyMode, setDummyMode } = useGlobalStore();
  const { user } = useUserStore();
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [refreshMomentLoading, setRefreshMomentLoading] = useState(false);
  const { getMomentLoading, setGetMomentLoading } = useStateStore();
  const { commonDict, scoreDict, swotData75, swotData78, setMomentResult } = useResultStore();
  const [defaultMoments, setDefaultMoments] = useState<{ text: string; value: boolean }[]>([
    {
      text: '購買前(まだ商品について詳しくないが、商品の情報収集を実施している状態)',
      value: false,
    },
    {
      text: '比較検討中（他社と比較をして迷い、決め手を探している状態）',
      value: false,
    },
    {
      text: '購買検討中(ある程度購入意欲は高いが、最後の決め手を探してる)',
      value: false,
    },
  ]);
  const [moments, setMoments] = useState<{ text: string; value: boolean }[]>([]);
  const [freeInputs, setFreeInputs] = useState<{ text: string; value: boolean }[]>([
    { text: '', value: false },
    { text: '', value: false },
    { text: '', value: false },
  ]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const [response, setResponse] = useState<string[]>([]);

  const [combined, setCombined] = useState<{ text: string; value: boolean }[]>([...defaultMoments, ...moments, ...freeInputs]);
  useEffect(() => {
    const combined = [...defaultMoments, ...moments, ...freeInputs];
    setCombined(combined);
    const selectedCount = combined.filter((moment) => moment.value).length;
    if (selectedCount > 3) {
      setIsValid(false);
      return;
    }
    if (freeInputs.some((input) => input.value && !input.text)) {
      setIsValid(false);
      return;
    }
    const isValid = combined.some((moment) => moment.value);
    setIsValid(isValid);
  }, [defaultMoments, moments, freeInputs]);

  const goBack = () => {
    router.push('/detail');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (commonDict && scoreDict && swotData75) {
        setRefreshMomentLoading(true);
        const response = await getRefreshMoment(
          {
            commonDict: commonDict,
            scoreDict: scoreDict,
            swot: swotData75,
          },
          user?.user?.email || '',
        );
        console.log('get refresh moment', response);
        if (Array.isArray(response)) {
          setResponse(response[0].split('\n'));
          setMoments(
            response[0].split('\n').map((d: string) => {
              return {
                text: d,
                value: false,
              };
            }),
          );
        }
        setRefreshMomentLoading(false);
      }
    };
    fetchData();
  }, [commonDict, router, scoreDict, swotData75]);
  const onSubmit = async () => {
    setGetMomentLoading(true);
    const combined = [...defaultMoments, ...moments, ...freeInputs];
    const filtered = combined.filter((moment) => moment.value && moment.text);
    const selectedMoments = filtered.map((moment) => (Array.isArray(moment.text) ? moment.text : [moment.text]));
    if (selectedMoments.length !== 3) {
      return;
    }
    if (commonDict && scoreDict && swotData75) {
      const themeResponse = await getThemeByMoment(
        {
          commonDict: commonDict,
          scoreDict: scoreDict,
          swot: swotData75,
          strategies: swotData78 || {},
          moments: response,
        },
        user?.user?.email || '',
      );
      console.log('get theme by moment', themeResponse);
      if (Array.isArray(themeResponse) && themeResponse[1]?.data) {
        setMomentResult(themeResponse[1]);
      }
      setGetMomentLoading(false);
      router.push('/refresh-moments/result');
    }
  };
  return (
    <div className="flex h-full grow flex-col space-y-8">
      {!getMomentLoading && !refreshMomentLoading ? (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-primary-text text-3xl font-bold">改善案生成</h1>
            {isAllowedUser(user?.user?.email) && (
              <Button onClick={() => setDummyMode(!dummyMode)}>{dummyMode ? '通常モードに設定' : 'ダミーモードに設定'}</Button>
            )}
          </div>
          <div className="flex flex-col space-y-8 rounded-xl bg-white/80 p-8">
            <div className="space-y-4">
              <h2 className="text-primary-text text-2xl font-bold">改善案の方向性を選択</h2>
              <div className="text-sm font-medium">3つまで選択可能です。</div>
            </div>
            {defaultMoments.map((moment, index) => (
              <div key={index} className="flex items-center space-x-4 font-medium">
                <div className="w-[6rem]">方向性{index + 1}</div>
                <div className="flex items-center space-x-4">
                  <Checkbox
                    onCheckedChange={(value: boolean) => {
                      const newMoments = [...defaultMoments];
                      newMoments[index].value = value;
                      setDefaultMoments(newMoments);
                    }}
                    disabled={combined.filter((moment) => moment.value).length >= 3 && !moment.value}
                  />
                  <div>{moment.text}</div>
                </div>
              </div>
            ))}
            {moments.map((moment, index) => (
              <div key={index} className="flex items-center space-x-4 font-medium">
                <div className="flex w-[6rem] items-center space-x-2">
                  <div>AI提案{index + 1}</div>
                  {index === 0 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="bg-secondary-text mt-[2px] flex h-4 w-4 cursor-pointer items-center justify-center rounded-full text-xs text-white">
                            ?
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="w-[190px] max-w-[200px] py-2 text-center text-sm font-medium">
                          <p>フリー入力する場合は、「名称（その具体的な状態）」の形式で記入しないと改善案の品質が低下します。</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <Checkbox
                    onCheckedChange={(value: boolean) => {
                      const newMoments = [...moments];
                      newMoments[index].value = value;
                      setMoments(newMoments);
                    }}
                    disabled={combined.filter((moment) => moment.value).length >= 3 && !moment.value}
                  />
                  <div>{moment.text}</div>
                </div>
              </div>
            ))}
            <div className="space-y-4">
              {freeInputs.map((input, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="mb-4 w-[6rem]">フリー入力{index + 1}</div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-4 font-medium">
                      <Checkbox
                        onCheckedChange={(value: boolean) => {
                          const newInputs = [...freeInputs];
                          newInputs[index].value = value;
                          setFreeInputs(newInputs);
                        }}
                        disabled={combined.filter((moment) => moment.value).length >= 3 && !input.value}
                      />
                      <div>
                        <Input
                          placeholder="自分で考えた方向性(「名称（その具体的な状態）」の形式)で記入してください。"
                          className="w-[678px] bg-white"
                          disabled={!input.value}
                          minLength={1}
                          maxLength={50}
                          onChange={(e) => {
                            const newInputs = [...freeInputs];
                            newInputs[index].text = e.target.value;
                            setFreeInputs(newInputs);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="ml-9">{!input.text && input.value && <div className="mt-1 text-xs text-[#DA2A2A]">入力が必要です。</div>}</div>
                      <div className="text-secondary-text self-end text-xs font-medium">{input.text.length}/50文字</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-4 self-center">
              <Button
                type="button"
                className="text-main-button relative w-[240px] cursor-pointer rounded-full border border-[#ddd] bg-white px-16 py-6 text-base font-medium shadow-none hover:bg-[#eee]"
                onClick={goBack}
              >
                <ChevronLeft className="absolute left-4 h-4 w-4" />
                戻る
              </Button>
              {getMomentLoading || !isValid || refreshMomentLoading ? (
                <Button
                  type="button"
                  className="bg-disabled hover:bg-main-button/90 w-[240px] self-center rounded-full px-16 py-6 text-base font-medium text-white shadow-none"
                >
                  決定
                </Button>
              ) : (
                <Button
                  type="button"
                  className="bg-main-button disabled:bg-disabled hover:bg-main-button/90 w-[240px] cursor-pointer self-center rounded-full px-16 py-6 text-base font-medium text-white shadow-xl disabled:shadow-none"
                  onClick={onSubmit}
                >
                  決定
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex grow flex-col items-center justify-center space-y-8">
          <LoadingPulse />
          <div className="text-secondary-text">{getMomentLoading ? '※改善案の作成が完了するまで2分程度かかります' : null}</div>
        </div>
      )}
    </div>
  );
}
