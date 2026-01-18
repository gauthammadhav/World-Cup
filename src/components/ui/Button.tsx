import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
    return (
        <button className={`btn btn-${variant}`} {...props}>
            {children}
        </button>
    );
}
