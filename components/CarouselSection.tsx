import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/CarouselSection.module.scss';
import Image from 'next/image';

const slides = [
  {
    title: 'Transform Your Learning with Gyan Bridge',
    description: 'Discover a world of knowledge, expert mentorship, and practical tools designed to help you achieve your academic and professional goals. Join us to bridge the gap between where you are and where you want to be.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Learn, Grow, and Succeed with',
    description: "Whether you're a student, professional, or lifelong learner, our innovative platform provides the right tools, insights, and mentorship to help you excel.",
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Expert-Led Courses',
    description: 'Learn from industry leaders and top educators with real-world experience. Our courses are designed to give you practical skills you can use immediately.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Personalized Learning Paths',
    description: 'Choose from curated learning journeys tailored to your goals, whether you’re preparing for exams, upskilling for your career, or exploring new interests.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Interactive Community',
    description: 'Join a vibrant community of learners. Participate in discussions, group projects, and peer-to-peer mentoring to deepen your understanding.',
    image: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Track Progress & Earn Certificates',
    description: 'Monitor your learning progress, complete assignments, and earn certificates to showcase your achievements to employers and peers.',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80',
  },
];

const CarouselSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const prevSlide = () => {
    setDirection('left');
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setDirection('right');
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setDirection('right');
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      }, 3500);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => setPaused(false);

  return (
    <section className={styles.carouselBiaBg}>
      <div className={styles.carouselBiaWrapper}>
        <div className={styles.carouselBiaCard}>
          {/* Content on the left */}
          <div className={styles.carouselBiaContent}>
            <h2 className={styles.carouselBiaTitle}>{slides[current].title}</h2>
            <div className={styles.carouselBiaDesc}>{slides[current].description}</div>
            <button className={styles.biaCtaBtn}>Explore Courses &rarr;</button>
          </div>
          {/* Stacked Card Carousel: center prominent, sides smaller/rotated */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, minWidth: 0, flex: 1 }}>
            {[ -1, 0, 1 ].map(offset => {
              const idx = (current + offset + slides.length) % slides.length;
              const slide = slides[idx];
              const isCenter = offset === 0;
              const zIndex = isCenter ? 2 : 1;
              const scale = isCenter ? 1.1 : 0.85;
              const rotate = offset === -1 ? -14 : offset === 1 ? 14 : 0;
              const boxShadow = isCenter
                ? '0 12px 40px 0 rgba(33,147,176,0.22)'
                : '0 4px 16px 0 rgba(33,147,176,0.12)';
              return (
                <div
                  key={idx}
                  onClick={() => !isCenter && setCurrent(idx)}
                  style={{
                    position: 'relative',
                    width: isCenter ? 340 : 220,
                    height: isCenter ? 340 : 220,
                    margin: isCenter ? '0 2.2rem' : '0 -2.8rem',
                    borderRadius: isCenter ? 32 : 24,
                    overflow: 'hidden',
                    boxShadow,
                    zIndex,
                    cursor: isCenter ? 'default' : 'pointer',
                    transform: `scale(${scale}) rotate(${rotate}deg)` + (isCenter ? '' : ' translateY(18px)'),
                    transition: 'all 0.35s cubic-bezier(.4,0,.2,1)',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  className={isCenter ? 'carousel-stacked-center' : 'carousel-stacked-side'}
                >
                  <img
                    className={styles.carouselBiaImage}
                    src={slide.image}
                    alt={`carousel visual ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: isCenter ? 32 : 24 }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(255,255,255,0.13)',
                      backdropFilter: 'blur(1.5px)',
                      borderRadius: 22,
                    }}
                  />
                  {isCenter && (
                    <div style={{
                      position: 'absolute',
                      left: '-320px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 300,
                      maxWidth: '90vw',
                      background: 'none',
                      zIndex: 3,
                      textAlign: 'left',
                    }}>
                      <h2 className={styles.carouselBiaTitle}>{slide.title}</h2>
                      <div className={styles.carouselBiaDesc}>{slide.description}</div>
                      <button className={styles.biaCtaBtn}>Explore Courses &rarr;</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.carouselBiaDots}>
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={idx === current ? styles.carouselBiaDotActive : styles.carouselBiaDot}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </section>
  );
};

export default CarouselSection; 