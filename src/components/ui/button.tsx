import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90',
                outline: 'border border-[var(--border)] bg-transparent text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]',
                ghost: 'bg-transparent hover:bg-[var(--muted)] text-[var(--muted-foreground)]',
            },
            size: {
                default: 'h-9 px-4',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: { variant: 'outline', size: 'icon' },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

export function Button({ className, variant, size, ...props }: ButtonProps) {
    return (
        <button
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        />
    );
}