// app/dashboard/page.tsx
"use client";

// FIX: Added 'useEffect' to the import
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useForm } from 'react-hook-form';
import api from '@/lib/api';

// Type for UpdateUserRequest.java
type ProfileFormInputs = {
    firstName: string;
    lastName: string;
    contactNo: string;
    address: string;
};

export default function DashboardProfilePage() {
    const { user, setUser } = useAuthStore();
    const { register, handleSubmit, setValue } = useForm<ProfileFormInputs>();

    // Set default form values from the auth store
    useEffect(() => {
        if (user) {
            setValue('firstName', user.firstName);
            setValue('lastName', user.lastName);
            // FIX: Check if properties exist before setting
            setValue('contactNo', user.contactNo || '');
            setValue('address', user.address || '');
        }
    }, [user, setValue]);

    const onSubmit = async (data: ProfileFormInputs) => {
        try {
            // Call the update profile endpoint
            const response = await api.put('/users/me', data);
            setUser(response.data); // Update the user in the global store
            alert('Profile updated!');
        } catch (error) {
            console.error('Failed to update profile', error);
            alert('Update failed.');
        }
    };

    if (!user) return null;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
                <input {...register('firstName')} placeholder="First Name" className="w-full p-2 border rounded-md" />
                <input {...register('lastName')} placeholder="Last Name" className="w-full p-2 border rounded-md" />
                <input {...register('contactNo')} placeholder="Contact No" className="w-full p-2 border rounded-md" />
                <input {...register('address')} placeholder="Address" className="w-full p-2 border rounded-md" />
                <button type="submit" className="bg-blue-600 text-white p-3 rounded-md">
                    Save Changes
                </button>
            </form>
        </div>
    );
}