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
        <b>{title1}</b>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {isOpen && (
        <div className="accordion-content">
          <div className="detail-image">{image && <img src={image} />}</div>
          <div className="detail-content">
            <p>{content}</p>
            <div className="button">
              <CustomButton customVariant="secondary">
                Find guided tour
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
