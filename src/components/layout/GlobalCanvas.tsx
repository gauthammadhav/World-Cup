import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { HeroBackground } from '../../features/hero/components/HeroBackground';
import { NorthAmericaMap } from '../visuals/NorthAmericaMap';
import ballImg from '../../assets/images/FIFA_World_Cup_26tm_Trionda_Pro_Ball_White_JD8021_HM1-removebg-preview(1)(1).png';
import usaFlag from '../../assets/images/usa-flag.png';
import canadaFlag from '../../assets/images/canada-flag.png';
import mexicoFlag from '../../assets/images/mexico-flag.jpg';
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

    // GSAP Intro & Fade Out Logic
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // --- 1. CINEMATIC BALL INTRO ---
        // Only run if we are at the top (fresh load or reload)
        if (window.scrollY < 100) {

            // Set Initial State
            gsap.set(".intro-ball-wrapper", {
                x: "140vw",
                y: -80,
                opacity: 0,
                scale: 0.7,
                filter: "blur(10px)",
                rotation: -40
            });

            // Curve Animation
            tl.to(".intro-ball-wrapper", {
                duration: 1.6,
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                rotation: 0,
                ease: "power2.out", // Smooth deceleration
                onUpdate: function () {
                    // Manual Bezier simulation for overshoot
                    // const progress = this.progress();
                    // Slight arc simulation if needed, but simple deceleration works well for "kicked in" feel
                    // We can add a specialized bounce at the end
                }
            })
                // Impact
                .to(".intro-ball-wrapper", {
                    scale: 1.04,
                    duration: 0.15,
                    yoyo: true,
                    repeat: 1,
                    ease: "sine.inOut"
                }, "-=0.2"); // Overlap end of move

            // Flare Effect (Optional via opacity of a glow element)
            tl.fromTo(".ball-flare",
                { opacity: 0, scale: 0.5 },
                { opacity: 0.6, scale: 1.5, duration: 0.4, clearProps: "all" },
                "-=0.5"
            );

            // Flag Cycle Inside Ball
            const flags = gsap.utils.toArray<HTMLElement>(".ball-flag-overlay");
            flags.forEach((flag, i) => {
                gsap.to(flag, {
                    opacity: 0.15,
                    duration: 0.3,
                    repeat: 1,
                    yoyo: true,
                    delay: 0.2 + (i * 0.25)
                });
            });
        } else {
            // If reloaded down page, ensure visible
            gsap.set(".intro-ball-wrapper", { opacity: 1, x: 0, y: 0 });
        }


        // --- 2. SCROLL FADE OUT (Atmosphere) ---
        if (!document.querySelector('.hero-section')) return;

        gsap.to(".hero-ball-container", { // Target outer container to fade everything
            opacity: 0,
            scale: 0.98,
            ease: "none",
            scrollTrigger: {
                trigger: "#atmosphere",
                start: "top 80%",
                end: "top 30%",
                scrub: true,
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

                {/* BALL Container (Scroll Controlled) */}
                <motion.div
                    className="hero-ball-container"
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
                    {/* INTRO WRAPPER (GSAP Entrance Controlled) */}
                    <div className="intro-ball-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>

                        {/* 1. Main Ball */}
                        <img
                            src={ballImg}
                            alt="World Cup Ball"
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))',
                                position: 'relative',
                                zIndex: 2
                            }}
                        />

                        {/* 2. Flag Overlays (Micro-Detail) */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            zIndex: 3,
                            borderRadius: '50%', // Assuming ball is roughly circular, but strict masking tricky on transparent PNG. 
                            // Using mix-blend-mode overlay on the image bounds strictly might require mask-image.
                            // For simplicity/safety: positioned overlays with low opacity.
                            pointerEvents: 'none',
                            mixBlendMode: 'overlay'
                        }}>
                            {/* USA */}
                            <img src={usaFlag} className="ball-flag-overlay" alt="" style={{ position: 'absolute', top: '20%', left: '20%', width: '30%', opacity: 0 }} />
                            {/* Mexico */}
                            <img src={mexicoFlag} className="ball-flag-overlay" alt="" style={{ position: 'absolute', bottom: '20%', right: '20%', width: '30%', opacity: 0 }} />
                            {/* Canada */}
                            <img src={canadaFlag} className="ball-flag-overlay" alt="" style={{ position: 'absolute', top: '40%', right: '30%', width: '30%', opacity: 0 }} />
                        </div>

                        {/* 3. Flare/Glow (Behind) */}
                        <div className="ball-flare" style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '120%',
                            height: '120%',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 60%)',
                            opacity: 0,
                            zIndex: 1,
                            pointerEvents: 'none'
                        }} />

                    </div>
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
