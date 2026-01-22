import { motion } from 'framer-motion';

export function HostFlagPanel({ country, flagImage }: { country: string, flagImage: string }) {
    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            style={{
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '1.5rem',
            }}
        >
            {/* Flag Container */}
            <motion.div
                variants={{
                    rest: { rotate: 0, scale: 1, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' },
                    hover: { rotate: -2, scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }
                }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                style={{
                    width: '100%',
                    aspectRatio: '3/2',
                    position: 'relative',
                    overflow: 'hidden',
                    transformPerspective: '1000px',
                    backgroundColor: '#f0f0f0'
                }}
            >
                <motion.img
                    src={flagImage}
                    alt={`${country} Flag`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />
            </motion.div>

            {/* Country Label */}
            <div style={{ textAlign: 'center' }}>
                <span style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: '#666',
                    marginBottom: '0.5rem'
                }}>
                    Host Nation
                </span>
                <div style={{ position: 'relative', display: 'inline-block', overflow: 'hidden' }}>
                    <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.5rem, 2vw, 2rem)',
                        fontWeight: 900,
                        color: '#111', // Dark text
                        textTransform: 'uppercase',
                        letterSpacing: '-0.02em',
                        lineHeight: 1,
                        margin: 0
                    }}>
                        {country}
                    </h3>
                    <motion.div
                        variants={{
                            rest: { x: '-100%' },
                            hover: { x: '0%' }
                        }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            height: '2px',
                            backgroundColor: '#111'
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
