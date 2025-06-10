import React, { useState } from "react";

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
    const [results, setResults] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = stations.filter(
            (station) =>
                station.name.toLowerCase().includes(query.toLowerCase()) ||
                station.address.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
    };

    return (
        <div
            style={{
                maxWidth: 500,
                margin: "2rem auto",
                fontFamily: "'Inter', Arial, sans-serif",
                background: "#f8fafc",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
        >
            <h2 style={{ fontWeight: 700, fontSize: "1.5rem", marginBottom: "1rem" }}>
                FuelBot — Find Nearby Fuel Stations
            </h2>
            <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem" }}>
                <input
                    type="text"
                    placeholder="Enter station name or address"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        flex: 1,
                        padding: "0.75rem",
                        borderRadius: "0.5rem",
                        border: "1px solid #d1d5db",
                        fontSize: "1rem",
                    }}
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
                        transition: "background 0.2s",
                    }}
                >
                    Search
                </button>
            </form>
            <div style={{ marginTop: "2rem" }}>
                {results.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        {results.map((station) => (
                            <div
                                key={station.id}
                                style={{
                                    background: "#fff",
                                    borderRadius: "0.75rem",
                                    padding: "1.25rem",
                                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1.25rem",
                                }}
                            >
                                <div style={{ fontSize: "2rem" }}>{station.fuelType}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>
                                        {station.name}
                                    </div>
                                    <div style={{ color: "#64748b", fontSize: "0.95rem" }}>
                                        {station.address}
                                    </div>
                                    <div style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
                                        <span style={{ color: "#16a34a", fontWeight: 500 }}>
                                            {station.price}
                                        </span>
                                        {" • "}
                                        <span style={{ color: "#2563eb" }}>
                                            {station.distance}
                                        </span>
                                    </div>
                                    <div style={{ marginTop: "0.25rem", color: "#475569", fontSize: "0.9rem" }}>
                                        {station.amenities.join(", ")}
                                    </div>
                                </div>
                                {/* Placeholder for navigation icon */}
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
                                    }}
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
        </div>
    );
}

export default FuelBot;