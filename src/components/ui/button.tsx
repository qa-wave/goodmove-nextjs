/**
 * Button — 21st.dev-inspired polymorphic button component
 * Supports variants, sizes, loading state and icon slots.
 */
import * as React from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base
  `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full
   text-sm font-semibold ring-offset-background transition-all duration-300
   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
   disabled:pointer-events-none disabled:opacity-50 select-none`,
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-y-0.5',
        outline:
          'border-2 border-border bg-transparent text-foreground hover:border-primary hover:text-primary hover:-translate-y-0.5',
        ghost:
          'bg-transparent text-foreground hover:bg-muted hover:text-foreground',
        link:
          'underline-offset-4 hover:underline text-primary p-0 h-auto font-medium rounded-none',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        sm:  'h-9 px-4 text-xs',
        md:  'h-11 px-6 text-sm',
        lg:  'h-13 px-8 text-base',
        xl:  'h-15 px-10 text-lg',
        icon: 'h-10 w-10 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a different element (e.g. 'a' via Slot) */
  asChild?: boolean
  /** Show a loading spinner and disable the button */
  loading?: boolean
  /** Icon to show before the label */
  leftIcon?: React.ReactNode
  /** Icon to show after the label */
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          leftIcon
        )}
        <Slottable>{children}</Slottable>
        {!loading && rightIcon}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
