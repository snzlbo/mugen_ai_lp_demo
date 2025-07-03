import { create } from 'zustand';

interface StoreState {
  urlMapping: any;
  tempImagesLoading: boolean;
  getScoreLoading: boolean;
  getMomentLoading: boolean;
  selectedChartDataset: { label: string; color: string; value: string }[];

  formChanged: boolean;
  setFormChanged: (changed: boolean) => void;

  setTempImagesLoading: (loading: boolean) => void;
  setGetScoreLoading: (loading: boolean) => void;
  setGetMomentLoading: (loading: boolean) => void;
  setSelectedChartDataset: (
    dataset: {
      label: string;
      color: string;
      value: string;
    }[],
  ) => void;
}

export const useStateStore = create<StoreState>((set) => ({
  tempImagesLoading: false,
  getScoreLoading: false,
  getMomentLoading: false,
  selectedChartDataset: [],
  formChanged: false,
  urlMapping: [],

  setFormChanged: (changed: boolean) => set({ formChanged: changed }),
  setTempImagesLoading: (loading: boolean) => set(() => ({ tempImagesLoading: loading })),
  setGetScoreLoading: (loading: boolean) => set(() => ({ getScoreLoading: loading })),
  setGetMomentLoading: (loading: boolean) => set(() => ({ getMomentLoading: loading })),
  setSelectedChartDataset: (dataset) => set(() => ({ selectedChartDataset: dataset })),
}));
