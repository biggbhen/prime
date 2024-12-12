import React, { useEffect, useRef, useState } from 'react';
import { FaMapMarkerAlt, FaRegClock, FaStar } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AttractionSearchProps {
    onClose: () => void;
}

interface Attraction {
	representativePrice: unknown;
	reviewsStats: unknown;
	shortDescription: string;
	primaryPhoto: unknown;
	property: unknown;
	priceBreakdown: {
		grossPrice: {
			value: number;
		};
	};
	name: string;
	logoUrl: string;
	count: number;
	minPrice: {
		currencyCode: string;
		units: number;
		nanos: number;
	};
	photoUrls: string[];
}

const AttractionSearch: React.FC<AttractionSearchProps> = ({ onClose }) => {
    const [location, setLocation] = useState<string>('');
    const [arrivalDate, setArrivalDate] = useState<string>('');
    const [departureDate, setDepartureDate] = useState<string>('');
    const [destId, setDestId] = useState<string | null>(null);
    const [Attractions, setAttractions] = useState<Attraction[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;



    const  isButtonDisabled = !location || !departureDate || !arrivalDate;


    const handleAttractionClick = (attraction: Attraction) => {
        // Retrieve existing attractions or initialize an empty array
        const savedAttractions = localStorage.getItem("savedAttractions")
            ? JSON.parse(localStorage.getItem("savedAttractions") as string)
            : [];
        
        // Ensure savedAttractions is an array and then push the new attraction
        savedAttractions.push(attraction);
    
        // Save back to localStorage
        localStorage.setItem("savedAttractions", JSON.stringify(savedAttractions));
        toast.success("Hotel added!");
        
        console.log("Newly saved attractions:", savedAttractions); // Debug log
    };
    
    
    
    

    const fetchDestId = async (location: string): Promise<void> => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://booking-com15.p.rapidapi.com/api/v1/attraction/searchLocation?query=${location}`,
                {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': apiKey,
                        'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
                    },
                }
            );
            const data = await response.json();
            setDestId(data.data.products[0]?.id || null);
        } catch (error) {
            setError(`Error fetching destination ID - You have exceeded the MONTHLY quota for requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/DataCrawler/api/booking-com15. ${error}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!destId || !arrivalDate || !departureDate) {
            setError("Please provide all required information.");
            return;
        }

        const searchUrl = `https://booking-com15.p.rapidapi.com/api/v1/attraction/searchAttractions?id=${destId}&startDate=${arrivalDate}&endDate=${departureDate}&sortBy=trending&page=1`;

        try {
            setLoading(true);
            const response = await fetch(searchUrl, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': apiKey,
                    'x-rapidapi-host': 'booking-com15.p.rapidapi.com',
                },
            });
            const result = await response.json();
            setAttractions(result.data.products || []);
        } catch (error) {
            setError(`Error fetching destination ID - You have exceeded the MONTHLY quota for requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/DataCrawler/api/booking-com15. ${error}`);
            return null;
        }finally {
            setLoading(false);
        }
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);
    // console.log('key',apiKey)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div
            ref={modalRef}
            className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl h-[95vh] mx-4 overflow-hidden"
        >
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Activitie Search</h2>
    
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input
                
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onBlur={() => fetchDestId(location)}
                    className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>
    
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                
                    type="date"
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <input
                    
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>
    
            <button
                disabled={isButtonDisabled}
                onClick={handleSearch}
                className={` bg-blue-600 ${isButtonDisabled ? ' opacity-50 cursor-not-allowed' : ''} text-white px-4 py-3 rounded-lg w-full mt-2 mb-4 hover:bg-blue-700 transition font-semibold`}
            >
                    Search Activities
                </button>
    
            {loading ? (
                <div className="flex justify-center items-center my-8">
                    <ImSpinner2 className="animate-spin text-blue-500 text-4xl" />
                </div>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <div className="mt-4 h-96 overflow-y-auto">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Available Attractions</h3>
                    <div className="space-y-4">
                        {Attractions.length > 0 ? (
                            Attractions.map((attraction, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col hover:shadow-lg hover:cursor-pointer hover:opacity-50 shadow-sm sm:flex-row items-center p-4 border rounded-lg  bg-gray-50"
                                    onClick={() => handleAttractionClick(attraction)}
                                >
                                    <img
                                        src={attraction.primaryPhoto?.small || '/fallback-image.png'}
                                        alt={attraction.name || 'Attraction'}
                                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover mb-4 sm:mb-0"
                                    />
                                    <div className="flex-1 sm:ml-4">
                                        <h4 className="text-lg font-semibold text-gray-900">
                                            {attraction.name || 'Unnamed Attraction'}
                                        </h4>
                                        <p className="text-gray-600 text-sm mb-2">
                                            {attraction.shortDescription || 'No description available.'}
                                        </p>
                                        <div className="flex items-center space-x-2 text-gray-600 text-sm">
                                            <FaMapMarkerAlt className="text-blue-500" />
                                            <span>Directions</span>
                                            <FaStar className="text-yellow-400 ml-4" />
                                            <span>
                                                {attraction.reviewsStats?.combinedNumericStats.average || 'N/A'} (
                                                {attraction.reviewsStats?.combinedNumericStats.total || '0'})
                                            </span>
                                            <FaRegClock className="ml-4" />
                                            <span>1 Hour</span>
                                        </div>
                                    </div>
    
                                    <div className="text-right sm:ml-4">
                                        <p className="text-xl font-bold text-gray-800">
                                            ${attraction.representativePrice?.chargeAmount || 'N/A'}
                                        </p>
                                        <p className="text-xs text-gray-500">10:30 AM on Mar 19</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm mb-2">No activities available.</p>
                        )}
                    </div>
                </div>
            )}
    
          
        </div>
    </div>
    
    );
};

export default AttractionSearch;