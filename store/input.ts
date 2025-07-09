import { create } from 'zustand';

interface StoreState {
  ownUrl: string;
  ownImage: string | null;
  ownImageBase64: string | null;
  ownImageName: string;
  competitionUrls: string[];
  setOwnUrl: (url: string) => void;
  setOwnImage: (image: string | null) => void;
  setOwnImageBase64: (image: string | null) => void;
  setOwnImageName: (name: string) => void;
  setCompetitionUrls: (urls: string[]) => void;
}

export const useInputStore = create<StoreState>((set) => ({
  ownUrl: '',
  ownImage: null,
  ownImageBase64: null,
  ownImageName: '',
  competitionUrls: [],
  setOwnUrl: (url: string) => set(() => ({ ownUrl: url })),
  setOwnImage: (image: string | null) => set(() => ({ ownImage: image })),
  setOwnImageBase64: (image: string | null) => set(() => ({ ownImageBase64: image })),
  setOwnImageName: (name: string) => set(() => ({ ownImageName: name })),
  setCompetitionUrls: (urls: string[]) => set(() => ({ competitionUrls: urls })),
}));
