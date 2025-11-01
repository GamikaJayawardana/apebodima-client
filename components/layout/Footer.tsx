export default function Footer() {
    return (
        <footer className="bg-gray-100 p-8 mt-16">
            <div className="container mx-auto text-center text-gray-600">
                <p>© {new Date().getFullYear()} ApeBodima.lk. All rights reserved.</p>
                <div className="flex justify-center gap-4 mt-4">
                    <a href="#">About Us</a>
                    <a href="#">Contact</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}