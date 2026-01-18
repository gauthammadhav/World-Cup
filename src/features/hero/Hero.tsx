// import { HeroContent } from './components/HeroContent';
// import { HeroVisual } from './components/HeroVisual';

export function Hero() {
    return (
        <section className="hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            {/* Left Content */}
            {/* <HeroContent /> */}
            <div className="hero-content">Hero Content</div>

            {/* Right Visual */}
            {/* <HeroVisual /> */}
            <div className="hero-visual">Hero Visual</div>
        </section>
    );
}
