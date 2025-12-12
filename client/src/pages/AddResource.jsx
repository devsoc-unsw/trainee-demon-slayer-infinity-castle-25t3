import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
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
  const [usingMyLocation, setUsingMyLocation] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle user changes
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGpsClick = () => {
    setLoadingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setUsingMyLocation(true);
        setLoadingLocation(false);
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Resource added");
    navigate('/map');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Add New Resource</h2>
        
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
              <option value="Water">Water Station</option>
              <option value="Microwave">Microwave</option>
              <option value="Vending">Vending Machine</option>
              <option value="Wifi">Wifi Spot</option>
              <option value="Outlet">Power Outlet</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Other input*/}
          {formData.category === 'Other' && (
            <div>
              <input 
                type="text" 
                name="customCategory" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                placeholder="What type of resource is this?"
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name / Description</label>
            <input 
              type="text" 
              name="name" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
              placeholder="e.g. Quiet Study Nook" 
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
                placeholder="e.g. Quad" 
                onChange={handleChange} 
              />
            </div>
            <div className="w-24">
              <label className="block text-gray-700 font-medium mb-2">Level</label>
              <input 
                type="text" 
                name="level" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
                placeholder="Lvl" 
                onChange={handleChange} 
              />
            </div>
          </div>

          {/* Uploading photos */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Add a Photo</label>
            <input 
              type="file" 
              id="hidden-file-input" 
              accept="image/*" 
              onChange={handleImageChange}
              className="hidden" 
            />
            
            <label 
              htmlFor="hidden-file-input" 
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {imageFile ? (
                <span className="text-blue-600 font-semibold flex items-center gap-2">
                   📸 {imageFile.name}
                </span>
              ) : (
                <div className="flex flex-col items-center pt-5 pb-6">
                    <p className="text-sm text-gray-500 font-semibold">Click to upload image</p>
                    <p className="text-xs text-gray-400">SVG, PNG, JPG (MAX. 800x400px)</p>
                </div>
              )}
            </label>

            {imagePreview && (
              <div className="mt-4 flex justify-center">
                <img src={imagePreview} alt="Preview" className="max-h-40 rounded-lg shadow-sm border border-gray-200" />
              </div>
            )}
          </div>

          {/* Location on the map */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 font-medium">Pin Location</label>
              <button 
                type="button" 
                onClick={handleGpsClick}
                className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
              >
                {loadingLocation ? "Locating..." : "Use My Location"}
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-2">Tap the map to choose location manually.</p>

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
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
            >
                Submit Resource
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