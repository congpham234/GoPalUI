import React from 'react';
import Accordion from './Accordion';
import './DayPlanning.scss';

interface ActivityAccordion {
  activityName: string;
  location: string;
  description: string;
  detail?: ActivityDetail;
}

interface ActivityDetail {
  photoUri?: string;
}

interface DayDetail {
  dayNumber: number;
  activities: ActivityAccordion[];
}

interface DayPlanningProps {
  dayDetail: DayDetail;
}

function DayPlanning(props: DayPlanningProps) {
  const { dayDetail } = props;

  return (
    <div className="DayPlanning">
      <h2>Day {dayDetail.dayNumber}: </h2>
      {dayDetail.activities.map((activity, index) => (
        <Accordion
          key={index}
          title1={activity.activityName}
          title2={activity.location}
          image={activity.detail?.photoUri}
          content={activity.description}
        />
      ))}
    </div>
  );
}

export default DayPlanning;
