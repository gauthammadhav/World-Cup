import { motion } from 'framer-motion';

interface StadiumCardProps {
    name: string;
    location: string;
}

export function StadiumCard({ name, location }: StadiumCardProps) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                }
            }}
            whileHover="hover"
            style={{
                flexShrink: 0,
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                cursor: 'grab'
            }}
        >
            {/* Image Container */}
            <motion.div
                variants={{
                    hover: { scale: 1.03, y: -5 }
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    width: '100%',
                    aspectRatio: '2/3', // Tall poster format
                    background: '#e0e0e0', // Light grey placeholder base
                    borderRadius: '20px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}
            >
                {/* Placeholder Gradient / Image */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, #f5f5f5, #e0e0e0)',
                    position: 'relative'
                }}>
                    {/* Subtle Overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)',
                        zIndex: 1
                    }} />

                    {/* Noise Grain (Simulated) */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
                        opacity: 0.4,
                        pointerEvents: 'none',
                        zIndex: 2
                    }} />
                </div>
            </motion.div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingLeft: '0.5rem' }}>
                <motion.span
                    variants={{
                        hover: { y: -2, color: '#000' }
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '1.125rem',
                        textTransform: 'uppercase',
                        color: '#111',
                        letterSpacing: '-0.01em',
                        lineHeight: 1.1
                    }}
                >
                    {name}
                </motion.span>
                <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 400,
                    fontSize: '0.875rem',
                    textTransform: 'uppercase',
                    color: '#666',
                    letterSpacing: '0.05em'
                }}>
                    {location}
                </span>
            </div>
        </motion.div>
    );
}
