import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import SearchWidget from "@/components/home/SearchWidget";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-brand-dark">
      {/* 1. Background Image */}
      <div className="absolute inset-0 z-0">
        {/* NOTE: Add a high-quality modern house image to /public/hero-bg.jpg 
           The overlay ensures text is readable.
        */}
        <Image
          src="/hero-bg.jpg"
          alt="Modern House"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay: Darker at bottom for search widget contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
      </div>

      {/* 2. Navigation */}
      <Navbar />

      {/* 3. Main Content Grid */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end pb-8 md:pb-12 px-6 md:px-12 max-w-[1440px] mx-auto">
        {/* Floating Tags (Above Headline) */}
        <div className="flex gap-3 mb-6">
          {["House", "Apartment", "Residential"].map((tag) => (
            <span
              key={tag}
              className="glass px-4 py-1 rounded-full text-xs md:text-sm text-white backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Headline & Description */}
        <div className="mb-8 md:mb-12 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 drop-shadow-lg">
            Build Your Future, <br />
            <span className="text-gray-200">One Property at a Time.</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl leading-relaxed glass p-4 rounded-xl border-none bg-black/20">
            Own Your World, One Property at a Time. Own Your World, One Property
            at a Time. Own Your World, One Property at a Time.
          </p>
        </div>

        {/* Search Widget */}
        <div className="w-full">
          <SearchWidget />
        </div>
      </div>
    </main>
  );
}
