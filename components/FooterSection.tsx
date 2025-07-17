import React from 'react';
import styles from '../styles/FooterSection.module.scss';

const FooterSection = () => (
  <footer className={styles.footerSection}>
    <div className={styles.footerContainer}>
      {/* Column 1: Logo, Mission, Social */}
      <div className={styles.footerCol}>
        <div className={styles.logoRow}>
          <img src="/gyanbridge-logo.svg" alt="Gyanbridge Logo" className={styles.logoImg} />
          <span className={styles.logoText}>Gyanbridge</span>
        </div>
        <p className={styles.missionText}>
          At Gyan Bridge, we are on a mission to empower individuals with the skills and knowledge they need to thrive in the everevolving world of technology.
        </p>
        <div className={styles.socialRow}>
          <a href="#" aria-label="Facebook" className={styles.socialIcon}>
            {/* Facebook SVG */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#1877F2"/><path d="M21.333 16.001h-3.2v8h-3.2v-8h-1.6v-2.667h1.6v-1.6c0-2.133 1.067-3.2 3.2-3.2h2.133v2.667h-1.067c-0.533 0-0.8 0.267-0.8 0.8v1.333h2.667l-0.4 2.667z" fill="#fff"/></svg>
          </a>
          <a href="#" aria-label="Instagram" className={styles.socialIcon}>
            {/* Instagram SVG */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#E1306C"/><path d="M16 11.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 7.733a2.933 2.933 0 1 1 0-5.866 2.933 2.933 0 0 1 0 5.866zm5.067-7.893a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0zM22.4 12.267c-.053-1.12-.307-2.107-1.12-2.92-.813-.813-1.8-1.067-2.92-1.12-1.16-.053-4.64-.053-5.8 0-1.12.053-2.107.307-2.92 1.12-.813.813-1.067 1.8-1.12 2.92-.053 1.16-.053 4.64 0 5.8.053 1.12.307 2.107 1.12 2.92.813.813 1.8 1.067 2.92 1.12 1.16.053 4.64.053 5.8 0 1.12-.053 2.107-.307 2.92-1.12.813-.813 1.067-1.8 1.12-2.92.053-1.16.053-4.64 0-5.8zm-1.6 7.893a3.733 3.733 0 0 1-3.733 3.733h-2.134A3.733 3.733 0 0 1 11.2 20.16v-2.134A3.733 3.733 0 0 1 14.933 14.4h2.134A3.733 3.733 0 0 1 20.8 17.933v2.134z" fill="#fff"/></svg>
          </a>
          <a href="#" aria-label="LinkedIn" className={styles.socialIcon}>
            {/* LinkedIn SVG */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#0A66C2"/><path d="M13.333 21.333h-2.666v-8h2.666v8zm-1.333-9.067a1.333 1.333 0 1 1 0-2.666 1.333 1.333 0 0 1 0 2.666zm10.667 9.067h-2.667v-4c0-.96-.373-1.6-1.28-1.6-.693 0-1.067.467-1.24.92-.067.16-.08.387-.08.613v4.067h-2.667s.04-6.6 0-8h2.667v1.133c.36-.56 1-1.36 2.427-1.36 1.773 0 3.12 1.16 3.12 3.653v4.573z" fill="#fff"/></svg>
          </a>
          <a href="#" aria-label="WhatsApp" className={styles.socialIcon}>
            {/* WhatsApp SVG */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#25D366"/><path d="M16 8.267a7.733 7.733 0 0 0-6.56 11.627l-1.067 3.2 3.307-1.067A7.733 7.733 0 1 0 16 8.267zm4.267 10.56c-.187.533-1.093 1.04-1.493 1.093-.4.053-.427.427-2.667-.8-2.24-1.227-2.987-2.72-3.093-2.987-.107-.267-.36-.36-.48-.36-.12 0-.267-.013-.427.013-.16.027-.427.16-.64.427-.213.267-.853.827-.853 2.027 0 1.2.88 2.373 1.013 2.533.133.16 1.76 2.773 4.507 3.6 2.747.827 3.093.533 3.627.48.533-.053 1.76-.72 2.013-1.413.253-.693.253-1.28.187-1.413-.067-.133-.267-.213-.56-.36z" fill="#fff"/></svg>
          </a>
        </div>
      </div>
      {/* Column 2: Help & Support */}
      <div className={styles.footerCol}>
        <h3 className={styles.colTitle}>Help & Support</h3>
        <a href="#" className={styles.link}>Refunds Policy</a>
        <a href="#" className={styles.link}>Terms and Conditions</a>
        <a href="#" className={styles.link}>Pricing</a>
        <a href="#" className={styles.link}>FAQ</a>
      </div>
      {/* Column 3: Important Links */}
      <div className={styles.footerCol}>
        <h3 className={styles.colTitle}>Important Links</h3>
        <a href="#" className={styles.link}>About Us</a>
        <a href="#" className={styles.link}>Contact Us</a>
        <a href="#" className={styles.link}>Privacy policy</a>
      </div>
      {/* Column 4: Newsletter & Contact */}
      <div className={styles.footerCol}>
        <div className={styles.subscribeText}>
          1000+ Our Students are subscribe. Don’t be shy indroduce yourself!
        </div>
        {/* Removed the subscribe form (email input and send button) */}
        <div className={styles.contactRow}>
          <a href="tel:+919137023462" className={styles.contactLink} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <span className={styles.contactIcon}>
              {/* Phone SVG */}
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.08 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z" stroke="#181c32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <span className={styles.contactText}>+91 91370 23462</span>
          </a>
        </div>
        <div className={styles.contactRow}>
          <a href="mailto:support@gyanbridge.in" className={styles.contactLink} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <span className={styles.contactIcon}>
              {/* Email SVG */}
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" stroke="#181c32" strokeWidth="2"/><path d="M22 6l-10 7L2 6" stroke="#181c32" strokeWidth="2"/></svg>
            </span>
            <span className={styles.contactText}>support@gyanbridge.in</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default FooterSection; 