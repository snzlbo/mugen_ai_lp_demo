'use server';

import { Client } from '@gradio/client';

const TOKEN = process.env.GRADIO_TOKEN;

export async function getGradioClient(user_email: string | null) {
  return await Client.connect(process.env.DEV_REPOSITORY || '', {
    hf_token: TOKEN?.startsWith('hf_') ? (TOKEN as `hf_${string}`) : 'hf_',
    headers: {
      user_email: user_email || '',
    },
  });
}

export async function getCheckUrl(
  userData: {
    ownUrl: string;
    urlText: string[];
    ownImage: string | null;
    ownImageName?: string;
  },
  user_email: string | null,
) {
  // https://www.dentsudigital.co.jp/
  // https://www.dentsu.co.jp/
  // https://dentsu-ho.com/
  // https://www.dentsusoken.com/
  // https://www.dentsulive.co.jp/
  // https://www.dentsu-crx.co.jp/
  const client = await getGradioClient(user_email);
  try {
    const result = await client.predict('/check_url', {
      own_url: userData.ownUrl,
      url_text: userData.urlText.join(','),
      own_image: null,
      url_image64_text: '',
      own_image_text: userData.ownImage,
    });
    return result.data;
  } catch {
    return {
      status: 'error',
      message: '競合URLを3つ以上入れてください',
    };
  }
}

export async function getScore(
  userData: {
    ownUrl: string;
    urlText: string[];
    tempImages: { [url: string]: { img: string; name?: string } };
  },
  user_email: string | null,
) {
  const client = await getGradioClient(user_email);
  const result = await client.predict('/get_score', {
    own_url: userData.ownUrl,
    url_text: userData.urlText.join(','),
    temp_image: userData.tempImages,
  });
  return result.data;
}

export async function getVisScore(
  userData: {
    commonDict: object;
    scoreDict: object;
  },
  user_email: string | null,
) {
  const client = await getGradioClient(user_email);
  const result = await client.predict('/vis_score', {
    commonDict: userData.commonDict,
    scoreDict: userData.scoreDict,
  });
  return result.data;
}

export async function getSummary(
  userData: {
    commonDict: object;
    scoreDict: object;
    score_total: object;
    url_category_scores: object;
    own_category_score: object;
  },
  user_email: string | null,
) {
  const client = await getGradioClient(user_email);
  console.log('userData', userData);
  const result = await client.predict('/get_summary', {
    commonDict: userData.commonDict,
    scoreDict: userData.scoreDict,
    score_total: userData.score_total,
    url_category_scores: userData.url_category_scores,
    own_category_score: userData.own_category_score,
  });
  return result.data;
}

export async function getPox(
  userData: {
    commonDict: object;
    scoreDict: object;
    score_total: object;
  },
  user_email: string | null,
) {
  const client = await getGradioClient(user_email);
  const result = await client.predict('/get_pox', {
    commonDict: userData.commonDict,
    scoreDict: userData.scoreDict,
    score_total: userData.score_total,
  });
  return result.data;
}

export async function getRefreshMoment(
  userData: {
    commonDict: object;
    scoreDict: object;
    swot: object;
  },
  user_email: string | null,
) {
  const client = await getGradioClient(user_email);
  const result = await client.predict('/reflesh_moments', {
    commonDict: userData.commonDict,
    scoreDict: userData.scoreDict,
    swot: userData.swot,
  });
  return result.data;
}

export async function getThemeByMoment(
  userData: {
    commonDict: object;
    scoreDict: object;
    swot: object;
    strategies: object;
    moments: string[];
  },
  user_email: string | null,
) {
  const client = await getGradioClient(user_email);
  const result = await client.predict('/get_theme_by_moment', {
    commonDict: userData.commonDict,
    scoreDict: userData.scoreDict,
    swot: userData.swot,
    strategies: userData.strategies,
    moments: userData.moments,
    own_theme: 'Hello!!',
  });
  return result.data;
}

export async function getExcel(
  userData: {
    ownUrl: string;
    urlText: string[];
    excel_file?: File;
    [key: string]: unknown;
  },
  user_email: string | null,
) {
  const client = await getGradioClient(user_email);

  const dataToSend: Record<string, unknown> = {
    own_url: userData.ownUrl,
    url_text: userData.urlText.join('\n'),
  };
  if (userData.excel_file) {
    dataToSend.excel_file = userData.excel_file;
  }
  const result = await client.predict('/get_excel', dataToSend);
  return result.data;
}
