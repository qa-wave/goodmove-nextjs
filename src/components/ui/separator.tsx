/**
 * Separator — decorative divider with optional label
 */
import * as React from 'react'
import { cn } from '@/lib/utils'

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  label?: string
  decorative?: boolean
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', label, decorative = true, ...props }, ref) => {
    if (label) {
      return (
        <div ref={ref} className={cn('flex items-center gap-4', className)} {...props}>
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
          <div className="h-px flex-1 bg-border" />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={!decorative ? orientation : undefined}
        className={cn(
          'shrink-0 bg-border',
          orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
          className
        )}
        {...props}
      />
    )
  }
)
Separator.displayName = 'Separator'

export { Separator }
