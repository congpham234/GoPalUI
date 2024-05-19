import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

import CustomButton from '../../components/CustomButton';
import Typography from '../../components/Typography';
import DateRangePicker from '../../components/DateRangePicker';
import SearchInput from '../../components/SearchInput';
import SelectPeople from '../../components/SelectPeople';
import NavBar from 'components/NavBar';

import { Destination, SearchDestinationResponseContent } from 'gopalapimodel';
import apiClient from '../../configs';
import styles from './LandingPage.module.scss';

const LandingPage = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const selectedNumPeople = useRef<number>(1);
  const selectedDateRange = useRef<string[]>([]);

  const navigate = useNavigate();

  const handleOnSearchDestination = async (value: string) => {
    if (!value) return [];

    try {
      const response: SearchDestinationResponseContent = await apiClient.searchDestination(value);
      const destinations = response.destinations || [];

      setDestinations(destinations);

      return destinations.map((dest) => ({
        key: dest.destId,
        imageUrl: dest.imageUrl?.url150px,
        title: dest.label,
      }));
    } catch (error) {
      console.error('Failed to fetch search result:', error);
      return [];
    }
  };

  const handleOnSelectDestination = (destinationKey: string) => {
    const destination = destinations.find((dest) => dest.destId === destinationKey);
    setSelectedDestination(destination || null);
  };

  const handleOnDateRangeSelected = (dates: string[] | null, dateStrings: [string, string]) => {
    selectedDateRange.current = dateStrings;
  };

  const handlePlanMyTrip = () => {
    if (!selectedDestination) {
      setWarning('Please select a destination from the dropdown.');
      return;
    }

    const startDate = new Date(selectedDateRange.current[0]);
    const endDate = new Date(selectedDateRange.current[1]);
    const dateDifference = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

    if (dateDifference > 5) {
      setWarning('The date range should not be more than 5 days.');
      return;
    }

    setWarning(null);
    navigate('/itinerary', {
      state: {
        destination: selectedDestination,
        numOfPeople: selectedNumPeople.current,
        dateRange: selectedDateRange.current,
      },
    });
  };

  const handleOnSelectNumPeople = (value: string) => {
    selectedNumPeople.current = parseInt(value, 10);
  };

  return (
    <div className={styles.LandingPage}>
      <NavBar />
      <div className={styles.Hero}>
        <img src="/images/GoPal-star.jpeg" alt="GoPal Star" />
        <Typography variant="h2">Your AI Trip Assistant</Typography>
      </div>
      <div className={styles.InputSection}>
        <Typography variant="h3">Start planning your trip</Typography>
        <SearchInput
          placeholder="Search by city or town"
          onSearch={handleOnSearchDestination}
          onSelect={handleOnSelectDestination}
        />
        <DateRangePicker onChange={handleOnDateRangeSelected} />
        <SelectPeople onSelect={handleOnSelectNumPeople} />
        {warning && <div className={styles.Warning}>{warning}</div>}
        <CustomButton customVariant="primary" onClick={handlePlanMyTrip}>
          Plan My Trip
        </CustomButton>
      </div>
    </div>
  );
};

export default LandingPage;
