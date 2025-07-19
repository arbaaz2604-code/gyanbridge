import Head from 'next/head';
import styles from '../styles/Login.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ripple, setRipple] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRipple(true);
    setTimeout(() => setRipple(false), 350);
    console.log('Login attempt:', email, password);
    // Demo login logic
    if (email === 'admin@gmail.com' && password === 'admin123') {
      console.log('Credentials correct, setting isLoggedIn and redirecting...');
      localStorage.setItem('isLoggedIn', 'true');
      setError('');
      setTimeout(() => {
        console.log('Redirecting to /dashboard');
        router.replace('/dashboard');
      }, 100);
    } else {
      setError('Invalid credentials. Try admin@gmail.com / admin123.');
      console.log('Invalid credentials');
    }
  };

  return (
    <>
      <Head>
        <title>Login | Gyanbridge</title>
      </Head>
      <div className={styles.loginBg}>
        <div className={styles.loginContainer}>
          <div className={styles.illustrationSection}>
            {/* You can add an illustration here if desired */}
          </div>
          <div className={styles.formSection}>
            <h2>Login to your account</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <button type="button" className={styles.googleButton}>
                <span className={styles.googleIcon}>
                  <i className="bi bi-google"></i>
                </span>
                Login with Google
              </button>
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
              <label htmlFor="password">Password:</label>
              <div className={styles.inputWithIcon}>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
              <button
                type="submit"
                className={
                  `${styles.button} ${styles['button-ripple']} ${ripple ? 'ripple-animate' : ''}`
                }
              >
                Login
              </button>
            </form>
            <div className={styles.registerLink}>Don't have an account? <a href="/register">Register</a></div>
          </div>
        </div>
      </div>
    </>
  );
}