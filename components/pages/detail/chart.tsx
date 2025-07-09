'use client';
import { chartColors } from '@/static/chart-colors';
import { useResultStore } from '@/store/result';
import { useStateStore } from '@/store/state';
import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';

const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function DetailChart() {
  const { selectedChartDataset } = useStateStore();
  const { ownCategoryScores, urlCategoryScores, commonDict, scoreDict, setUrlMapping } = useResultStore();
  const [ownUrlTitle, setOwnUrlTitle] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const [competitorsTitle, setCompetitorsTitle] = useState<{ url: string; title: string }[]>([]);

  useEffect(() => {
    const ownUrlTitle = {
      url: commonDict?.own_url ?? '',
      title: scoreDict?.[commonDict?.own_url ?? '']?.title ?? '',
    };
    const competitorsTitle = commonDict?.competitor_urls.map((url) => {
      const title = scoreDict?.[url ?? '']?.title ?? '';
      return {
        url: url,
        title: title,
      };
    });
    setOwnUrlTitle(ownUrlTitle);
    setCompetitorsTitle(competitorsTitle ?? []);
    const urlMapping = [ownUrlTitle, ...(competitorsTitle ?? [])];
    setUrlMapping(urlMapping);
  }, [commonDict?.competitor_urls, commonDict?.own_url, scoreDict, setUrlMapping]);

  const [chartData, setChartData] = useState<
    {
      value: number[];
      name: string;
      lineStyle: {
        color: string;
        width: number;
      };
      areaStyle: {
        color: string;
      };
      symbol: string;
    }[]
  >([]);

  useEffect(() => {
    const chartData = [
      {
        value: [
          ownCategoryScores?.FV ?? 0,
          ownCategoryScores?.CTA ?? 0,
          ownCategoryScores?.CONTENTS ?? 0,
          ownCategoryScores?.CREATIVE ?? 0,
          ownCategoryScores?.ACCESSIBILITY ?? 0,
        ].map((score) => (typeof score === 'number' ? score : 0)),
        name: ownUrlTitle?.title ?? 'Unknown',
        lineStyle: {
          color: chartColors[0],
          width: 1.5,
        },
        areaStyle: {
          color: hexToRgba(chartColors[0], 0.1),
        },
        symbol: 'none',
      },
      ...(competitorsTitle ?? []).map((competitor, index) => ({
        value: [
          urlCategoryScores?.[competitor.url]?.FV ?? 0,
          urlCategoryScores?.[competitor.url]?.CTA ?? 0,
          urlCategoryScores?.[competitor.url]?.CONTENTS ?? 0,
          urlCategoryScores?.[competitor.url]?.CREATIVE ?? 0,
          urlCategoryScores?.[competitor.url]?.ACCESSIBILITY ?? 0,
        ].map((score) => (typeof score === 'number' ? score : 0)),
        name: competitor.title ?? 'Unknown',
        lineStyle: {
          color: chartColors[index + 1],
          width: 1.5,
        },
        areaStyle: {
          color: hexToRgba(chartColors[index + 1], 0.1),
        },
        symbol: 'none',
      })),
    ];

    const filteredChartData = chartData.filter((data) => {
      const isSelected = selectedChartDataset.some((dataset) => dataset.label === data.name && dataset.color !== 'transparent');
      return isSelected;
    });
    setChartData(filteredChartData);
  }, [
    competitorsTitle,
    ownCategoryScores?.ACCESSIBILITY,
    ownCategoryScores?.CONTENTS,
    ownCategoryScores?.CREATIVE,
    ownCategoryScores?.CTA,
    ownCategoryScores?.FV,
    ownUrlTitle?.title,
    selectedChartDataset,
    urlCategoryScores,
  ]);

  const getOption = (): EChartsOption => {
    return {
      tooltip: {
        trigger: 'axis',
      },
      animation: false,
      radar: {
        radius: '95%',
        center: ['47%', '55%'],
        indicator: [
          { name: 'FV', min: 0, max: 100 },
          { name: 'CTA', min: 0, max: 100 },
          { name: 'コンテンツ', min: 0, max: 100 },
          { name: 'クリエイティブ', min: 0, max: 100 },
          { name: 'アクセシビリティ', min: 0, max: 100 },
        ],
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,1)',
            width: 0.4,
          },
        },
        axisName: {
          color: '#444',
          fontWeight: 'bold',
          fontFamily: 'Noto Sans JP',
        },
        splitLine: {
          show: false,
        },
        splitArea: {
          areaStyle: {
            color: ['rgba(106, 143, 227, 1)', 'rgba(122, 157, 231, 1)', 'rgba(137, 172, 235, 1)', 'rgba(153, 189, 238, 1)', 'rgba(172, 207, 244, 1)'],
          },
        },
      },
      series: [
        {
          name: 'Analysis',
          type: 'radar',
          tooltip: {
            trigger: 'item',
            borderColor: '#fff',
            borderWidth: 1,
            backgroundColor: '#fff',
            textStyle: {
              color: '#000',
            },
          },
          data: chartData,
        },
      ],
    };
  };

  return (
    <ReactECharts
      option={getOption()}
      notMerge={true}
      lazyUpdate={true}
      style={{
        height: '30rem',
        width: '100%',
      }}
    />
  );
}
