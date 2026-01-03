import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useAuth } from '../context/AuthContext';
import { createResource } from '../utils/api';
import 'leaflet/dist/leaflet.css';

// Helper for map
function LocationPicker({ setCoordinates }) {
  useMapEvents({
    click(e) {
      setCoordinates({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function AddResource() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // States
  const [formData, setFormData] = useState({
    name: '',
    category: 'Toilet',
    customCategory: '',
    building: '',
    level: '',
    description: '',
  });
  const [coordinates, setCoordinates] = useState({ lat: -33.9173, lng: 151.2313 });
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle user changes
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleGpsClick = () => {
    setLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoadingLocation(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError('Could not get your location. Please select manually on the map.');
          setLoadingLocation(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoadingLocation(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!isAuthenticated) {
      setError('You must be logged in to add a resource');
      navigate('/signin');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Map category to backend type
      const categoryMap = {
        'Toilet': 'Toilet',
        'Water': 'Water Fountain',
        'Microwave': 'Other', // Backend doesn't have Microwave
        'Vending': 'Vending Machine',
        'Wifi': 'WiFi Hotspot',
        'Outlet': 'Power Outlet',
        'Other': formData.customCategory || 'Other'
      };

      // Prepare data for backend
      const resourceData = {
        name: formData.name,
        type: categoryMap[formData.category],
        building: formData.building,
        floor: formData.level,
        description: formData.description,
        coordinates: [coordinates.lng, coordinates.lat] // Backend expects [longitude, latitude]
      };

      // Call backend API
      const result = await createResource(resourceData);
      
      console.log('Resource created:', result);
      
      // Redirect to home page or map
      navigate('/');
    } catch (err) {
      console.error('Create resource error:', err);
      const errorMsg = err.response?.data?.error || 'Failed to create resource';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Add New Resource</h2>
        
        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Category of the resource */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select 
              name="category" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white" 
              value={formData.category} 
              onChange={handleChange}
            >
              <option value="Toilet">Toilet</option>
              <option value="Water">Water Fountain</option>
              <option value="Microwave">Microwave</option>
              <option value="Vending">Vending Machine</option>
              <option value="Wifi">WiFi Hotspot</option>
              <option value="Outlet">Power Outlet</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Other input*/}
          {formData.category === 'Other' && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Specify Type</label>
              <input 
                type="text" 
                name="customCategory" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                placeholder="What type of resource is this?"
                value={formData.customCategory}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name / Title</label>
            <input 
              type="text" 
              name="name" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
              placeholder="e.g. Level 3 Toilet Near Lifts" 
              value={formData.name}
              onChange={handleChange} 
              required 
            />
          </div>

          {/* Building and level*/}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">Building</label>
              <input 
                type="text" 
                name="building" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                placeholder="e.g. Red Centre" 
                value={formData.building}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-32">
              <label className="block text-gray-700 font-medium mb-2">Floor</label>
              <input 
                type="text" 
                name="level" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                placeholder="e.g. 3" 
                value={formData.level}
                onChange={handleChange} 
              />
            </div>
          </div>

          {/* Description (NEW!) */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Description (Optional)</label>
            <textarea 
              name="description" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none" 
              placeholder="e.g. Clean and spacious toilet near the lifts"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-gray-400 mt-1 text-right">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Location on the map */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 font-medium">Pin Location</label>
              <button 
                type="button" 
                onClick={handleGpsClick}
                disabled={loadingLocation}
                className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 transition-colors flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingLocation ? "📍 Locating..." : "📍 Use My Location"}
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-2">Click the map to choose location manually.</p>

            <div className="h-64 w-full rounded-xl overflow-hidden border-2 border-gray-200 shadow-inner z-0 relative">
              <MapContainer center={[-33.9173, 151.2313]} zoom={17} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[coordinates.lat, coordinates.lng]} />
                <LocationPicker setCoordinates={setCoordinates} />
              </MapContainer>
            </div>
            <p className="text-xs text-right text-gray-400 mt-1">
              Lat: {coordinates.lat.toFixed(5)}, Lng: {coordinates.lng.toFixed(5)}
            </p>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex flex-col gap-3">
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Submitting...' : 'Submit Resource'}
            </button>
            <Link to="/" className="block text-center text-gray-500 hover:text-gray-700 font-medium">
              Cancel
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddResource;