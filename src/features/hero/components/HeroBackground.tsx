import { motion, MotionValue, useSpring, useTransform } from 'framer-motion';

interface HeroBackgroundProps {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}

export function HeroBackground({ mouseX, mouseY }: HeroBackgroundProps) {
    // Grid Configuration
    const hexSize = 40; // Radius of a hexagon
    const hexHeight = hexSize * 2;
    const hexWidth = Math.sqrt(3) * hexSize;
    const gap = 4; // Space between hexes

    // Create a grid that covers a standard 1920x1080 screen with buffer
    const rows = 12;
    const cols = 24;

    // Generate Grid Points
    const hexagons = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const xOffset = (row % 2) * (hexWidth / 2);
            const x = (col * (hexWidth + gap)) + xOffset - 100;
            const y = (row * (hexHeight * 0.75 + gap)) - 100;

            hexagons.push({ id: `hex-${row}-${col}`, row, col, x, y });
        }
    }

    return (
        <div
            className="hero-background"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
                background: 'radial-gradient(circle at 50% 50%, rgba(20,20,20,0) 0%, rgba(0,0,0,0.4) 100%)' // Vignette
            }}
        >
            <svg
                width="100%"
                height="100%"
                style={{ opacity: 0.3 }} // Subtle global opacity
            >
                <defs>
                    <pattern id="hex-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
                        {/* Optional pattern definition if needed later */}
                    </pattern>
                </defs>

                {hexagons.map((hex) => (
                    <Hexagon
                        key={hex.id}
                        x={hex.x}
                        y={hex.y}
                        size={hexSize}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        row={hex.row}
                        col={hex.col}
                    />
                ))}
            </svg>
        </div>
    );
}

// Sub-component for individual Hexagon to manage its own animation performance
function Hexagon({ x, y, size, mouseX, mouseY, row, col }: {
    x: number, y: number, size: number,
    mouseX: MotionValue<number>,
    mouseY: MotionValue<number>,
    row: number, col: number
}) {
    // Path for a hexagon centered at (0,0)
    // Points: (cos(a)*r, sin(a)*r) for a = 0, 60, 120...
    const points = [0, 60, 120, 180, 240, 300].map(angle => {
        const rad = (angle * Math.PI) / 180;
        return `${Math.cos(rad) * size},${Math.sin(rad) * size}`;
    }).join(' ');

    // Interaction Logic
    // We can't easily calculate distance from mouseX/Y in SVG coords without a ref hook or expensive listeners.
    // Instead, we'll use a simplified parralax/wave effect based on position.

    // Parallax Shift
    // Hexagons move slightly based on mouse position
    const moveX = useTransform(mouseX, [-1, 1], [-20, 20]);
    const moveY = useTransform(mouseY, [-1, 1], [-20, 20]);

    const smoothX = useSpring(moveX, { damping: 25, stiffness: 50 });
    const smoothY = useSpring(moveY, { damping: 25, stiffness: 50 });

    // Dynamic Opacity/Scale based on 'breathing' or random pulse
    // To keep it performant (essential for many elements), we rely on CSS or simple loop animations
    // Let's add a subtle individual pulse delay based on position

    return (
        <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 1,
                delay: (row * 0.05) + (col * 0.05), // Wave enter
                ease: "easeOut"
            }}
            style={{ x: smoothX, y: smoothY }}
        >
            <motion.polygon
                points={points}
                fill="transparent"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1.5"
                transform={`translate(${x}, ${y})`}
                whileHover={{
                    stroke: "rgba(255,255,255,0.8)",
                    scale: 1.1,
                    transition: { duration: 0.2 }
                }}
            />
            {/* Small center dot for tech feel */}
            <circle cx={x} cy={y} r="2" fill="rgba(255,255,255,0.1)" />
        </motion.g>
    );
}
