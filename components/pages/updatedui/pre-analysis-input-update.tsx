'use client';

import { RequiredIndicator } from '@/components/forms/required';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { getCheckUrl } from '@/services/gradio';
import { useGlobalStore } from '@/store/global';
import { useInputStore } from '@/store/input';
import { useResultStore } from '@/store/result';
import { useStateStore } from '@/store/state';
import { useUserStore } from '@/store/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

export default function PreAnalysisInputUpdate() {
  const [absentImage, setAbsentImage] = useState<string | null>(null);
  const [existImage, setExistImage] = useState<string | null>(null);
  const [absentFile, setAbsentFile] = useState<File | null>(null);
  const [existFile, setExistFile] = useState<File | null>(null);
  const { dummyMode } = useGlobalStore();
  const { user } = useUserStore();
  const [mainRadio, setMainRadio] = useState('');
  const [secondRadio, setSecondRadio] = useState('');
  const hasMultipleUrls = (value: string) => {
    const count = (value.match(/https:\/\//g) || []).length;
    return count <= 1;
  };
  const schema = z
    .object({
      url: z.array(
        z
          .string()
          .min(1, { message: 'URLを入力してください' })
          .refine((value) => hasMultipleUrls(value.trim()), {
            message: 'URLの入力は1つのみとしてください',
          })
          .refine((value) => value.trim().startsWith('https://'), {
            message: '”https://”から入力してください',
          })
          .refine(
            (value) => {
              try {
                new URL(value.trim());
                return true;
              } catch {
                return false;
              }
            },
            {
              message: '有効なURLを入力してください',
            },
          )
          .transform((val) => val.trim()),
      ),
      nonRequiredUrl: z.array(
        z
          .string()
          .optional()
          .refine(
            (value) => {
              if (!value?.trim()) return true;
              return hasMultipleUrls(value.trim());
            },
            {
              message: 'URLの入力は1つのみとしてください',
            },
          )
          .refine(
            (value) => {
              if (!value?.trim()) return true;
              return value.trim().startsWith('https://');
            },
            {
              message: '”https://”から入力してください',
            },
          )
          .refine(
            (value) => {
              if (!value?.trim()) return true;
              try {
                new URL(value.trim());
                return true;
              } catch {
                return false;
              }
            },
            {
              message: '有効なURLを入力してください',
            },
          )
          .transform((val) => val?.trim() ?? ''),
      ),
      ownUrl: z
        .string()
        .optional()
        .refine(
          (value) => {
            if (!value?.trim()) return true;
            return hasMultipleUrls(value.trim());
          },
          {
            message: 'URLの入力は1つのみとしてください',
          },
        )
        .refine(
          (value) => {
            if (!value?.trim()) return true;
            return value.trim().startsWith('https://');
          },
          {
            message: '”https://”から入力してください',
          },
        )
        .refine(
          (value) => {
            if (!value?.trim()) return true;
            try {
              new URL(value.trim());
              return true;
            } catch {
              return false;
            }
          },
          {
            message: '有効なURLを入力してください',
          },
        )
        .transform((val) => val?.trim() ?? ''),
    })
    .superRefine((data, ctx) => {
      if (mainRadio === 'exist' && secondRadio === 'url' && !data.ownUrl?.trim()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: '自社URLは必須です', path: ['ownUrl'] });
      }
      if (mainRadio === 'exist' && secondRadio === 'upload' && !existImage) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: '自社LP画像は必須です', path: ['ownImage'] });
      }
      if (mainRadio === 'absent' && !absentImage) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: '自社LP画像は必須です', path: ['ownImage'] });
      }
    });

  type FormData = z.infer<typeof schema>;

  const placeholders = [
    'https://www.dentsu.co.jp/',
    'https://dentsu-ho.com/',
    'https://www.dentsusoken.com/',
    'https://www.dentsulive.co.jp/',
    'https://www.dentsu-crx.co.jp/',
    'https://www.septeni-holdings.co.jp/',
    'https://www.dentsu-pmp.co.jp/',
    'https://www.dentsuprc.co.jp/',
    'https://www.dc1.dentsu.co.jp/jp/',
  ];
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const requiredLength = 3;
  const [length, setLength] = useState(0);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const { tempImagesLoading, setTempImagesLoading } = useStateStore();
  const { setTempImages } = useResultStore();
  const { setOwnUrl, setCompetitionUrls, competitionUrls } = useInputStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      url: Array(3).fill(''),
      ownUrl: '',
      nonRequiredUrl: Array(0).fill(''),
    },
  });

  const [showPreview, setShowPreview] = useState(false);

  const addUrlField = () => {
    if (length < 2) {
      setLength(length + 1);
      setValue('nonRequiredUrl', [...getValues('nonRequiredUrl'), '']);
      setCompetitionUrls([...competitionUrls, '']);
    }
  };

  const removeUrlField = (index: number) => {
    setLength(length - 1);
    setValue(
      'nonRequiredUrl',
      getValues('nonRequiredUrl').filter((_, i) => i !== index),
    );
    setCompetitionUrls(competitionUrls.filter((_, i) => i !== index + requiredLength));
  };

  const onSubmit = async (data: FormData) => {
    setTempImagesLoading(true);

    const urls: string[] = Array.from(
      new Set(data.url.concat(data.nonRequiredUrl.filter((url): url is string => url !== undefined)).filter((url) => url !== '')),
    );
    let imageToUse: string | null = null;
    let fileToUse: File | null = null;
    if (mainRadio === 'exist' && secondRadio === 'upload') {
      imageToUse = existImage;
      fileToUse = existFile;
    } else if (mainRadio === 'absent') {
      imageToUse = absentImage;
      fileToUse = absentFile;
    }

    let base64data = '';
    if (imageToUse) {
      try {
        const response = await fetch(imageToUse);
        const blob = await response.blob();
        base64data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        useInputStore.setState({ ownImageBase64: base64data });
      } catch {
        setErrorMessage('画像の変換に失敗しました。');
        setTempImagesLoading(false);
        return;
      }
    }
    useInputStore.setState({
      ownImage: imageToUse,
    });

    try {
      let response;

      if (dummyMode && typeof window !== 'undefined') {
        const res = await fetch('/dummy/get_check_url.json');
        if (!res.ok) {
          setErrorMessage('Dummy response could not be loaded.');
          setTempImagesLoading(false);
          return;
        }
        response = await res.json();
      } else {
        console.log(base64data);
        response = await getCheckUrl(
          {
            ownUrl: data.ownUrl,
            urlText: urls,
            ownImage: base64data || '',
            ownImageName: fileToUse?.name || '',
          },
          user?.user?.email || '',
        );
        if (Array.isArray(response) && response[2] && typeof response[2] === 'object') {
          const ownUrl = data.ownUrl;
          if (response[2]['自社LP']) {
            response[2][ownUrl] = response[2]['自社LP'];
          }
        }
      }

      console.log('response:', response);

      if ((response as { status: string }).status === 'error') {
        setErrorMessage((response as { message: string }).message);
        setTempImagesLoading(false);
        return;
      }

      setTempImages(response as string[]);
    } catch (error) {
      console.error(error);
      setErrorMessage('API通信エラーが発生しました。');
    } finally {
      setTempImagesLoading(false);
    }
  };

  const ownUrl = watch('ownUrl');

  const isOwnInputValid = useMemo(() => {
    if (mainRadio === 'exist') {
      if (secondRadio === 'url') return !!ownUrl?.trim();
      if (secondRadio === 'upload') return !!existImage;
      return false;
    }
    if (mainRadio === 'absent') return !!absentImage;
    return false;
  }, [mainRadio, secondRadio, ownUrl, existImage, absentImage]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">情報を入力（分析前確認）</h2>
      <div className="-mx-12">
        <span className="block w-full border-b border-[#CCCCCC] py-1.5"></span>
      </div>
      <h2 className="mt-4 text-lg font-bold">自社情報を選択</h2>
      <h3 className="text-sm font-medium">自社情報の有無を選択してください。既存の自社LPがない場合仮の構成案を作成します。</h3>
      <div className="mb-10 w-full rounded-md border-1 border-[#0186C926] bg-[#0186C90D] px-4 py-5">
        <div className="mb-3 flex items-center px-9 py-3.5">
          <div className="mr-15 flex items-center gap-2 text-[13px] font-medium">
            分析対象LP <RequiredIndicator />
          </div>
          <div className="flex space-x-8 text-sm font-medium">
            <label className="flex cursor-pointer items-center space-x-1.5">
              <input
                type="radio"
                name="main_radio"
                className="peer hidden"
                checked={mainRadio === 'exist'}
                onChange={() => {
                  setMainRadio('exist');
                }}
              />
              <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full border border-gray-300 bg-[#FAFAFA] transition peer-checked:border-transparent peer-checked:bg-gradient-to-br peer-checked:from-blue-500 peer-checked:to-blue-400">
                <span className="h-2 w-2 rounded-full bg-[#FAFAFA] transition" />
              </span>
              <span className="text-sm font-medium">自社LP情報あり</span>
            </label>
            <label className="flex cursor-pointer items-center space-x-1.5">
              <input
                type="radio"
                name="main_radio"
                className="peer hidden"
                checked={mainRadio === 'absent'}
                onChange={() => {
                  setMainRadio('absent');
                }}
              />
              <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full border border-gray-300 bg-[#FAFAFA] transition peer-checked:border-transparent peer-checked:bg-gradient-to-br peer-checked:from-blue-500 peer-checked:to-blue-400">
                <span className="h-2 w-2 rounded-full bg-[#FAFAFA] transition" />
              </span>
              <span className="text-sm font-medium">自社LP情報なし（仮の構成案を作成）</span>
            </label>
          </div>
        </div>

        {mainRadio === 'exist' && (
          <div className="w-full rounded-md border-[#CCCCCC] bg-white px-9 py-6">
            <h3 className="text-sm font-medium">自社LPのURLが読み込めない時はキャプチャ画像をアップしてください。</h3>
            <div className="mb-3 flex items-center py-3.5">
              <div className="flex space-x-8 text-sm font-medium">
                <label className="flex cursor-pointer items-center space-x-1.5">
                  <input
                    type="radio"
                    name="second_radio"
                    className="peer hidden"
                    checked={secondRadio === 'url'}
                    onChange={() => setSecondRadio('url')}
                  />
                  <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full border border-gray-300 bg-[#FAFAFA] transition peer-checked:border-transparent peer-checked:bg-gradient-to-br peer-checked:from-blue-500 peer-checked:to-blue-400">
                    <span className="h-2 w-2 rounded-full bg-[#FAFAFA] transition" />
                  </span>
                  <span className="text-sm font-medium">自社LPのURL</span>
                </label>
                <label className="flex cursor-pointer items-center space-x-1.5">
                  <input
                    type="radio"
                    name="second_radio"
                    className="peer hidden"
                    checked={secondRadio === 'upload'}
                    onChange={() => setSecondRadio('upload')}
                  />
                  <span className="flex h-4.5 w-4.5 items-center justify-center rounded-full border border-gray-300 bg-[#FAFAFA] transition peer-checked:border-transparent peer-checked:bg-gradient-to-br peer-checked:from-blue-500 peer-checked:to-blue-400">
                    <span className="h-2 w-2 rounded-full bg-[#FAFAFA] transition" />
                  </span>
                  <span className="text-sm font-medium">自社LP画像アップロード</span>
                </label>
              </div>
            </div>
            {secondRadio === 'url' && (
              <div className="mt-4 grid grid-cols-5 gap-8">
                <div className="flex items-center space-x-2">
                  <div className="font-medium text-nowrap">自社のURL</div>
                  <RequiredIndicator />
                </div>
                <div className="col-span-4 flex w-full flex-col space-y-1">
                  <Controller
                    name="ownUrl"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="https://www.dentsudigital.co.jp/"
                        className={`max-w-[608px] bg-white ${errors.ownUrl ? 'border-red-500' : ''}`}
                        disabled={tempImagesLoading}
                        onBlur={(e) => {
                          const val = correctUrlInput(e.target.value);
                          field.onChange(val);
                          setOwnUrl(val);
                        }}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                  {errors.ownUrl && (
                    <div className="mt-1 flex items-center space-x-1 text-xs text-red-500">
                      <Image src="/alert.svg" alt="pin" width={16} height={16} className="size-4 items-center" />
                      <span className="text-[12px] leading-none">{errors.ownUrl.message}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
            {secondRadio === 'upload' && (
              <div className="mt-4">
                <div className="flex">
                  <div className="grid grid-cols-5 items-start gap-8">
                    <div className="flex flex-col justify-center space-y-2">
                      <div className="flex items-center space-x-2 font-medium">
                        <h2>自社LP画像のアップロード</h2>
                      </div>
                      <RequiredIndicator />
                    </div>
                    {existImage ? (
                      <div className="border-non-color col-span-4 flex min-h-[60px] w-full max-w-[608px] items-center justify-between rounded border bg-zinc-100 px-6">
                        <div className="text-secondary-text text-sm">{existFile?.name}</div>
                        <div>
                          <Button
                            type="button"
                            variant="ghost"
                            className="text-secondary-text cursor-pointer rounded-full p-0!"
                            onClick={() => {
                              setExistImage(null);
                              setExistFile(null);
                            }}
                            disabled={tempImagesLoading}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="border-non-color col-span-4 flex min-h-[160px] w-full max-w-[608px] items-center justify-center rounded border bg-zinc-100">
                        <div className="flex w-full flex-col items-center">
                          <div className="w-full">
                            <Dropzone
                              disabled={tempImagesLoading}
                              onError={(err: Error) => {
                                setImageUploadError(err.message);
                              }}
                              onDropRejected={(rejectedFiles) => {
                                const rejectedFile = rejectedFiles[0];
                                if (rejectedFile) {
                                  const errors = rejectedFile.errors;
                                  if (errors.some((error) => error.code === 'file-invalid-type')) {
                                    setImageUploadError('対応していない形式のファイルです。PNG、JPG、JPEG形式のファイルをアップロードしてください。');
                                  } else if (errors.some((error) => error.code === 'file-too-large')) {
                                    setImageUploadError('ファイルサイズが大きすぎます。');
                                  } else {
                                    setImageUploadError('ファイルのアップロードに失敗しました。');
                                  }
                                }
                              }}
                              onDrop={(acceptedFiles) => {
                                if (tempImagesLoading) return;
                                setImageUploadError(null);
                                const file = acceptedFiles[0];
                                if (file) {
                                  setExistFile(file);
                                  const imageUrl = URL.createObjectURL(file);
                                  setExistImage(imageUrl);
                                }
                              }}
                              accept={{
                                'image/png': ['.png'],
                                'image/jpeg': ['.jpg', '.jpeg'],
                              }}
                              maxFiles={1}
                            >
                              {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
                                <div
                                  {...getRootProps()}
                                  className={cn(
                                    'focus:border-primary flex h-[160px] items-center justify-center rounded-md py-12 focus:outline-none',
                                    {
                                      'border-primary bg-secondary': isDragActive && isDragAccept,
                                      'border-destructive bg-destructive/20': isDragActive && isDragReject,
                                      'pointer-events-none opacity-50': tempImagesLoading,
                                    },
                                  )}
                                >
                                  <input {...getInputProps()} id="own_image" disabled={tempImagesLoading} />
                                  <div className="flex flex-col items-center space-y-4">
                                    <Label htmlFor="own_image" className="text-secondary-text text-sm">
                                      ここにファイルをドロップまたは
                                    </Label>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      className="cursor-pointer rounded-full px-12"
                                      disabled={tempImagesLoading}
                                    >
                                      ファイル選択
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {imageUploadError && (
                    <div className="grid grid-cols-5 gap-8">
                      <div />
                      <div className="text-table-error-text col-span-4 mt-2 flex items-center space-x-2 text-red-500">
                        <Image src="/alert.svg" alt="pin" width={16} height={16} className="size-4 items-center" />
                        <span className="text-ssm leading-none font-medium">{imageUploadError}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {mainRadio === 'absent' && (
          <div className="flex w-full flex-col justify-between space-y-4 rounded-md border-[#CCCCCC] bg-white px-9 py-6">
            <h2 className="text-sm font-medium">オリエン資料や提案資料などLPの元となるような資料をアップロードしてください。</h2>
            <div className="flex">
              <div className="grid grid-cols-5 items-start gap-8">
                <div className="flex flex-col justify-center space-y-2">
                  <div className="flex items-center space-x-2 font-medium">
                    <h2>資料のアップロード</h2>
                    <RequiredIndicator />
                  </div>
                  <h2 className="text-[11px] font-medium text-[#777777]">※ 複数可</h2>
                </div>
                {absentImage ? (
                  <div className="border-non-color col-span-4 flex min-h-[60px] w-full max-w-[608px] items-center justify-between rounded border bg-zinc-100 px-6">
                    <div className="text-secondary-text text-sm">{absentFile?.name}</div>
                    <div>
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-secondary-text cursor-pointer rounded-full p-0!"
                        onClick={() => {
                          setAbsentImage(null);
                          setAbsentFile(null);
                        }}
                        disabled={tempImagesLoading}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-non-color col-span-4 flex min-h-[160px] w-full max-w-[608px] items-center justify-center rounded border bg-zinc-100">
                    <div className="flex w-full flex-col items-center">
                      <div className="w-full">
                        <Dropzone
                          disabled={tempImagesLoading}
                          onError={(err: Error) => {
                            setImageUploadError(err.message);
                          }}
                          onDropRejected={(rejectedFiles) => {
                            const rejectedFile = rejectedFiles[0];
                            if (rejectedFile) {
                              const errors = rejectedFile.errors;
                              if (errors.some((error) => error.code === 'file-invalid-type')) {
                                setImageUploadError('対応していない形式のファイルです。PNG、JPG、JPEG形式のファイルをアップロードしてください。');
                              } else if (errors.some((error) => error.code === 'file-too-large')) {
                                setImageUploadError('ファイルサイズが大きすぎます。');
                              } else {
                                setImageUploadError('ファイルのアップロードに失敗しました。');
                              }
                            }
                          }}
                          onDrop={(acceptedFiles) => {
                            if (tempImagesLoading) return;
                            setImageUploadError(null);
                            const file = acceptedFiles[0];
                            if (file) {
                              setAbsentFile(file);
                              const imageUrl = URL.createObjectURL(file);
                              setAbsentImage(imageUrl);
                            }
                          }}
                          accept={{
                            'image/png': ['.png'],
                            'image/jpeg': ['.jpg', '.jpeg'],
                          }}
                          maxFiles={1}
                        >
                          {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
                            <div
                              {...getRootProps()}
                              className={cn('focus:border-primary flex h-[160px] items-center justify-center rounded-md py-12 focus:outline-none', {
                                'border-primary bg-secondary': isDragActive && isDragAccept,
                                'border-destructive bg-destructive/20': isDragActive && isDragReject,
                                'pointer-events-none opacity-50': tempImagesLoading,
                              })}
                            >
                              <input {...getInputProps()} id="own_image" disabled={tempImagesLoading} />
                              <div className="flex flex-col items-center space-y-4">
                                <Label htmlFor="own_image" className="text-secondary-text text-sm">
                                  ここにファイルをドロップまたは
                                </Label>
                                <Button type="button" variant="outline" className="cursor-pointer rounded-full px-12" disabled={tempImagesLoading}>
                                  ファイル選択
                                </Button>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {imageUploadError && (
                <div className="grid grid-cols-5 gap-8">
                  <div />
                  <div className="text-table-error-text col-span-4 mt-2 flex items-center space-x-2 text-red-500">
                    <Image src="/alert.svg" alt="pin" width={16} height={16} className="size-4 items-center" />
                    <span className="text-ssm leading-none font-medium">{imageUploadError}</span>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-5 gap-8"></div>
            </div>
          </div>
        )}
      </div>

      <h2 className="text-[16px] font-bold">競合情報を選択</h2>
      <div className="space-y-8">
        <div className="space-y-4">
          {Array.from({ length: requiredLength }).map((_, index) => (
            <div className="grid grid-cols-5 gap-8" key={index}>
              <div className="flex items-center space-x-2">
                <div className="font-medium text-nowrap">競合{index + 1}のURL</div>
                {index < 3 && <RequiredIndicator />}
              </div>
              <div className="col-span-4 flex w-full flex-col items-start space-y-1">
                <div className="flex w-full space-x-2">
                  <Controller
                    name={`url.${index}`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder={placeholders[index]}
                        className={`max-w-[608px] bg-white ${errors.url && errors.url[index] ? 'border-red-500' : ''}`}
                        disabled={tempImagesLoading}
                        onBlur={(e) => {
                          const val = correctUrlInput(e.target.value);
                          field.onChange(val);
                          setCompetitionUrls([...getValues('url'), ...getValues('nonRequiredUrl')].map(correctUrlInput).filter((url) => url !== ''));
                        }}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {index > 2 && (
                    <Button
                      type="button"
                      onClick={() => removeUrlField(index)}
                      size="sm"
                      className="bg-secondary-text hover:bg-secondary-text/90 size-6 cursor-pointer self-center rounded-full text-white"
                      disabled={tempImagesLoading}
                    >
                      <Minus className="size-4" />
                    </Button>
                  )}
                </div>
                {errors.url && errors.url[index] && (
                  <div className="mt-1 flex items-center space-x-1 text-xs text-red-500">
                    <Image src="/alert.svg" alt="pin" width={16} height={16} className="size-4 items-center" />
                    <span className="text-[12px] leading-none">{errors.url[index]?.message}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {Array.from({ length }).map((_, index) => (
            <div className="grid grid-cols-5 gap-8" key={index}>
              <div className="flex items-center space-x-2">
                <div className="font-medium text-nowrap">競合{index + 4}のURL</div>
              </div>
              <div className="col-span-4 flex w-full flex-col items-start space-y-1">
                <div className="flex w-full space-x-2">
                  <Controller
                    name={`nonRequiredUrl.${index}`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder={placeholders[index + requiredLength]}
                        className={`max-w-[608px] bg-white ${errors.nonRequiredUrl && errors.nonRequiredUrl[index] ? 'border-red-500' : ''}`}
                        disabled={tempImagesLoading}
                        onBlur={(e) => {
                          const val = correctUrlInput(e.target.value);
                          field.onChange(val);
                          setCompetitionUrls([...getValues('url'), ...getValues('nonRequiredUrl')].map(correctUrlInput).filter((url) => url !== ''));
                        }}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Button
                    type="button"
                    onClick={() => removeUrlField(index)}
                    size="sm"
                    className="bg-secondary-text hover:bg-secondary-text/90 size-6 cursor-pointer self-center rounded-full text-white"
                    disabled={tempImagesLoading}
                  >
                    <Minus className="size-4" />
                  </Button>
                </div>
                {errors.nonRequiredUrl && errors.nonRequiredUrl[index] && (
                  <div className="mt-1 flex items-center space-x-1 text-xs text-red-500">
                    <Image src="/alert.svg" alt="pin" width={16} height={16} className="size-4 items-center" />
                    <span className="text-[12px] leading-none">{errors.nonRequiredUrl[index]?.message}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-8">
        <div />
        <div className="col-span-4 flex items-center space-x-2">
          <Button type="button" onClick={addUrlField} className="cursor-pointer px-0!" disabled={length >= 6 || tempImagesLoading} variant="link">
            <div className="bg-secondary-text rounded-full p-1">
              <Plus className="size-4 text-white" />
            </div>
            競合URLを追加する
          </Button>
          <span className="text-secondary-text text-sm">※ 最大9つまで</span>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-1"></div>
        {(errorMessage || errors.root || errors.url?.root) && (
          <div className="col-span-4 mt-1 flex items-center space-x-1 text-xs text-red-500">
            <Image src="/alert.svg" alt="pin" width={16} height={16} className="size-4 items-center" />
            <span className="text-[12px] leading-none">{errorMessage || errors.root?.message || errors.url?.root?.message}</span>
          </div>
        )}
      </div>
      {mainRadio === 'absent' && !showPreview && (
        <Button
          type="button"
          className="relative w-[12rem] cursor-pointer self-center rounded-full py-5 text-sm font-medium shadow-xl"
          onClick={() => setShowPreview(true)}
        >
          分析前確認をする
          <ChevronDown className="absolute right-4" />
        </Button>
      )}

      {mainRadio === 'absent' && showPreview && (
        <>
          <div className="flex flex-col items-center">
            <div className="mx-auto mt-12 mb-8 flex h-[500px] w-full items-center justify-center rounded-lg border bg-white">
              <div className="h-[427px] w-[240px] bg-[#D9D9D9]" />
            </div>
          </div>
          <Button
            disabled={tempImagesLoading || !isOwnInputValid}
            type="submit"
            className="relative w-[12rem] cursor-pointer self-center rounded-full py-5 text-sm font-medium shadow-xl"
          >
            分析前確認をする
            <ChevronDown className="absolute right-4" />
          </Button>
        </>
      )}

      {mainRadio !== 'absent' && (
        <Button
          disabled={tempImagesLoading || !isOwnInputValid}
          type="submit"
          className="relative w-[12rem] cursor-pointer self-center rounded-full py-5 text-sm font-medium shadow-xl"
        >
          分析前確認をする
          <ChevronDown className="absolute right-4" />
        </Button>
      )}
    </form>
  );
}

const correctUrlInput = (raw: string) => {
  let url = raw.trim();
  url = url.replace(/\s+/g, '');
  url = url.replace(/([^:]\/)\/+/g, '$1');
  url = url.replace(/\s+$/, '');

  if (
    url &&
    !url.endsWith('/') &&
    !url.endsWith('/?') &&
    !url.endsWith('/#') &&
    !url.includes('?', url.length - 2) &&
    !url.includes('#', url.length - 2)
  ) {
  } else if (url) {
    url = url.replace(/\/+$/, '/');
  }
  return url;
};
