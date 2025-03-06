'use client';

import { RequiredIndicator } from '@/components/forms/required';
import { Input } from '@/components/ui/input';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const schema = z.object({
  url: z
    .array(z.string().url({ message: '正しいURLを入力してください' }).min(1), {
      required_error: 'URLは必須項目です',
    })
    .min(4, { message: 'URLは4つ以上必要です' })
    .max(9, { message: 'URLは9つ以下にしてください' }),
  ownUrl: z
    .string()
    .url({ message: '正しいURLを入力してください' })
    .min(1, { message: 'URLは必須項目です' }),
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const [length, setLength] = useState(4);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      url: Array(4).fill(''),
      ownUrl: '',
    },
  });

  const addUrlField = () => {
    if (length < 9) {
      setLength(length + 1);
      setValue('url', [...getValues('url'), '']);
    }
  };

  const removeUrlField = (index: number) => {
    if (length > 4) {
      setLength(length - 1);
      setValue(
        'url',
        getValues('url').filter((_, i) => i !== index),
      );
    }
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
      <div className="text-3xl font-medium text-zinc-900">競合分析</div>
      <div className="flex flex-col space-y-6 rounded-lg bg-blue-50/50 p-8 shadow dark:bg-blue-950/50">
        <div className="text-xl font-medium">競合情報を入力（分析前確認）</div>
        <div className="space-y-4">
          <div className="flex items-center space-x-8">
            <div className="flex w-[12rem] items-center space-x-2">
              <div className="font-medium text-nowrap">自社のURL</div>
              <RequiredIndicator />
            </div>
            <div className="flex w-full flex-col space-y-1">
              <Controller
                name="ownUrl"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="https://example.com"
                    className={`bg-zinc-50 dark:bg-zinc-950 ${errors.ownUrl ? 'border-red-500' : ''}`}
                  />
                )}
              />
              {errors.ownUrl && (
                <span className="text-xs text-red-500">
                  {errors.ownUrl.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-start space-x-8">
            <div className="flex w-[12rem] items-center space-x-2">
              <div className="font-medium text-nowrap">
                自社画像のアップロード
              </div>
            </div>
            <div className="h-[12rem] w-full rounded-lg bg-zinc-100 dark:bg-zinc-950"></div>
          </div>
          {Array.from({ length }).map((_, index) => (
            <div className="flex items-center space-x-8" key={index}>
              <div className="flex w-[12rem] items-center space-x-2">
                <div className="font-medium text-nowrap">競合のURL</div>
                <RequiredIndicator />
              </div>
              <div className="flex w-full flex-col items-start space-y-1">
                <div className="flex w-full space-x-2">
                  <Controller
                    name={`url.${index}`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        placeholder="https://example.com"
                        className={`bg-zinc-50 dark:bg-zinc-950 ${errors.url && errors.url[index] ? 'border-red-500' : ''}`}
                      />
                    )}
                  />
                  {index > 3 && (
                    <Button
                      type="button"
                      onClick={() => removeUrlField(index)}
                      size="sm"
                      className="h-9 bg-red-500 hover:bg-red-400"
                    >
                      -
                    </Button>
                  )}
                </div>
                {errors.url && errors.url[index] && (
                  <span className="text-xs text-red-500">
                    {errors.url[index]?.message}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2 self-center">
          <Button
            type="button"
            onClick={addUrlField}
            className=""
            size="sm"
            disabled={length >= 9}
            variant="link"
          >
            <div className="rounded-full bg-zinc-950 px-3 py-1 text-zinc-100">
              +
            </div>
            競合URLを追加する
          </Button>
          <span className="text-sm text-zinc-700 dark:text-zinc-200">
            ※ 最大9つまで
          </span>
        </div>
        <Button
          type="submit"
          className="self-center rounded-xl px-16 py-6 shadow"
        >
          分析する
        </Button>
      </div>
    </form>
  );
}
