import { useGlobalStore } from '@/store/global';
import { getRefreshMoment as getRefreshMomentReal, getThemeByMoment as getThemeByMomentReal } from './gradio';

export async function getRefreshMoment(
  userData: {
    commonDict: object;
    scoreDict: object;
    swot: object;
  },
  user_email: string,
) {
  const { dummyMode } = useGlobalStore.getState();

  if (dummyMode) {
    try {
      const res = await fetch('/dummy/get_refresh_moment.json');
      if (!res.ok) {
        return {
          status: 'error',
          message: 'Dummy response could not be loaded.',
        };
      }
      const data = await res.json();
      return data;
    } catch {
      return {
        status: 'error',
        message: 'Dummy fetch failed.',
      };
    }
  }

  return await getRefreshMomentReal(userData, user_email);
}

export async function getThemeByMoment(
  userData: {
    commonDict: object;
    scoreDict: object;
    swot: object;
    strategies: object;
    moments: string[];
  },
  user_email: string,
) {
  const { dummyMode } = useGlobalStore.getState();

  if (dummyMode) {
    try {
      const res = await fetch('/dummy/get_theme_by_moment.json');
      if (!res.ok) {
        return {
          status: 'error',
          message: 'Dummy response could not be loaded.',
        };
      }
      const data = await res.json();
      return data;
    } catch {
      return {
        status: 'error',
        message: 'Dummy fetch failed.',
      };
    }
  }

  return await getThemeByMomentReal(userData, user_email);
}
