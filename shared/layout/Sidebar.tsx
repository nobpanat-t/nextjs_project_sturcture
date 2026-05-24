"use client";

import Link from "next/link";
import { useSidebar } from "../providers/Sidebar";
import { Droplet, Gauge, Home, LogOut, Menu, Settings, Users } from "lucide-react";
import { useLogout } from "./hooks/sidebar_hook";


export default function SideBar({ children }: { children: React.ReactNode }) {
    const { sidebar, toggleSidebar } = useSidebar();
    const isOpen = sidebar === "show";
    const { handleConfirmLogout } = useLogout();

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground">
            {/* Sidebar Section */}
            <aside
                className={`border-r border-border transition-all duration-300 ease-in-out flex flex-col bg-card ${isOpen ? "w-64" : "w-17.5"
                    }`}
            >
                {/* Header & Toggle */}
                <div className="flex items-center justify-between p-4 border-b border-border h-16">
                    {isOpen && (
                        <span className="font-bold text-lg truncate">
                            Nongma Connect
                        </span>
                    )}
                    <button
                        onClick={toggleSidebar}
                        className={`p-2 rounded-md hover:bg-muted transition-colors ${!isOpen && "mx-auto"
                            }`}
                    >
                        <Menu size={20} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
                    <Link
                        href="/"
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
                    >
                        <Home size={20} className="shrink-0" />
                        {isOpen && <span className="font-medium whitespace-nowrap">หน้าหลัก</span>}
                    </Link>

                    <Link
                        href="/water-meters"
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
                    >
                        <Gauge size={20} className="shrink-0" />
                        {isOpen && <span className="font-medium whitespace-nowrap">จัดการมิเตอร์น้ำ</span>}
                    </Link>
                    <Link
                        href="/water-supplies"
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
                    >
                        <Droplet size={20} className="shrink-0" />
                        {isOpen && <span className="font-medium whitespace-nowrap">ข้อมูลการใช้น้ำ</span>}
                    </Link>
                    <Link
                        href="/users"
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
                    >
                        <Users size={20} className="shrink-0" />
                        {isOpen && <span className="font-medium whitespace-nowrap">จัดการผู้ใช้งาน</span>}
                    </Link>
                </nav>

                {/* Footer Section */}
                <div className="p-3 border-t border-border">

                    <Link
                        href="/settings"
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors"
                    >
                        <Settings size={20} className="shrink-0" />
                        {isOpen && <span className="font-medium whitespace-nowrap">ตั้งค่าระบบ</span>}
                    </Link>
                    <button
                        onClick={handleConfirmLogout}
                        className="flex items-center gap-3 p-3 rounded-md hover:bg-muted transition-colors w-full"
                    >
                        <LogOut size={20} className="shrink-0" />
                        {isOpen && <span className="font-medium whitespace-nowrap">ออกจากระบบ</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Section */}
            <main className="flex-1 overflow-y-auto w-full h-full">
                {children}
            </main>
        </div>
    );
}