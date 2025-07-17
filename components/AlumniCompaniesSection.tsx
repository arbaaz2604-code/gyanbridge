import React from 'react';
import styles from '../styles/AlumniCompaniesSection.module.scss';

const companies = [
  { name: 'Amazon', logo: '/logos/amazon.svg' },
  { name: 'Google', logo: '/logos/google.svg' },
  { name: 'AWS', logo: '/logos/aws.svg' },
  { name: 'Meta', logo: '/logos/meta.svg' },
  { name: 'Cisco', logo: '/logos/cisco.svg' },
  { name: 'Accenture', logo: '/logos/accenture.svg' },
  { name: 'Wells Fargo', logo: '/logos/wellsfargo.svg' },
  { name: 'Walmart', logo: '/logos/walmart.svg' },
];

const AlumniCompaniesSection = () => (
  <section className={styles.alumniSection}>
    <h2 className={styles.heading}>
      Gyanbridge Alumni Working with Top Global Companies
    </h2>
    <div className={styles.marqueeWrapper}>
      <div className={styles.marquee}>
        {[...companies, ...companies].map((company, idx) => (
          <div className={styles.logoBox} key={company.name + idx}>
            <img src={company.logo} alt={company.name} className={styles.logoImg} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AlumniCompaniesSection; 