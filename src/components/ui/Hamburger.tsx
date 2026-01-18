import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

interface HamburgerProps {
    isOpen?: boolean;
    onClick?: () => void;
}

export function Hamburger({ isOpen, onClick }: HamburgerProps) {
    return (
        <motion.button
            onClick={onClick}
            className="hamburger"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)'
            }}
        >
            <Menu size={32} strokeWidth={1.5} />
        </motion.button>
    );
}
