import { Search, MapPin, Home, DollarSign, BedDouble } from "lucide-react";
import Button from "../ui/Button";

export default function SearchWidget() {
  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-[2.5rem] p-6 shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-700">
      {/* Header Text */}
      <h3 className="text-2xl font-bold text-brand-dark mb-6">
        Find the best place
      </h3>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Input 1: Looking For */}
        <div className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors cursor-pointer group">
          <label className="block text-xs font-bold text-gray-400 mb-1">
            Looking for
          </label>
          <div className="flex items-center gap-2 text-brand-dark font-semibold">
            <Home size={18} className="text-brand-green" />
            <span>Enter type</span>
          </div>
        </div>

        {/* Input 2: Price */}
        <div className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors cursor-pointer">
          <label className="block text-xs font-bold text-gray-400 mb-1">
            Price
          </label>
          <div className="flex items-center gap-2 text-brand-dark font-semibold">
            <DollarSign size={18} className="text-brand-green" />
            <span>Price Range</span>
          </div>
        </div>

        {/* Input 3: Location */}
        <div className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors cursor-pointer">
          <label className="block text-xs font-bold text-gray-400 mb-1">
            Locations
          </label>
          <div className="flex items-center gap-2 text-brand-dark font-semibold">
            <MapPin size={18} className="text-brand-green" />
            <span>City / Street</span>
          </div>
        </div>

        {/* Input 4: Rooms */}
        <div className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors cursor-pointer">
          <label className="block text-xs font-bold text-gray-400 mb-1">
            Number of rooms
          </label>
          <div className="flex items-center gap-2 text-brand-dark font-semibold">
            <BedDouble size={18} className="text-brand-green" />
            <span>3 Bed rooms</span>
          </div>
        </div>
      </div>

      {/* Footer: Filters & Search Button */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Filter Tags */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
          <span className="font-bold text-brand-dark mr-2 self-center">
            Filter:
          </span>
          {["City", "House", "Residential", "Apartment"].map((filter) => (
            <button
              key={filter}
              className="px-4 py-1.5 rounded-full border border-gray-200 text-sm text-gray-500 hover:border-brand-green hover:text-brand-green transition-colors bg-white whitespace-nowrap"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search Action */}
        <Button variant="primary" className="w-full md:w-auto px-8 py-3">
          <Search size={18} />
          Search Properties
        </Button>
      </div>
    </div>
  );
}
