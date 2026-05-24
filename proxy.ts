import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const token = request.cookies.get('access-token')?.value
    const { pathname } = request.nextUrl

    // 1. กำหนดว่าหน้าไหนบ้างที่เป็น "Public" หรือหน้า "Auth" (ไม่ต้องเช็ค Token)
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register')

    // 2. ถ้ามี Token แล้วแต่พยายามจะไปหน้า Login/Register -> ดีดไปหน้าแรก (Home)
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // 3. ถ้าไม่มี Token และหน้าที่จะไป "ไม่ใช่" หน้า Auth -> ดีดไปหน้า Login
    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // 4. กรณีอื่นๆ ให้ผ่านไปได้ตามปกติ
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match path ทั้งหมด ยกเว้น:
         * 1. api (ถ้าใช้ axios ต่อตรงกับ Go)
         * 2. _next/static (static files)
         * 3. _next/image (image optimization files)
         * 4. favicon.ico (icon ไฟล์)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
    ]
}