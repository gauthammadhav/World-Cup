export type TeamTier = 'Favorite' | 'Contender' | 'Challenger';

export interface Team {
    id: string;
    name: string;
    titles?: number;
    colors: [string, string]; // Primary, Secondary (Gradient)
    continent: string;
    confederation: string;
    ranking: number;
    tier: TeamTier;
}

export const teams: Team[] = [
    // SOUTH AMERICA (CONMEBOL) - 7 Teams (Increased slots for 48-team WC)
    { id: 'bra', name: 'Brazil', titles: 5, colors: ['#FFDC02', '#193375'], continent: 'South America', confederation: 'CONMEBOL', ranking: 3, tier: 'Favorite' },
    { id: 'arg', name: 'Argentina', titles: 3, colors: ['#74ACDF', '#FFFFFF'], continent: 'South America', confederation: 'CONMEBOL', ranking: 1, tier: 'Favorite' },
    { id: 'uru', name: 'Uruguay', titles: 2, colors: ['#5BA4D6', '#FFFFFF'], continent: 'South America', confederation: 'CONMEBOL', ranking: 11, tier: 'Contender' },
    { id: 'col', name: 'Colombia', colors: ['#FCD116', '#003893'], continent: 'South America', confederation: 'CONMEBOL', ranking: 12, tier: 'Contender' },
    { id: 'ecu', name: 'Ecuador', colors: ['#FFD100', '#00338D'], continent: 'South America', confederation: 'CONMEBOL', ranking: 30, tier: 'Challenger' },
    { id: 'per', name: 'Peru', colors: ['#D91023', '#FFFFFF'], continent: 'South America', confederation: 'CONMEBOL', ranking: 32, tier: 'Challenger' },
    { id: 'chi', name: 'Chile', colors: ['#D52B1E', '#0039A6'], continent: 'South America', confederation: 'CONMEBOL', ranking: 40, tier: 'Challenger' },

    // EUROPE (UEFA) - 16 Teams (Standard large allocation)
    { id: 'fra', name: 'France', titles: 2, colors: ['#002395', '#ED2939'], continent: 'Europe', confederation: 'UEFA', ranking: 2, tier: 'Favorite' },
    { id: 'eng', name: 'England', titles: 1, colors: ['#FFFFFF', '#CF081F'], continent: 'Europe', confederation: 'UEFA', ranking: 4, tier: 'Favorite' },
    { id: 'bel', name: 'Belgium', colors: ['#E30613', '#FFDF00'], continent: 'Europe', confederation: 'UEFA', ranking: 5, tier: 'Contender' },
    { id: 'por', name: 'Portugal', colors: ['#DA291C', '#145B1E'], continent: 'Europe', confederation: 'UEFA', ranking: 6, tier: 'Favorite' },
    { id: 'ned', name: 'Netherlands', colors: ['#F36C21', '#FFFFFF'], continent: 'Europe', confederation: 'UEFA', ranking: 7, tier: 'Contender' },
    { id: 'esp', name: 'Spain', titles: 1, colors: ['#AA151B', '#F1BF00'], continent: 'Europe', confederation: 'UEFA', ranking: 8, tier: 'Favorite' },
    { id: 'ita', name: 'Italy', titles: 4, colors: ['#0064AA', '#FFFFFF'], continent: 'Europe', confederation: 'UEFA', ranking: 9, tier: 'Contender' },
    { id: 'cro', name: 'Croatia', colors: ['#FF0000', '#FFFFFF'], continent: 'Europe', confederation: 'UEFA', ranking: 10, tier: 'Contender' },
    { id: 'ger', name: 'Germany', titles: 4, colors: ['#FFFFFF', '#000000'], continent: 'Europe', confederation: 'UEFA', ranking: 16, tier: 'Favorite' },
    { id: 'sui', name: 'Switzerland', colors: ['#D52B1E', '#FFFFFF'], continent: 'Europe', confederation: 'UEFA', ranking: 19, tier: 'Contender' },
    { id: 'den', name: 'Denmark', colors: ['#C60C30', '#FFFFFF'], continent: 'Europe', confederation: 'UEFA', ranking: 21, tier: 'Contender' },
    { id: 'aut', name: 'Austria', colors: ['#ED2939', '#FFFFFF'], continent: 'Europe', confederation: 'UEFA', ranking: 25, tier: 'Challenger' },
    { id: 'ukr', name: 'Ukraine', colors: ['#FFD700', '#0057B8'], continent: 'Europe', confederation: 'UEFA', ranking: 24, tier: 'Challenger' },
    { id: 'pol', name: 'Poland', colors: ['#FFFFFF', '#DC143C'], continent: 'Europe', confederation: 'UEFA', ranking: 28, tier: 'Challenger' },
    { id: 'srb', name: 'Serbia', colors: ['#C6363C', '#0C4076'], continent: 'Europe', confederation: 'UEFA', ranking: 33, tier: 'Challenger' },
    { id: 'tur', name: 'Turkey', colors: ['#E30A17', '#FFFFFF'], continent: 'Europe', confederation: 'UEFA', ranking: 35, tier: 'Challenger' },

    // NORTH AMERICA (CONCACAF) - 6 Teams (3 Hosts + 3 Qualifiers)
    { id: 'usa', name: 'USA', colors: ['#3C3B6E', '#B22234'], continent: 'North America', confederation: 'CONCACAF', ranking: 13, tier: 'Contender' },
    { id: 'mex', name: 'Mexico', colors: ['#006847', '#CE1126'], continent: 'North America', confederation: 'CONCACAF', ranking: 14, tier: 'Contender' },
    { id: 'can', name: 'Canada', colors: ['#FF0000', '#FFFFFF'], continent: 'North America', confederation: 'CONCACAF', ranking: 50, tier: 'Challenger' },
    { id: 'pan', name: 'Panama', colors: ['#DA121A', '#072357'], continent: 'North America', confederation: 'CONCACAF', ranking: 41, tier: 'Challenger' },
    { id: 'crc', name: 'Costa Rica', colors: ['#CE1126', '#002B7F'], continent: 'North America', confederation: 'CONCACAF', ranking: 52, tier: 'Challenger' },
    { id: 'jam', name: 'Jamaica', colors: ['#FED100', '#009B3A'], continent: 'North America', confederation: 'CONCACAF', ranking: 55, tier: 'Challenger' },

    // AFRICA (CAF) - 9 Teams (Significant expansion)
    { id: 'mar', name: 'Morocco', colors: ['#C1272D', '#006233'], continent: 'Africa', confederation: 'CAF', ranking: 13, tier: 'Contender' },
    { id: 'sen', name: 'Senegal', colors: ['#FFFFFF', '#00853F'], continent: 'Africa', confederation: 'CAF', ranking: 17, tier: 'Contender' },
    { id: 'nga', name: 'Nigeria', colors: ['#008751', '#FFFFFF'], continent: 'Africa', confederation: 'CAF', ranking: 28, tier: 'Challenger' },
    { id: 'egy', name: 'Egypt', colors: ['#CE1126', '#FFFFFF'], continent: 'Africa', confederation: 'CAF', ranking: 36, tier: 'Challenger' },
    { id: 'civ', name: 'Ivory Coast', colors: ['#F77F00', '#009E60'], continent: 'Africa', confederation: 'CAF', ranking: 39, tier: 'Challenger' },
    { id: 'tun', name: 'Tunisia', colors: ['#E70013', '#FFFFFF'], continent: 'Africa', confederation: 'CAF', ranking: 41, tier: 'Challenger' },
    { id: 'alg', name: 'Algeria', colors: ['#006233', '#FFFFFF'], continent: 'Africa', confederation: 'CAF', ranking: 43, tier: 'Challenger' },
    { id: 'mli', name: 'Mali', colors: ['#14B53A', '#FCD116'], continent: 'Africa', confederation: 'CAF', ranking: 47, tier: 'Challenger' },
    { id: 'cmr', name: 'Cameroon', colors: ['#007A5E', '#CE1126'], continent: 'Africa', confederation: 'CAF', ranking: 51, tier: 'Challenger' },
    { id: 'gha', name: 'Ghana', colors: ['#FFFFFF', '#000000'], continent: 'Africa', confederation: 'CAF', ranking: 61, tier: 'Challenger' }, // Kept as 10th option or replacement

    // ASIA (AFC) - 8 Teams (Expanded)
    { id: 'jpn', name: 'Japan', colors: ['#000555', '#FFFFFF'], continent: 'Asia', confederation: 'AFC', ranking: 18, tier: 'Contender' },
    { id: 'irn', name: 'Iran', colors: ['#DA0000', '#FFFFFF'], continent: 'Asia', confederation: 'AFC', ranking: 20, tier: 'Challenger' },
    { id: 'kor', name: 'South Korea', colors: ['#C60C30', '#0047A0'], continent: 'Asia', confederation: 'AFC', ranking: 23, tier: 'Contender' },
    { id: 'aus', name: 'Australia', colors: ['#FFCD00', '#00843D'], continent: 'Asia', confederation: 'AFC', ranking: 24, tier: 'Challenger' },
    { id: 'qat', name: 'Qatar', colors: ['#8A1538', '#FFFFFF'], continent: 'Asia', confederation: 'AFC', ranking: 37, tier: 'Challenger' },
    { id: 'ksa', name: 'Saudi Arabia', colors: ['#006C35', '#FFFFFF'], continent: 'Asia', confederation: 'AFC', ranking: 53, tier: 'Challenger' },
    { id: 'irq', name: 'Iraq', colors: ['#007A3D', '#FFFFFF'], continent: 'Asia', confederation: 'AFC', ranking: 58, tier: 'Challenger' },
    { id: 'uzb', name: 'Uzbekistan', colors: ['#0091CF', '#FFFFFF'], continent: 'Asia', confederation: 'AFC', ranking: 64, tier: 'Challenger' },

    // OCEANIA (OFC) - 2 Teams (1 Guaranteed + 1 Playoff placeholder)
    { id: 'nzl', name: 'New Zealand', colors: ['#000000', '#FFFFFF'], continent: 'Oceania', confederation: 'OFC', ranking: 104, tier: 'Contender' },
    { id: 'fij', name: 'Fiji', colors: ['#FFFFFF', '#000000'], continent: 'Oceania', confederation: 'OFC', ranking: 168, tier: 'Challenger' },
];

export const stats = [
    { label: 'TEAMS', value: 48 },
    { label: 'MATCHES', value: 104 },
    { label: 'HOST NATIONS', value: 3 },
    { label: 'TROPHY', value: 1 },
    { label: 'CONTINENTS', value: 6 }, // Changed from 5 to 6 to be accurate (counting N/S America separately + Oceania)
];
