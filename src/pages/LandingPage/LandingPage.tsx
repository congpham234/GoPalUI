import React from 'react';
import CustomButton from '../../components/CustomButton';
import CustomSelect from '../../components/CustomSelect';
import Typography from '../../components/Typography';
import { FiSearch } from "react-icons/fi";
import CustomInputWithIcon from '../../components/CustomInput';
// Import other components as needed


function LandingPage() {
    return (
      <div className="LandingPage">
        <div>
            <Typography variant='h1'> Heading 1 </Typography>
            <Typography variant='h2'> Heading 2 </Typography>
            <Typography variant='h3'> Heading 3 </Typography>
            <Typography variant='headline'> Headline </Typography>
            <Typography variant='bodyBold'> Body Bold </Typography>
            <Typography variant='body'> Body </Typography>
            <Typography variant='subHead'> Subhead </Typography>
            <Typography variant='caption'> Caption </Typography>
        </div>
        
        <div>
            <CustomSelect icon={<FiSearch />}/>
        </div>
        <div>
          <CustomInputWithIcon 
            icon={FiSearch}
            label=''
            placeholder='Search by city or town'/>
        </div>
        <div>
            <CustomButton customVariant='primary'>Primary Button</CustomButton>
            <CustomButton customVariant='secondary'>Secondary Button</CustomButton>
            <CustomButton customVariant='tertiary'>Tertiary Button</CustomButton>
        </div>
      </div>
    );
  }
  
  export default LandingPage;