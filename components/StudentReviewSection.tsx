import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/StudentReviewSection.module.scss';

const reviews = [
  {
    text: `The course covers topics such as cloud integration (AWS/Azure fundamentals), deployment techniques, and AI ethics, all of which are in line with the demands of the modern industry. You'll never get stuck thanks to the availability of video courses, downloadable code templates, and well chosen research papers. Key topics are reinforced by the fair and difficult quizzes and assessments.`,
    rating: 4.8,
    name: 'Rachel',
    role: 'AI Developer',
    avatar: '👩‍💻',
  },
  {
    text: `I loved the hands-on approach and the support from mentors. The downloadable resources and real-world projects made learning so much more effective. Highly recommended for anyone looking to upskill!`,
    rating: 4.9,
    name: 'Arjun',
    role: 'Cloud Engineer',
    avatar: '👨‍💻',
  },
  {
    text: `The platform's structure is intuitive and the quizzes are both fair and challenging. The community and peer support helped me stay motivated throughout the course.`,
    rating: 5.0,
    name: 'Priya',
    role: 'Data Scientist',
    avatar: '👩‍🔬',
  },
  {
    text: `Excellent course content and very responsive assignments. The AI ethics module was especially insightful. I feel much more confident in my skills now!`,
    rating: 4.7,
    name: 'Michael',
    role: 'Software Engineer',
    avatar: '👨‍🔬',
  },
];

const StudentReviewSection = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextReview = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  return (
    <section className={styles.reviewSection}>
      <div className={styles.reviewContainer}>
        <div className={styles.reviewHeader}>
          <h2 className={styles.reviewTitle}>What Students Are Saying</h2>
          <p className={styles.reviewSubtitle}>We are quite pleased since we have a satisfied customer.</p>
        </div>
        <div className={styles.sliderWrapper}>
          <button className={styles.arrowBtn} onClick={prevReview} aria-label="Previous Review">&#8592;</button>
          <div className={styles.reviewCard}>
            <div className={styles.reviewContent}>
              <p className={styles.reviewText}>{reviews[current].text}</p>
              <div className={styles.reviewRatingRow}>
                <span className={styles.reviewRating}>★ {reviews[current].rating} ratings</span>
              </div>
            </div>
            <div className={styles.reviewStudent}>
              <div className={styles.avatar}>
                <span role="img" aria-label="avatar" className={styles.avatarEmoji}>{reviews[current].avatar}</span>
              </div>
              <div className={styles.studentInfo}>
                <span className={styles.studentName}>{reviews[current].name}</span>
                <span className={styles.studentRole}>{reviews[current].role}</span>
              </div>
            </div>
          </div>
          <button className={styles.arrowBtn} onClick={nextReview} aria-label="Next Review">&#8594;</button>
        </div>
        <div className={styles.dotsRow}>
          {reviews.map((_, idx) => (
            <span
              key={idx}
              className={idx === current ? styles.dotActive : styles.dot}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentReviewSection; 