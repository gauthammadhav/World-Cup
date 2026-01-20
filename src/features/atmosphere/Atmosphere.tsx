import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { HostNationCard } from './components/HostNationCard';
import { StadiumCard } from './components/StadiumCard';

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

    return (
        <section id="atmosphere" style={{
            minHeight: '100vh',
            width: '100%',
            backgroundColor: '#000000', // Changed to black for better contrast with new premium cards
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
                            color: '#fff',
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
                            color: '#fff',
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
                    viewport={{ once: true, amount: 0.2 }} // Trigger earlier for smoother scroll
                    variants={staggerContainer}
                    style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
                >
                    <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: '#fff',
                        letterSpacing: '0.05em'
                    }}>
                        HOST NATIONS
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Responsive grid
                        gap: '2rem',
                        width: '100%',
                    }}>
                        {['USA', 'CANADA', 'MEXICO'].map(nation => (
                            <HostNationCard key={nation} country={nation} />
                        ))}
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
                                color: '#fff',
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
                                color: '#888' // Softer grey for dark mode
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
                        }}
                    >
                        {stadiums.map((stadium) => (
                            <StadiumCard
                                key={stadium.id}
                                name={stadium.name}
                                location={stadium.location}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
