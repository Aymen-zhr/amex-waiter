import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type BadgeVariant = 'emerald' | 'amber' | 'brass' | 'terracotta' | 'neutral';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className,
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    emerald: 'bg-lumiere-emeraldLight text-lumiere-emerald border-lumiere-emeraldBorder',
    amber: 'bg-lumiere-amberLight text-lumiere-amber border-lumiere-amberBorder',
    brass: 'bg-lumiere-brassLight text-lumiere-brass border-lumiere-border',
    terracotta: 'bg-lumiere-terracottaLight text-lumiere-terracotta border-lumiere-terracottaBorder',
    neutral: 'bg-lumiere-surface text-lumiere-textMuted border-lumiere-borderLight',
  };

  const dotColors: Record<BadgeVariant, string> = {
    emerald: 'bg-lumiere-emerald',
    amber: 'bg-lumiere-amber',
    brass: 'bg-lumiere-brass',
    terracotta: 'bg-lumiere-terracotta',
    neutral: 'bg-lumiere-textCaption',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 tracking-wider uppercase font-medium',
    md: 'text-xs px-2.5 py-1 tracking-normal font-medium',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 rounded-full border transition-colors',
          variantStyles[variant],
          sizeStyles[size],
          className
        )
      )}
      {...props}
    >
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
      {children}
    </span>
  );
};