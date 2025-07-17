import React, { useRef, useState, useEffect } from 'react';
import CountUp from 'react-countup';
import styles from '../styles/StatsSection.module.scss';

const stats = [
  { value: 2, suffix: '+', label: 'GyanBridge', icon: '🌍' },
  { value: 5, suffix: '+', label: 'GyanBridge', icon: '🏫' },
  { value: 8, suffix: '+', label: 'GyanBridge', icon: '🤝' },
  { value: 12, suffix: '+', label: 'GyanBridge', icon: '🎓' },
  { value: 3, suffix: '+', label: 'GyanBridge', icon: '⏰' },
  { value: 7, suffix: '+', label: 'GyanBridge', icon: '👨‍🏫' },
];

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.statsSection} ref={sectionRef}>
      <div className={styles.bgOverlay}>
        <h2 className={styles.title}>Global Leader in Professional Training Courses</h2>
        <div className={styles.grid}>
          {stats.map((stat, idx) => (
            <div className={styles.statItem} key={idx}>
              <span className={styles.statIcon} role="img" aria-label="icon" style={{ fontSize: '2.2rem', marginBottom: '0.3rem' }}>{stat.icon}</span>
              <span className={styles.statValue}>
                <CountUp end={inView ? stat.value : 0} duration={2.5} suffix={stat.suffix} start={inView ? undefined : 0} />
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection; 