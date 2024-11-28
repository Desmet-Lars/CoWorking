// pages/upload.js
'use client'
import { useState } from 'react';
import { db, storage } from '../lib/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const UploadPage = () => {
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
        // Step 1: Store the data in Firestore with the provided image URL
        const docRef = await addDoc(collection(db, 'locations'), {
          name: name,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          imageUrl: imageUrl,  // Use the provided image URL
          timestamp: new Date(),
        });

        setMessage(`Data uploaded successfully! Document ID: ${docRef.id}`);
      } catch (error) {
        setMessage('Error uploading data: ' + error.message);
      } finally {
        setLoading(false); // Stop loading after the process
      }
    };

    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Upload Location Data</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Location Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-3 text-black  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Latitude:</label>
            <input
              type="text"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
              className="p-3 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Longitude:</label>
            <input
              type="text"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
              className="p-3 text-black  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium mb-2">Image URL:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="p-3 text-black  border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full text-black  p-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Uploading...' : 'Submit'}
          </button>
        </form>
        {message && <p className="text-center mt-4">{message}</p>}
      </div>
    );
  };

  export default UploadPage;
