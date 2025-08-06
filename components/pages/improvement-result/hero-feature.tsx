import Image from 'next/image';
import React, { useRef, useState } from 'react';

export const LeftsideColumn: React.FC<{
  heroImage: string;
  onHeroImgChange: (file: File) => void;
}> = ({ heroImage, onHeroImgChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const PLACEHOLDER = '/heroImage.svg';
  const imgSrc = heroImage && heroImage !== '' ? heroImage : PLACEHOLDER;
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="mx-auto flex w-[400px] flex-col overflow-hidden bg-white">
        <div className="flex items-center justify-between bg-[#101010] px-5 py-5">
          <div className="text-2xl leading-5 font-extrabold tracking-widest text-white">
            DENTSU
            <br />
            DIGITAL
          </div>
          <div className="flex items-center gap-4 text-white">
            <div className="group relative inline-block">
              <span className="pointer-events-none absolute inset-0 z-10 h-5 w-5 rounded bg-[#111111] opacity-0 transition-opacity duration-500 group-hover:opacity-30"></span>
              <span className="z-10 cursor-pointer text-2xl transition-colors duration-500 group-hover:text-[#b4b4b4]">
                🔍
              </span>
            </div>
            <span className="cursor-pointer text-2xl duration-500 hover:text-[#b4b4b4] hover:duration-500">
              ✉
            </span>
            <button
              className="relative ml-2 flex h-4.5 w-4 cursor-pointer items-center justify-center"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span
                className={`absolute h-[2.5] w-6 bg-white transition-all duration-400 ${
                  open
                    ? 'left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45'
                    : 'left-1/2 -translate-x-1/2 rotate-0'
                }`}
              />
              <span
                className={`absolute h-[2.5] w-6 bg-white transition-all duration-400 ${
                  open
                    ? 'top-0.2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0'
                    : 'top-0.5 left-1/2 -translate-x-1/2 opacity-100'
                }`}
              />
              <span
                className={`absolute h-[2.5] w-6 bg-white transition-all duration-400 ${
                  open
                    ? 'top-0.3 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45'
                    : 'top-3.5 left-1/2 -translate-x-1/2 rotate-0'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-white px-7 pt-5 pb-7">
          <div className="mb-15 text-center text-5xl font-extrabold text-[#2b57e3]">
            AI技術で
            <br />
            新しいビジネスの
            <br />
            扉を開く
          </div>

          <div className="relative mx-auto mb-15 h-[196px] justify-center overflow-hidden border-[3px] border-[#2575e6] bg-[#f2f2f2]">
            <Image
              src={imgSrc}
              alt="AIイメージ"
              fill
              priority
              className="h-full w-full object-cover"
            />
            <button
              className="absolute top-2 right-2 cursor-pointer rounded bg-[#2575e6] px-4 py-2.5 text-xs text-white"
              onClick={() => inputRef.current?.click()}
              type="button"
            >
              画像変更
            </button>
            <input
              type="file"
              className="hidden"
              ref={inputRef}
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) onHeroImgChange(e.target.files[0]);
              }}
            />
          </div>

          <div className="mt-4 mb-20 ml-8 space-y-6">
            <div className="flex items-center">
              <span className="mt-1 mr-3 inline-flex h-[50px] w-[50px] items-center justify-center border-2 border-black text-4xl font-semibold">
                1
              </span>
              <span className="text-[16px] leading-5 text-[#232323]">
                戦略的なAI活用で
                <br />
                海外市場の開発を支援します。
              </span>
            </div>
            <div className="flex items-center">
              <span className="mt-1 mr-3 inline-flex h-[50px] w-[50px] items-center justify-center border-2 border-black text-4xl font-semibold">
                2
              </span>
              <span className="text-[16px] leading-5 text-[#232323]">
                競争力を高め、
                <br />
                グローバルな成長を実現。
              </span>
            </div>
            <div className="flex items-center">
              <span className="mt-1 mr-3 inline-flex h-[50px] w-[50px] items-center justify-center border-2 border-black text-4xl font-semibold">
                3
              </span>
              <span className="text-[16px] leading-5 text-[#232323]">
                AIの力を駆使して、
                <br />
                未来の市場をリードする。
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-7 text-center text-xl font-semibold text-[#444]">
              競争力を高めるためにAI戦略をスタート
            </div>
            <button className="mb-12 h-[70px] w-[276px] transform cursor-pointer bg-[#191919] py-4 text-2xl font-semibold text-white transition-all duration-300 hover:-translate-y-[3px] hover:bg-[#333]">
              今すぐAI対策を強化
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center border-t border-[#ebebeb] bg-[#F3F3F3] px-7 pt-8 pb-6">
          <div className="mt-20 mb-15 pb-1 text-center text-5xl font-extrabold tracking-[.1em] text-[#383838]">
            AIの力を駆使して、 未来の市場をリードする。
          </div>
          <div className="mb-8 text-3xl leading-6 font-bold text-[#383838]">
            AIで海外市場の競争力を強化
          </div>

          <div className="mt-4 mb-5 flex items-start gap-6">
            <div className="flex flex-col items-center gap-7">
              <span className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#d3d7df] text-3xl text-[26px]">
                🔍
              </span>
              <span className="mt-3 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#d3d7df] text-3xl text-[26px]">
                💰
              </span>
              <span className="mt-3 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#d3d7df] text-3xl text-[26px]">
                📊
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-7 space-y-5">
              <div className="mb-2 text-lg text-[#232323]">
                AI技術により、グローバル市場での競争が激化する中でも市場ニーズを迅速に把握し、的確に応えることが可能です。
              </div>
              <div className="mb-2 text-lg text-[#232323]">
                新たな地域でのビジネスを始める際、AIは市場調査の時間とコストを大幅に削減します。
              </div>
              <div className="text-lg text-[#232323]">
                AIによるデータ分析は、顧客の嗜好や行動を深く理解し、よりパーソナライズされたサービスの提供を可能にします。
              </div>
            </div>
          </div>
          <div className="mt-10 mb-20 text-[11px] leading-5 text-[#888]">
            ※
            AIを導入することに抵抗がある場合も、まずはパイロットプロジェクトから始めることをお勧めします。
            <br />※
            法律や規制の違いを理解し、各国のルールに準拠することが重要です。
          </div>
        </div>

        <div className="border-t border-[#121212] bg-[#141414] px-7 pt-7 pb-30">
          <div className="mt-20 mb-15 text-center text-5xl leading-10 font-extrabold text-white">
            グローバル競争力を高める
            <br />
            イノベーティブな
            <br />
            ソリューション
          </div>
          <div className="flex justify-between">
            <div className="mb-2 flex">
              <span className="text-[41px] font-bold text-white">01</span>
            </div>

            <div className="flex w-[250px] flex-col items-start justify-start">
              <div>
                <div className="flex h-[200px] w-[250px] items-center justify-center rounded-lg">
                  <Image
                    src={'/heroImage.svg'}
                    width={200}
                    height={300}
                    alt={'image'}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              </div>
              <div className="mt-8 mb-5 text-2xl font-semibold text-white">
                先進テクノロジーで海外市場を開拓
              </div>
              <div className="mt-2 mb-1 text-[12.5px] leading-5 text-white/90">
                私たちのサービスは、テクノロジーを駆使して海外市場への参入を実現します。
                <br />
                クリエイティビティを生かしたデジタル広告は、新たな市場での認知度を飛躍的に向上させます。
                <br />
                グローバル展開を視野に入れた新しいビジネスモデルを構築します。
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#ebebeb] bg-[#F3F3F3] px-5 pt-7 pb-9">
          <div className="mt-20 mb-15 text-center text-3xl font-bold text-[#232323]">
            ご利用の流れ
          </div>
          <div>
            <span className="mt-[2.5px] mr-6 text-[36px] font-bold tracking-widest text-[#232323]">
              01
            </span>
            <div>
              <div className="mt-5 mb-7 flex h-[180px] w-[360px] items-center justify-center rounded-lg border">
                <Image
                  src={'/heroImage.svg'}
                  width={200}
                  height={300}
                  alt={'image'}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
          <div className="mb-2 text-center text-2xl font-bold text-[#232323]">
            見出し見出し見出し見出し見出し見出し
          </div>
          <div className="mb-2 text-center text-[13px] leading-[1.6] text-[#232323]">
            テキストテキストテキストテキスト テキストテキストテキストテキスト
            テキストテキストテキスト テキストテキストテキストテキスト
          </div>
          <div className="mb-30 text-center text-sm leading-5 text-[#888]">
            ※ 注釈テキスト注釈テキスト 注釈テキスト注釈テキスト注釈テキスト
          </div>
        </div>
      </div>
    </div>
  );
};
