import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { redirect } from "next/navigation";

// สร้าง Instance พื้นฐาน
export const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

httpClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // ถ้าเป็นการรันใน Server (Server Action / Server Component)
        if (typeof window === "undefined") {
            const { cookies } = await import("next/headers");
            const cookieStore = await cookies();
            // ดึง cookie ทั้งหมดมาต่อเป็น string เพื่อส่งต่อให้ backend
            config.headers.Cookie = cookieStore.toString();
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// เพื่อป้องกัน Loop ไม่สิ้นสุด
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else prom.resolve(token);
    });
    failedQueue = [];
};

// --- Interceptor ส่วนขาออก (Request) ---
httpClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error) => Promise.reject(error)
);

// --- Interceptor ส่วนขาเข้า (Response) ---
httpClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as any;

        // 1.  ถ้าเป็น 401 แต่มาจาก path /auth/login
        // ให้ Reject ทันที ไม่ต้องพยายาม Refresh 
        if (error.response?.status === 401 && originalRequest.url?.includes('/auth/login')) {
            return Promise.reject(error);
        }

        // 2. ถ้าเจอ 401 และไม่ใช่หน้า Login ถึงจะทำกระบวนการ Refresh Token
        if (error.response?.status === 401 && !originalRequest._retry) {

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => httpClient(originalRequest))
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );
                processQueue(null);
                return httpClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);


                if (typeof window !== "undefined" && !window.location.pathname.includes('/login')) {
                    window.location.href = "/login";
                } else {
                    redirect("/login");
                }
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);