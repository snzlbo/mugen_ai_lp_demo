import { chartColors } from '@/static/chart-colors';
import { useResultStore } from '@/store/result';
import { useStateStore } from '@/store/state';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DetailLegends() {
  const { urlMapping, scoreTotal } = useResultStore();
  const { setSelectedChartDataset, selectedChartDataset } = useStateStore();
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (urlMapping && urlMapping.length > 0) {
      const selectedDataset = urlMapping.map((item, index) => ({
        label: item.title ?? 'Unknown Title',
        color: chartColors[index],
        value: item.url ?? 'Unknown URL',
      }));
      setSelectedChartDataset(selectedDataset);
    }
  }, [urlMapping, setSelectedChartDataset]);

  const selectDeselectDatasets = (index: number) => {
    const newDataset = selectedChartDataset.map((item, idx) => ({
      ...item,
      color: idx === index ? (item.color === 'transparent' ? chartColors[index] : 'transparent') : item.color,
    }));
    setSelectedChartDataset(newDataset);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="mb-4 text-[16px] font-bold">総合スコア</p>
        <div className="flex h-6 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div>
              <div
                className="size-[14px] cursor-pointer rounded-full p-[3px]"
                style={{
                  background: selectedChartDataset[0]?.color,
                  border: selectedChartDataset[0]?.color === 'transparent' ? `1px solid ${chartColors[0]}` : 'none',
                  boxSizing: 'border-box',
                }}
                onClick={() => selectDeselectDatasets(0)}
              >
                {selectedChartDataset[0]?.color !== 'transparent' && <Check className="size-2 text-white" />}
              </div>
            </div>
            <div className="w-[12rem] text-sm font-medium">自社データ</div>
          </div>
          <div className="mb-[2px] text-base font-medium">{urlMapping?.[0]?.url && scoreTotal ? scoreTotal[urlMapping[0].url] : 'N/A'}</div>
        </div>
        <div className="flex h-6 items-center space-x-2">
          <div>
            <div
              className="size-[14px] cursor-pointer rounded-full p-[3px]"
              style={{
                background: selectAll ? 'transparent' : '#212121',
                border: selectAll ? '1px solid #212121' : 'none',
                boxSizing: 'border-box',
              }}
              onClick={() => {
                const updatedDataset = selectedChartDataset.map((item, idx) => ({
                  ...item,
                  color: idx === 0 ? item.color : selectAll ? chartColors[idx] : 'transparent',
                }));
                setSelectAll(!selectAll);
                setSelectedChartDataset(updatedDataset);
              }}
            >
              {selectAll ? null : <Check className="size-2 text-white" />}
            </div>
          </div>
          <div className="w-[12rem] text-sm font-medium">競合データ</div>
        </div>
        {urlMapping?.slice(1).map((item, index) => (
          <div key={index} className="flex h-6 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                style={{
                  background: selectedChartDataset[index + 1]?.color,
                  border: selectedChartDataset[index + 1]?.color === 'transparent' ? `1px solid ${chartColors[index + 1]}` : 'none',
                  boxSizing: 'border-box',
                }}
                className="size-[14px] cursor-pointer rounded-full p-[3px]"
                onClick={() => selectDeselectDatasets(index + 1)}
              >
                {selectedChartDataset[index + 1]?.color !== 'transparent' && <Check className="size-2 text-white" />}
              </div>
              <div className="w-[12rem] max-w-[12rem] overflow-hidden text-xs font-medium text-nowrap text-ellipsis">{item.title}</div>
            </div>
            <div className="mb-[2px] text-base font-medium">{item.url && scoreTotal ? scoreTotal[item.url] : 'N/A'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
