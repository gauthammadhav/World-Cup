import { forwardRef } from 'react';

interface StadiumCardProps {
    name: string;
    location: string;
    image: string;
    glowColor?: string; // Hex or rgba
}

export const StadiumCard = forwardRef<HTMLDivElement, StadiumCardProps>(({ name, location, image, glowColor = 'rgba(255,255,255,0.5)' }, ref) => {
    return (
        <div
            ref={ref}
            className="stadium-card"
            style={{
                flexShrink: 0,
                width: '45vw', // Reduced from 60vw
                maxWidth: '800px', // Reduced from 1000px
                aspectRatio: '16/9',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem',
                marginRight: '5vw', // Spacing between cards
                willChange: 'transform, opacity, filter' // optimize for GSAP
            }}
        >
            {/* Image Container (Parallax Mask) */}
            <div
                className="stadium-image-container"
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '12px', // Premium feel
                    overflow: 'hidden',
                    backgroundColor: '#111',
                    boxShadow: `0 20px 50px -10px ${glowColor.replace('1)', '0.3').replace(')', ', 0.3)')}`, // Deep cinematic shadow
                    zIndex: 0
                }}
            >
                {/* The Image (Target for Parallax) */}
                <img
                    className="stadium-image"
                    src={image}
                    alt={name}
                    style={{
                        width: '120%', // Wider for parallax movement
                        height: '120%', // Taller for parallax movement
                        objectFit: 'cover',
                        position: 'absolute',
                        top: '-10%',
                        left: '-10%',
                        filter: 'brightness(0.8) contrast(1.1)', // Cinematic base look
                    }}
                />

                {/* Vignette Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.9) 100%)',
                    zIndex: 1
                }} />

                {/* Color Tint/Glow Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(to top, ${glowColor} 0%, transparent 40%)`,
                    opacity: 0.2,
                    zIndex: 2,
                    mixBlendMode: 'overlay'
                }} />
            </div>

            {/* Info Content (Layers above image) */}
            <div className="stadium-info" style={{ position: 'relative', zIndex: 10, transform: 'translateY(20px)', opacity: 0 }}>
                {/* Accent Line */}
                <div className="stadium-accent" style={{
                    width: '0%',
                    height: '4px',
                    background: glowColor,
                    marginBottom: '1rem',
                    boxShadow: `0 0 10px ${glowColor}`
                }} />

                <h3 className="stadium-name" style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    textTransform: 'uppercase',
                    color: '#fff',
                    margin: 0,
                    lineHeight: 0.9,
                    textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}>
                    {name}
                </h3>

                <p className="stadium-location" style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.7)',
                    margin: '0.5rem 0 0 0',
                    letterSpacing: '0.1em'
                }}>
                    {location}
                </p>
            </div>
        </div>
    );
});
