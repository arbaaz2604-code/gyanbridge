import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/AnimatedRegisterModal.module.scss';

interface Props {
  onClose: () => void;
}

const AnimatedLoginModal: React.FC<Props> = ({ onClose }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Login logic
    if (form.email === 'admin@gmail.com' && form.password === 'admin123') {
      localStorage.setItem('isLoggedIn', 'true');
      setError('');
      setTimeout(() => {
        router.replace('/dashboard');
        onClose();
      }, 100);
    } else {
      setError('Invalid credentials. Try admin@gmail.com / admin123.');
      setTimeout(() => setSubmitted(false), 1200);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalRow}>
        <div className={styles.characterCol}>
          {/* Removed character.png image to fix 404 */}
        </div>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
          <h2 className={styles.title}>Login</h2>
          <p className={styles.subtitle}>Enter your credentials to access your account</p>
          <form className={styles.form} onSubmit={handleSubmit}>
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
            {/* Password with lock icon and eye toggle */}
            <div className={styles.inputGroup}>
              <span className={styles.inputIcon}>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="8" rx="2" stroke="#64748b" strokeWidth="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#64748b" strokeWidth="2"/></svg>
              </span>
              <input
                className={styles.input}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
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
            <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
              <a href="#" style={{ color: '#2563eb', fontSize: '0.98rem', textDecoration: 'underline', cursor: 'pointer' }}>Forgot Password?</a>
            </div>
            {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
            <button className={styles.registerBtn} type="submit">
              {submitted ? 'Logging in...' : 'LOGIN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AnimatedLoginModal; 