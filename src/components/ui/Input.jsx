import { LucideIcon } from "lucide-react";

export default function Input({ label, icon: Icon, type = "text", ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-3.5 text-gray-400" size={20} />
        )}
        <input
          type={type}
          className={`w-full ${
            Icon ? "pl-12" : "pl-4"
          } pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition`}
          {...props}
        />
      </div>
    </div>
  );
}
