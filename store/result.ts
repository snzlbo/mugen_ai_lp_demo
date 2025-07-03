import {
  DownloadData,
  InputData,
  MomentResult,
  OwnCategoryScores,
  ResultData,
  ScoreTotal,
  SummaryBaseData,
  SummaryData,
  SwotData,
  SwotTable,
  UrlCategoryScores,
  UrlMapping,
} from '@/types/api';
import { create } from 'zustand';

interface StoreState {
  tempImages: string[];
  setTempImages: (tempImages: string[]) => void;
  downloadData: DownloadData | null;
  setDownloadData: (downloadData: DownloadData | null) => void;
  scoreDict: ResultData | null;
  setScoreDict: (scoreDict: ResultData | null) => void;
  commonDict: InputData | null;
  setCommonDict: (commonDict: InputData | null) => void;
  scoreTotal: ScoreTotal | null;
  setScoreTotal: (scoreTotal: ScoreTotal | null) => void;
  urlCategoryScores: UrlCategoryScores | null;
  setUrlCategoryScores: (urlCategoryScores: UrlCategoryScores | null) => void;
  ownCategoryScores: OwnCategoryScores | null;
  setOwnCategoryScores: (ownCategoryScores: OwnCategoryScores | null) => void;
  summaryData: SummaryData | null;
  setSummaryData: (summaryData: SummaryData | null) => void;
  summaryBaseData: SummaryBaseData | null;
  setSummaryBaseData: (summaryBaseData: SummaryBaseData | null) => void;
  swotData75: SwotData | null;
  setSwotData75: (swotData: SwotData | null) => void;
  swotData78: SwotData | null;
  setSwotData78: (swotData: SwotData | null) => void;
  swotData79: string | null;
  setSwotData79: (swotData: string | null) => void;
  swotTable: SwotTable | null;
  setSwotTable: (swotTable: SwotTable | null) => void;
  urlMapping: UrlMapping[] | null;
  setUrlMapping: (urlMapping: UrlMapping[] | null) => void;
  showPercentage: boolean;
  setShowPercentage: (showPercentage: boolean) => void;
  momentResult: MomentResult | null;
  setMomentResult: (momentResult: MomentResult | null) => void;
}

export const useResultStore = create<StoreState>((set) => ({
  tempImages: [] as string[],
  setTempImages: (tempImages: string[]) => set({ tempImages }),
  downloadData: null,
  setDownloadData: (downloadData) => set({ downloadData }),
  scoreDict: null,
  setScoreDict: (scoreDict) => set({ scoreDict }),
  commonDict: null,
  setCommonDict: (commonDict) => set({ commonDict }),
  scoreTotal: null,
  setScoreTotal: (scoreTotal) => set({ scoreTotal }),
  urlCategoryScores: null,
  setUrlCategoryScores: (urlCategoryScores) => set({ urlCategoryScores }),
  ownCategoryScores: null,
  setOwnCategoryScores: (ownCategoryScores) => set({ ownCategoryScores }),
  summaryData: null,
  setSummaryData: (summaryData) => set({ summaryData }),
  summaryBaseData: null,
  setSummaryBaseData: (summaryBaseData) => set({ summaryBaseData }),
  swotData75: null,
  setSwotData75: (swotData) => set({ swotData75: swotData }),
  swotData78: null,
  setSwotData78: (swotData) => set({ swotData78: swotData }),
  swotData79: null,
  setSwotData79: (swotData) => set({ swotData79: swotData }),
  swotTable: null,
  setSwotTable: (swotTable) => set({ swotTable }),
  urlMapping: null,
  setUrlMapping: (urlMapping) => set({ urlMapping }),
  showPercentage: true,
  setShowPercentage: (showPercentage) => set({ showPercentage }),
  momentResult: null,
  setMomentResult: (momentResult) => set({ momentResult }),
}));
