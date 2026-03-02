
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
        profileBorder: string; // Border around profile pic
        profileShadow: string;
        // Main Content Card (The container holding bio and links)
        cardBg: string;
        cardBorder: string;
        cardShadow: string;
        cardRounded: string;
        // Link Buttons
        linkBg: string; // Background of individual links
        linkText: string;
        linkBorder: string;
        linkHover: string; // Hover effects
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
        description: 'The classic Biozy look with mint green accents.',
        styles: {
            background: 'bg-[#e8f7ee]',
            textPrimary: 'text-[#374151]',
            textSecondary: 'text-[#374151]/70',
            profileBorder: 'border-[#17803d]/20',
            profileShadow: 'shadow-lg',
            cardBg: 'bg-white',
            cardBorder: 'border-transparent',
            cardShadow: 'shadow-xl',
            cardRounded: 'rounded-3xl',
            linkBg: 'bg-white',
            linkText: 'text-[#374151]',
            linkBorder: 'border-[#17803d]/20',
            linkHover: 'hover:border-[#17803d]/40 hover:shadow-md hover:scale-[1.01]',
            linkRounded: 'rounded-xl',
            linkShadow: 'shadow-sm',
            footerText: 'text-[#374151]/50',
        },
    },
    minimal: {
        id: 'minimal',
        name: 'Minimalist',
        description: 'Clean, stark white and black. No clutter.',
        styles: {
            background: 'bg-white',
            textPrimary: 'text-black',
            textSecondary: 'text-gray-500 group-hover:text-white/70',
            profileBorder: 'border-black',
            profileShadow: 'shadow-none',
            cardBg: 'bg-transparent',
            cardBorder: 'border-transparent',
            cardShadow: 'shadow-none',
            cardRounded: 'rounded-none',
            linkBg: 'bg-gray-50',
            linkText: 'text-black font-medium group-hover:text-white',
            linkBorder: 'border-black border-2',
            linkHover: 'hover:bg-black transition-all duration-300',
            linkRounded: 'rounded-none',
            linkShadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
            footerText: 'text-gray-400',
        },
    },
    dark: {
        id: 'dark',
        name: 'Midnight',
        description: 'Sleek dark mode for night owls.',
        styles: {
            background: 'bg-slate-900',
            textPrimary: 'text-white',
            textSecondary: 'text-slate-400',
            profileBorder: 'border-slate-700',
            profileShadow: 'shadow-2xl shadow-black/50',
            cardBg: 'bg-slate-800',
            cardBorder: 'border-slate-700 border',
            cardShadow: 'shadow-2xl',
            cardRounded: 'rounded-2xl',
            linkBg: 'bg-slate-700',
            linkText: 'text-slate-100',
            linkBorder: 'border-slate-600',
            linkHover: 'hover:bg-slate-600 hover:border-slate-500',
            linkRounded: 'rounded-lg',
            linkShadow: 'shadow-lg',
            footerText: 'text-slate-600',
        },
    },
    neon: {
        id: 'neon',
        name: 'Neon Night',
        description: 'Cyberpunk inspired with glowing effects.',
        styles: {
            background: 'bg-black',
            textPrimary: 'text-pink-500 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]',
            textSecondary: 'text-purple-400',
            profileBorder: 'border-pink-500',
            profileShadow: 'shadow-[0_0_20px_rgba(236,72,153,0.5)]',
            cardBg: 'bg-gray-900/80 backdrop-blur-sm',
            cardBorder: 'border-purple-500/50 border',
            cardShadow: 'shadow-[0_0_30px_rgba(168,85,247,0.2)]',
            cardRounded: 'rounded-xl',
            linkBg: 'bg-black',
            linkText: 'text-cyan-400 font-bold tracking-wide',
            linkBorder: 'border-cyan-500',
            linkHover: 'hover:bg-cyan-950 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:border-cyan-400',
            linkRounded: 'rounded-lg',
            linkShadow: 'shadow-[0_0_5px_rgba(6,182,212,0.3)]',
            footerText: 'text-gray-600',
        },
    },
    glass: {
        id: 'glass',
        name: 'Glassmorphism',
        description: 'Modern frosted glass effect over a colorful gradient.',
        styles: {
            background: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
            textPrimary: 'text-white',
            textSecondary: 'text-white/80',
            profileBorder: 'border-white/30',
            profileShadow: 'shadow-xl',
            cardBg: 'bg-white/10 backdrop-blur-md',
            cardBorder: 'border-white/20 border',
            cardShadow: 'shadow-2xl',
            cardRounded: 'rounded-[40px]',
            linkBg: 'bg-white/20 hover:bg-white/30 backdrop-blur',
            linkText: 'text-white font-semibold',
            linkBorder: 'border-white/30',
            linkHover: 'hover:scale-105 transition-transform duration-300',
            linkRounded: 'rounded-2xl',
            linkShadow: 'shadow-lg',
            footerText: 'text-white/40',
        },
    },
};

export const DEFAULT_THEME = 'standard';
