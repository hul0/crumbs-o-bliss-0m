import React from 'react'
import { cn } from '@/lib/utils'

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center space-y-4", className)} {...props}>
      <div className="relative w-24 h-12 overflow-hidden flex items-center justify-center">
        <svg
          className="absolute inset-0 w-[200%] h-full animate-[wave_1.5s_linear_infinite]"
          viewBox="0 0 200 50"
          preserveAspectRatio="none"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 0 25 Q 25 5 50 25 T 100 25 Q 125 5 150 25 T 200 25" className="text-primary" />
        </svg>
      </div>
      <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading...</p>
    </div>
  )
}
