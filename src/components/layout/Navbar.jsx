import Link from "next/link";
import Button from "../ui/Button";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 lg:px-20 py-6 bg-white sticky top-0 z-50 border-b border-gray-100">
      <Link href="/" className="text-2xl font-bold flex items-center gap-2">
        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
          A
        </div>
        ApeBodima
      </Link>

      <div className="hidden md:flex gap-8 text-gray-600 font-medium">
        <Link href="/" className="hover:text-black">
          Home
        </Link>
        <Link href="/listings" className="hover:text-black">
          Properties
        </Link>
        <Link href="/about" className="hover:text-black">
          About
        </Link>
      </div>

      <div className="flex gap-3">
        <Link href="/login">
          <Button variant="ghost">Sign In</Button>
        </Link>
        <Link href="/register">
          <Button variant="primary">Sign Up</Button>
        </Link>
      </div>
    </nav>
  );
}
