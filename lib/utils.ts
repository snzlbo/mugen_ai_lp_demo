import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const allowedEmails = [
  'yoshimura.s@dentsudigital.co.jp',
  'manabe.risa@dentsudigital.co.jp',
  'watabe.kazuhiro@dentsudigital.co.jp',
  'shimizu.r@dentsudigital.co.jp',
  'wada.j@dentsudigital.co.jp',
  'iijima.m@dentsudigital.co.jp',
  'takao.a@dentsudigital.co.jp',
  'hayashi.som@dentsudigital.co.jp',
  'fukushima.r@dentsudigital.co.jp',
  'k.yamada@dentsudigital.co.jp',
  'suzuki@dentsudigital.co.jp',
  'miyazaki.ay@dentsudigital.co.jp',
  'ikeda.yug@dentsudigital.co.jp',
  'masamura.y@dentsudigital.co.jp',
  'u.gunjlkham@mn.data-artist.com',
];

export const isAllowedUser = (email?: string): boolean => {
  return email === '' || email === undefined || email === null || (!!email && allowedEmails.includes(email));
};
