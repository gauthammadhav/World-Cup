import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { HeroCountdown } from './HeroCountdown';
import { Button } from '../../../components/ui/Button';

// Animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const textRevealVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1] // Cinematic ease-out
        }
    }
};

const countdownVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.0,
            ease: "easeOut",
            delay: 0.8 // Lock in after headline
        }
    }
};

export function HeroContent() {
    const { scrollY } = useScroll();

    // Scroll Exit Animations (Step 5)
    // Headline: Moves up faster, fades out
    const headlineY = useTransform(scrollY, [0, 400], [0, -80]);
    const headlineOpacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Countdown: Moves up slower (depth), fades later
    const countdownY = useTransform(scrollY, [0, 400], [0, -40]);
    const countdownOpacity = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <motion.div
            className="hero-content-wrapper"
            style={{ width: '100%' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Eyebrow - Refined: Regular weight, wide tracking */}
            <motion.div
                variants={textRevealVariants}
                style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400, // Regular
                    fontSize: '0.75rem', // Slightly smaller for elegance
                    letterSpacing: '0.2em', // Wider tracking
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                    color: 'var(--text-secondary)',
                    opacity: headlineOpacity, // Linked opacities
                    y: headlineY // Linked move
                }}
            >
                FIFA World Cup™
            </motion.div>

            {/* Headline - Refined Hierarchy */}
            <h1 style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                textTransform: 'uppercase',
                marginBottom: '3rem',
                color: '#000',
                lineHeight: 0.85
            }}>
                {/* Line 1: Medium Weight */}
                <motion.span
                    variants={textRevealVariants}
                    style={{
                        fontSize: 'clamp(3rem, 6vw, 6rem)',
                        fontWeight: 500, // Medium (was 600)
                        letterSpacing: '-0.02em',
                        display: 'block',
                        color: '#1a1a1a', // Slightly softer black
                        opacity: headlineOpacity,
                        y: headlineY
                    }}
                >
                    World Cup
                </motion.span>

                {/* Line 2: Black Weight (Dominant) */}
                <motion.span
                    variants={textRevealVariants}
                    style={{
                        fontSize: 'clamp(5rem, 9vw, 9rem)',
                        fontWeight: 900, // Black
                        letterSpacing: '-0.04em',
                        display: 'block',
                        marginLeft: '-0.03em', // Optical alignment
                        marginTop: '-0.02em', // Tighter vertical lock
                        color: '#000000', // Pure black
                        opacity: headlineOpacity,
                        y: headlineY
                    }}
                >
                    2026
                </motion.span>
            </h1>

            {/* Countdown - Animate as a group */}
            <motion.div
                variants={countdownVariants}
                style={{
                    marginBottom: '3.5rem',
                    opacity: countdownOpacity,
                    y: countdownY
                }}
            >
                <HeroCountdown />
            </motion.div>

            <motion.div
                variants={textRevealVariants}
                style={{
                    opacity: countdownOpacity, // Group with countdown for depth plane
                    y: countdownY
                }}
            >
                <Button>Explore Matches</Button>
            </motion.div>
        </motion.div>
    );
}
