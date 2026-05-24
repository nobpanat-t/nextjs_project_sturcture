// shared/theme/typography.ts

export const FontSize = {
    XS: "text-xs",     // 12px
    SM: "text-sm",     // 14px
    BASE: "text-base", // 16px
    LG: "text-lg",     // 18px
    XL: "text-xl",     // 20px
    H3: "text-2xl font-bold",
    H2: "text-3xl font-bold",
    H1: "text-4xl font-extrabold",
} as const;

export type FontSizeLevel = keyof typeof FontSize;