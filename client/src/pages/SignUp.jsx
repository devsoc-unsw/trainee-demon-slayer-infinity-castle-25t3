// client/src/pages/SignUp.jsx
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    // TODO: Add backend to create user
    console.log("Creating account..."); 
    
    // Temp, we redirect to the landing page after they 'create' the user
    navigate('/'); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg text-center">
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Join the Community</h2>
        
        <form onSubmit={handleSignUp} className="space-y-4">
          
          {/* Username */}
          <div className="text-left">
            <label className="block text-gray-700 font-medium mb-2">Username</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              placeholder="e.g. MapMaster25" 
              required 
            />
          </div>

          {/* Email */}
          <div className="text-left">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              placeholder="student@unsw.edu.au" 
              required 
            />
          </div>

          {/* Password */}
          <div className="text-left">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              placeholder="Create a strong password" 
              required 
            />
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg mt-6"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-2">
            <Link to="/signin" className="text-blue-600 font-medium hover:underline">
              Already have an account? Sign In
            </Link>
            <Link to="/" className="text-gray-500 text-sm hover:text-gray-700">
              &larr; Back to Home
            </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;