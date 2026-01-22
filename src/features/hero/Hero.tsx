import { HeroContent } from './components/HeroContent';
import { HeroVisual } from './components/HeroVisual';
import { HeroBackground } from './components/HeroBackground';
import { Header } from '../../components/layout/Header';
import { MenuOverlay } from '../../components/layout/MenuOverlay';
import { useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Hero() {
    // Hoisted mouse tracking state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Menu State
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
            const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);

            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section className="hero-section" style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent' // Transparent to show global background
        }}>
            {/* Background Lines */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                <HeroBackground mouseX={mouseX} mouseY={mouseY} />
            </div>

            <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <Header onMenuClick={() => setIsMenuOpen(true)} />

            <div className="hero-grid" style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                width: '100%',
                maxWidth: '1400px', // Container max-width
                height: '100%',
                padding: '0 var(--padding-x)',
                position: 'relative',
                zIndex: 10
            }}>
                {/* Left Content */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <HeroContent />
                </div>

                {/* Right Visual */}
                <div style={{ position: 'relative' }}>
                    <HeroVisual mouseX={mouseX} mouseY={mouseY} />
                </div>
            </div>
        </section>
    );
}
