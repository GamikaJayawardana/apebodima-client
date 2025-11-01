// src/components/auth/ProtectedPage.tsx
"use client";

import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
    const user = useAuthStore((state) => state.user);
    const router = useRouter();

    useEffect(() => {
        // If there's no user, redirect to login
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    // If user exists, render the children
    if (user) {
        return <>{children}</>;
    }

    // Optional: Show a loading spinner while checking
    return <p>Loading...</p>;
}