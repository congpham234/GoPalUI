import React, { useEffect, useRef, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Accordion from 'components/Accordion';
import HotelCarousel from '../../components/HotelCarousel';
import LoadingComponent from '../../components/LoadingComponent';
import styles from './ItineraryPage.module.scss';
import apiClient from 'configs';
import { Day, GetItineraryResponseContent, PlaceToStay } from 'gopalapimodel';

function ItineraryPage() {
  const location = useLocation();
  const { destination, numOfPeople, dateRange } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [placesToStay, setPlacesToStay] = useState<PlaceToStay[]>([]);
  const [planningDays, setPlanningDays] = useState<Day[]>([]);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!destination || !dateRange) {
      return;
    }

    const fetchData = async () => {
      try {
        if (loading) {
          const response: GetItineraryResponseContent =
            await apiClient.getItinerary({
              destination,
              numOfPeople,
              startDate: dateRange[0],
              endDate: dateRange[1],
            });
          setPlacesToStay(response.placesToStay || []);
          setPlanningDays(response.planningDays || []);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false); // Set loading to false after the API call
      }
    };

    if (!isMounted.current) {
      fetchData();
      isMounted.current = true;
    }
  }, [placesToStay, planningDays]);

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
      <div>
        <Accordion
          title="Central Park"
          image="https://a.cdn-hotels.com/gdcs/production116/d1103/0ffba831-3af6-4ec5-918b-edd67a21480e.jpg"
          content="Start your day with a leisurely stroll or bike ride in Central Park. You can rent bikes or take a guided tour."
        />
        <Accordion
          title="Times Square"
          image="https://images.ctfassets.net/1aemqu6a6t65/46MJ6ER585Rwl3NraEIoGL/784c5eb5d87f576b5548b1a2255f08e7/tripadvisortimessquare_taggeryanceyiv_5912?w=1200&h=800&q=75"
          content="Head to Times Square to experience the bustling energy of the city, and maybe catch a Broadway show in the evening."
        />
      </div>
    </div>
  );
}

export default ItineraryPage;
