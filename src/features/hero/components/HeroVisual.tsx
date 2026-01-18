import { motion, useTransform, MotionValue, useScroll } from 'framer-motion';
import ballImg from '../../../assets/images/FIFA_World_Cup_26tm_Trionda_Pro_Ball_White_JD8021_HM1-removebg-preview(1)(1).png';

interface HeroVisualProps {
    mouseX?: MotionValue<number>; // Optional now
    mouseY?: MotionValue<number>;
}

export function HeroVisual({ mouseX, mouseY }: HeroVisualProps) {
    // Scroll Parallax (Step 5)
    const { scrollY } = useScroll();

    // Transform ranges for subtle exit
    // Ball lingering effect: Scales down slightly, pushes down to stay visible longer
    const scale = useTransform(scrollY, [0, 600], [1, 0.92]);
    const yScroll = useTransform(scrollY, [0, 600], [0, 100]); // Downward drift
    const opacity = useTransform(scrollY, [200, 600], [1, 0]); // Fade late

    return (
        <motion.div
            className="hero-visual-wrapper"
            style={{
                width: '100%',
                height: '100%',
                minHeight: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                perspective: '1200px', // Increased perspective for better depth
                position: 'relative', // For absolute positioning of shadow
                scale,   // Scroll Linked
                y: yScroll,  // Scroll Linked
                opacity  // Scroll Linked
            }}
        >
            {/*
         Step 3: Dynamic Shadow
         Refined Physics:
         - Ball Up (-5y): Shadow is Fainter (0.2), Larger (1.05), Blurrier.
         - Ball Down (+5y): Shadow is Darker (0.5), Smaller (0.95), Sharper.
      */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '60%',
                    height: '20px',
                    background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%)',
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    zIndex: 0,
                    transformOrigin: 'center center'
                }}
                // Idle Animation: Syncs with ball float
                animate={{
                    scale: [1.05, 0.95, 1.05], // Large (Up) -> Small (Down) -> Large (Up)
                    opacity: [0.2, 0.5, 0.2]   // Faint (Up) -> Dark (Down) -> Faint (Up)
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.6 // Synced exactly with ball delay
                }}
            />

            {/*
         Phase 1 or Wrapper for Interaction
         Now handles Hover Scale instead of Tilt
      */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }} // Refined: Slightly more subtle scale (1.05 vs 1.1)
                transition={{
                    // Transition for hover
                    scale: { duration: 0.5, ease: "easeOut" },
                    // Entrance settings
                    opacity: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.6 },
                    y: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.6 }
                }}
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    zIndex: 1, // Ensure ball is above shadow
                    transformStyle: 'preserve-3d',
                    cursor: 'default', // Changed back to default to avoid "clickable" expectation unless it is? User said "when you hover... ball enlarges". 
                    position: 'relative'
                }}
            >
                {/* 
                   New: Subtle Lighting Highlight 
                   Adds volume without gloss.
                */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
                        pointerEvents: 'none',
                        zIndex: 2,
                        borderRadius: '50%'
                    }}
                />

                {/*
           Phase 2: Infinite Loop
        */}
                <motion.img
                    src={ballImg}
                    alt="Official Match Ball"

                    // Idle Animation: Ball Float & Rotate
                    animate={{
                        y: [-5, 5, -5],
                        rotate: 360
                    }}
                    transition={{
                        y: {
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1.6
                        },
                        rotate: {
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 1.6
                        }
                    }}

                    style={{
                        width: '110%',
                        maxWidth: '720px',
                        height: 'auto',
                        objectFit: 'contain',
                        // Reduced inherent drop-shadow since we now have a floor shadow
                        // but kept subtle for object volume
                        filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.15))',
                        transform: 'translateX(5%)',
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
