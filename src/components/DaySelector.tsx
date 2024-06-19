import React, { useEffect, useState } from 'react';
import './DaySelector.scss';
import CustomButton from './CustomButton';

interface Day {
  dayNumber: number;
}

interface DaySelectorProps {
  days: Day[];
}

function DaySelector(props: DaySelectorProps) {
  const { days } = props;
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = ['Where to stay', ...days.map((day) => `Day ${day.dayNumber}`)];
  const sections = [
    'section1',
    ...days.map((_, index) => `section2-day${index + 1}`),
  ];

  const scrollToSection = (index: number) => {
    const section = document.getElementById(sections[index]);
    if (section) {
      const yOffset = -72;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    let currentActive = -1;
    sections.forEach((id, index) => {
      const section = document.getElementById(id);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 4 &&
          rect.bottom >= window.innerHeight / 4
        ) {
          currentActive = index;
        }
      }
    });
    if (currentActive !== activeTab && currentActive !== -1) {
      setActiveTab(currentActive);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab, sections]);

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <CustomButton
            key={index}
            className={activeTab === index ? 'active' : ''}
            onClick={() => scrollToSection(index)}
          >
            {tab}
          </CustomButton>
        ))}
      </div>
    </div>
  );
}

export default DaySelector;
