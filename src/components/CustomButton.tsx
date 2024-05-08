// CustomButton.tsx
import React, { ReactNode } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import Typography from './Typography';
import {Color} from './Color';

interface CustomButtonProps extends Omit<ButtonProps, 'variant'> {
    children: ReactNode;
    customVariant?: 'primary' | 'secondary' | 'tertiary'; // Custom variant types
    borderRadius?: number; // Define prop for border radius
    borderWidth?: number; // Define prop for border width
    borderColor?: string; // Define prop for border color
    textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none'; // Define prop for text transformation
    height?: number | string; // Define prop for button height
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, customVariant, borderRadius = 99, borderWidth = '0.0625rem', borderColor = '#020617', textTransform = 'none', height = '3rem', ...props }) => {
    let buttonStyle = {};

    if (customVariant) {
        switch (customVariant) {
            case 'primary':
                buttonStyle = { backgroundColor: Color.dark , color: Color.light };
                break;
            case 'secondary':
                buttonStyle = { backgroundColor: Color.light , color: Color.dark , borderColor: Color.grey };
                break;
            case 'tertiary':
                buttonStyle = { backgroundColor: Color.lightGrey, color: Color.dark, borderColor: Color.lightGrey };
                break;
            default:
                buttonStyle = {};
        }
    }

    return (
        <Button
            variant="outlined" // Use the outlined variant to make the border visible
            style={{ borderRadius, borderWidth, borderColor, boxShadow:  'none', textTransform, height, ...buttonStyle }}
            {...props}
        >
        <Typography variant='body'>
            {children}
        </Typography>
        </Button>
    );
};

export default CustomButton;
