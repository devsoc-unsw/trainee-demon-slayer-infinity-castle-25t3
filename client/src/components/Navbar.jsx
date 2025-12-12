import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
                    🗺️ Resource Tracker
                </Link>

                <div className="flex gap-4 items-center">
                    {isAuthenticated ? (
                        <>
                            {/* Show username */}
                            <span className="text-gray-700 font-medium">
                                👤 {user?.username}
                            </span>
                            
                            {/* Logout button */}
                            <button 
                                onClick={handleLogout}
                                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Sign In button */}
                            <Link 
                                to="/signin" 
                                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                            >
                                Sign In
                            </Link>

                            {/* Sign Up button */}
                            <Link 
                                to="/signup" 
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;