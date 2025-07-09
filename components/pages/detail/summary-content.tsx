import { useResultStore } from '@/store/result';

export function SummaryContent() {
  const { summaryData } = useResultStore();
  return (
    <>
      <div className="flex flex-col">
        <div className="text-lg font-bold">CTA</div>
        <div
          className="text-sm font-medium"
          dangerouslySetInnerHTML={{
            __html: summaryData
              ? typeof summaryData.CTA === 'string'
                ? summaryData.CTA
                : JSON.stringify(summaryData.CTA.own_company_advantage_and_advice)
              : '',
          }}
        />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-bold">CONTENTS</div>
        <div
          className="text-sm font-medium"
          dangerouslySetInnerHTML={{
            __html: summaryData
              ? typeof summaryData.CONTENTS === 'string'
                ? summaryData.CONTENTS
                : JSON.stringify(summaryData.CONTENTS.own_company_advantage_and_advice)
              : '',
          }}
        />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-bold">CREATIVE</div>
        <div
          className="text-sm font-medium"
          dangerouslySetInnerHTML={{
            __html: summaryData
              ? typeof summaryData.CREATIVE === 'string'
                ? summaryData.CREATIVE
                : JSON.stringify(summaryData.CREATIVE.own_company_advantage_and_advice)
              : '',
          }}
        />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-bold">ACCESSIBILITY</div>
        <div
          className="text-sm font-medium"
          dangerouslySetInnerHTML={{
            __html: summaryData
              ? typeof summaryData.ACCESSIBILITY === 'string'
                ? summaryData.ACCESSIBILITY
                : JSON.stringify(summaryData.ACCESSIBILITY.own_company_advantage_and_advice)
              : '',
          }}
        />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-bold">FV</div>
        <div
          className="text-sm font-medium"
          dangerouslySetInnerHTML={{
            __html: summaryData
              ? typeof summaryData.FV === 'string'
                ? summaryData.FV
                : JSON.stringify(summaryData.FV.own_company_advantage_and_advice)
              : '',
          }}
        />
      </div>
    </>
  );
}
