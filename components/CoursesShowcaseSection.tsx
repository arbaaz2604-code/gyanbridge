import React, { useState } from 'react';
import styles from '../styles/CoursesShowcaseSection.module.scss';

const filters = [
  'Top Courses',
  'A', // Boston School of Technology & AI
  'B', // Boston School of Management
  'C', // Boston School of Finance
  'D', // Boston School of Animation & Design
  'E', // Boston School of Media & Communications
  'F', // Boston School of Corporate Training
];

const courses = [
  {
    title: 'Business Management and Analytics',
    video: 'https://www.youtube.com/embed/3rY_FyB1HfM', // Tom and Jerry video
    duration: '4-10 MONTHS',
    rating: '4.9/5 by 12k+ Students',
    support: true,
    students: '3228+',
    enrolled: 'Jun 2025',
  },
  {
    title: 'Digital Marketing and Analytics',
    video: 'https://www.youtube.com/embed/3rY_FyB1HfM', // Tom and Jerry video
    duration: '4-10 MONTHS',
    rating: '4.9/5 by 11k+ Students',
    support: true,
    students: '2074+',
    enrolled: 'Jun 2025',
  },
  {
    title: 'Legal Analytics',
    video: 'https://www.youtube.com/embed/3rY_FyB1HfM', // Tom and Jerry video
    duration: '4-10 MONTHS',
    rating: '4.9/5 by 10k+ Students',
    support: true,
    students: '3184+',
    enrolled: 'Jun 2025',
  },
  {
    title: 'International Business & Analytics',
    video: 'https://www.youtube.com/embed/3rY_FyB1HfM', // Tom and Jerry video
    duration: '4-10 MONTHS',
    rating: '4.9/5 by 9k+ Students',
    support: true,
    students: '1500+',
    enrolled: 'Jun 2025',
  },
  // Second row
  {
    title: 'Marketing Analytics',
    video: 'https://www.youtube.com/embed/3rY_FyB1HfM', // Tom and Jerry video
    duration: '4-10 MONTHS',
    rating: '4.9/5 by 8k+ Students',
    support: true,
    students: '1200+',
    enrolled: 'Jun 2025',
  },
  {
    title: 'Ecommerce Analytics',
    video: 'https://www.youtube.com/embed/3rY_FyB1HfM', // Tom and Jerry video
    duration: '4-10 MONTHS',
    rating: '4.9/5 by 7k+ Students',
    support: true,
    students: '1100+',
    enrolled: 'Jun 2025',
  },
  {
    title: 'HR Analytics',
    video: 'https://www.youtube.com/embed/3rY_FyB1HfM', // Tom and Jerry video
    duration: '4-10 MONTHS',
    rating: '4.9/5 by 6k+ Students',
    support: true,
    students: '900+',
    enrolled: 'Jun 2025',
  },
  {
    title: 'Supply Chain Analytics',
    video: 'https://www.youtube.com/embed/3rY_FyB1HfM', // Tom and Jerry video
    duration: '4-10 MONTHS',
    rating: '4.9/5 by 5k+ Students',
    support: true,
    students: '800+',
    enrolled: 'Jun 2025',
  },
];

const CoursesShowcaseSection = () => {
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  return (
    <section className={styles.coursesSection}>
      <h2 className={styles.heading}>Popular Courses To Grow Your Career</h2>
      <div className={styles.filtersRow}>
        {filters.map((filter) => (
          <button
            key={filter}
            className={activeFilter === filter ? styles.activeFilter : styles.filterBtn}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className={styles.coursesGrid}>
        {courses.map((course, idx) => (
          <div className={styles.courseCard} key={idx}>
            <div className={styles.videoWrapper}>
              <iframe
                src={course.video}
                title={course.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.courseVideo}
              />
            </div>
            <div className={styles.courseContent}>
              <h3 className={styles.courseTitle}>{course.title}</h3>
              <div className={styles.metaRow}>
                <div className={styles.courseMeta}>{course.duration}</div>
                <div className={styles.courseMeta}>{course.rating}</div>
                {course.support && <span className={styles.supportBadge}>DEDICATED CAREER SUPPORT</span>}
              </div>
              <div className={styles.studentsRow}>
                <span className={styles.studentsAvatars}>
                  {/* Placeholder avatars */}
                  <img src="/avatar1.png" alt="avatar" />
                  <img src="/avatar2.png" alt="avatar" />
                  <img src="/avatar3.png" alt="avatar" />
                </span>
                <span className={styles.studentsText}>{course.students}+ students enrolled in {course.enrolled}</span>
              </div>
              <div className={styles.cardActions}>
                <button className={styles.brochureBtn}>BROCHURE</button>
                <button className={styles.viewBtn}>VIEW COURSE</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesShowcaseSection; 