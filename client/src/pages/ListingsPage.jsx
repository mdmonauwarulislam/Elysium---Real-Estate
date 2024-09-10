/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
} from "react-icons/fa";

export const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    offer: false,
    furnished: false,
    parking: false,
    type: "all",
    sort: "createdAt",
    order: "desc",
    limit: 9,
    startIndex: 0,
  });


  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const queryString = new URLSearchParams(filters).toString();
        const res = await fetch(`${import.meta.env.VITE_API}/api/listing/get?${queryString}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error("Failed to fetch listings");
        }

        setListings(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListings();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Listings</h1>

      {/* Filter Section */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          name="searchTerm"
          placeholder="Search by name"
          value={filters.searchTerm}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="all">All Types</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
        <select
          name="sort"
          value={filters.sort}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="createdAt">Newest</option>
          <option value="price">Price</option>
        </select>
        <select
          name="order"
          value={filters.order}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Error fetching listings.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <Link
            to={`/listing/${listing._id}`}
            key={listing._id}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={listing.imageUrls[0]}
              alt={listing.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <p className="text-xl font-bold">
                {listing.name} - ₹
                {listing.offer ? (
                                <>
                                    <span className="line-through text-gray-500 px-2">
                                        {listing.regularPrice.toLocaleString("en-IN")}
                                    </span> 
                                    
                                    <span className="text-green-800 mr-3">
                                        {(+listing.regularPrice - +listing.discountPrice).toLocaleString("en-IN")}
                                    </span>
                                </>
                            ) : (
                                listing.regularPrice.toLocaleString("en-IN")
                            )}
              </p>
              <p className="flex items-center gap-2 text-sm text-slate-600">
                <FaMapMarkerAlt className="text-green-700" />
                {listing.address}
              </p>
              <p className="text-sm">
                {listing.bedrooms} {listing.bedrooms > 1 ? "Beds" : "Bed"} •{" "}
                {listing.bathrooms}{" "}
                {listing.bathrooms > 1 ? "Baths" : "Bath"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default ListingsPage;
