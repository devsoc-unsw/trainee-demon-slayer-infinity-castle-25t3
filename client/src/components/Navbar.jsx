function Navbar() {
    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900">
                    🗺️ Resource Tracker
                </span>

                <div className="flex gap-4">
                    <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors">
                        Sign In
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                        Sign Up
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;