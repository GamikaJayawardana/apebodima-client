// app/listings/page.tsx
"use client";

import { useSearchListings, Listing } from '@/lib/api/listingService';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

// FIX: Added the ListingCard component definition, which was missing.
function ListingCard({ listing }: { listing: Listing }) {
    return (
        <Link
            href={`/listings/${listing.id}`}
            className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
            <img
                src={listing.imageUrls[0] || 'https://via.placeholder.com/400x300'}
                alt={listing.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-bold">{listing.title}</h3>
                <p className="text-gray-600">{listing.city}</p>
                <p className="text-xl font-bold text-blue-600 mt-2">
                    LKR {listing.rentAmount.toLocaleString()} / month
                </p>
                <p className="text-sm text-gray-500">{listing.bedrooms} Bedrooms</p>
            </div>
        </Link>
    );
}

// This component wraps the page to allow use of useSearchParams
export default function SearchPageWrapper() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <SearchPage />
        </React.Suspense>
    )
}

function SearchPage() {
    const searchParams = useSearchParams();
    const city = searchParams.get('city') || undefined;
    const propertyType = searchParams.get('propertyType') || undefined;

    // FIX: Removed the trailing underscore `_` from this line
    const { data, isLoading, error } = useSearchListings({
        city,
        propertyType,
        page: 0,
        size: 10,
    });

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-6">
                Search Results {city && `in ${city}`}
            </h1>

            {/* TODO: Add filter components here (for price, bedrooms, etc.) */}

            {isLoading && <p>Loading listings...</p>}
            {error && <p>Error loading listings.</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.content.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>

            {data?.content && data.content.length === 0 && (
                <p>No listings found matching your criteria.</p>
            )}

            {/* TODO: Add Pagination component */}
        </div>
    );
}