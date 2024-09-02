import { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import ListingItem from '../components/ListingItem';

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
        // Ensure listings is an array
        setListings(data.listings || []);
      } catch (err) {
        setError(err.message);
        setListings([]); // Ensure listings is always an array
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-zinc-800 mb-8">Featured Properties</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {listings.length > 0 ? (
                listings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))
              ) : (
                <p>No listings available</p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
