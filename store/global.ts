import { create } from 'zustand';

interface StoreState {
  noticeDialog: boolean;
  dummyMode: boolean;
  setDummyMode: (dummyMode: boolean) => void;
  setNoticeDialog: (notice: boolean) => void;
}

export const useGlobalStore = create<StoreState>((set) => ({
  dummyMode: false,
  setDummyMode: (dummyMode: boolean) => set(() => ({ dummyMode })),
  noticeDialog: false,
  setNoticeDialog: (notice: boolean) => set(() => ({ noticeDialog: notice })),
}));
