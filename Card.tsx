import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Card({ children, className, id, ...props }: CardProps) {
  return (
    <div
      id={id}
      className={cn('rounded-xl border border-slate-200 bg-white p-6 shadow-xs', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, id, ...props }: CardProps) {
  return (
    <div id={id} className={cn('mb-4 flex flex-col space-y-1.5', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, id, ...props }: CardProps) {
  return (
    <h3 id={id} className={cn('text-lg font-semibold tracking-tight text-slate-900', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className, id, ...props }: CardProps) {
  return (
    <p id={id} className={cn('text-sm text-slate-500', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ children, className, id, ...props }: CardProps) {
  return (
    <div id={id} className={cn('pt-0', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, id, ...props }: CardProps) {
  return (
    <div id={id} className={cn('mt-4 flex items-center pt-2', className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
