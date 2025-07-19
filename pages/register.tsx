import Head from 'next/head';
import styles from '../styles/Register.module.scss';
import Image from 'next/image';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import AnimatedRegisterModal from '../components/AnimatedRegisterModal';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [ripple, setRipple] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRipple(true);
    setTimeout(() => setRipple(false), 350);
    // Handle registration logic here
    alert('Account created!');
  };

  return (
    <>
      <Head>
        <title>Register | Gyanbridge</title>
      </Head>
      <div className={styles.registerBg}>
        <div className={styles.registerContainer}>
          <div className={styles.illustrationSection}>
            <Image src="https://undraw.co/api/illustrations/undraw_secure_login_pdn4.svg" alt="Register Illustration" width={340} height={340} className={styles.illustrationImg} />
          </div>
          <div className={styles.formSection}>
            <div className={styles.eduIcons}>
              <span role="img" aria-label="books">📚</span>
              <span role="img" aria-label="graduation cap">🎓</span>
              <span role="img" aria-label="lightbulb">💡</span>
              <span role="img" aria-label="trophy">🏆</span>
              <span role="img" aria-label="star">⭐</span>
            </div>
            <h2>Create an Account</h2>
            <p>Create an account and start upskilling your Skills</p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <button type="button" className={styles.googleButton}>
                <span className={styles.googleIcon}>
                  <i className="bi bi-google"></i>
                </span>
                Register with Google
              </button>
              <label htmlFor="fullname">Full Name:</label>
              <div className={styles.inputWithIcon}>
                <i className="bi bi-person-fill"></i>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Enter your full name"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                />
              </div>
              <label htmlFor="email">Email Address:</label>
              <div className={styles.inputWithIcon}>
                <i className="bi bi-envelope-fill"></i>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <label htmlFor="phone">Phone Number:</label>
              <PhoneInput
                country={'in'}
                value={phone}
                onChange={setPhone}
                inputProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: false,
                  id: 'phone',
                  className: styles.phoneInput
                }}
                containerClass={styles.phoneInputContainer}
                inputClass={styles.phoneInputField}
                buttonClass={styles.phoneInputButton}
                dropdownClass={styles.phoneInputDropdown}
                placeholder="Enter your phone number"
                enableSearch
              />
              <label htmlFor="password">Create Password:</label>
              <div className={styles.inputWithIcon}>
                <input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className={`${styles.button} ${styles['button-ripple']} ${ripple ? 'ripple-animate' : ''}`}
              >
                Create Account
              </button>
            </form>
            <div className={styles.registerLinks}>
              <a href="#" className={styles.phoneLink}>Register via phone</a>
            </div>
            <div className={styles.loginLink}>Already have an account? <a href="/login">Log in</a></div>
          </div>
        </div>
        <button onClick={() => setShowModal(true)} className={styles.registerBtn}>Register</button>
        {showModal && <AnimatedRegisterModal onClose={() => setShowModal(false)} />}
      </div>
    </>
  );
} 