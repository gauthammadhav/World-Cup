import { motion } from 'framer-motion';

interface HostNationCardProps {
    country: string;
}

const getGradient = (country: string) => {
    switch (country.toUpperCase()) {
        case 'USA':
            return 'linear-gradient(135deg, #0A3161 0%, #B31942 100%)';
        case 'CANADA':
            return 'linear-gradient(135deg, #FF0000 0%, #FFFFFF 50%, #FF0000 100%)';
        case 'MEXICO':
            return 'linear-gradient(135deg, #006847 0%, #FFFFFF 50%, #CE1126 100%)';
        default:
            return 'linear-gradient(135deg, #111 0%, #333 100%)';
    }
};

const getTextColor = (country: string) => {
    switch (country.toUpperCase()) {
        case 'CANADA':
        case 'MEXICO': // White in middle might need dark text? Actually white text usually looks better on these strong gradients with shadow
            return '#FFFFFF';
        default:
            return '#FFFFFF';
    }
}

export function HostNationCard({ country }: HostNationCardProps) {
    const gradient = getGradient(country);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
                scale: 1.02,
                rotateX: 2,
                rotateY: 2,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
                width: '100%',
                height: '300px', // Much bigger
                background: gradient,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
            }}
        >
            {/* Abstract geometric overlay for texture */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)',
                pointerEvents: 'none'
            }} />

            <motion.h3
                style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                    fontWeight: 900,
                    letterSpacing: '0.05em',
                    color: '#fff',
                    textTransform: 'uppercase',
                    textShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    zIndex: 2
                }}
            >
                {country}
            </motion.h3>
        </motion.div>
    );
}
