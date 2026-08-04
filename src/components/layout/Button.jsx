import React from 'react';

export default function Button({
  children,
  type = 'button',
  bgColor = '',
  textColor = '',
  className = '',
  variant = 'primary',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 disabled:cursor-not-allowed disabled:opacity-60';

  const variants = {
    primary:
      'bg-orange-500 text-white shadow-sm hover:bg-orange-600 active:bg-orange-700',
    secondary:
      'bg-slate-900 text-white hover:bg-slate-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white',
    outline:
      'border border-slate-200 bg-white text-slate-800 hover:border-orange-300 hover:text-orange-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100',
    ghost:
      'bg-transparent text-slate-600 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-800',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const variantClass = bgColor ? '' : variants[variant] || variants.primary;

  return (
    <button
      type={type}
      className={`${base} ${variantClass} ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}