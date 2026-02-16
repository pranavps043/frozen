'use client';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'mint' | 'chocolate';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children?: React.ReactNode;
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
            ...props
        },
        ref
    ) => {
        const baseStyles = `
      relative inline-flex items-center justify-center
      font-bold transition-all duration-300
      focus:outline-none
      disabled:opacity-50 disabled:cursor-not-allowed
      transform hover:scale-105 active:scale-95 cursor-pointer
      ${fullWidth ? 'w-full' : ''}
    `;

        const variantStyles = {
            primary: `
        bg-[#F19803] text-white
        hover:bg-[#D88503] active:bg-[#C07703]
        shadow-[0_6px_0_0_#C07703,0_8px_12px_rgba(241,152,3,0.4)]
        hover:shadow-[0_4px_0_0_#C07703,0_6px_10px_rgba(241,152,3,0.5)]
        active:shadow-[0_2px_0_0_#C07703,0_4px_8px_rgba(241,152,3,0.3)]
      `,
            secondary: `
        bg-white text-[#3A2313] border-4 border-[#F19803]
        hover:bg-[#FFF8E7] active:bg-[#FFE4B5]
        shadow-[0_6px_0_0_#F19803,0_8px_12px_rgba(241,152,3,0.3)]
        hover:shadow-[0_4px_0_0_#F19803,0_6px_10px_rgba(241,152,3,0.4)]
        active:shadow-[0_2px_0_0_#F19803,0_4px_8px_rgba(241,152,3,0.2)]
      `,
            outline: `
        bg-transparent text-[#F19803] border-4 border-[#F19803]
        hover:bg-[#F19803] hover:text-white active:bg-[#D88503]
        shadow-[0_4px_0_0_#F19803,0_6px_10px_rgba(241,152,3,0.2)]
        hover:shadow-[0_3px_0_0_#C07703,0_5px_8px_rgba(241,152,3,0.3)]
        active:shadow-[0_1px_0_0_#C07703,0_3px_6px_rgba(241,152,3,0.2)]
      `,
            mint: `
        bg-[#0F3408] text-white
        hover:bg-[#0A2505] active:bg-[#051802]
        shadow-[0_6px_0_0_#051802,0_8px_12px_rgba(15,52,8,0.4)]
        hover:shadow-[0_4px_0_0_#051802,0_6px_10px_rgba(15,52,8,0.5)]
        active:shadow-[0_2px_0_0_#051802,0_4px_8px_rgba(15,52,8,0.3)]
      `,
            chocolate: `
        bg-[#3A2313] text-white
        hover:bg-[#2A1810] active:bg-[#1A0F08]
        shadow-[0_6px_0_0_#1A0F08,0_8px_12px_rgba(58,35,19,0.4)]
        hover:shadow-[0_4px_0_0_#1A0F08,0_6px_10px_rgba(58,35,19,0.5)]
        active:shadow-[0_2px_0_0_#1A0F08,0_4px_8px_rgba(58,35,19,0.3)]
      `,
        };

        const sizeStyles = {
            sm: 'px-6 py-2.5 text-base rounded-3xl gap-2',
            md: 'px-8 py-3.5 text-lg rounded-3xl gap-2.5',
            lg: 'px-10 py-4.5 text-xl rounded-3xl gap-3',
        };

        return (
            <button
                ref={ref}
                className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
                disabled={disabled || isLoading}
                style={{
                    fontFamily: '"Comic Sans MS", "Chalkboard SE", "Comic Neue", cursive, sans-serif',
                }}
                {...props}
            >
                {/* Decorative SVG Border */}
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
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;