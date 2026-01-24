import { HeroContent } from './components/HeroContent';
import { HeroVisual } from './components/HeroVisual';
import { Header } from '../../components/layout/Header';
import { MenuOverlay } from '../../components/layout/MenuOverlay';
import { useState } from 'react';

export function Hero() {
    // Menu State
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <section className="hero-section" style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // background: 'transparent' // Handled by GlobalCanvas
        }}>
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
                    <HeroVisual />
                </div>
            </div>
        </section>
    );
}
