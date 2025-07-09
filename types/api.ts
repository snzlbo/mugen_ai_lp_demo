export type TempImages = {
  [url: string]: string;
};

export type DownloadData = {
  is_stream: boolean;
  meta: {
    _type: string;
  };
  mime_type: string | null;
  orig_name: string | null;
  path: string;
  size: number;
  url: string;
};

export type ResultData = {
  [key: string]: {
    contents_ocr: string;
    content_theme: string[];
    contents_theme2csv: string;
    contents_top_theme: string;
    fv_ocr: string;
    fv_theme: string[];
    fv_theme2csv: string;
    fv_top_theme: string;
    image: string;
    image_full: string;
    ocr: string;
    result: {
      advice: string;
      analysis: string;
      category: string;
      question: string;
      score: number;
    }[];
    title: string;
    url: string;
  };
};

export type InputData = {
  competitor_urls: string[];
  own_url: string;
  purpose: string;
  urls_text: string[];
};

export type ScoreTotal = {
  [url: string]: number;
};

export type UrlCategoryScores = {
  [url: string]: {
    ACCESSIBILITY: number;
    CONTENTS: number;
    CREATIVE: number;
    CTA: number;
    FV: number;
    合計: number;
  };
};

export type OwnCategoryScores = {
  [category: string]: {
    ACCESSIBILITY: number;
    CONTENTS: number;
    CREATIVE: number;
    CTA: number;
    FV: number;
    総括: number;
  };
};

export type SummaryData = {
  total_analysis: string;
} & {
  [category: string]: {
    competitors_advantage: string;
    own_company_advantage_and_advice: string;
    自社改善点: string;
    自社相対位置: string;
    自社長所: string;
  };
};

export type SummaryBaseData = string;

export type SwotData = {
  [category: string]:
    | string
    | {
        [key: string]: string[] | string;
      };
};

export type UrlMapping = {
  title?: string;
  url?: string;
};

export type SwotTable = {
  PoD: string[];
  PoF: string[];
  PoP: string[];
  概要: string;
};

export type MomentResult = {
  data: [string[]];
  headers: string[];
  metadata: object | null;
};
