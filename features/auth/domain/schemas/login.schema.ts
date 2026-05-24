import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("รูปแบบอีเมลไม่ถูกต้อง").min(1, "กรุณากรอกอีเมลค่ะ"),
    password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
});

export type LoginFormData = z.infer<typeof loginSchema>;