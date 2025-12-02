import { MapPin } from "lucide-react";
import Button from "../../ui/Button";

export default function ListingCard({ listing }) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition group">
      <div className="h-64 bg-gray-200 rounded-2xl relative overflow-hidden mb-4">
        {listing.imageUrls?.[0] ? (
          <img
            src={listing.imageUrls[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase">
          {listing.propertyType}
        </span>
      </div>

      <h4 className="text-xl font-bold text-gray-900 truncate">
        {listing.title}
      </h4>
      <p className="text-gray-500 flex items-center gap-1 mt-1 text-sm">
        <MapPin size={14} /> {listing.city}
      </p>

      <div className="flex justify-between items-center mt-6">
        <div>
          <span className="text-2xl font-bold text-gray-900">
            Rs. {listing.rentAmount?.toLocaleString()}
          </span>
          <span className="text-sm text-gray-400 font-normal ml-1">/mo</span>
        </div>
        <Button variant="primary" className="px-4 py-2 text-sm rounded-full">
          Details
        </Button>
      </div>
    </div>
  );
}
