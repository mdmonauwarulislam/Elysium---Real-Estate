import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Carousel from '../components/Carousel';

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/listing/get');
        if (!response.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await response.json();


        // Ensure the listings array is correctly set
        setListings(data || []); // Adjust based on actual API response structure
      } catch (err) {
        setError(err.message);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="bg-gray-100">
      <main>
        <section>
          <Carousel />
        </section>
        <section className="container mx-auto px-4 py-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-zinc-800">Featured Properties</h2>
            <Link
              to="/listings"
              className="bg-gradient-to-br from-pink-300 via-purple-300 to-yellow-200 text-gray-800 hover:bg-gradient-to-lr focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 font-semibold text-lg px-6 py-2 rounded-lg shadow-md transition duration-300"
            >
              View All
            </Link>

          </div>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {listings.length > 0 ? (
                listings.slice(0, 6).map((listing) => (
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
                ))
              ) : (
                <p className="text-center">No listings available</p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
