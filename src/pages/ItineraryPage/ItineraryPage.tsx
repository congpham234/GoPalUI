import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import HotelCarousel from '../../components/HotelCarousel';
import LoadingComponent from '../../components/LoadingComponent';
import styles from './ItineraryPage.module.scss';
import apiClient from 'configs';
import { Day, GetItineraryResponseContent, PlaceToStay } from 'gopalapimodel';
import DayPlanning from 'components/DayPlanning';

function ItineraryPage() {
  const location = useLocation();
  const { destination, numOfPeople, dateRange } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [placesToStay, setPlacesToStay] = useState<PlaceToStay[]>([]);
  const [planningDays, setPlanningDays] = useState<Day[]>([]);
  const [selectedDay, setSelectedDay] = useState<Day>();

  useEffect(() => {
    if (!destination || !dateRange) {
      return;
    }

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
        if (response.planningDays) {
          setSelectedDay(response.planningDays[0]);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchData();
  }, [destination, dateRange]);

  if (!destination || !dateRange) {
    return <Navigate to="/" />; // Redirect to the landing page if no destination
  }

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <div className={styles.Hero}>
        <div className={styles.Title}>{destination.name}</div>
        <img src={destination.imageUrl.url1000px} alt={destination.name} />
      </div>
      <div>
        <HotelCarousel items={placesToStay} />
      </div>
      <div>{selectedDay && <DayPlanning dayDetail={selectedDay} />}</div>
    </div>
  );
}

export default ItineraryPage;
