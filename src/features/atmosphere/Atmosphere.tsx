import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { HostFlagPanel } from './components/HostFlagPanel';
import { StadiumCard } from './components/StadiumCard';
import { NorthAmericaMap } from '../../components/visuals/NorthAmericaMap';
import { BackgroundField } from '../hero/components/BackgroundField';
import usaFlag from '../../assets/images/usa-flag.png';
import canadaFlag from '../../assets/images/canada-flag.png';
import mexicoFlag from '../../assets/images/mexico-flag.jpg';

gsap.registerPlugin(ScrollTrigger);

const stadiums = [
    { id: 1, name: "Azteca Stadium", location: "Mexico City, Mexico", glow: "rgba(0,166,80,0.8)" }, // Mexico Green
    { id: 2, name: "MetLife Stadium", location: "New York/New Jersey, USA", glow: "rgba(50,100,255,0.8)" }, // USA Blue
    { id: 3, name: "AT&T Stadium", location: "Dallas, USA", glow: "rgba(50,100,255,0.8)" },
    { id: 4, name: "Arrowhead Stadium", location: "Kansas City, USA", glow: "rgba(50,100,255,0.8)" },
    { id: 5, name: "BC Place", location: "Vancouver, Canada", glow: "rgba(255,50,50,0.8)" }, // Canada Red
    { id: 6, name: "BMO Field", location: "Toronto, Canada", glow: "rgba(255,50,50,0.8)" },
    { id: 7, name: "SoFi Stadium", location: "Los Angeles, USA", glow: "rgba(50,100,255,0.8)" },
    { id: 8, name: "Mercedes-Benz Stadium", location: "Atlanta, USA", glow: "rgba(50,100,255,0.8)" },
];

export function Atmosphere() {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Horizontal Drag State
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%", // Start early
                end: "top 20%",
                scrub: 1,
            }
        });

        // 1. Cinematic Title Reveal
        tl.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
        );

        // Map Fade In
        gsap.fromTo(mapRef.current,
            { opacity: 0, scale: 0.9 },
            {
                opacity: 1,
                scale: 1.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom bottom",
                    scrub: 2
                }
            }
        );

    }, { scope: containerRef });

    // Drag Logic
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseLeave = () => { setIsDragging(false); };
    const handleMouseUp = () => { setIsDragging(false); };
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleWheel = (e: React.WheelEvent) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += e.deltaY;
        }
    }

    return (
        <section
            ref={containerRef}
            id="atmosphere"
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '120vh', // Extended height
                marginTop: '-10vh', // Overlap Hero
                paddingTop: '15vh',
                paddingBottom: '10vh',
                overflow: 'hidden',
                backgroundColor: 'transparent', // Let visuals dictate
                zIndex: 20
            }}
        >
            {/* Background Layers */}
            <BackgroundField /> {/* Field Lines Extension */}

            <div ref={mapRef} style={{
                position: 'absolute',
                top: '5%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                maxWidth: '1200px',
                opacity: 0.08, // Subtle
                zIndex: -1,
                pointerEvents: 'none'
            }}>
                <NorthAmericaMap />
            </div>

            {/* Content Container */}
            <div style={{
                maxWidth: '1600px',
                margin: '0 auto',
                padding: '0 var(--padding-x)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8rem',
                position: 'relative',
                zIndex: 1
            }}>

                {/* 1. Title Reveal */}
                <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(3rem, 10vw, 8rem)',
                        fontWeight: 900,
                        letterSpacing: '-0.04em',
                        lineHeight: 0.85,
                        margin: 0,
                        textTransform: 'uppercase',
                        color: '#111' // Strong presence
                    }}>
                        Atmosphere
                    </h2>
                    <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                        fontWeight: 400,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        marginTop: '1rem',
                        color: '#666'
                    }}>
                        Three Nations. One World Cup.
                    </p>
                </div>

                {/* 2. Host Nations Layout (Grid) */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1.5fr 1fr', // Center dominant
                    alignItems: 'center',
                    gap: '2rem',
                    perspective: '1000px'
                }}>
                    {/* Canada (Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ marginTop: '4rem' }}
                    >
                        <HostFlagPanel country="Canada" flagImage={canadaFlag} />
                    </motion.div>

                    {/* USA (Center - Dominant) */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{ zIndex: 10, transform: 'scale(1.2) translateY(-2rem)' }}
                    >
                        <HostFlagPanel country="USA" flagImage={usaFlag} />
                    </motion.div>

                    {/* Mexico (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ marginTop: '4rem' }}
                    >
                        <HostFlagPanel country="Mexico" flagImage={mexicoFlag} />
                    </motion.div>
                </div>

                {/* 3. Stadium Timeline (The Stages) */}
                <div style={{ position: 'relative', marginTop: '4rem' }}>
                    <div style={{ marginBottom: '2rem', paddingLeft: '1rem' }}>
                        <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            margin: 0
                        }}>The Stages</h3>
                        <div style={{ width: '40px', height: '4px', background: '#000', marginTop: '0.5rem' }} />
                    </div>

                    <div
                        ref={scrollContainerRef}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                        onWheel={handleWheel}
                        className="stadium-timeline"
                        style={{
                            display: 'flex',
                            gap: '2rem',
                            overflowX: 'auto',
                            padding: '2rem 1rem',
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
                                glowColor={stadium.glow}
                            />
                        ))}
                        {/* Buffer for scroll end */}
                        <div style={{ width: '100px', flexShrink: 0 }} />
                    </div>
                </div>

            </div>

            {/* Grain Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.05,
                pointerEvents: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                zIndex: 5
            }} />
        </section>
    );
}
