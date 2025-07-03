'use client';
import PreAnalysisCheckUpdate from '@/components/pages/updatedui/pre-analysis-check-update';
import PreAnalysisInputUpdate from '@/components/pages/updatedui/pre-analysis-input-update';
import { LoadingPulse } from '@/components/parts/loading-pulse';
import { NoticeDialog } from '@/components/parts/notice-dialog';
import { Button } from '@/components/ui/button';
import { isAllowedUser } from '@/lib/utils';
import { useGlobalStore } from '@/store/global';
import { useResultStore } from '@/store/result';
import { useStateStore } from '@/store/state';
import { useUserStore } from '@/store/user';
import { useEffect } from 'react';

export default function UpdatedUi() {
  const { tempImagesLoading, getScoreLoading } = useStateStore();
  const { tempImages, downloadData } = useResultStore();
  const { setDummyMode, dummyMode } = useGlobalStore();
  const { user } = useUserStore();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <div className="flex h-full grow flex-col space-y-8">
      {getScoreLoading || downloadData ? (
        <div className="flex grow flex-col items-center justify-center space-y-8">
          <LoadingPulse />
          <div className="text-secondary-text">※競合分析が完了するまで5分程度かかります</div>
        </div>
      ) : (
        <div className="mt-4 w-full space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-primary-text text-3xl font-bold">競合分析</h1>
            {isAllowedUser(user?.user?.email) && (
              <Button onClick={() => setDummyMode(!dummyMode)}>{dummyMode ? '通常モードに設定' : 'ダミーモードに設定'}</Button>
            )}
          </div>
          <div className="flex flex-col space-y-6 rounded-xl bg-white/80 px-12 py-10 shadow">
            <PreAnalysisInputUpdate />
            {tempImagesLoading ? (
              <div className="flex flex-col items-center space-y-4 self-center py-12">
                <LoadingPulse />
                <div className="text-secondary-text">※データ取得に2分程度かかります</div>
              </div>
            ) : null}
            {tempImages.length && !tempImagesLoading ? <PreAnalysisCheckUpdate /> : null}
          </div>
        </div>
      )}
      <NoticeDialog />
    </div>
  );
}
