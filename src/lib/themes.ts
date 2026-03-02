
export type ThemeType = 'standard' | 'minimal' | 'dark' | 'neon' | 'glass';

export interface ThemeConfig {
    id: ThemeType;
    name: string;
    description: string;
    styles: {
        // Page Background
        background: string;
        // Typography
        textPrimary: string;
        textSecondary: string;
        // Profile Section
        profileBorder: string;
        profileShadow: string;
        // Main Content Card
        cardBg: string;
        cardBorder: string;
        cardShadow: string;
        cardRounded: string;
        // Link Buttons
        linkBg: string;
        linkText: string;
        linkBorder: string;
        linkHover: string;
        linkRounded: string;
        linkShadow: string;
        // Footer
        footerText: string;
    };
}

export const THEMES: Record<ThemeType, ThemeConfig> = {
    standard: {
        id: 'standard',
        name: 'Standard',
        description: 'The classic Biozy look with fresh emerald accents.',
        styles: {
            // Soft sage-to-white gradient page
            background: 'bg-gradient-to-b from-[#eaf7f0] to-[#f5fdf8]',
            textPrimary: 'text-[#1a2e1e]',
            textSecondary: 'text-[#4a6b52]',
            profileBorder: 'border-[#17803d]/25',
            profileShadow: 'shadow-xl shadow-emerald-100/80',
            // Crisp white card with subtle emerald tint on edges
            cardBg: 'bg-white',
            cardBorder: 'border-emerald-100/80 border',
            cardShadow: 'shadow-2xl shadow-emerald-100/60',
            cardRounded: 'rounded-3xl',
            // White link cards — turn accent green on hover
            linkBg: 'bg-white',
            linkText: 'text-[#1a2e1e] font-semibold group-hover:text-[#17803d]',
            linkBorder: 'border-emerald-100',
            linkHover: 'hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-100/80 hover:scale-[1.015]',
            linkRounded: 'rounded-2xl',
            linkShadow: 'shadow-sm shadow-emerald-50',
            footerText: 'text-[#4a6b52]/55',
        },
    },

    minimal: {
        id: 'minimal',
        name: 'Minimalist',
        description: 'Editorial black and white. Bold. No clutter.',
        styles: {
            // Pure white — maximally clean
            background: 'bg-white',
            textPrimary: 'text-black',
            textSecondary: 'text-gray-500 group-hover:text-white/70',
            profileBorder: 'border-black',
            profileShadow: 'shadow-none',
            cardBg: 'bg-transparent',
            cardBorder: 'border-transparent',
            cardShadow: 'shadow-none',
            cardRounded: 'rounded-none',
            // White cards, flat black offset shadow, full invert on hover
            linkBg: 'bg-white',
            linkText: 'text-black font-bold tracking-tight group-hover:text-white',
            linkBorder: 'border-black',
            linkHover: 'hover:bg-black transition-all duration-200',
            linkRounded: 'rounded-sm',
            linkShadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
            footerText: 'text-gray-400',
        },
    },

    dark: {
        id: 'dark',
        name: 'Midnight',
        description: 'Deep space dark mode with indigo accents.',
        styles: {
            // Near-black deep navy
            background: 'bg-[#07090f]',
            textPrimary: 'text-slate-100',
            textSecondary: 'text-slate-400',
            profileBorder: 'border-indigo-500/50',
            profileShadow: 'shadow-2xl shadow-indigo-900/60',
            // Dark navy card with subtle indigo border
            cardBg: 'bg-[#0e1420]',
            cardBorder: 'border-indigo-900/60 border',
            cardShadow: 'shadow-2xl shadow-black/70',
            cardRounded: 'rounded-3xl',
            // Dark link cards — fill indigo on hover
            linkBg: 'bg-[#141d2e]',
            linkText: 'text-slate-100 font-semibold group-hover:text-white',
            linkBorder: 'border-indigo-900/50',
            linkHover: 'hover:bg-indigo-600 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-900/50 hover:scale-[1.015]',
            linkRounded: 'rounded-2xl',
            linkShadow: 'shadow-lg shadow-black/40',
            footerText: 'text-slate-700',
        },
    },

    neon: {
        id: 'neon',
        name: 'Neon Night',
        description: 'Synthwave cyberpunk. Hot pink meets electric cyan.',
        styles: {
            // Deep purple-black void
            background: 'bg-[#0d001a]',
            textPrimary: 'text-[#ff2d78] drop-shadow-[0_0_8px_rgba(255,45,120,0.7)]',
            textSecondary: 'text-[#b060ff] group-hover:text-black/70',
            profileBorder: 'border-[#ff2d78]',
            profileShadow: 'shadow-[0_0_30px_rgba(255,45,120,0.65)]',
            // Dark translucent card with pink glow border
            cardBg: 'bg-[#12002a]/90 backdrop-blur-sm',
            cardBorder: 'border-[#ff2d78]/35 border',
            cardShadow: 'shadow-[0_0_50px_rgba(255,45,120,0.18)]',
            cardRounded: 'rounded-2xl',
            // Black links with cyan glow — fill cyan on hover (text flips black)
            linkBg: 'bg-[#0d001a]',
            linkText: 'text-[#00fff0] font-bold tracking-widest group-hover:text-black',
            linkBorder: 'border-[#00fff0]/55',
            linkHover: 'hover:bg-[#00fff0] hover:border-[#00fff0] hover:shadow-[0_0_25px_rgba(0,255,240,0.65)]',
            linkRounded: 'rounded-lg',
            linkShadow: 'shadow-[0_0_10px_rgba(0,255,240,0.35)]',
            footerText: 'text-[#ff2d78]/30',
        },
    },

    glass: {
        id: 'glass',
        name: 'Glassmorphism',
        description: 'Aurora glassmorphism over an indigo-to-violet gradient.',
        styles: {
            // Rich aurora gradient sky
            background: 'bg-gradient-to-br from-[#0ea5e9] via-[#6366f1] to-[#a855f7]',
            textPrimary: 'text-white',
            textSecondary: 'text-white/75',
            profileBorder: 'border-white/40',
            profileShadow: 'shadow-2xl shadow-indigo-900/30',
            // Frosted glass card
            cardBg: 'bg-white/15 backdrop-blur-2xl',
            cardBorder: 'border-white/25 border',
            cardShadow: 'shadow-2xl shadow-black/20',
            cardRounded: 'rounded-[36px]',
            // Frosted glass links — brighten on hover
            linkBg: 'bg-white/15 backdrop-blur-sm',
            linkText: 'text-white font-semibold group-hover:text-white',
            linkBorder: 'border-white/25',
            linkHover: 'hover:bg-white/30 hover:border-white/50 hover:shadow-xl hover:shadow-white/15 hover:scale-[1.02]',
            linkRounded: 'rounded-2xl',
            linkShadow: 'shadow-lg shadow-black/10',
            footerText: 'text-white/40',
        },
    },
};

export const DEFAULT_THEME = 'standard';
