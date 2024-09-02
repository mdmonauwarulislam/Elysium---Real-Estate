/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import imgCover from '../assets/logo.jpg';

export default function ListingItem({ listing }) {
    return (
        <div className="bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-sm w-full sm:w-[330px]">
            <Link to={`/listing/${listing._id}`}>
                <img
                    src={listing.imageUrls[0] || imgCover}
                    alt="listing cover"
                    className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-200"
                />
                <div className="p-3 flex flex-col gap-2">
                    <p className="truncate text-lg font-semibold text-slate-700">
                        {listing.name}
                    </p>
                    <div className="flex items-center gap-1">
                        <MdLocationOn className="h-4 w-4 text-green-800" />
                        <p className="w-full text-sm text-gray-600">{listing.address}</p>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {listing.description}
                    </p>
                    <p className="text-slate-700 font-bold">
                        $
                        {listing.offer
                            ? listing.discountPrice.toLocaleString('en-US')
                            : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && '/month'}
                    </p>
                    <div className="text-slate-700 flex gap-4">
                        <div className="font-bold text-xs">
                            {listing.bedrooms > 1
                                ? `${listing.bedrooms} beds`
                                : `${listing.bedrooms} bed`}
                        </div>
                        <div className="font-bold text-xs">
                            {listing.bathrooms > 1
                                ? `${listing.bathrooms} baths`
                                : `${listing.bathrooms} bath`}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
