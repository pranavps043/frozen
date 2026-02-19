'use client';

import React from 'react';
import Link from 'next/link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'mint' | 'chocolate';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children?: React.ReactNode;
    /** Optional href - renders as Next.js Link instead of button */
    href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            fullWidth = false,
            isLoading = false,
            leftIcon,
            rightIcon,
            children,
            className = '',
            disabled,
            href,
            ...props
        },
        ref
    ) => {
        const baseStyles = `
      relative inline-flex items-center justify-center
      font-bold transition-all duration-300
      focus:outline-none
      disabled:opacity-50 disabled:cursor-not-allowed
      transform hover:scale-105 active:scale-95 cursor-pointer text-shadow-md
      ${fullWidth ? 'w-full' : ''}
    `;

        const getVariantStyles = (variant: string) => {
            const styles: Record<string, React.CSSProperties> = {
                primary: {
                    backgroundColor: 'var(--btn-primary-bg)',
                    color: 'var(--btn-primary-text)',
                    borderColor: 'transparent',
                },
                secondary: {
                    backgroundColor: 'var(--btn-secondary-bg)',
                    color: 'var(--btn-secondary-text)',
                    borderColor: 'var(--btn-secondary-border)',
                    borderWidth: '4px',
                    borderStyle: 'solid',
                },
                outline: {
                    backgroundColor: 'transparent',
                    color: 'var(--btn-outline-text)',
                    borderColor: 'var(--btn-outline-border)',
                    borderWidth: '4px',
                    borderStyle: 'solid',
                },
                mint: {
                    backgroundColor: 'var(--btn-mint-bg)',
                    color: 'var(--btn-mint-text)',
                    borderColor: 'transparent',
                },
                chocolate: {
                    backgroundColor: 'var(--btn-chocolate-bg)',
                    color: 'var(--btn-chocolate-text)',
                    borderColor: 'transparent',
                },
            };
            return styles[variant];
        };

        const getVariantClasses = (variant: string) => {
            const classes: Record<string, string> = {
                primary: 'btn-primary',
                secondary: 'btn-secondary',
                outline: 'btn-outline',
                mint: 'btn-mint',
                chocolate: 'btn-chocolate',
            };
            return classes[variant];
        };

        const sizeStyles = {
            sm: 'px-6 py-2.5 text-base rounded-full gap-2',
            md: 'px-8 py-3.5 text-lg rounded-full gap-2.5',
            lg: 'px-10 py-4.5 text-xl rounded-full gap-3',
        };

        const sharedClassName = `
            ${baseStyles}
            ${getVariantClasses(variant)}
            ${sizeStyles[size]}
            ${className}
        `;

        const sharedStyle: React.CSSProperties = {
            ...getVariantStyles(variant),
            fontFamily: '"Comic Sans MS", "Chalkboard SE", "Comic Neue", cursive, sans-serif',
        };

        const innerContent = (
            <>
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                >
                    <rect
                        x="2"
                        y="2"
                        width="calc(100% - 4px)"
                        height="calc(100% - 4px)"
                        rx="999"
                        fill="none"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="2"
                        strokeDasharray="8 4"
                        className="animate-[spin_20s_linear_infinite]"
                        style={{ transformOrigin: 'center' }}
                    />
                </svg>

                {isLoading && (
                    <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {!isLoading && leftIcon && <span className="inline-flex relative z-10">{leftIcon}</span>}
                <span className="relative z-10">{children}</span>
                {!isLoading && rightIcon && <span className="inline-flex relative z-10">{rightIcon}</span>}
            </>
        );

        if (href) {
            return (
                <Link
                    href={href}
                    className={sharedClassName}
                    style={sharedStyle}
                >
                    {innerContent}
                </Link>
            );
        }

        return (
            <button
                ref={ref}
                className={sharedClassName}
                style={sharedStyle}
                disabled={disabled || isLoading}
                {...props}
            >
                {innerContent}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;