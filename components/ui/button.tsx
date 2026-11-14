import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer';

    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-900/30 active:scale-[0.98]',
      destructive: 'bg-red-600 text-white hover:bg-red-500 shadow-md shadow-red-950/40 active:scale-[0.98]',
      outline: 'border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-200',
      secondary: 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700',
      ghost: 'hover:bg-slate-800 text-slate-300 hover:text-white',
      link: 'text-blue-400 underline-offset-4 hover:underline'
    };

    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-xs',
      lg: 'h-11 rounded-lg px-6 text-base',
      icon: 'h-9 w-9'
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
