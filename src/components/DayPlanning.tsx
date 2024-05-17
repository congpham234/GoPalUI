import React from 'react';
import Accordion from './Accordion';
import './DayPlanning.scss';

interface AccordionData {
  title: string;
  image?: string;
  content: string;
}

interface DayPlanningProps {
  data: {
    heading: string;
    accordions: AccordionData[];
  };
}

const DayPlanning: React.FC<DayPlanningProps> = ({ data }) => {
  const { heading, accordions } = data;

  return (
    <div className="DayPlanning">
      <h2>{heading}</h2>
      {accordions.map((accordion, index) => (
        <Accordion
          key={index}
          title={accordion.title}
          image={accordion.image}
          content={accordion.content}
        />
      ))}
    </div>
  );
};

export default DayPlanning;
