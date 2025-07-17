import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Navbar.module.scss';
import React, { useState, useRef, useEffect } from 'react';
import RequestCallbackModal from './RequestCallbackModal';
import AnimatedRegisterModal from './AnimatedRegisterModal';
import AnimatedLoginModal from './AnimatedLoginModal';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        {/* Logo */}
        <Link href="/">
          <Image src="/next.svg" alt="Gyanbridge Logo" width={100} height={40} className={styles.logo} />
        </Link>
        {/* Courses Dropdown */}
        <div className={styles.dropdown} ref={dropdownRef}>
          <button
            className={styles.dropdownBtn}
            onClick={() => setDropdownOpen((open) => !open)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            type="button"
          >
            <span className={styles.iconGrid}></span> Courses <span className={styles.caret}>▼</span>
          </button>
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link href="#" className={styles.dropdownItem}>Data analytics</Link>
              <Link href="#" className={styles.dropdownItem}>Artificial intelligence</Link>
              <Link href="#" className={styles.dropdownItem}>Microsoft Azure</Link>
              <Link href="#" className={styles.dropdownItem}>Data Science</Link>
              <Link href="#" className={styles.dropdownItem}>Python course</Link>
              <Link href="#" className={styles.dropdownItem}>Web Development</Link>
            </div>
          )}
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.searchBox}>
          <input className={styles.searchInput} type="text" placeholder="Search online courses" />
          <button className={styles.searchIconBtn}>
            <span className={styles.searchIcon} role="img" aria-label="search">📚</span>
          </button>
        </div>
        <button className={styles.callbackBtn} onClick={() => setModalOpen(true)}>
          <i className="bi bi-telephone" style={{marginRight: '0.5rem', verticalAlign: 'middle'}}></i>
          Request Callback
        </button>
        <button className={styles.loginBtn} onClick={() => setLoginModalOpen(true)}>Login</button>
        <button className={styles.registerBtn} onClick={() => setRegisterModalOpen(true)}>Register</button>
      </div>
       {modalOpen && <RequestCallbackModal onClose={() => setModalOpen(false)} />}
      {loginModalOpen && <AnimatedLoginModal onClose={() => setLoginModalOpen(false)} />}
      {registerModalOpen && <AnimatedRegisterModal onClose={() => setRegisterModalOpen(false)} />}
    </nav>
  );
};

export default Navbar; 