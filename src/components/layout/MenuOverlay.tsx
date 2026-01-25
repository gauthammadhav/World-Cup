
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import playerImg from '../../assets/images/Player_Cutout.png';

interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    "Atmosphere",
    "Teams",
    "Fixtures",
    "History",
    "Gallery"
];

const overlayVariants: Variants = {
    hidden: {
        opacity: 0,
        y: '2%',
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            when: "afterChildren",
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    },
    visible: {
        opacity: 1,
        y: '0%',
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        y: '2%',
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            when: "afterChildren",
            staggerChildren: 0.05,
            staggerDirection: -1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
        }
    },
    exit: {
        opacity: 0,
        y: 10,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
};

export function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const handleItemClick = (item: string) => {
        if (item === "Atmosphere") {
            const section = document.getElementById('atmosphere');
            if (section) {
                // Use lenis or native smooth scroll
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="menu-overlay"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={overlayVariants}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: '#050505', // Cinematic near-black
                        zIndex: 100,
                        display: 'grid',
                        gridTemplateColumns: '0.8fr 1.4fr', // Heavily biased to visual to maximize image size
                        overflow: 'hidden'
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: 'var(--padding-y)',
                            right: 'var(--padding-x)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#fff',
                            zIndex: 102
                        }}
                    >
                        <X size={32} strokeWidth={1.5} />
                    </button>

                    {/* Left Content: Menu Items */}
                    <div style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        paddingLeft: 'var(--padding-x)',
                        color: '#fff'
                    }}>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {menuItems.map((item) => (
                                <motion.div
                                    key={item}
                                    variants={itemVariants}
                                    whileHover={{ x: 10, color: '#e5e5e5' }}
                                    onClick={() => handleItemClick(item)}
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: 'clamp(3rem, 5vw, 5.5rem)',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '-0.02em',
                                        cursor: 'pointer',
                                        // display: 'inline-block', // allows transform
                                        width: 'fit-content'
                                    }}
                                >
                                    {/* Optional: Add subtle index number or line? Keeping minimal per prompt. */}
                                    {item}
                                </motion.div>
                            ))}
                        </nav>
                    </div>

                    {/* Right Content: Player Cutout Asset */}
                    <div style={{
                        position: 'relative',
                        height: '100%',
                        width: '100%',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'flex-end', // Anchor to bottom
                        justifyContent: 'flex-end'
                    }}>
                        {/*
                           Background Gradient for depth
                        */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'radial-gradient(circle at 70% 50%, #1a1a1a 0%, #050505 70%)',
                            zIndex: 0
                        }} />

                        <motion.img
                            src={playerImg}
                            alt="Player Feature"
                            initial={{ opacity: 0, x: 50, scale: 1.05 }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                scale: 1, // Reset to natural size
                                transition: {
                                    duration: 1.2,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: 0.2
                                }
                            }}
                            exit={{
                                opacity: 0,
                                x: 20,
                                transition: { duration: 0.4 }
                            }}
                            style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'contain',
                                objectPosition: 'bottom right',
                                zIndex: 1,
                                marginRight: '0', // Reset margins
                                marginBottom: '0',
                                transformOrigin: 'bottom right',
                                filter: 'grayscale(100%) contrast(110%) brightness(0.9)',
                            }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
