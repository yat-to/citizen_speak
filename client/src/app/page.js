"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import { Home, Bell, Settings, MessageCircleMore } from 'lucide-react';

export default function page() {
    return (
        <div>
            <Header />
        </div>
    )
}


function Header() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const containerRef = useRef(null);
    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Jika klik terjadi di luar containerRef, tutup dropdown
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        };

        // Tambah event listener saat komponen muncul
        document.addEventListener("mousedown", handleClickOutside);

        // Bersihkan event listener saat komponen hilang (cleanup)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-[#F4F4F4] border-b border-gray-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src="/images/icon.png"
                        alt="Logo Aplikasi"
                        width={50}
                        height={50}
                    />
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#" className="px-4 py-2">
                        <Home size={20} className="text-blue-500" />
                    </a>
                    <a href="#" className="px-4 py-2">
                        <Home size={20} className="text-blue-500" />
                    </a>
                    <a href="#" className="px-4 py-2">
                        <Home size={20} className="text-blue-500" />
                    </a>
                    <a href="#" className="px-4 py-2">
                        <Home size={20} className="text-blue-500" />
                    </a>
                </nav>
                {/* // Kita bungkus semua dengan ref ini */}
                <div className="flex items-center gap-2" ref={containerRef}>
                    {/* Pesan */}
                    <div className="relative">
                        <div
                            onClick={() => toggleDropdown('message')}
                            className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            <MessageCircleMore size={20} />
                        </div>

                        {openDropdown === 'message' && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2 text-sm text-gray-700">
                                <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">Pesan Baru</div>
                                <div className="p-2 hover:bg-gray-50 rounded cursor-pointer">Lihat Semua</div>
                            </div>
                        )}
                    </div>

                    {/* Notifikasi */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown('bell')}
                            className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <Bell size={20} />
                        </button>
                        {openDropdown === 'bell' && (
                            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4">
                                <p className="text-sm text-center text-gray-400">Belum ada notifikasi</p>
                            </div>
                        )}
                    </div>

                    {/* Settings */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown('settings')}
                            className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <Settings size={20} />
                        </button>
                        {openDropdown === 'settings' && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-2">
                                <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm">Account Settings</button>
                                <button className="w-full text-left p-2 hover:bg-red-50 text-red-500 rounded text-sm">Logout</button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </header>
    )
}
