import React, { useState } from 'react';
import styles from '../styles/AnimatedRegisterModal.module.scss';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface Props {
  onClose: () => void;
}

const AnimatedRegisterModal: React.FC<Props> = ({ onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value: string) => {
    setForm({ ...form, phone: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <>
      {showToast && (
        <div className={styles.toastSuccess}>
          <span className={styles.toastIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#22c55e"/><path d="M8 12.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
          <span className={styles.toastMsg}>Account created successfully!</span>
          <span className={styles.toastClose} onClick={() => setShowToast(false)}>&times;</span>
          <span className={styles.toastBar}></span>
        </div>
      )}
      <div className={styles.overlay}>
        <div className={styles.modalRow}>
          <div className={styles.characterCol}>
            <img src="/character.png" alt="Character" className={styles.characterImg} />
          </div>
          <div className={styles.modal}>
            <button className={styles.closeBtn} onClick={onClose}>&times;</button>
            <h2 className={styles.title}>Create Account</h2>
            <p className={styles.subtitle}>Join us to start learning</p>
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className={styles.inputGroup}>
                <span className={styles.inputIcon}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.5-1.8 4.5-4.5S14.7 3 12 3 7.5 4.8 7.5 7.5 9.3 12 12 12zm0 2c-3 0-9 1.5-9 4.5V21h18v-2.5c0-3-6-4.5-9-4.5z" fill="#64748b"/></svg>
                </span>
                <input
                  className={styles.input}
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Email address */}
              <div className={styles.inputGroup}>
                <span className={styles.inputIcon}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm0 0l8 8 8-8" stroke="#64748b" strokeWidth="2"/></svg>
                </span>
                <input
                  className={styles.input}
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Phone number with country code (all countries) */}
              <div className={styles.inputGroup}>
                <PhoneInput
                  country={'in'}
                  value={form.phone}
                  onChange={handlePhoneChange}
                  inputClass={styles.input}
                  buttonClass={styles.inputIcon}
                  inputStyle={{ border: 'none', boxShadow: 'none', width: '100%', background: 'transparent' }}
                  dropdownStyle={{ zIndex: 9999 }}
                  placeholder="Phone number"
                  enableSearch
                />
              </div>
              {/* Create password */}
              <div className={styles.inputGroup}>
                <span className={styles.inputIcon}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="8" rx="2" stroke="#64748b" strokeWidth="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#64748b" strokeWidth="2"/></svg>
                </span>
                <input
                  className={styles.input}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className={styles.inputIcon}
                  style={{ cursor: 'pointer', marginLeft: 4 }}
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={0}
                  role="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" stroke="#64748b" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="#64748b" strokeWidth="2"/></svg>
                  ) : (
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-5.94M9.53 9.53A3.5 3.5 0 0 1 12 8.5c1.93 0 3.5 1.57 3.5 3.5 0 .47-.09.92-.26 1.33M1 1l22 22" stroke="#64748b" strokeWidth="2"/></svg>
                  )}
                </span>
              </div>
              <button className={styles.registerBtn} type="submit">
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedRegisterModal; 