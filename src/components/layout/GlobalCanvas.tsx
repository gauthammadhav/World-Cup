import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { HeroBackground } from '../../features/hero/components/HeroBackground';
import { NorthAmericaMap } from '../visuals/NorthAmericaMap';
import ballImg from '../../assets/images/FIFA_World_Cup_26tm_Trionda_Pro_Ball_White_JD8021_HM1-removebg-preview(1)(1).png';
import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface GlobalCanvasProps {
    children: ReactNode;
}

export function GlobalCanvas({ children }: GlobalCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Mouse Tracking for Interactive Background
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position from -1 to 1
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth) * 2 - 1;
            const y = (e.clientY / innerHeight) * 2 - 1;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // --- CONTINUOUS BALL ANIMATION ---
    // Hero Phase -> Atmosphere Phase
    // Hero (0px): Right side, floating (~75% width, 50% height)
    // Atmosphere (~800px): Center, lower (~50% width, ~80% height relative to viewport top?)
    // Actually, physically moving down the document flow is better for "traveling".

    // Y Position: Moves down faster than scroll (parallax) to travel "into" the next section
    const ballY = useTransform(scrollY, [0, 1000], [0, 400]);
    const ballRotate = useTransform(scrollY, [0, 1000], [0, 180]);
    const ballScale = useTransform(scrollY, [0, 300, 800], [1, 1.05, 1]);

    // Horizontal Move: Drifts from Right (approx +25vw) to Center (0)
    // We'll use percentage of container width
    const ballX = useTransform(scrollY, [0, 800], ['20vw', '0%']);

    // --- MAP EMERGENCE ---
    const mapOpacity = useTransform(scrollY, [300, 600], [0, 0.08]);
    const mapScale = useTransform(scrollY, [300, 900], [0.9, 1.1]);

    // Smooth physics
    const smoothBallY = useSpring(ballY, { damping: 15, stiffness: 40 });
    const smoothBallX = useSpring(ballX, { damping: 15, stiffness: 40 });
    const smoothRotate = useSpring(ballRotate, { damping: 20, stiffness: 30 });

    // GSAP Logic for Opacity Fade Out
    useGSAP(() => {
        // We target the ID "atmosphere" which is in the Atmosphere feature component
        // Ensure accurate scrubbing that clears the ball before the Stages section
        gsap.to(".hero-ball", {
            opacity: 0,
            scale: 0.98,
            ease: "none",
            scrollTrigger: {
                trigger: "#atmosphere",
                start: "top 80%", // Early fade start
                end: "top 30%",   // Complete fade before Stages
                scrub: true,
                // markers: true 
            }
        });
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="global-canvas"
            style={{
                position: 'relative',
                width: '100%',
                backgroundColor: '#ffffff',
                overflow: 'hidden'
            }}
        >
            {/* --- LAYER 0: SHARED BACKGROUND --- */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 0,
                pointerEvents: 'none'
            }}>
                {/* Hexagons / Field Lines */}
                <HeroBackground mouseX={mouseX} mouseY={mouseY} />
            </div>

            {/* --- LAYER 1: GLOBAL VISUALS (Cinema Layer) --- */}
            <div style={{
                position: 'fixed', // Sticky visuals
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 1,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {/* MAP Container (Behind Ball) */}
                <motion.div style={{
                    position: 'absolute',
                    width: '80vw',
                    maxWidth: '1000px',
                    opacity: mapOpacity,
                    scale: mapScale,
                    color: '#000'
                }}>
                    <NorthAmericaMap style={{ width: '100%', height: 'auto' }} />
                </motion.div>

                {/* BALL Container */}
                <motion.div
                    className="hero-ball"
                    style={{
                        position: 'relative',
                        // UPDATED: Dynamic width-based sizing as requested
                        width: 'clamp(480px, 50vw, 750px)',
                        height: 'auto',
                        // Shift slightly right to fill space, but rely on layout flow
                        right: '-5vw',
                        x: smoothBallX,
                        y: smoothBallY,
                        rotate: smoothRotate,
                        scale: ballScale,
                        zIndex: 10
                    }}
                >
                    <img
                        src={ballImg}
                        alt="World Cup Ball"
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block', // Prevent inline gaps
                            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))'
                        }}
                    />
                </motion.div>

                {/* Removed HeroFlagStrip as requested */}
            </div>

            {/* --- LAYER 2: SCROLLABLE CONTENT --- */}
            <div style={{
                position: 'relative',
                zIndex: 2, // Content sits ON TOP of visuals
                // Ensure sections don't have backgrounds!
            }}>
                {children}
            </div>

            {/* Global Style Overrides to strictly enforce seamlessness */}
            <style>{`
                .hero-section, .atmosphere-section {
                    background: transparent !important;
                }
            `}</style>
        </div>
    );
}
