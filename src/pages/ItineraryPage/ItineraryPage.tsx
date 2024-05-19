import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import HotelCarousel from '../../components/HotelCarousel';
import LoadingComponent from '../../components/LoadingComponent';
import styles from './ItineraryPage.module.scss';
import apiClient from 'configs';
import { Day, GetItineraryResponseContent, PlaceToStay } from 'gopalapimodel';
import DayPlanning from 'components/DayPlanning';
import DaySelector from 'components/DaySelector';

function ItineraryPage() {
  const location = useLocation();
  const { destination, numOfPeople, dateRange } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [placesToStay, setPlacesToStay] = useState<PlaceToStay[]>([]);
  const [planningDays, setPlanningDays] = useState<Day[]>([]);

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
        <DaySelector days={planningDays} />
        <div id="section1">
          <HotelCarousel items={placesToStay} />
        </div>
        {planningDays.map((day, index) => (
          <div id={`section2-day${index + 1}`} key={index}>
            <DayPlanning dayDetail={day} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItineraryPage;
