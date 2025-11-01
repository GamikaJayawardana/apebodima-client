"use client";

import { useSearchListings, Listing } from '@/lib/api/listingService';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

// You can re-use the ListingCard component here or define it in its own file
function ListingCard({ listing }: { listing: Listing }) {
    // ... (same as in Home component)
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

    // You would also get page, minRent, etc. from searchParams
    const { data, isLoading, error }_ = useSearchListings({
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

            {data?.content.length === 0 && (
                <p>No listings found matching your criteria.</p>
            )}

            {/* TODO: Add Pagination component */}
        </div>
    );
}