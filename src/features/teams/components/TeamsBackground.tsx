import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { NorthAmericaMap } from '../../../components/visuals/NorthAmericaMap';

export function TeamsBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lightRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Continuous light sweep - Slower and more subtle
        gsap.to(lightRef.current, {
            x: '100vw',
            ease: 'none',
            duration: 20,
            repeat: -1,
            yoyo: true
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
            backgroundColor: '#050505', // Cinematic dark base
            pointerEvents: 'none'
        }}>
            {/* 1. Deep Vignette for focus */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, transparent 0%, #000 90%)',
                zIndex: 2,
                pointerEvents: 'none'
            }} />

            {/* 2. Low-contrast World Map Layer */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) scale(1.4)',
                width: '100%',
                maxWidth: '1800px',
                opacity: 0.03, // Very subtle
                filter: 'blur(1px)',
                zIndex: 0
            }}>
                <NorthAmericaMap />
            </div>

            {/* 3. Football Grid Lines - Thinner and cleaner */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                `,
                backgroundSize: '120px 120px',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
                zIndex: 0
            }} />

            {/* 4. Moving Light Sweep */}
            <div ref={lightRef} style={{
                position: 'absolute',
                top: 0,
                left: '-20%',
                width: '15%',
                height: '100%',
                transform: 'skewX(-20deg)',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
                filter: 'blur(40px)',
                zIndex: 1
            }} />

            {/* 5. Floating Particles */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.2,
                animation: 'floatParticles 30s linear infinite',
                pointerEvents: 'none',
                zIndex: 1
            }} />
            <style>{`
                @keyframes floatParticles {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-40px); }
                }
            `}</style>
        </div>
    );
}
