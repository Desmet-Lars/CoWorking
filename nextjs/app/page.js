'use client'
import { useState } from 'react';
import { db, storage } from '../lib/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const UploadPage = () => {
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    console.log(latitude, longitude);
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage('');

      const lat = latitude;
      const lng = longitude;



      if (isNaN(lat) || isNaN(lng)) {
        setMessage('Error: Latitude and longitude must be valid numbers');
        setLoading(false);
        return;
      }

      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        setMessage('Error: Invalid coordinate range. Latitude must be between -90 and 90, Longitude between -180 and 180');
        setLoading(false);
        return;
      }

      try {
        const locationData = {
          name: name.trim(),
          latitude: Number(lat),
          longitude: Number(lng),
          imageUrl: imageUrl.trim(),
          timestamp: new Date(),
        };

        console.log('Data being sent to Firestore:', locationData);

        const docRef = await addDoc(collection(db, 'locations'), locationData);

        setName('');
        setLatitude('');
        setLongitude('');
        setImageUrl('');
        setMessage(`Data uploaded successfully! Document ID: ${docRef.id}`);
      } catch (error) {
        setMessage('Error uploading data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
          <h1 className="text-4xl font-bold text-center text-white mb-8">
            Add New Location
          </h1>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.includes('successfully')
                ? 'bg-green-900/50 text-green-400 border border-green-700'
                : 'bg-red-900/50 text-red-400 border border-red-700'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Location Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg
                            focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                            text-white placeholder-gray-400 transition duration-200"
                  placeholder="Enter location name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Image URL</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg
                            focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                            text-white placeholder-gray-400 transition duration-200"
                  placeholder="Enter image URL"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Latitude</label>
                <input
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg
                            focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                            text-white placeholder-gray-400 transition duration-200"
                  placeholder="Enter latitude"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Longitude</label>
                <input
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg
                            focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                            text-white placeholder-gray-400 transition duration-200"
                  placeholder="Enter longitude"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-gradient-to-r from-purple-600 to-indigo-600
                       text-white font-semibold py-3 px-6 rounded-lg
                       hover:from-purple-700 hover:to-indigo-700
                       focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                       focus:ring-offset-gray-800 transition duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : 'Add Location'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  export default UploadPage;
