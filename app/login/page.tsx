"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import api from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

// Type to match LoginRequest.java
type LoginFormInputs = {
    email: string;
    password: string;
};

export default function LoginPage() {
    const { register, handleSubmit } = useForm<LoginFormInputs>();
    const login = useAuthStore((state) => state.login);
    const router = useRouter();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        try {
            // Call your backend's login endpoint
            const response = await api.post('/auth/login', data);

            // On success, get token and user from AuthResponse
            const { token, user } = response.data;

            // Save to global state
            login(token, user);

            // Redirect to dashboard
            router.push('/dashboard');
        } catch (error) {
            console.error('Login failed', error);
            alert('Login failed! Please check your credentials.');
        }
    };

    return (
        <div className="container mx-auto max-w-md py-12">
            <h1 className="text-3xl font-bold mb-6">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    {...register('email')}
                    placeholder="Email"
                    type="email"
                    className="w-full p-2 border rounded-md"
                />
                <input
                    {...register('password')}
                    placeholder="Password"
                    type="password"
                    className="w-full p-2 border rounded-md"
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">
                    Login
                </button>
            </form>
        </div>
    );
}