import React, { useState } from 'react';
import './Accordion.scss';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import CustomButton from 'components/CustomButton';

interface AccordionProps {
  title: string;
  image?: string;
  content: string;
}

const Accordion: React.FC<AccordionProps> = ({ title, image, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-heading" onClick={toggleAccordion}>
        <p>{title}</p>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {isOpen && (
        <div className="accordion-content">
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
