"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';

// Define the ListingDto type from your backend
export interface Listing {
    id: string;
    title: string;
    description: string;
    rentAmount: number;
    propertyType: 'HOUSE' | 'APARTMENT' | 'ROOM' | 'ANNEX';
    imageUrls: string[];
    city: string;
    bedrooms: number;
    bathrooms: number;
    // ... add other fields from ListingDto.java
}

// Interface for the paginated response
export interface PaginatedListings {
    content: Listing[];
    totalPages: number;
    totalElements: number;
    number: number; // current page number
}

// Hook to search for listings (matches ListingController search)
export function useSearchListings(params: {
    city?: string;
    propertyType?: string;
    minRent?: number;
    maxRent?: number;
    minBedrooms?: number;
    page?: number;
    size?: number;
}) {
    return useQuery<PaginatedListings>({
        queryKey: ['listings', params],
        queryFn: async () => {
            const { data } = await api.get('/listings', { params });
            return data;
        },
    });
}

// Hook to get a single listing by ID
export function useGetListingById(id: string) {
    return useQuery<Listing>({
        queryKey: ['listing', id],
        queryFn: async () => {
            const { data } = await api.get(`/listings/${id}`);
            return data;
        },
        enabled: !!id, // Only run if id is provided
    });
}

