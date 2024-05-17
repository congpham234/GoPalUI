import React, { useState } from 'react';
import './Accordion.scss';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import CustomButton from 'components/CustomButton';

interface AccordionProps {
  title1: string;
  title2: string;
  image?: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({
  title1,
  title2,
  image,
  content,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-heading" onClick={toggleAccordion}>
        <h3>{title1}</h3>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {isOpen && (
        <div className="accordion-content">
          <h4>{title2}</h4>
          {image && <img src={image} />}
          <p>{content}</p>
          <CustomButton customVariant="secondary">
            Find guided tour
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default Accordion;
