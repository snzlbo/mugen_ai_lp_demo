import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useResultStore } from '@/store/result';

export default function ScoreSwitch() {
  const { showPercentage, setShowPercentage } = useResultStore();
  return (
    <div className="flex items-center space-x-4 self-end">
      <div className="flex h-[22px] items-center space-x-1">
        <div className="text-sm font-bold">スコア</div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-secondary-text mt-[1px] flex h-4 w-4 cursor-pointer items-center justify-center rounded-full text-xs text-white">
                ?
              </div>
            </TooltipTrigger>
            <TooltipContent className="p-4 text-xs font-medium">
              <p>◎ (スコア 76-100)：評価観点を網羅できている</p>
              <p>○ (スコア 51-75)：一部改善点あり</p>
              <p>△ (スコア 26-50)：改善点あり</p>
              <p className="text-[#DA2A2A]">× (スコア 0-25)：機会損失の可能性大</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ToggleGroup
        type="single"
        className="bg-white"
        value={showPercentage ? 'star' : 'score'}
        onValueChange={(value) => {
          if (value === 'score') {
            setShowPercentage(false);
          } else if (value === 'star') {
            setShowPercentage(true);
          }
        }}
      >
        <ToggleGroupItem
          value="star"
          aria-label="Toggle star"
          className="data-[state=on]:bg-corporate h-[22px] px-4 text-xs data-[state=on]:text-white"
        >
          ○×表示
        </ToggleGroupItem>
        <ToggleGroupItem
          value="score"
          aria-label="Toggle score"
          className="data-[state=on]:bg-corporate h-[22px] px-4 text-xs data-[state=on]:text-white"
        >
          スコア表示
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
