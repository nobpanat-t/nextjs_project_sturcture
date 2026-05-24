// core/utils/logger.ts
import pino from 'pino';

const isDev = process.env.NODE_ENV === 'development';
const isBrowser = typeof window !== 'undefined';

export const logger = pino({
    level: isDev ? 'debug' : 'info', // ใน Production จะเก็บเฉพาะ info ขึ้นไป
    browser: {
        asObject: true, // บน Browser ให้แสดงผลเป็น Object เพื่อให้อ่านง่าย
        // ตรงนี้คือไม้ตายค่ะ! เราสามารถเขียนฟังก์ชันดักจับทุกล็อกก่อนพ่นออก
        transmit: {
            level: 'error', // ส่งเฉพาะเวลามี Error เท่านั้น (เพื่อไม่ให้เปลือง network)
            send: (level, logEvent) => {
                // 1. ดึง Context (Object แรกที่เราส่งเข้าไป)
                // ปกติจะอยู่ที่ bindings[0] หรือถ้าไม่มี bindings เลยจะเป็น Object ว่าง
                const context = logEvent.bindings[0] || {};

                // 2. ดึง Message (Text ที่ตามหลังมา)
                const message = logEvent.messages[0] || 'No message provided';

                // 3. ประกอบร่างเพื่อส่งให้ Go
                const payload = {
                    level: level,      // 'info', 'error', 'debug'
                    message: message,        // 'Login failed'
                    metadata: context,       // { userId: 'guy_007', action: 'login' }
                    timestamp: new Date().toISOString(),
                    env: process.env.NODE_ENV
                };

                // 🚀 ยิงเข้า API
                // fetch('/v1/logs', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(payload)
                // }).catch(() => {
                //     // ป้องกัน Error วนลูปถ้า API Log พัง
                // });
            }
        }
    },

    // ใช้ pino-pretty เฉพาะตอนพัฒนา (Development)
    transport: (isDev && !isBrowser)
        ? {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:standard',
                ignore: 'pid,hostname', // ลดข้อมูลที่รกหูรกตาตอน Debug
            },
        }
        : undefined,
});