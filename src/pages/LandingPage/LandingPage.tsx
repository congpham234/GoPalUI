import React from 'react';
import CustomButton from '../../components/CustomButton';
import Typography from '../../components/Typography';
// import { FiSearch } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
// import CustomInputWithIcon from '../../components/CustomInput';
import styles from './LandingPage.module.scss';
// import CustomSelect from '../../components/CustomSelect';
import NewDateRangePicker from '../../components/CustomDateRangePicker';
import NewInput from '../../components/NewInput';
import NewSelect from '../../components/NewSelect';
// Import other components as needed


function LandingPage() {
    return (
      <div className={styles.LandingPage}>
        <div className={styles.NavBar}>
            <img src="/images/GoPal-logo.svg" alt="GoPal Logo" />
            <div className={styles.Icon2rem}><FiMenu /></div>
        </div>
        
        <div className={styles.Hero}>
            <img src="/images/GoPal-star.jpeg" alt="GoPal Star" />
            <Typography variant='h2'> Your AI Trip Assistant </Typography>
        </div>
        <div className={styles.InputSection}>
          <div><Typography variant='h3'>Start planning your trip</Typography></div>
          {/* <div><CustomInputWithIcon icon={FiSearch} label=''placeholder='Search by city or town'/></div> */}
          <div><NewInput/></div>
          <div><NewDateRangePicker /></div>
          <div><NewSelect/></div>
          {/* <div><CustomSelect/></div> */}
          <div><CustomButton customVariant='primary'>Plan My Trip</CustomButton></div>
        </div>
        
      </div>
    );
  }
  
  export default LandingPage;