import { TeamsBackground } from './components/TeamsBackground';
import { TeamsHeader } from './components/TeamsHeader';
import { ContinentalRail } from './components/ContinentalRail';
import { GlobalStats } from './components/GlobalStats';

export function Teams() {
    return (
        <section
            id="teams"
            style={{
                position: 'relative',
                width: '100%',
                backgroundColor: '#050505',
                color: '#fff',
                overflow: 'hidden',
                minHeight: '100vh'
            }}
        >
            {/* 1. Cinematic Background System */}
            <TeamsBackground />

            {/* 2. Header and Title */}
            <div style={{ position: 'relative', zIndex: 10 }}>
                <TeamsHeader />
            </div>

            {/* 3. Continental Scroll System */}
            <div style={{ position: 'relative', zIndex: 10, paddingBottom: '4rem' }}>
                <ContinentalRail continent="Europe" label="Europe (UEFA)" />
                <ContinentalRail continent="South America" label="South America (CONMEBOL)" />
                <ContinentalRail continent="Africa" label="Africa (CAF)" />
                <ContinentalRail continent="Asia" label="Asia (AFC)" />
                <ContinentalRail continent="North America" label="North America (CONCACAF)" />
                <ContinentalRail continent="Oceania" label="Oceania (OFC)" />
            </div>

            {/* 4. Global Stats Zone */}
            <div style={{ position: 'relative', zIndex: 10 }}>
                <GlobalStats />
            </div>
        </section>
    );
}
