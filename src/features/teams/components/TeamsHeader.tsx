import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function TeamsHeader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const ghostRef = useRef<HTMLHeadingElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Parallax Ghost Text
        gsap.fromTo(ghostRef.current,
            { y: -50 },
            {
                y: 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            }
        );

        // Animated Underline
        gsap.fromTo(lineRef.current,
            { scaleX: 0 },
            {
                scaleX: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%"
                }
            }
        );

    }, { scope: containerRef });

    return (
        <header ref={containerRef} style={{
            position: 'relative',
            padding: '8rem var(--padding-x) 4rem',
            textAlign: 'center',
            overflow: 'hidden'
        }}>
            {/* Ghost Text */}
            <h1 ref={ghostRef} style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 'clamp(6rem, 20vw, 20rem)',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                color: 'rgba(255,255,255,0.03)',
                margin: 0,
                zIndex: 0,
                pointerEvents: 'none',
                whiteSpace: 'nowrap'
            }}>
                WORLD CUP 2026
            </h1>

            {/* Main Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(4rem, 10vw, 10rem)',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    lineHeight: 0.8,
                    margin: 0,
                    color: '#fff',
                    textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}>
                    Teams
                </h2>

                {/* Decoration Underline */}
                <div ref={lineRef} style={{
                    width: '100px',
                    height: '4px',
                    background: '#fff',
                    margin: '2rem auto',
                    transformOrigin: 'center'
                }} />

                <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.3em',
                    color: 'rgba(255,255,255,0.7)',
                    margin: 0
                }}>
                    48 Nations. One Dream.
                </p>
            </div>
        </header>
    );
}
