import { create } from 'zustand';

interface UserInfo {
  name: string;
  email: string;
}

export interface UserState {
  expires: string;
  user: UserInfo;
}

interface StoreState {
  user: UserState;
  setUser: (user: UserState) => void;
}

export const useUserStore = create<StoreState>((set) => ({
  user: {
    expires: '',
    user: {
      name: 'dummy-user',
      email: 'dummy-user@example.com',
    },
  },
  setUser: (user) => set({ user }),
}));
