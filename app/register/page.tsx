// src/app/register/page.tsx
"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import api from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

// Type to match RegisterRequest.java
type RegisterFormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    contactNo: string;
    address: string;
    role: 'TENANT' | 'LANDLORD';
};

export default function RegisterPage() {
    const { register, handleSubmit } = useForm<RegisterFormInputs>();
    const login = useAuthStore((state) => state.login);
    const router = useRouter();

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        try {
            // Call your backend's register endpoint
            const response = await api.post('/auth/register', data);
            const { token, user } = response.data;

            // Log the user in immediately
            login(token, user);

            router.push('/dashboard');
        } catch (error) {
            console.error('Registration failed', error);
            alert('Registration failed!');
        }
    };

    return (
        <div className="container mx-auto max-w-md py-12">
            <h1 className="text-3xl font-bold mb-6">Create Account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input {...register('firstName')} placeholder="First Name" className="w-full p-2 border rounded-md" />
                <input {...register('lastName')} placeholder="Last Name" className="w-full p-2 border rounded-md" />
                <input {...register('email')} placeholder="Email" type="email" className="w-full p-2 border rounded-md" />
                <input {...register('password')} placeholder="Password" type="password" className="w-full p-2 border rounded-md" />
                <input {...register('contactNo')} placeholder="Contact No" className="w-full p-2 border rounded-md" />
                <input {...register('address')} placeholder="Address" className="w-full p-2 border rounded-md" />
                <select {...register('role')} className="w-full p-2 border rounded-md">
                    <option value="TENANT">I'm looking for a place (Tenant)</option>
                    <option value="LANDLORD">I want to list a place (Landlord)</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md">
                    Register
                </button>
            </form>
        </div>
    );
}