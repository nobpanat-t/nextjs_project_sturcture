"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

export default function QueryProvider({ children }: { children: ReactNode }) {
    // ใช้ useState เพื่อสร้าง QueryClient แค่ครั้งเดียวต่อการโหลดเพจ (ป้องกัน Re-render แล้ว Cache หาย)
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // ข้อมูลจะสดอยู่ 1 นาที
                retry: 1, // ถ้าพัง ให้ลองใหม่แค่ครั้งเดียวพอ
            },
        },
    }))

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}