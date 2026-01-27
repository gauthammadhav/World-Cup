import { useRef } from 'react';
import gsap from 'gsap';
import { Crown } from 'lucide-react';
import type { Team } from '../../../data/teams';

interface TeamCardProps {
    team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const crestRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    // "Legendary" status check
    const isLegendary = ['bra', 'ger', 'ita', 'arg', 'fra'].includes(team.id);

    const handleMouseEnter = () => {
        if (!cardRef.current) return;
        const tl = gsap.timeline();

        // Subtle lift and scale
        tl.to(cardRef.current, { y: -10, scale: 1.02, duration: 0.4, ease: 'power2.out' }, 0);

        // Glow intensification
        tl.to(glowRef.current, { opacity: 0.6, duration: 0.4 }, 0);

        // Background shift (parallax feel)
        tl.to(bgRef.current, { scale: 1.1, duration: 0.8, ease: 'power1.out' }, 0);

        // Content lift
        tl.to(infoRef.current, { y: -5, duration: 0.4 }, 0);

        // Crest parallax
        tl.to(crestRef.current, { x: 10, opacity: 0.2, duration: 0.8 }, 0);
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        const tl = gsap.timeline();

        tl.to(cardRef.current, { y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }, 0);
        tl.to(glowRef.current, { opacity: 0, duration: 0.4 }, 0);
        tl.to(bgRef.current, { scale: 1, duration: 0.8, ease: 'power1.out' }, 0);
        tl.to(infoRef.current, { y: 0, duration: 0.4 }, 0);
        tl.to(crestRef.current, { x: 0, opacity: 0.1, duration: 0.8 }, 0);
    };

    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                position: 'relative',
                width: '300px', // UNIFORM WIDTH
                aspectRatio: '3/4',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
                flexShrink: 0,
                backgroundColor: '#0a0a0a',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                transformStyle: 'preserve-3d', // For better rendering
            }}
        >
            {/* Dynamic Glow Container */}
            <div ref={glowRef} style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at center, ${team.colors[0]} 0%, transparent 70%)`,
                opacity: 0,
                zIndex: 0,
                transition: 'opacity 0.3s ease'
            }} />

            {/* Layer A: Mesh Gradient Atmosphere */}
            <div ref={bgRef} style={{
                position: 'absolute',
                inset: -20, // Allowing for scale without edges
                background: `
                    radial-gradient(circle at 10% 10%, ${team.colors[0]} 0%, transparent 50%),
                    radial-gradient(circle at 90% 90%, ${team.colors[1]} 0%, transparent 50%),
                    linear-gradient(135deg, #1a1a1a 0%, #050505 100%)
                `,
                opacity: 0.8,
                zIndex: 1
            }} />

            {/* Grain Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.3,
                mixBlendMode: 'overlay',
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                zIndex: 2,
                pointerEvents: 'none'
            }} />

            {/* Layer B: Crest Watermark */}
            <div ref={crestRef} style={{
                position: 'absolute',
                top: '5%',
                right: '-15%',
                fontSize: '14rem',
                fontWeight: 900,
                fontFamily: 'var(--font-display)',
                color: '#fff',
                opacity: 0.1,
                userSelect: 'none',
                lineHeight: 1,
                zIndex: 2,
                maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
            }}>
                {team.id}
            </div>

            {/* Layer C: Glassmorphism Identity Data */}
            <div ref={infoRef} style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '2rem 1.5rem',
                zIndex: 10,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 10%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
            }}>
                {/* Glass Card Behind Text Effect (Optional, but let's stick to clean gradient for now per plan, maybe add a blur strip) */}

                {/* Meta Tags */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    {isLegendary && (
                        <div style={{
                            backgroundColor: 'rgba(255, 215, 0, 0.2)',
                            border: '1px solid rgba(255, 215, 0, 0.4)',
                            borderRadius: '50%',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Crown size={12} fill="#FFD700" color="#FFD700" />
                        </div>
                    )}

                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: 'rgba(255,255,255,0.9)',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(4px)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        letterSpacing: '0.05em'
                    }}>
                        #{team.ranking}
                    </span>
                    {(team.titles || 0) > 0 && (
                        <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            color: '#FFD700',
                            border: '1px solid rgba(255, 215, 0, 0.3)',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(255, 215, 0, 0.05)'
                        }}>
                            {team.titles} ★
                        </span>
                    )}
                </div>

                {/* Name */}
                <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem', // Uniform size
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    color: '#fff',
                    margin: 0,
                    lineHeight: 0.85,
                    letterSpacing: '-0.02em',
                    textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}>
                    {team.name}
                </h3>

                {/* Decoration Line */}
                <div style={{
                    marginTop: '1rem',
                    width: '100%',
                    height: '1px',
                    background: `linear-gradient(90deg, ${team.colors[0]}, transparent)`,
                    opacity: 0.7
                }} />
            </div>

            {/* Border shine effect could go here */}
        </div>
    );
}
