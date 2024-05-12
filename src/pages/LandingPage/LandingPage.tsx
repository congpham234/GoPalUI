import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import Typography from '../../components/Typography';
import { FiMenu } from 'react-icons/fi';
import styles from './LandingPage.module.scss';
import NewDateRangePicker from '../../components/CustomDateRangePicker';
import SearchInput from '../../components/SearchInput';
import NewSelect from '../../components/NewSelect';

import { Destination, SearchDestinationResponseContent } from 'gopalapimodel';
import apiClient from '../../configs';

function LandingPage() {
  const [destinations, setDestinations] = useState<Destination[]>();

  const handleOnSearch = async (
    value: string
  ): Promise<Array<{ imageUrl: string; title: string }>> => {
    try {
      if (!value) return [];

      const response: SearchDestinationResponseContent =
        await apiClient.searchDestination(value);
      const destinations: Array<Destination> = response.destinations ?? [];

      let autoSuggestOptions = [];
      for (const destination of destinations) {
        if (destination.imageUrl) {
          // Filter out empty or undefined values and join them with a comma
          const title = [
            destination.name,
            destination.cityName,
            destination.country,
          ]
            .filter(Boolean) // Removes falsy values such as undefined, null, empty string, etc.
            .join(', ');

          autoSuggestOptions.push({
            imageUrl: destination.imageUrl,
            title: title,
          });
        }
      }

      setDestinations(destinations);
      return autoSuggestOptions;
    } catch (error) {
      console.error('Failed to fetch search result:', error);
      return []; // It's good to return an empty array in case of an error
    }
  };

  return (
    <div className={styles.LandingPage}>
      <div className={styles.NavBar}>
        <img src="/images/GoPal-logo.svg" alt="GoPal Logo" />
        <div className={styles.Icon2rem}>
          <FiMenu />
        </div>
      </div>

      <div className={styles.Hero}>
        <img src="/images/GoPal-star.jpeg" alt="GoPal Star" />
        <Typography variant="h2"> Your AI Trip Assistant </Typography>
      </div>
      <div className={styles.InputSection}>
        <Typography variant="h3">Start planning your trip</Typography>
        <SearchInput
          placeholder="Search by city or town"
          handleOnSearch={handleOnSearch}
        />
        <NewDateRangePicker />
        <NewSelect />
        <CustomButton customVariant="primary">Plan My Trip</CustomButton>
      </div>
    </div>
  );
}

export default LandingPage;
