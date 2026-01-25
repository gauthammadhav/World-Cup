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

import { stadiums } from '../../data/stadiums';

// ... imports remain the same, just removing the local array and updating the map usage

export function Atmosphere() {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Removed manual Drag State as we now use ScrollTrigger Pinning 


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

        // --- STAGES HORIZONTAL SCROLL ---
        if (scrollContainerRef.current) {
            const track = scrollContainerRef.current.querySelector('.stadium-track') as HTMLElement;
            const cards = gsap.utils.toArray('.stadium-card') as HTMLElement[];

            // Calculate total scroll distance: Width of track - Window Width
            // But since we center the first and last items using padding, the movement is simple subtraction
            // We want to move until the last item is in center. 
            // Better: use function for dynamic width

            const getScrollAmount = () => {
                let trackWidth = track.scrollWidth;
                return -(trackWidth - window.innerWidth);
            };

            const scrollTween = gsap.to(track, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: scrollContainerRef.current,
                    start: "top top", // Pin when section hits top
                    end: "+=3000", // Scroll duration (adjust for speed)
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // Update Progress Bar
                        gsap.set(".stages-progress-bar", { scaleX: self.progress });

                        // Focus Logic
                        // Find center point of viewport
                        const centerPoint = window.innerWidth / 2;

                        cards.forEach((card) => {
                            const rect = card.getBoundingClientRect();
                            const cardCenter = rect.left + rect.width / 2;
                            const distFromCenter = Math.abs(centerPoint - cardCenter);

                            // Calculate normalized distance (0 = center, 1 = far)
                            // "zone" is roughly 500px wide
                            const normalize = gsap.utils.clamp(0, 1, distFromCenter / (window.innerWidth * 0.4));
                            const inverse = 1 - normalize;

                            // Animate Card Properties based on proximity
                            gsap.to(card, {
                                scale: 1 + (0.08 * inverse), // Reduced scale (1.08x max)
                                opacity: 0.3 + (0.7 * inverse), // Fade out to 0.3
                                filter: `blur(${3 * normalize}px) grayscale(${100 * normalize}%)`, // Blur and grayscale edges
                                zIndex: Math.round(100 * inverse), // Ensure center is on top
                                duration: 0.2,
                                overwrite: 'auto'
                            });

                            // Inner Parallax (Image moves opposite to card)
                            // Movement range +/- 50px
                            const parallaxX = (cardCenter - centerPoint) * 0.1;
                            const image = card.querySelector('.stadium-image');
                            if (image) {
                                gsap.set(image, { x: parallaxX });
                            }

                            // Text Reveal
                            const info = card.querySelector('.stadium-info');
                            const accent = card.querySelector('.stadium-accent');

                            if (info && accent) {
                                if (inverse > 0.8) { // If very close to center
                                    gsap.to(info, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
                                    gsap.to(accent, { width: '100%', duration: 0.6, ease: "power2.out" });
                                } else {
                                    gsap.to(info, { opacity: 0, y: 20, duration: 0.4 });
                                    gsap.to(accent, { width: '0%', duration: 0.4 });
                                }
                            }
                        });
                    }
                }
            });
        }

    }, { scope: containerRef });

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

                {/* 3. Stadium Timeline (The Stages) - Horizontal Scroll Section */}
                {/* 
                  NOTE: This section breaks out of the standard flow to become a rigid, 
                  pinned horizontal experience. We need a wrapper to hold the pin.
                */}
            </div> {/* Close content container temporarily to allow full bleed track if needed, or keep inside */}

            <div
                ref={scrollContainerRef}
                className="stages-pin-container"
                style={{
                    height: '100vh',
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '15vh'
                }}
            >
                {/* The Sliding Track */}
                <div
                    className="stadium-track"
                    style={{
                        display: 'flex',
                        paddingLeft: '27.5vw', // Center first item
                        paddingRight: '27.5vw', // Center last item (Required for focus to work)
                        gap: '0',
                        willChange: 'transform'
                    }}
                >
                    {/* Intro Title Card */}
                    <div style={{
                        flexShrink: 0,
                        width: '45vw', // Same as cards for rhythm
                        maxWidth: '800px',
                        aspectRatio: '16/9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '5vw'
                    }}>
                        <h2 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(3rem, 8vw, 6rem)',
                            fontWeight: 900,
                            color: '#111', // Clear and visible
                            margin: 0,
                            textAlign: 'center',
                            lineHeight: 0.9,
                            textTransform: 'uppercase'
                        }}>
                            The<br />Stages
                        </h2>
                    </div>

                    {stadiums.map((stadium) => (
                        <StadiumCard
                            key={stadium.id}
                            name={stadium.name}
                            location={stadium.city + ", " + stadium.country}
                            image={stadium.image}
                            glowColor={stadium.glow}
                        />
                    ))}
                </div>

                {/* Progress Bar / Indicator (Optional, polished touch) */}
                <div className="stages-progress" style={{
                    position: 'absolute',
                    bottom: '15vh', // Moved up slightly
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '200px',
                    height: '2px',
                    background: 'rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    borderRadius: '2px'
                }}>
                    <div className="stages-progress-bar" style={{
                        width: '100%',
                        height: '100%',
                        background: '#000', // or accent color
                        transformOrigin: 'left',
                        transform: 'scaleX(0)'
                    }} />
                </div>
            </div>

            {/* Resume normal flow if needed, but for now we end here or add footer later */}
            <div>
                {/* Empty div to balance the closing tag removed above if proceeding content existed, 
                    but Atmosphere ends here usually. 
                */}

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
