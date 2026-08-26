"use client";

/**
 * Fixed bottom bar so advancing a step never requires scrolling past 18
 * principles. Preview is the widest target: on a phone it is the only way
 * the live document is reachable at all.
 */
export default function MobileActionBar({
  step,
  lastStep,
  canAdvance,
  previewOpen,
  onBack,
  onNext,
  onPreview,
}: {
  step: number;
  lastStep: number;
  canAdvance: boolean;
  previewOpen: boolean;
  onBack: () => void;
  onNext: () => void;
  onPreview: () => void;
}) {
  const onLastStep = step === lastStep;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-2 border-t border-line bg-surface/96 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur lg:hidden">
      <button
        type="button"
        onClick={onBack}
        disabled={step === 0}
        className="flex h-[46px] items-center gap-1 rounded-[10px] px-3.5 text-sm font-medium text-ink-soft disabled:opacity-40"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back
      </button>

      <button
        type="button"
        onClick={onPreview}
        aria-expanded={previewOpen}
        className={`flex h-[46px] flex-1 items-center justify-center gap-2 rounded-[10px] border text-sm font-semibold transition ${
          previewOpen
            ? "border-brand bg-brand-soft text-brand"
            : "border-line bg-surface text-ink-soft"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[17px] w-[17px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M8 13h8M8 17h5" />
        </svg>
        {onLastStep ? "Read it through" : "Preview"}
      </button>

      {onLastStep ? null : (
        <button
          type="button"
          onClick={onNext}
          disabled={!canAdvance}
          className="h-[46px] rounded-[10px] bg-brand px-5 text-sm font-semibold text-white disabled:opacity-40"
        >
          Next
        </button>
      )}
    </div>
  );
}
