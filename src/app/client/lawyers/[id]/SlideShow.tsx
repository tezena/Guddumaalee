import React, { useState, useEffect } from 'react';
import { LawyerProps } from '@/components/lawyersCard';


interface SlideshowProps {
  lawyers: LawyerProps[];
}

const Slideshow: React.FC<SlideshowProps> = ({ lawyers }) => {
  const [currentLawyerIndex, setCurrentLawyerIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentLawyerIndex((prevIndex) =>
        prevIndex === lawyers.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change lawyer every 5 seconds

    return () => clearTimeout(timer);
  }, [currentLawyerIndex, lawyers]);

  const setPreviousLawyer = () => {
    setCurrentLawyerIndex((prevIndex) =>
      prevIndex === 0 ? lawyers.length - 1 : prevIndex - 1
    );
  };

  const setNextLawyer = () => {
    setCurrentLawyerIndex((prevIndex) =>
      prevIndex === lawyers.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="slideshow-container">
      <div className="slideshow-item">
        <img
          src={lawyers[currentLawyerIndex].imageUrl}
          alt={lawyers[currentLawyerIndex].name}
          className="slideshow-image"
        />
        <div className="slideshow-text">
          <h2>{lawyers[currentLawyerIndex].name}</h2>
        </div>
      </div>
      <a className="prev" onClick={setPreviousLawyer}>
        &#10094;
      </a>
      <a className="next" onClick={setNextLawyer}>
        &#10095;
      </a>
    </div>
  );
};

export default Slideshow;
