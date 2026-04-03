/**
 * Badge — 21st.dev-style pill label
 */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default:   'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline:   'border-border text-foreground bg-transparent',
        muted:     'border-transparent bg-muted text-muted-foreground',
        success:   'border-transparent bg-sage-light text-sage',
        dot:       'border-border bg-transparent text-muted-foreground before:content-[""] before:block before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
