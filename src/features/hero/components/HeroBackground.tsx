import { motion, MotionValue, useTransform, useSpring, useScroll, useVelocity } from 'framer-motion';

interface HeroBackgroundProps {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}

export function HeroBackground({ mouseX, mouseY }: HeroBackgroundProps) {
    // Tighter Baseline: Increased line count (20 -> 30)
    const lineCount = 30;
    const lines = Array.from({ length: lineCount }, (_, i) => i);

    // Spring configuration for magnetic effect
    const springConfig = { damping: 25, stiffness: 50 };

    // Breathing Interaction (Step: Refined Interaction)
    // Detect mouse motion velocity to trigger "breathing"
    const velY = useVelocity(mouseY);
    const velX = useVelocity(mouseX);

    // Smooth out the velocity signal
    const smoothVelY = useSpring(velY, { damping: 20, stiffness: 50 });
    const smoothVelX = useSpring(velX, { damping: 20, stiffness: 50 });

    // Map velocity to a spread factor
    // When steady (0 vel) -> 1 (Baseline)
    // When moving -> scales up spacing slightly (up to 1.15)
    // Using both X and Y velocity to trigger breath on any movement
    const breathingFactorY = useTransform(smoothVelY, [-0.5, 0, 0.5], [1.15, 1, 1.15]);
    const breathingFactorX = useTransform(smoothVelX, [-0.5, 0, 0.5], [1.15, 1, 1.15]);

    // Combine factors (could simply add them or multiply, keeping it subtle)
    // We'll trust Framer Motion to handle the transform chain, 
    // but here we need a single scalar. Let's merge them conceptually.
    // Actually, distinct transforms for each line is cleaner.

    // Scroll Fade (Step 5)
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 300], [0.4, 0]);

    return (
        <div
            className="hero-background"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden'
            }}
        >
            <motion.svg
                width="100%"
                height="100%"
                style={{ opacity }} // Linked scroll opacity
            >
                {lines.map((i) => {
                    // Center-based positioning
                    // 0..29. Center is approx 14.5.
                    const offsetFromCenter = i - (lineCount / 2); // -15 to +15

                    // Baseline spacing: 3.5% height per line
                    // Total height spread: 30 * 3.5% = 105% (covers screen nicely)
                    const baseSpacing = 3.5;

                    // Compute baseline Y percent
                    const baseY = 50 + (offsetFromCenter * baseSpacing);

                    // Magnetic / Parallax Factors
                    const factor = (i % 2 === 0 ? 1 : -1) * (i / 15);
                    const yShift = useTransform(mouseY, [-1, 1], [-10 * factor, 10 * factor]);
                    const xShift = useTransform(mouseX, [-1, 1], [-5 * factor, 5 * factor]);
                    const smoothY = useSpring(yShift, springConfig);
                    const smoothX = useSpring(xShift, springConfig);

                    // Breathing Transform
                    // We multiply the offsetFromCenter by the breathing factor.
                    // This makes lines visually "expand" from the center.
                    const finalY = useTransform(
                        [breathingFactorX, breathingFactorY],
                        ([bx, by]) => {
                            // Combine breath factors (take max or average)
                            const breath = Math.max(bx as number, by as number);
                            return `${50 + (offsetFromCenter * baseSpacing * breath)}%`;
                        }
                    );

                    // Smooth the final Y position to make the breath feel elastic/organic
                    const smoothFinalY = useSpring(finalY, { damping: 20, stiffness: 80 });

                    return (
                        <motion.line
                            key={i}
                            x1="0"
                            y1={smoothFinalY} // Animated Y position
                            x2="100%"
                            y2={smoothFinalY}
                            stroke="#e5e5e5" // Light gray
                            strokeWidth="1"
                            style={{
                                y: smoothY, // Add parallax shift on top
                                x: smoothX
                            }}
                        />
                    );
                })}
            </motion.svg>
        </div>
    );
}
