import React, { useState } from 'react';
import styles from '../styles/NewsletterSubscribeSection.module.scss';

const NewsletterSubscribeSection = () => {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  return (
    <>
      {showToast && (
        <div className={styles.toastSuccess}>
          <span className={styles.toastIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#22c55e"/><path d="M8 12.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <span className={styles.toastMsg}>Subscribed successfully!</span>
          <span className={styles.toastClose} onClick={() => setShowToast(false)}>&times;</span>
          <span className={styles.toastBar}></span>
        </div>
      )}
      <section className={styles.subscribeSection}>
        <h2 className={styles.heading}>
          Stay Connected with Our Latest Updates <span className={styles.prayug}>GyanBridge</span>
        </h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type="email" className={styles.input} placeholder="Enter your email id " />
          <button className={styles.button}>Subscribe Now</button>
        </form>
        <div className={styles.subscriberRow}>
          <span className={styles.subscriberText}>16K Students have already subscribed</span>
        </div>
      </section>
    </>
  );
};

export default NewsletterSubscribeSection; 