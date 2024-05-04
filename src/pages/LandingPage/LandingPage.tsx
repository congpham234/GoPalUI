import React from 'react';
import CustomButton from '../../components/CustomButton';
import Typography from '../../components/Typography';
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
            <CustomButton customVariant="primary" onClick={() => console.log('Button clicked')}><Typography variant="body">
                Primary Button</Typography>
            </CustomButton>
            <CustomButton customVariant="secondary" onClick={() => console.log('Button clicked')}>
                Secondary Button
            </CustomButton>
            <CustomButton customVariant="tertiary" onClick={() => console.log('Button clicked')}>
                Tertiary Button
            </CustomButton>
        </div>
      </div>
    );
  }
  
  export default LandingPage;