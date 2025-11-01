// src/app/dashboard/layout.tsx
import ProtectedPage from '@/components/auth/ProtectedPage';
import Link from 'next/link';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedPage>
            <div className="container mx-auto py-12 px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <nav className="w-full md:w-1/4">
                        <ul className="space-y-2">
                            <li>
                                <Link href="/dashboard" className="block p-2 rounded-md hover:bg-gray-100">
                                    My Profile
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/my-listings" className="block p-2 rounded-md hover:bg-gray-100">
                                    My Listings
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/favorites" className="block p-2 rounded-md hover:bg-gray-100">
                                    My Favorites
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/create-listing" className="block p-2 rounded-md bg-blue-100 text-blue-700 font-medium">
                                    + Create New Listing
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Page Content */}
                    <div className="w-full md:w-3/4">
                        {children}
                    </div>
                </div>
            </div>
        </ProtectedPage>
    );
}