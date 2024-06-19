import React, { ReactNode } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
// import Typography from './Typography';
import './CustomButton.scss'; // Import the SCSS file

interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
  children: ReactNode;
  customVariant?: 'primary' | 'secondary' | 'tertiary' | 'link'; // Custom variant types
  borderRadius?: number; // Define prop for border radius
  borderWidth?: number; // Define prop for border width
  borderColor?: string; // Define prop for border color
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none'; // Define prop for text transformation
  height?: number | string; // Define prop for button height
  width?: number | string; // Define prop for button width
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  customVariant,
  borderRadius = 99,
  borderWidth = '0.0625rem',
  textTransform = 'none',
  height = '3rem',
  
  ...props
}) => {
  // Assign base class and variant-specific class
  const buttonClasses = ['custom-button', customVariant].filter(Boolean).join(' ');

  return (
    <Button
      variant="outlined" // Use the outlined variant to make the border visible
      className={buttonClasses} // Use CSS classes instead of inline styles
      style={{
        borderRadius,
        borderWidth,
        textTransform,
        height,
      }}
      {...props}
    >
      <p>{children}</p>
    </Button>
  );
};

export default CustomButton;
