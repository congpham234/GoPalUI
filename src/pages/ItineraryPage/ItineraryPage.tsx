import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import HotelCarousel from '../../components/HotelCarousel';
import LoadingComponent from '../../components/LoadingComponent';
import DayPlanning from 'components/DayPlanning';
import DaySelector from 'components/DaySelector';
import styles from './ItineraryPage.module.scss';
import apiClient from 'configs';
import { Day, GetItineraryResponseContent, PlaceToStay } from 'gopalapimodel';
import NavBar from 'components/NavBar';
import CustomButton from 'components/CustomButton';
import Modal from 'components/Modal';

const ItineraryPage = () => {
  const { state } = useLocation();
  const { destination, numOfPeople, dateRange } = state || {};

  const [loading, setLoading] = useState(true);
  const [placesToStay, setPlacesToStay] = useState<PlaceToStay[]>([]);
  const [planningDays, setPlanningDays] = useState<Day[]>([]);
  // const [isSaveButtonClick, setIsSaveButtonClick] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrimaryAction = () => {
    console.log("Primary action executed.");
    setIsModalOpen(false);
  };

  const handleSecondaryAction = () => {
    console.log("Secondary action executed.");
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!destination || !dateRange) return;

    const fetchData = async () => {
      try {
        const response: GetItineraryResponseContent =
          await apiClient.getItinerary({
            destination,
            numOfPeople,
            startDate: dateRange[0],
            endDate: dateRange[1],
          });
        setPlacesToStay(response.placesToStay || []);
        setPlanningDays(response.planningDays || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchData();
  }, [destination, dateRange, numOfPeople]);

  if (!destination || !dateRange) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div className={styles.ItineraryPage}>
      <div>
        <NavBar />
      </div>
      <div className={styles.Hero}>
        <div className={styles.Title}><h1>{destination.name}</h1></div>
        <img src={destination.imageUrl.url1000px} alt={destination.name} />
      </div>
      <DaySelector days={planningDays} />
      <div className={styles.BottomBar}>
        <div className={styles.ButtonBottomBar}>
        <CustomButton customVariant="primary" onClick={() => setIsModalOpen(true)} >
            Save plan
        </CustomButton>
        </div>
      </div>
      {isModalOpen && (
      <Modal
      title=""
      image="/images/GoPal-save.jpeg"
      content="Please log in to save your plan"
      primaryactiontitle="Log in with Google"
      secondaryactiontitle="Cancel"
      isDisabled={false}
      primaryaction={handlePrimaryAction}
      secondaryaction={handleSecondaryAction}
      onClose={handleCloseModal}
      />
      )}
      <div id="section1">
        <HotelCarousel items={placesToStay} />
      </div>
      {planningDays.map((day, index) => (
        <div id={`section2-day${index + 1}`} key={index}>
          <DayPlanning dayDetail={day} />
        </div>
      ))}
    </div>
  );
};

export default ItineraryPage;
