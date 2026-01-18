import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
    return (
        <motion.button
            initial={false}
            whileHover={{
                backgroundColor: '#111111',
                color: '#ffffff',
                borderColor: '#111111'
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
                background: 'transparent',
                color: '#111',
                border: '1px solid #111',
                borderRadius: '6px',
                padding: '1rem 2rem',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                outline: 'none',
                ...props.style // Type assertion not needed with motion.button usually, but let's keep it clean
            }}
            {...props as any} // Cast to any to avoid strict Framer motion type conflicts with HTML attributes sometimes
        >
            {children}
        </motion.button>
    );
}
