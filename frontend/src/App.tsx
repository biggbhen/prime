import React, { useState } from "react";
import "./App.css";
import FlightSearch from "./page/FlightSearch";
import HotelSearch from "./page/HotelSearch";
import AttractionSearch from "./page/AttractionSearch";
import AttractionCard from "./components/AttractionCard";
import HotelCard from "./components/HotelCard";
import FlightCard from "./components/FlightCard";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Banner from "../src/assets/banner.png";
import Avatar from "../src/assets/avatar.svg";
import { ToastContainer } from "react-toastify";
import { PiCalendarBlankBold, PiDotsThreeBold, PiUserPlusBold } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa6";
// import { FaArrowLeft } from "react-icons/fa6";

const App: React.FC = () => {
  const [isFlightModalOpen, setIsFlightModalOpen] = useState<boolean>(false);
  const [isHotelModalOpen, setIsHotelModalOpen] = useState<boolean>(false);
  const [isAttractionlModalOpen, setIsAttractionModalOpen] =
    useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const openFlightModal = () => setIsFlightModalOpen(true);

  const openAttractionModal = () => setIsAttractionModalOpen(true);

  const openHotelModal = () => setIsHotelModalOpen(true);
  const toggleRefresh = () => setRefreshTrigger((prev) => !prev);

  const closeFlightModal = () => {
    setIsFlightModalOpen(false);
    toggleRefresh();
  };

  const closeAttractionModal = () => {
    setIsAttractionModalOpen(false);
    toggleRefresh();
  };

  const closeHotelModal = () => {
    setIsHotelModalOpen(false);
    toggleRefresh();
  };

  return (
		<>
			<ToastContainer />
			<Navbar />
			<div className='flex'>
				<Sidebar />

				<div className=' bg-[#F0F2F5]  flex-1  lg:p-4 xl:p-6 xl:ml-72 px-2 mt-[5rem] lg:mt-[4rem] xl:mt-14 w-screen md:mx-3 my-5'>
					<div className='bg-white md:p-3 p-2 lg:p-3'>
						<div className=' z-10'>
							{/* <div className=' absolute top-4 z-10 left-3 bg-[#FFFFFF33]  rounded p-2'>
								<FaArrowLeft className='text-[#344054] cursor-pointer hover:text-[#1D2433]' />
							</div> */}

							<img src={Banner} className='w-full  mb-5' alt='' />
						</div>

						<div className=' flex md:flex-row flex-col  justify-between'>
							<div>
								<div className='flex bg-[#FEF4E6] font-medium text-[#7A4504] p-2 py-2 items-center me-3 text-xs rounded w-fit'>
									<span className='mr-1'>
										<PiCalendarBlankBold />
									</span>
									<span>21 March 2024</span>
									<span className='mx-1'>
										<FaArrowRight />
									</span>
									<span>21 April 2024</span>
								</div>

								<div className='text-[#000000] py-2 font-semibold text-xl md:text-2xl'>
									Bahamas Family Trip <br />
									<span className='md:text-base text-sm font-medium text-[#676E7E]'>
										New York, United States of America{' '}
										<span className=' text-[#D0D5DD]'>|</span> Solo Trip
									</span>
								</div>
							</div>

							<div>
								<div>
									<div className=''>
										<div className=' flex items-center'>
											<div className='py-3 cursor-pointer px-[4rem] me-3 rounded-sm bg-[#E7F0FF]'>
												<PiUserPlusBold className='text-[#0D6EFD]' />
											</div>
											<span className=" cursor-pointer">
												<PiDotsThreeBold size={30} className=' text-[#344054]' />
											</span>
										</div>
									</div>
                  <div className="mt-7 flex -bottom-[5px]">
                    <img src={Avatar} alt="avatar" />
                  </div>
								</div>
							</div>
						</div>

						<div className='flex flex-col md:flex-row md:space-x-2 gap-y-4 md:mb-20 my-7'>
							<Card
								title='Activities'
								description='Build, personalize, and optimize your itineraries with our trip planner.'
								buttonLabel='Add Activities'
								onButtonClick={openAttractionModal}
								bgColor='bg-[#000031]'
								textColor='text-white'
								btcolor='bg-[#0D6EFD]'
								btext='text-white'
							/>
							<Card
								title='Hotels'
								description='Build, personalize, and optimize your itineraries with our trip planner.'
								buttonLabel='Add Hotels'
								onButtonClick={openHotelModal}
								bgColor='bg-[#E7F0FF]'
								textColor='text-black'
								btcolor='bg-[#0D6EFD]'
								btext='text-white'
							/>
							<Card
								title='Flights'
								description='Build, personalize, and optimize your itineraries with our trip planner.'
								buttonLabel='Add Flights'
								onButtonClick={openFlightModal}
								bgColor='bg-[#0D6EFD]'
								textColor='text-white'
								btcolor='bg-white'
								btext='text-[#0D6EFD]'
							/>
						</div>

						{isFlightModalOpen && <FlightSearch onClose={closeFlightModal} />}
						{isHotelModalOpen && <HotelSearch onClose={closeHotelModal} />}
						{isAttractionlModalOpen && (
							<AttractionSearch onClose={closeAttractionModal} />
						)}

						<div className='my-3'>
							{' '}
							<h3 className='text-[#1D2433] text-lg font-semibold'>
								Trip itineraries
							</h3>{' '}
							<p className='#647995 text-sm font-medium'>
								Your trip itineraries are placed here
							</p>{' '}
						</div>
					</div>
					<div className='bg-white pb-4'>
						<FlightCard
							refreshTrigger={refreshTrigger}
							onButtonClick={openFlightModal}
						/>
						<HotelCard
							refreshTrigger={refreshTrigger}
							onButtonClick={openHotelModal}
						/>
						<AttractionCard
							refreshTrigger={refreshTrigger}
							onButtonClick={openAttractionModal}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
