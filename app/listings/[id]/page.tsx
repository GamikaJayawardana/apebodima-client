// src/app/listings/[id]/page.tsx
"use client";

import { useGetListingById } from '@/lib/api/listingService';
import { useParams } as NextParams from 'next/navigation'; // Renamed to avoid conflict
import { Metadata } from 'next';



export default function ListingDetailPage() {
    const params = NextParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const { data: listing, isLoading, error } = useGetListingById(id as string);

    if (isLoading) return <p className="container mx-auto py-12">Loading...</p>;
    if (error || !listing) return <p className="container mx-auto py-12">Listing not found.</p>;

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2">
                    {/* Image Gallery */}
                    <img
                        src={listing.imageUrls[0] || 'https://via.placeholder.com/800x600'}
                        alt={listing.title}
                        className="w-full h-96 object-cover rounded-lg mb-6"
                    />
                    {/* TODO: Add image carousel for all imageUrls */}

                    <h1 className="text-4xl font-bold mb-4">{listing.title}</h1>
                    <p className="text-lg text-gray-600 mb-6">{listing.city}</p>

                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                    <p className="text-gray-700 mb-6">{listing.description}</p>

                    <h2 className="text-2xl font-bold mb-4">Details</h2>
                    <ul className="grid grid-cols-2 gap-4">
                        <li>Bedrooms: {listing.bedrooms}</li>
                        <li>Bathrooms: {listing.bathrooms}</li>
                        {/* ... other details ... */}
                    </ul>
                </div>

                {/* Sidebar */}
                <div className="md:col-span-1">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md sticky top-24">
                        <p className="text-3xl font-bold text-blue-600 mb-6">
                            LKR {listing.rentAmount.toLocaleString()}
                            <span className="text-lg text-gray-600"> / month</span>
                        </p>
                        <button className="w-full bg-blue-600 text-white p-3 rounded-md mb-4">
                            Contact Landlord
                        </button>
                        <button className="w-full border border-blue-600 text-blue-600 p-3 rounded-md">
                            Add to Favorites
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
        try {
            // Fetch data directly from your API for metadata
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listings/${params.id}`);
            const listing = await response.json();

            if (!listing) {
                return { title: 'Listing Not Found' };
            }

            // Return SEO-optimized metadata
            return {
                title: `${listing.title} in ${listing.city} - ApeBodima.lk`,
                description: listing.description.substring(0, 160), // Truncate description
                openGraph: {
                    title: listing.title,
                    description: listing.description.substring(0, 160),
                    images: [
                        {
                            url: listing.imageUrls[0] || 'https.../default-image.png',
                        },
                    ],
                },
            };
        } catch (error) {
            console.error('Failed to generate metadata', error);
            return { title: 'Error', description: 'Could not load listing details.' };
        }
    }

    export default function ListingDetailPage() {
        // ... (all the client-side code with hooks stays the same)
    }
}