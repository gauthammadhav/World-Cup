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
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Horizontal Scroll Logic for Stadiums
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                // If mostly vertical scroll, let native behavior happen unless we want to map it
                // For this request, distinct horizontal scroll usually implies mapped or simple overflow
                // We'll map vertical wheel to horizontal scroll for ease of use
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <motion.section
            id="atmosphere"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            style={{
                minHeight: '100vh',
                width: '100%',
                backgroundColor: '#ffffff', // White background
                color: '#111111',
                paddingTop: '10rem',
                paddingBottom: '10rem',
                position: 'relative',
                zIndex: 10,
                overflow: 'hidden'
            }}>

            {/* Background Texture/Map (Subtle) */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.03,
                backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)',
                backgroundSize: '30px 30px',
                pointerEvents: 'none'
            }} />

            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 var(--padding-x)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12rem',
                position: 'relative',
                zIndex: 1
            }}>

                {/* 1. SECTION INTRO */}
                <motion.div
                    variants={containerVariants}
                    style={{ textAlign: 'left', maxWidth: '800px' }}
                >
                    <motion.h2
                        variants={fadeInUp}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(4rem, 8vw, 6rem)',
                            fontWeight: 900,
                            letterSpacing: '-0.04em',
                            color: '#000',
                            marginBottom: '1rem',
                            lineHeight: 0.85,
                            textTransform: 'uppercase'
                        }}
                    >
                        ATMOSPHERE
                    </motion.h2>

                    <motion.div
                        variants={fadeInUp}
                        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                    >
                        <p style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.5rem, 2vw, 2rem)',
                            fontWeight: 300, // Light
                            letterSpacing: '-0.02em',
                            textTransform: 'none',
                            color: '#000',
                            margin: 0
                        }}>
                            Three Nations. One World Cup.
                        </p>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1rem',
                            color: '#666',
                            marginTop: '1rem',
                            maxWidth: '500px',
                            lineHeight: 1.5
                        }}>
                            North America becomes the world’s biggest football stage in 2026.
                        </p>
                    </motion.div>
                </motion.div>

                {/* 2. HOST NATIONS LAYOUT */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1.2fr 1fr',
                    gridTemplateRows: 'auto auto',
                    gap: '4rem',
                    alignItems: 'center'
                }}>

                    {/* Canada (Bottom Left) */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ gridColumn: '1', gridRow: '2', marginTop: '-4rem' }}
                    >
                        <HostFlagPanel country="CANADA" flagImage={canadaFlag} />
                    </motion.div>

                    {/* USA (Top Center - Largest) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{ gridColumn: '2', gridRow: '1 / span 2', zIndex: 2 }}
                    >
                        <div style={{ transform: 'scale(1.2)' }}>
                            <HostFlagPanel country="USA" flagImage={usaFlag} />
                        </div>
                    </motion.div>

                    {/* Mexico (Bottom Right) */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        style={{ gridColumn: '3', gridRow: '2', marginTop: '-4rem' }}
                    >
                        <HostFlagPanel country="MEXICO" flagImage={mexicoFlag} />
                    </motion.div>

                </div>


                {/* 3. STADIUMS SECTION */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            color: '#000',
                            marginBottom: '0',
                            letterSpacing: '-0.03em',
                            lineHeight: 0.9
                        }}>
                            THE STAGES
                        </h3>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: '#666',
                            marginTop: '0.5rem'
                        }}>
                            16 Stadiums Across North America
                        </p>
                    </motion.div>

                    {/* Timeline Container */}
                    <div
                        ref={scrollContainerRef}
                        className="stadium-timeline"
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                        style={{
                            display: 'flex',
                            gap: '3rem',
                            overflowX: 'auto',
                            paddingBottom: '3rem',
                            paddingLeft: '2rem', // Optical start
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
