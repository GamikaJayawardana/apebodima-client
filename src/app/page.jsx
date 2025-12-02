"use client";
import { useEffect, useState } from "react";
import { Search, MapPin, ArrowRight } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import ListingCard from "../components/features/listings/ListingCard";
import { getListings } from "../services/listingService";

export default function LandingPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListings({ size: 3 })
      .then((data) => setListings(data.content))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-6 lg:px-20 py-16 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900">
              Discover Your <br />
              <span className="text-gray-500">Comfortable Home</span>
            </h1>
            <p className="mt-6 text-gray-600 text-lg max-w-md">
              Find your ideal rental property easily with ApeBodima.
            </p>

            {/* Search Bar Component Inline for now */}
            <div className="mt-10 bg-white p-2 rounded-full shadow-lg max-w-xl flex items-center justify-between">
              <div className="flex items-center gap-3 px-4 w-full">
                <MapPin className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location..."
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              <button className="bg-black text-white p-4 rounded-full hover:bg-gray-800 transition">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[500px] bg-gray-300 rounded-[3rem] overflow-hidden shadow-2xl">
            {/* <Image src="..." /> */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-bold">
              Hero Image
            </div>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="px-6 lg:px-20 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-gray-500 uppercase tracking-wide text-sm font-semibold">
              Best Choices
            </h2>
            <h3 className="text-4xl font-bold mt-2">Popular Residences</h3>
          </div>
          <button className="text-black font-semibold border-b border-black pb-1 flex items-center gap-2">
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading
            ? [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-96 bg-gray-200 rounded-3xl animate-pulse"
                />
              ))
            : listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
        </div>
      </section>
    </main>
  );
}
