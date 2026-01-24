import { motion } from 'framer-motion';

export function NorthAmericaMap({ className, style }: { className?: string, style?: React.CSSProperties }) {
    return (
        <svg
            viewBox="0 0 800 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
        >
            {/* 
                Simplified abstract contour map of North America. 
                Focus on the tri-nation shape. 
            */}
            <motion.path
                d="M350 50 C 300 80, 250 150, 200 180 C 150 210, 100 200, 50 250 C 80 300, 150 350, 200 400 C 250 450, 300 500, 350 550 C 400 500, 450 450, 500 400 C 550 350, 600 300, 650 250 C 600 200, 550 150, 500 100 C 450 50, 400 20, 350 50 Z"
                fill="currentColor"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
            // Using a simpler shape for "atmospheric" feel rather than strict geo-accuracy 
            // to match the "editorial" vibe.
            />
            {/* Outline Effect */}
            <motion.path
                d="M350 50 C 300 80, 250 150, 200 180 C 150 210, 100 200, 50 250 C 80 300, 150 350, 200 400 C 250 450, 300 500, 350 550 C 400 500, 450 450, 500 400 C 550 350, 600 300, 650 250 C 600 200, 550 150, 500 100 C 450 50, 400 20, 350 50 Z"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                strokeDasharray="10 10"
                opacity="0.5"
            />
        </svg>
    );
}
