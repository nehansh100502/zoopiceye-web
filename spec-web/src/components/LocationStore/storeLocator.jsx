
import React from "react";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import { Link } from 'react-router-dom';

// Store locations (latitude and longitude) - Coordinates for Rajrooppur, Prayagraj
const stores = [
  { id: 1, name: "Rajrooppur Store", position: { lat: 25.4900, lng: 81.8661 }, address: "Rajrooppur, Prayagraj, Uttar Pradesh, India" },
];

// Google Maps API container styles
const containerStyle = {
  width: "100%",
  height: "400px",
  maxWidth: "1024px",
  margin: "0 auto",
};

// Centered on Prayagraj (Uttar Pradesh)
const center = {
  lat: 25.4358,
  lng: 81.8463,
};

const StoreLocator = () => {
  // Load Google Maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Accessing env variable in Vite
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto py-1 bg-gray-100 pt-28">
      <h2 className="text-4xl font-bold text-orange-800 mb-6">Find Our Stores</h2>
      <Link to="https://www.google.com/maps/place/Zoopiceye+Opticals+Private+Limited/@25.4348168,81.7857484,16.84z/data" className="text-blue-500">Location Zoopiceye</Link>
      
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {/* Markers for each store */}
        {stores.map((store) => (
          <Marker key={store.id} position={store.position}>
            <InfoWindow position={store.position}>
              <div>
                <strong>{store.name}</strong>
                <br />
                {store.address}
              </div>
            </InfoWindow>
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
};

export default StoreLocator;
