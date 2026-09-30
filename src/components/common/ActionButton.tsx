import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { tapSpring } from '../../styles/motion';

export type ActionButtonVariant = 'primary' | 'secondary' | 'brass' | 'terracotta' | 'ghost';

export interface ActionButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: React.ReactNode;
  variant?: ActionButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className,
  ...props
}) => {
  const variantStyles: Record<ActionButtonVariant, string> = {
    primary:
      'bg-lumiere-textPrimary text-white shadow-luxury hover:bg-black active:bg-black',
    secondary:
      'bg-white text-lumiere-textPrimary border border-lumiere-border hover:bg-lumiere-surface shadow-luxury',
    brass:
      'bg-lumiere-brass text-white shadow-luxury hover:opacity-95',
    terracotta:
      'bg-lumiere-terracotta text-white shadow-luxury hover:opacity-95',
    ghost:
      'bg-transparent text-lumiere-textMuted hover:text-lumiere-textPrimary hover:bg-lumiere-surface',
  };

  const sizeStyles = {
    sm: 'h-9 px-3 text-xs gap-1.5 rounded-lg',
    md: 'h-11 px-4 text-sm gap-2 rounded-xl',
    lg: 'h-14 px-6 text-base gap-3 rounded-2xl font-medium',
  };

  return (
    <motion.button
      whileTap={tapSpring.whileTap}
      transition={tapSpring.transition}
      className={twMerge(
        clsx(
          'inline-flex items-center justify-center font-sans transition-all duration-150 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
};