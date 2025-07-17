import React, { useState } from 'react';
import styles from '../styles/RequestCallbackModal.module.scss';
import { useEffect } from 'react';

interface Props {
  onClose: () => void;
}

const courses = [
  'Cyber Security',
  'Cloud Computing',
  'Supply Chain & Logistics',
  'Digital Marketing',
  'Data Science',
  'Web Development',
];

const RequestCallbackModal: React.FC<Props> = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    course: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = 'Full Name is required';
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile)) newErrors.mobile = 'Valid 10-digit mobile number required';
    if (!form.course) newErrors.course = 'Please select a course';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
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
          <span className={styles.toastMsg}>Form submitted successfully!</span>
          <span className={styles.toastClose} onClick={() => setShowToast(false)}>&times;</span>
          <span className={styles.toastBar}></span>
        </div>
      )}
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
          <div className={styles.modalGrid}>
            <div className={styles.leftPanel}>
              <h2>Dear Future<br />Students</h2>
              <p>Connect with us to get a free consultation to take the right decision and enter into the digital world.</p>
            </div>
            <div className={styles.rightPanel}>
              <h3>Please fill with your details</h3>
              {submitted ? (
                <div className={styles.successMsg}>Thank you! We will contact you soon.</div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Full Name with icon */}
                  <div className={styles.inputGroup}>
                    <span className={styles.inputIcon}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.5-1.8 4.5-4.5S14.7 3 12 3 7.5 4.8 7.5 7.5 9.3 12 12 12zm0 2c-3 0-9 1.5-9 4.5V21h18v-2.5c0-3-6-4.5-9-4.5z" fill="#64748b"/></svg>
                    </span>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={form.name}
                      onChange={handleChange}
                      className={errors.name ? styles.error + ' ' + styles.input : styles.input}
                    />
                  </div>
                  {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                  {/* Email with icon */}
                  <div className={styles.inputGroup}>
                    <span className={styles.inputIcon}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm0 0l8 8 8-8" stroke="#64748b" strokeWidth="2"/></svg>
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      className={errors.email ? styles.error + ' ' + styles.input : styles.input}
                    />
                  </div>
                  {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                  {/* Mobile with icon */}
                  <div className={styles.inputGroup}>
                    <span className={styles.inputIcon}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.08 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile No."
                      value={form.mobile}
                      onChange={handleChange}
                      className={errors.mobile ? styles.error + ' ' + styles.input : styles.input}
                      maxLength={10}
                    />
                  </div>
                  {errors.mobile && <span className={styles.errorMsg}>{errors.mobile}</span>}
                  {/* Courses dropdown remains unchanged */}
                  <select
                    name="course"
                    value={form.course}
                    onChange={handleChange}
                    className={errors.course ? styles.error + ' ' + styles.coursesDropdown : styles.coursesDropdown}
                  >
                    <option value="">Choose Courses</option>
                    {courses.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.course && <span className={styles.errorMsg}>{errors.course}</span>}
                  <button type="submit" className={styles.submitBtn}>Submit</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestCallbackModal; 