import { motion } from 'framer-motion';

interface HostFlagPanelProps {
    country: string;
    flagImage: string;
}

export function HostFlagPanel({ country, flagImage }: HostFlagPanelProps) {
    return (
        <motion.div
            className="host-flag-panel"
            initial="idle"
            whileHover="hover"
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                position: 'relative',
                perspective: '1000px' // For 3D tilt
            }}
        >
            {/* Flag Visualization */}
            <motion.div
                variants={{
                    idle: { rotateX: 0, rotateY: 0, scale: 1, filter: 'brightness(0.9) contrast(1)' },
                    hover: {
                        rotateX: 5,
                        rotateY: 0,
                        scale: 1.05,
                        filter: 'brightness(1.1) contrast(1.1)',
                        transition: { duration: 0.4, ease: "easeOut" }
                    }
                }}
                style={{
                    width: '100%',
                    aspectRatio: '16/9', // Cinematic ratio
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    zIndex: 1
                }}
            >
                {/* Shadow/Depth */}
                <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    left: '10%',
                    width: '80%',
                    height: '20px',
                    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, transparent 70%)',
                    filter: 'blur(10px)',
                    zIndex: -1,
                    opacity: 0.6,
                    transform: 'rotateX(90deg)'
                }} />

                <img
                    src={flagImage}
                    alt={`${country} Flag`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        // No border radius or very minimal
                        boxShadow: '0 20px 50px rgba(0,0,0,0.3)', // Cinematic soft shadow
                    }}
                />

                {/* Subtle sheen/highlight for texture */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                    pointerEvents: 'none',
                    mixBlendMode: 'overlay'
                }} />
            </motion.div>

            {/* Country Label */}
            <motion.h3
                variants={{
                    idle: { opacity: 0.7, y: 0 },
                    hover: { opacity: 1, y: -5, textShadow: '0 0 20px rgba(255,255,255,0.5)' }
                }}
                transition={{ duration: 0.3 }}
                style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 2vw, 2.5rem)',
                    fontWeight: 800,
                    color: '#fff', // Assuming dark bg context now, or we force dark text if on light. Request said "Atmosphere text fades out... Hero text...". 
                    // Wait, user request said "Atmosphere must feel like a continuation of the Hero section." and "Do NOT use grey backgrounds".
                    // Hero is usually dark/green. Atmosphere title reveal "TranslateY 16px -> 0".
                    // Let's stick to standard text color but allowing parent to control or default to cinematic white/black.
                    // Given the "Cinematic" instructions and "World Cup universe", usually implies dark/rich. 
                    // However, previous convo had white bg.
                    // User Request: "Do NOT use grey backgrounds". "Atmosphere must feel like a continuation of the Hero section."
                    // If Hero is dark, Atmosphere should likely be dark or a seamless transition.
                    // I will set color to 'currentColor' to let parent control, or default to a safe cinematic dark/light.
                    // Let's use a dynamic color or just white/black based on assumed background.
                    // I will use 'var(--text-primary)' but force uppercase and bold.
                    // Actually, for cinematic impact on a map/field background, White is usually best.
                    // If the background is "continuation of Hero" (Green/Dark), text should be White.
                    color: '#000', // Reverting to black as per previous Atmos code, but maybe needs check.
                    // User said: "Atmosphere text fades out simultaneously." -> "Both Hero and Atmosphere text must overlap".
                    // I will assume for now text is Dark or High Contrast. Let's use 'inherit' or explicit styling in parent.
                    // I'll stick to a high contrast color and simple styling here.
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    margin: 0,
                    textAlign: 'center'
                }}
            >
                {country}
            </motion.h3>
        </motion.div>
    );
}
