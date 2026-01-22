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
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" }
                }
            }}
            whileHover="hover"
            style={{
                flexShrink: 0,
                width: '320px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                cursor: 'pointer'
            }}
        >
            {/* Image Placeholder */}
            <motion.div
                variants={{
                    hover: { scale: 1.02 }
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    width: '100%',
                    aspectRatio: '3/4',
                    background: 'linear-gradient(160deg, #1a1a1a 0%, #2a2a2a 100%)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}
            >
                {/* Abstract arch/stadium shape hint */}
                <div style={{
                    position: 'absolute',
                    bottom: '-20%',
                    left: '10%',
                    width: '80%',
                    height: '40%',
                    border: '2px solid rgba(255,255,255,0.05)',
                    borderRadius: '50%',
                    boxShadow: '0 0 40px rgba(255,255,255,0.02) inset'
                }} />

                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0.1,
                }}>
                    {/* Simple icon or shape center */}
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 21H21M5 21V7L12 3L19 7V21M9 10H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </motion.div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <motion.span
                    variants={{
                        hover: { color: '#fff' }
                    }}
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.9)',
                        letterSpacing: '0.02em',
                        transition: 'color 0.3s ease'
                    }}
                >
                    {name}
                </motion.span>
                <span style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    color: '#999',
                    letterSpacing: '0.1em'
                }}>
                    {location}
                </span>
            </div>
        </motion.div>
    );
}
