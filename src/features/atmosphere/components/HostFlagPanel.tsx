import { motion } from 'framer-motion';

export function HostFlagPanel({ country, flagImage }: { country: string, flagImage: string }) {
    return (
        <motion.div
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '1.25rem',
            }}
        >
            {/* Card Container */}
            <motion.div
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
                transition={{ duration: 0.3 }}
                style={{
                    width: '100%',
                    backgroundColor: '#ffffff',
                    border: '1px solid #eaeaea', // 1px light gray
                    borderRadius: '12px', // 10-14px
                    padding: '1.5rem', // Medium padding
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // No heavy shadows or gradients
                    boxShadow: 'none'
                }}
            >
                <div style={{
                    width: '100%',
                    aspectRatio: '3/2', // Preserve aspect ratio inside card
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '6px', // Slight inner radius for aesthetic
                }}>
                    <img
                        src={flagImage}
                        alt={`${country} Flag`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                        }}
                    />
                </div>
            </motion.div>

            {/* Country Label */}
            <div style={{ textAlign: 'center' }}>
                <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem', // Smaller than heading, larger than body
                    fontWeight: 600, // Medium/SemiBold
                    color: '#111', // Dark gray/black
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em', // +5%
                    lineHeight: 1,
                    margin: 0
                }}>
                    {country}
                </h3>
            </div>
        </motion.div>
    );
}
