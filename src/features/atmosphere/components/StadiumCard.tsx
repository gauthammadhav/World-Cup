import { motion } from 'framer-motion';

interface StadiumCardProps {
    name: string;
    location: string;
    glowColor?: string; // Hex or rgba
}

export function StadiumCard({ name, location, glowColor = 'rgba(255,255,255,0.5)' }: StadiumCardProps) {
    return (
        <motion.div
            className="stadium-card" // Class for parent selection if needed
            initial="hidden"
            whileInView="visible"
            variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.6, ease: "easeOut" }
                }
            }}
            style={{
                flexShrink: 0,
                width: '400px', // Wider cinematic feel
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                cursor: 'grab'
            }}
        >
            {/* Image Container */}
            <motion.div
                style={{
                    width: '100%',
                    aspectRatio: '16/9',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: `0 0 40px ${glowColor.replace('1)', '0.2').replace(')', ', 0.2)')}`, // Soft ambient glow
                }}
            >
                {/* Placeholder / Image */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: '#222', // Dark placeholder
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)', // Vignette for text
                        zIndex: 2
                    }} />

                    {/* Bloom/Glow Highlight */}
                    <div style={{
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
                        opacity: 0.1,
                        zIndex: 1,
                        pointerEvents: 'none'
                    }} />
                </div>
            </motion.div>

            {/* Info Overlay (Cinematic: Floating at bottom or just below) */}
            <div style={{
                marginTop: '1rem',
                paddingLeft: '0.5rem',
                borderLeft: `2px solid ${glowColor}`
            }}>
                <h4 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    textTransform: 'uppercase',
                    color: '#111', // Or white if dark mode
                    margin: 0,
                    lineHeight: 1
                }}>
                    {name}
                </h4>
                <p style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    color: '#666',
                    margin: '0.25rem 0 0 0',
                    letterSpacing: '0.05em'
                }}>
                    {location}
                </p>
            </div>
        </motion.div>
    );
}
