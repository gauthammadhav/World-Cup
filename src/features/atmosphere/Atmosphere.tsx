import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { HostFlagPanel } from './components/HostFlagPanel';
import { StadiumCard } from './components/StadiumCard';
import usaFlag from '../../assets/images/usa-flag.png';
import canadaFlag from '../../assets/images/canada-flag.png';
import mexicoFlag from '../../assets/images/mexico-flag.png';

const stadiums = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    name: "STADIUM NAME",
    location: "CITY, COUNTRY"
}));

export function Atmosphere() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Stacking Scroll Logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Card 1 (USA): Scales down slightly and dims as others cover it
    const cardScale1 = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);
    const cardBrightness1 = useTransform(scrollYProgress, [0, 0.4], ["brightness(1)", "brightness(0.7)"]);

    // Card 2 (Mexico): Sits below visible area, slides up
    // Enters from 0.1 to 0.5
    const cardY2 = useTransform(scrollYProgress, [0.1, 0.5], ["100%", "0%"]);
    const cardScale2 = useTransform(scrollYProgress, [0.5, 0.9], [1, 0.95]);
    const cardBrightness2 = useTransform(scrollYProgress, [0.5, 0.9], ["brightness(1)", "brightness(0.7)"]);

    // Card 3 (Canada): Slides up over Mexico
    // Enters from 0.6 to 1.0
    const cardY3 = useTransform(scrollYProgress, [0.6, 1.0], ["100%", "0%"]);

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



    return (
        <motion.section
            id="atmosphere"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            style={{
                minHeight: '100vh',
                width: '100%',
                backgroundColor: '#000000', // Black background
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
                            color: '#ffffff', // Light text
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
                            color: '#ffffff', // Light text
                            marginLeft: '0.2rem'
                        }}
                    >
                        THREE NATIONS. ONE STAGE.
                    </motion.p>
                </div>

                {/* 3. HOST NATIONS BLOCK */}
                {/* 3. HOST NATIONS BLOCK */}
                {/* 3. HOST NATIONS BLOCK */}
                <div
                    ref={containerRef}
                    style={{
                        position: 'relative',
                        height: '300vh', // Tall container for scroll space
                        width: '100%'
                    }}
                >
                    <div style={{
                        position: 'sticky',
                        top: 0,
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}>
                        <motion.h3
                            style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                color: '#ffffff',
                                letterSpacing: '0.05em',
                                textAlign: 'left',
                                marginBottom: '2rem',
                                opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1])
                            }}
                        >
                            HOST NATIONS
                        </motion.h3>

                        <div style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '600px', // Constrain width for card look
                            margin: '0 auto',
                            aspectRatio: '3/2' // Match flag ratio + text space approx
                        }}>
                            {/* USA (Base Card) */}
                            <motion.div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                zIndex: 1,
                                scale: cardScale1,
                                filter: cardBrightness1
                            }}>
                                <HostFlagPanel country="UNITED STATES" flagImage={usaFlag} />
                            </motion.div>

                            {/* MEXICO (Slides Start) */}
                            <motion.div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                zIndex: 2,
                                y: cardY2,
                                scale: cardScale2,
                                filter: cardBrightness2 // Optional shadow/dimming
                            }}>
                                <HostFlagPanel country="MEXICO" flagImage={mexicoFlag} />
                            </motion.div>

                            {/* CANADA (Slides Last) */}
                            <motion.div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                zIndex: 3,
                                y: cardY3
                            }}>
                                <HostFlagPanel country="CANADA" flagImage={canadaFlag} />
                            </motion.div>
                        </div>
                    </div>
                </div>

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
                                color: '#ffffff', // Light text
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
                                color: '#999' // Light grey
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
        </motion.section>
    );
}
