import React from 'react';

export default function LoadingComponent({
  isContentLoaded,
  progress = 0,
  setProgress,
}) {
  if (isContentLoaded) return null;
  return (
    <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
      <div className="h-1.5 w-48 overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-orange-500 transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <p className="text-sm text-slate-500 dark:text-zinc-400">Loading…</p>
    </div>
  );
}