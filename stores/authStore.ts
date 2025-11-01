// src/stores/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the shape of your UserDto from the backend
interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    contactNo: string;
    address: string;
    role: 'TENANT' | 'LANDLORD' | 'ADMIN';
}

interface AuthState {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            login: (token, user) => set({ token, user }),
            logout: () => set({ token: null, user: null }),
            setUser: (user) => set({ user }),
        }),
        {
            name: 'auth-storage', // name of the item in storage (local storage by default)
            storage: createJSONStorage(() => localStorage),
        }
    )
);