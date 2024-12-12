import { useEffect, useState } from "react";
import ActiviteImage from "../assets/Airplain.svg";
import X from "../assets/X.png";
import Duration from "../assets/duration.png";
import { PiAirplaneInFlight, PiAirplaneLandingBold, PiAirplaneTakeoffBold, PiFilmSlateBold, PiForkKnifeBold, PiSuitcaseRollingBold, PiUsbBold } from "react-icons/pi";


interface Flight {
  iataCode: string;
  logoUrl: string | undefined;
  property: string | undefined;
  reviewsStats: string | undefined;
  name?: string;
  primaryPhoto?: { small?: string };
  shortDescription?: string;
  representativePrice?: { chargeAmount?: number };
}
interface ChildComponentProps {
  onButtonClick: () => void;
}

const FlightCard: React.FC<
  ChildComponentProps & { refreshTrigger: boolean }
> = ({ onButtonClick, refreshTrigger }) => {
  const [savedFlights, setSavedFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const flights = localStorage.getItem("savedFlights");

    if (flights) {
      const parsedFlights = JSON.parse(flights);
      setSavedFlights(parsedFlights);
    }
  }, [refreshTrigger]);
  return (
		<div className='md:p-5 p-2 bg-[#F0F2F5] mb-10 mx-3   rounded-md'>
			<div className='flex justify-between mb-5'>
				<div className='flex items-center'>
					<img
						src={ActiviteImage}
						alt=''
						className='mr-4 w-6 h-6 object-contain'
					/>
					<span className='text-lg font-semibold text-[#1D2433]'>Flights</span>
				</div>
				{savedFlights.length > 0 ? (
					<button
						onClick={onButtonClick}
						className='text-[#0D6EFD] bg-white px-4 py-2 rounded font-medium text-sm hover:bg-[#d1d1d1]'>
						Add Flights
					</button>
				) : (
					''
				)}
			</div>

			{savedFlights.length > 0 ? (
				savedFlights.map((airline, index) => (
					<div className='flex gap-0 mb-4' key={index}>
						<div className='w-full  border rounded-l-sm md:p-0 p-4 shadow-sm bg-white'>
							<div className='md:flex md:flex-col  flex-col'>
								<div className='md:flex justify-between md:p-5 lg:p-7'>
									<div className='flex gap-x-2 '>
										<div>
											{' '}
											<img
												src={airline.logoUrl}
												alt={'flight'}
												className='md:w-10 mt-3 mx-auto'
											/>
										</div>
										<div>
											<span className='font-semibold text-xl lg:text-xl md:text-lg  xl:text-xl text-[#1D2433]'>
												{airline.name || 'Unnamed flight'}
											</span>
											<br />
											<span className='text-[#676E7E] me-2 text-base font-medium'>
												AA-829 ·
											</span>

											<button className='p-1 text-xs bg-[#0A369D] rounded-[4px] px-2 py-2 text-white'>
												first class
											</button>
										</div>
									</div>

									<div>
										<div className='md:flex flex-col md:flex-row items-center text-center md:space-x-4 mt-4 md:mt-0'>
											<div>
												<p className='text-xl lg:text-xl md:text-lg  xl:text-xl  font-semibold text-[#1D2433]'>
													08:35
												</p>
												<p className='text-sm text-[#676E7E] '>Sun, 20 Aug</p>
											</div>

											<div className='flex flex-col items-center justify-center space-y-2 mt-2 md:mt-0'>
												<div className='flex items-center space-x-10'>
													<PiAirplaneTakeoffBold
														size={20}
														className='text-[#475367] '
													/>
													<span className='text-sm text-[#676E7E]'>
														Duration: 1h 45m
													</span>
													<PiAirplaneLandingBold
														size={20}
														className='text-[#475367]'
													/>
												</div>
												{/* Icon below duration */}
												<img src={Duration} alt='' className='w-[17rem]' />
												<p className=' text-sm text-[#676E7E]'>Direct</p>
											</div>

											<div>
												<p className='text-xl lg:text-xl md:text-lg  xl:text-xl  font-semibold'>
													09:55
												</p>
												<p className='text-sm text-gray-500'>Sun, 20 Aug</p>
											</div>
										</div>
									</div>
									<div>
										{/* Price */}
										<div className='text-right mt-4 md:mt-0'>
											<p className='text-xl lg:text-xl md:text-lg  xl:text-xl  font-semibold text-[#1D2433]'>
												{' '}
												$123.00
											</p>
										</div>
									</div>
								</div>
								{/* Facilities */}
								<div className='border-y mt-4 py-4 md:px-7'>
									<div className='flex text-xs space-y-1 xl:text-base md:text-xs font-medium flex-wrap items-center md:space-x-2 lg:space-x-4 text-greyText'>
										<div className='flex items-center mt-1'>Facilities:</div>
										<div className='flex items-center xl:space-x-2'>
											<PiSuitcaseRollingBold size={20} />
											<span>Baggage: 20kg, Cabin Baggage: 8kg</span>
										</div>
										<div className='flex items-center xl:space-x-2'>
											<PiFilmSlateBold size={20} />
											<span>In-flight entertainment</span>
										</div>
										<div className='flex items-center xl:space-x-2'>
											<PiForkKnifeBold size={20} />
											<span>In-flight meal</span>
										</div>
										<div className='flex items-center space-x-2'>
											<PiUsbBold size={20} />
											<span>USB Port</span>
										</div>
									</div>
								</div>

								<div className='flex text-xs md:text-sm md:justify-between gap-x-5 text-[#0D6EFD] mt-4 md:mt-0 md:px-7 md:py-5'>
									<div>
										<a href='#' className=' cursor-pointer me-5'>
											Flight details
										</a>
										<a href='#' className=' cursor-pointer'>
											Price details
										</a>
									</div>
									<a href='#' className=' cursor-pointer'>
										Edit details
									</a>
								</div>
							</div>
						</div>
						<div className='w-8 md:w-10 bg-[#FBEAE9] flex justify-center items-center rounded-r-md'>
							<img src={X} className='w-6 h-6 cursor-pointer' alt='' />
						</div>
					</div>
				))
			) : (
				<div className='bg-white p-8 md:p-14 xl:p-24 flex flex-col justify-center items-center space-y-4'>
					<div>
						<PiAirplaneInFlight size={40} />
					</div>
					<h3>No Request yet</h3>
					<button
						onClick={onButtonClick}
						className='text-white font-medium text-base  bg-[#0D6EFD] px-4 py-2 rounded  hover:bg-[#0d6dfdab'>
						Add Flights
					</button>
				</div>
			)}
		</div>
	);
};

export default FlightCard;