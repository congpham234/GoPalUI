// Typography.js

import React, { ReactNode } from 'react'

interface TypographyProps {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'headline'
    | 'bodyBold'
    | 'body'
    | 'subHead'
    | 'caption'
  children: ReactNode
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
}) => {
  const getStyle = () => {
    switch (variant) {
      case 'h1':
        return {
          fontSize: '1.8rem',
          lineHeight: '1.5',
          fontWeight: '600',
          fontFamily: 'Poppins',
        }
      case 'h2':
        return {
          fontSize: '1.375rem',
          lineHeight: '1.5',
          fontWeight: '600',
          fontFamily: 'Poppins',
        }
      case 'h3':
        return {
          fontSize: '1.25rem',
          lineHeight: '1.5',
          fontWeight: '400',
          fontFamily: 'Poppins',
        }
      case 'headline':
        return {
          fontSize: '1.125rem',
          lineHeight: '1.5',
          fontWeight: '600',
          fontFamily: 'Poppins',
        }
      case 'bodyBold':
        return {
          fontSize: '1rem',
          lineHeight: '1.5',
          fontWeight: '600',
          fontFamily: 'Poppins',
        }
      case 'subHead':
        return {
          fontSize: '0.875rem',
          lineHeight: '1.5',
          fontWeight: '400',
          fontFamily: 'Poppins',
        }
      case 'caption':
        return {
          fontSize: '0.75rem',
          lineHeight: '1.5',
          fontWeight: '400',
          fontFamily: 'Poppins',
        }

      case 'body':
      default:
        return {
          fontSize: '1rem',
          lineHeight: '1.5',
          fontWeight: '400',
          fontFamily: 'Poppins',
        }
    }
  }

  return <div style={getStyle()}>{children}</div>
}

export default Typography
