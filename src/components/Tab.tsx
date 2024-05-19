import React, { useEffect, useState } from 'react';
import './Tabs.scss';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = ['Where to stay', 'Day 1', 'Day 2', 'Day 3'];
  const sections = ['section1', 'section2', 'section3', 'section4'];

  const scrollToSection = (index: number) => {
    const section = document.getElementById(sections[index]);
    if (section) {
        const yOffset = -72;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
  };

  const handleScroll = () => {
    let currentActive = -1;
    sections.forEach((id, index) => {
      const section = document.getElementById(id);
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 4 && rect.bottom >= window.innerHeight / 4) {
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
  }, [activeTab]);

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={activeTab === index ? 'active' : ''}
            onClick={() => scrollToSection(index)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
