import React, { useState } from "react";
import { useEffect } from "react";

// Mock data for fuel stations (add price, fuelType, amenities for demo)
const stations = [
    {
        id: 1,
        name: "bharath petroleum champapet",
        address: "champapet, Hyderabad",
        distance: "1.2 km",
        price: "$3.49/gal",
        fuelType: "⛽️", // Placeholder icon
        amenities: ["Restroom", "ATM"],
    },
    {
        id: 2,
        name: "CNG LB NAGAR",
        address: "MAIN ROAD LB NAGAR HYDERABAD",
        distance: "2.5 km",
        price: "$3.39/gal",
        fuelType: "⛽️",
        amenities: ["Car Wash"],
    },
    {
        id: 3,
        name: "INDIAN OIL PETROL PUMP",
        address: "Kothapet, Hyderabad",
        distance: "3.1 km",
        price: "$3.59/gal",
        fuelType: "⛽️",
        amenities: ["Cafe", "ATM"],
    },
];

function FuelBot() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(stations);
    const [loading, setLoading] = useState(false);
    const [userLocation, setUserLocation] = useState(null); // Store user's location

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = stations.filter(
            (station) =>
                station.name.toLowerCase().includes(query.toLowerCase()) ||
                station.address.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
    };

    // Pass setUserLocation to NearbyButton
    return (
        <div
            style={{
                maxWidth: 520,
                margin: "2rem auto",
                fontFamily: "'Inter', Arial, sans-serif",
                background: "#fff",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            }}
        >
            <h2 style={{ fontWeight: 700, fontSize: "1.7rem", marginBottom: "1.2rem", color: "#1e293b" }}>
                ⛽️ FuelBot — Find Nearby Fuel Stations
            </h2>
            <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                <input
                    type="text"
                    placeholder="Search by name or address"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        flex: 1,
                        padding: "0.75rem",
                        borderRadius: "0.5rem",
                        border: "1px solid #d1d5db",
                        fontSize: "1rem",
                        background: "#f1f5f9",
                        transition: "box-shadow 0.2s, border 0.2s",
                        outline: "none",
                    }}
                    onFocus={e => e.target.style.boxShadow = "0 0 0 2px #2563eb33"}
                    onBlur={e => e.target.style.boxShadow = "none"}
                />
                <button
                    type="submit"
                    style={{
                        padding: "0.75rem 1.25rem",
                        borderRadius: "0.5rem",
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "background 0.2s, transform 0.1s",
                    }}
                    onMouseDown={e => e.target.style.transform = "scale(0.96)"}
                    onMouseUp={e => e.target.style.transform = "scale(1)"}
                    onMouseLeave={e => e.target.style.transform = "scale(1)"}
                >
                    Search
                </button>
                <NearbyButton setResults={setResults} setLoading={setLoading} setUserLocation={setUserLocation} />
            </form>
            <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "1rem 0" }} />
            <div style={{ marginTop: "1.5rem", minHeight: 120 }}>
                {loading ? (
                    <div style={{ textAlign: "center", color: "#2563eb" }}>
                        <span className="spinner" style={{
                            display: "inline-block",
                            width: 24,
                            height: 24,
                            border: "3px solid #dbeafe",
                            borderTop: "3px solid #2563eb",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                            marginRight: 8,
                            verticalAlign: "middle"
                        }} />
                        Locating...
                    </div>
                ) : results.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                        {results.map((station) => (
                            <div
                                key={station.id}
                                style={{
                                    background: "#f9fafb",
                                    borderRadius: "0.75rem",
                                    padding: "1.25rem",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1.25rem",
                                    border: "1px solid #e5e7eb",
                                    transition: "box-shadow 0.2s, transform 0.1s",
                                    cursor: "pointer"
                                }}
                                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(37,99,235,0.08)"}
                                onMouseLeave={e => e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"}
                            >
                                <div style={{ fontSize: "2rem" }}>{station.fuelType}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: "1.1rem", color: "#0f172a" }}>
                                        {station.name}
                                    </div>
                                    <div style={{ color: "#64748b", fontSize: "0.97rem" }}>
                                        {station.address}
                                    </div>
                                    <div style={{ marginTop: "0.5rem", fontSize: "0.97rem" }}>
                                        <span style={{ color: "#16a34a", fontWeight: 500 }}>
                                            {station.price}
                                        </span>
                                        {" • "}
                                        <span style={{ color: "#2563eb" }}>
                                            {station.distance}
                                        </span>
                                    </div>
                                    <div style={{ marginTop: "0.25rem", color: "#475569", fontSize: "0.93rem" }}>
                                        {station.amenities.join(", ")}
                                    </div>
                                </div>
                                <button
                                    title="Navigate"
                                    style={{
                                        background: "#e0e7ef",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "2.5rem",
                                        height: "2.5rem",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "1.3rem",
                                        cursor: "pointer",
                                        transition: "background 0.2s, transform 0.1s"
                                    }}
                                    onClick={() => {
                                        // If user location is known, use it as origin, else just show destination
                                        const origin = userLocation
                                            ? `${userLocation.latitude},${userLocation.longitude}`
                                            : "";
                                        const destination = `${station.lat},${station.lng}`;
                                        const url = origin
                                            ? `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`
                                            : `https://www.google.com/maps/search/?api=1&query=${destination}`;
                                        window.open(url, "_blank");
                                    }}
                                    onMouseDown={e => e.target.style.transform = "scale(0.92)"}
                                    onMouseUp={e => e.target.style.transform = "scale(1)"}
                                    onMouseLeave={e => e.target.style.transform = "scale(1)"}
                                >
                                    🧭
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ color: "#64748b" }}>
                        No stations found. Try searching for a name or address.
                    </p>
                )}
            </div>
            <style>
                {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
            </style>
        </div>
    );
}

export default FuelBot;
/**
 * Get user's current location and show nearby stations sorted by distance.
 * Uses browser Geolocation API and Haversine formula for distance.
 */

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Add mock lat/lng to stations for demo
stations[0].lat = 17.3535; stations[0].lng = 78.5176; // champapet
stations[1].lat = 17.3521; stations[1].lng = 78.5550; // LB Nagar
stations[2].lat = 17.3660; stations[2].lng = 78.5370; // Kothapet
// "Nearby" button component for location-based search
function NearbyButton({ setResults, setLoading, setUserLocation }) {
  const handleNearby = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    setLoading && setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation && setUserLocation({ latitude, longitude }); // Save user location
        const sorted = [...stations]
          .map((station) => ({
            ...station,
            distanceKm: getDistanceFromLatLonInKm(
              latitude,
              longitude,
              station.lat,
              station.lng
            ),
          }))
          .sort((a, b) => a.distanceKm - b.distanceKm)
          .map((s) => ({
            ...s,
            distance: `${s.distanceKm.toFixed(2)} km`,
          }));
        setResults(sorted);
        setLoading && setLoading(false);
      },
      () => {
        alert("Unable to get your location.");
        setLoading && setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <button
      type="button"
      onClick={handleNearby}
      style={{
        padding: "0.75rem 1.25rem",
        borderRadius: "0.5rem",
        background: "#10b981",
        color: "#fff",
        border: "none",
        fontWeight: 600,
        cursor: "pointer",
        marginLeft: "0.5rem",
        transition: "background 0.2s, transform 0.1s",
      }}
      onMouseDown={e => e.target.style.transform = "scale(0.96)"}
      onMouseUp={e => e.target.style.transform = "scale(1)"}
      onMouseLeave={e => e.target.style.transform = "scale(1)"}
    >
      Nearby
    </button>
  );
}
