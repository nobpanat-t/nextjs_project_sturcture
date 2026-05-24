// core/i18n/dictionaries.ts

export const dictionaries = {
    th: {
        common: {
            appName: "หนองม้าคอนเน็ค"
        },
        auth: {
            login: "เข้าสู่ระบบ",
            email: "อีเมล",
            password: "รหัสผ่าน",
        }
    },
    en: {
        common: {
            appName: "Nong-Ma Connect"
        },
        auth: {
            login: "Login",
            email: "Email",
            password: "Password",
        }
    }
} as const;

export type Language = keyof typeof dictionaries;

export type Dictionary = typeof dictionaries[Language];