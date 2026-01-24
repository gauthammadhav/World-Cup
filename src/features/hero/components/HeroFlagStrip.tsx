import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Extended flag list for looping diversity
const flags = [
    { name: 'Argentina', color: 'linear-gradient(to bottom, #74ACDF 33%, #fff 33%, #fff 66%, #74ACDF 66%)' },
    { name: 'France', color: 'linear-gradient(to right, #0055A4 33%, #fff 33%, #fff 66%, #EF4135 66%)' },
    { name: 'Germany', color: 'linear-gradient(to bottom, #000 33%, #DD0000 33%, #DD0000 66%, #FFCE00 66%)' },
    { name: 'Brazil', color: '#009c3b' },
    { name: 'Mexico', color: 'linear-gradient(to right, #006847 33%, #fff 33%, #fff 66%, #CE1126 66%)' },
    { name: 'England', color: '#fff' },
    { name: 'Portugal', color: 'linear-gradient(to right, #046A38 40%, #DA291C 40%)' },
    { name: 'Spain', color: 'linear-gradient(to bottom, #AA151B 25%, #F1BF00 25%, #F1BF00 75%, #AA151B 75%)' },
    { name: 'Italy', color: 'linear-gradient(to right, #009246 33%, #fff 33%, #fff 66%, #CE2B37 66%)' },
    { name: 'Netherlands', color: 'linear-gradient(to bottom, #AE1C28 33%, #fff 33%, #fff 66%, #21468B 66%)' },
    { name: 'USA', color: 'linear-gradient(to bottom, #B31942 10%, #fff 10%, #B31942 20%, #fff 20%, #B31942 30%)' }, // Abstract
    { name: 'Belgium', color: 'linear-gradient(to right, #000 33%, #FAE042 33%, #FAE042 66%, #ED2939 66%)' },
    { name: 'Japan', color: '#fff' }, // Needs circle, handled below
    { name: 'Croatia', color: 'repeating-linear-gradient(45deg, #FF0000, #FF0000 10px, #fff 10px, #fff 20px)' }, // Checkers abstract
];

// Duplicate for marquee loop
const loopFlags = [...flags, ...flags];

export function HeroFlagStrip() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 1. Entrance (Slide in)
        gsap.fromTo(containerRef.current,
            { opacity: 0, x: -50 },
            { opacity: 1, x: 0, duration: 1, ease: 'power2.out', delay: 0.5 }
        );

        // 2. Infinite Loop (Marquee)
        // Move left by 50% (width of one set) to create seamless loop
        if (trackRef.current) {
            const totalWidth = trackRef.current.scrollWidth;
            const singleSetWidth = totalWidth / 2;

            gsap.to(trackRef.current, {
                x: -singleSetWidth,
                duration: 20, // Adjust speed: slower = higher number
                ease: 'none',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % singleSetWidth) // Resets smoothly? Or just simple linear?
                    // Simple linear from 0 to -50% is standard for marquee
                }
            });

            // Actually, simpler marquee logic:
            gsap.fromTo(trackRef.current,
                { x: 0 },
                {
                    x: `-${50}%`, // Move exactly half way
                    duration: 30,
                    ease: "none",
                    repeat: -1
                }
            );
        }

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="hero-flag-strip"
            style={{
                position: 'absolute',
                top: '50%',
                right: '-5vw', // Start inside the right edge
                transform: 'translateY(-50%)',
                width: '45vw', // Wider to show more flags
                height: '80px',
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 9,
                filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.15))',
                display: 'flex',
                alignItems: 'center',
                // Mask left side to fade out behind ball
                maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)'
            }}
        >
            <div
                ref={trackRef}
                className="flag-track"
                style={{
                    display: 'flex',
                    gap: '24px', // Wider gap
                    alignItems: 'center',
                    paddingLeft: '0',
                    width: 'max-content', // Allow full width for scrolling
                    willChange: 'transform'
                }}
            >
                {loopFlags.map((flag, index) => (
                    <div
                        key={`${flag.name}-${index}`}
                        style={{
                            width: '80px',
                            height: '52px',
                            background: flag.color,
                            borderRadius: '4px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            position: 'relative',
                            flexShrink: 0,
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        {/* Simple Details */}
                        {flag.name === 'Brazil' && (
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(45deg)', width: '34px', height: '34px', background: '#FFDF00' }} />
                        )}
                        {flag.name === 'England' && (
                            <>
                                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '10px', background: '#CE1126', transform: 'translateY(-50%)' }} />
                                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '10px', background: '#CE1126', transform: 'translateX(-50%)' }} />
                            </>
                        )}
                        {flag.name === 'Japan' && (
                            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '24px', height: '24px', background: '#BC002D', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
                        )}
                        {flag.name === 'Argentina' && (
                            <div style={{ position: 'absolute', top: '50%', left: '50%', width: '14px', height: '14px', background: '#F6B40E', borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
