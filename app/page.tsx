"use client";

import { useSearchListings, Listing } from '@/lib/api/listingService';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// A simple card component for displaying a listing
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

export default function Home() {
  const [city, setCity] = useState('');
  const [type, setType] = useState('');
  const router = useRouter();

  // Fetch some listings for the "Featured" section
  const { data: featuredData, isLoading, error } = useSearchListings({ page: 0, size: 6 });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to the search page with query params
    router.push(`/listings?city=${city}&propertyType=${type}`);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Search Section */}
      <div className="bg-gray-100 p-8 rounded-lg text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Find Your Perfect Bodima
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Search for bodim, rooms, and houses near your university in Sri Lanka.
        </p>
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter a city (e.g., Colombo, Kandy)"
            className="p-3 border rounded-md flex-grow"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            aria-label="Property type"
            className="p-3 border rounded-md"
          >
            <option value="">All Types</option>
            <option value="ROOM">Room</option>
            <option value="BODIMA">Bodima</option>
            <option value="HOUSE">House</option>
            <option value="ANNEX">Annex</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-md"
          >
            Search
          </button>
        </form>
      </div>

      {/* Featured Listings Section */}
      <h2 className="text-3xl font-bold mb-6">Featured Listings</h2>
      {isLoading && <p>Loading listings...</p>}
      {error && <p>Error loading listings.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredData?.content.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}