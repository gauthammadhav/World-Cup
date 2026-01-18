import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stadiums = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    name: "STADIUM NAME",
    location: "CITY, COUNTRY"
}));

export function Atmosphere() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Horizontal Scroll Logic
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY === 0) return;

            // Check if we are at the boundaries
            const isAtStart = container.scrollLeft === 0;
            const isAtEnd = Math.abs(container.scrollWidth - container.scrollLeft - container.clientWidth) < 2;

            if ((isAtStart && e.deltaY < 0) || (isAtEnd && e.deltaY > 0)) {
                return; // Default vertical scroll
            }

            e.preventDefault();
            container.scrollLeft += e.deltaY;
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

    // Animation Variants
    const revealVariants = {
        hidden: { opacity: 0, y: 12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 12 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="atmosphere" style={{
            minHeight: '100vh',
            width: '100%',
            backgroundColor: '#ffffff',
            paddingTop: '8rem',
            paddingBottom: '8rem',
            position: 'relative',
            zIndex: 10
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 var(--padding-x)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8rem'
            }}>

                {/* 1. & 2. SECTION HEADINGS */}
                <div style={{ textAlign: 'left' }}>
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.6 }} // Reversible
                        variants={revealVariants}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(3rem, 5vw, 4rem)',
                            fontWeight: 900,
                            letterSpacing: '-0.02em',
                            color: '#000',
                            marginBottom: '0.5rem',
                            lineHeight: 0.9,
                            textTransform: 'uppercase'
                        }}
                    >
                        ATMOSPHERE
                    </motion.h2>

                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.6 }}
                        variants={{
                            hidden: { opacity: 0, y: 12 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }
                            }
                        }}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                            fontWeight: 500,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: '#000',
                            marginLeft: '0.2rem'
                        }}
                    >
                        THREE NATIONS. ONE STAGE.
                    </motion.p>
                </div>

                {/* 3. HOST NATIONS BLOCK */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={staggerContainer}
                    style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
                >
                    <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: '#000',
                        letterSpacing: '0.05em'
                    }}>
                        HOST NATIONS
                    </h3>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem',
                        width: '100%',
                        maxWidth: '900px',
                        margin: '0 auto'
                    }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%' }}>
                            {['USA', 'CANADA'].map(nation => (
                                <motion.div
                                    key={nation}
                                    variants={cardVariants}
                                    whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
                                    style={{
                                        height: '140px',
                                        backgroundColor: '#f4f4f4',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontFamily: 'var(--font-display)',
                                        fontWeight: 700,
                                        fontSize: '1.5rem',
                                        letterSpacing: '0.05em',
                                        color: '#000',
                                        borderRadius: '4px',
                                        cursor: 'default'
                                    }}
                                >
                                    {nation}
                                </motion.div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <motion.div
                                variants={cardVariants}
                                whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
                                style={{
                                    width: 'calc(50% - 0.5rem)',
                                    height: '140px',
                                    backgroundColor: '#f4f4f4',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'var(--font-display)',
                                    fontWeight: 700,
                                    fontSize: '1.5rem',
                                    letterSpacing: '0.05em',
                                    color: '#000',
                                    borderRadius: '4px',
                                    cursor: 'default'
                                }}
                            >
                                MEXICO
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* 4. & 5. STADIUMS BLOCK */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    <div>
                        <motion.h3
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                color: '#000',
                                marginBottom: '0.5rem',
                                letterSpacing: '-0.02em'
                            }}
                            id="stadiums-heading"
                        >
                            THE STAGES
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                color: 'var(--text-secondary)'
                            }}
                            aria-labelledby="stadiums-heading"
                        >
                            16 STADIUMS ACROSS NORTH AMERICA
                        </motion.p>
                    </div>

                    {/* Timeline Container */}
                    <div
                        ref={scrollContainerRef}
                        className="stadium-timeline"
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onMouseLeave={() => setIsDragging(false)}
                        style={{
                            display: 'flex',
                            gap: '2rem',
                            overflowX: 'auto',
                            paddingBottom: '2rem',
                            width: '100%',
                            cursor: isDragging ? 'grabbing' : 'grab',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            // paddingLeft: '50vw', // Attempt to center? No, layout breaks easily.
                            // paddingRight: '50vw'
                        }}
                    >
                        {stadiums.map((stadium) => (
                            <motion.div
                                key={stadium.id}
                                initial="hidden"
                                whileInView="visible"
                                // Focus Logic: "In View" in the center = Fully opaque. 
                                // Margin clamps the 'view' to the center 40% of the container.
                                viewport={{ root: scrollContainerRef, margin: "0px -30% 0px -30%" }}
                                variants={{
                                    hidden: { opacity: 0.4, y: 12 }, // Muted by default
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.5 }
                                    }
                                }}
                                whileHover="hover"
                                style={{
                                    flexShrink: 0,
                                    width: '300px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.25rem',
                                    cursor: 'pointer' // interactive feel
                                }}
                            >
                                {/* Image Placeholder */}
                                <motion.div
                                    variants={{
                                        hover: { scale: 1.02 } // Subtle scale on hover
                                    }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    style={{
                                        width: '100%',
                                        aspectRatio: '3/4',
                                        backgroundColor: '#e5e5e5',
                                        borderRadius: '4px', // Soft rounded?
                                        overflow: 'hidden'
                                    }}
                                >
                                    {/* Inner content if any */}
                                </motion.div>

                                {/* Info */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <motion.span
                                        variants={{
                                            hover: { opacity: 1, color: '#000' } // Ensure emphasis
                                        }}
                                        style={{
                                            fontFamily: 'var(--font-display)',
                                            fontWeight: 700,
                                            fontSize: '1.125rem',
                                            textTransform: 'uppercase',
                                            color: '#000', // Default
                                            opacity: 0.9 // Slightly softer default to allow emphasis?
                                        }}
                                    >
                                        {stadium.name}
                                    </motion.span>
                                    <span style={{
                                        fontFamily: 'var(--font-display)',
                                        fontWeight: 500,
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        color: '#666',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {stadium.location}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
