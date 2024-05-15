import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Accordion from 'components/Accordion';
import HotelCarousel from '../../components/Carousel';
import LoadingComponent from '../../components/LoadingComponent';
import styles from './ItineraryPage.module.scss';

function ItineraryPage() {
  const location = useLocation();
  const { destination, numOfPeople, dateRange } = location.state || {};

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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
        <HotelCarousel />
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
