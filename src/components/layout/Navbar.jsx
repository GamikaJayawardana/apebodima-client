import Link from "next/link";
import Button from "../ui/Button";
import { Globe } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-6 md:px-12">
      {/* Logo */}
      <div className="text-2xl font-bold text-white tracking-wide">
        EverGreen
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 glass px-8 py-3 rounded-full">
        {["Home", "About Us", "Property List", "Contact Us"].map((item) => (
          <Link
            key={item}
            href="#"
            className="text-sm text-gray-200 hover:text-white hover:scale-105 transition-transform"
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="text-white hover:text-brand-green transition-colors">
          <Globe size={20} />
        </button>
        <Link
          href="#"
          className="hidden md:block text-white hover:text-brand-green font-medium"
        >
          Log in
        </Link>
        <Button variant="primary">Sign Up</Button>
      </div>
    </nav>
  );
}
