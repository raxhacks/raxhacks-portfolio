import React, { useEffect, useState } from 'react';
import styles from '../styles/carousel.module.css';

interface CarouselProps {
  justify: 'start' | 'center' | 'end';
  children: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children,justify }) => {
  // Variables and States
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const itemCount = children.length;

  // Return early to avoid errors
  if (itemCount === 0) return null;

  const nextItem = () => {
    setCurrentIndex(currentIndex === itemCount - 1 ? 0 : currentIndex + 1);
  };

  const previousItem = () => {
    setCurrentIndex(currentIndex === 0 ? itemCount - 1 : currentIndex - 1);
  };

  // Automatically change the item every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(nextItem, 3000);
    return () => clearInterval(intervalId); // Clean up on unmount
  }, [currentIndex]);

  return (
    <div className={`${styles.container}`}
    style={{
      justifyContent: justify
    }}>
      <button onClick={previousItem} 
      className='absolute left-0 w-6 h-6
      rounded-full bg-black opacity-70'>
        ←
      </button>
      {children.map((child, index) => {
        return (
          <div
            key={index}
            className={
              currentIndex === index
                ? `${styles.slide} ${styles.active}`
                : styles.slide
            }
          >
            {currentIndex === index && child}
          </div>
        );
      })}
      <button onClick={nextItem} 
      className='absolute right-0 w-6 h-6
      rounded-full bg-black opacity-70'>
        →
      </button>
    </div>
  );
};

export default Carousel;
