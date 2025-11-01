"use client";

import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { useEffect, useState } from 'react';

export default function Header() {
    // We use this to avoid hydration mismatch
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const { user, logout } = useAuthStore();

    return (
        <header className="bg-white shadow-md p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    ApeBodima.lk
                </Link>
                <div className="flex gap-4 items-center">
                    <Link href="/listings" className="text-gray-700 hover:text-blue-600">
                        All Listings
                    </Link>
                    {isClient && user ? (
                        <>
                            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                                Dashboard
                            </Link>
                            <button
                                onClick={logout}
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                            >
                                Logout
                            </button>
                        </>
                    ) : isClient ? (
                        <>
                            <Link
                                href="/login"
                                className="text-gray-700 hover:text-blue-600"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                            >
                                Sign Up
                            </Link>
                        </>
                    ) : null}
                </div>
            </nav>
        </header>
    );
}