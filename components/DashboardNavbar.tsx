import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.scss';
import Image from 'next/image';
import { filteredAssignments } from '../pages/dashboard/assignments';
import { courses } from '../pages/dashboard/courses';
// Define projects for each course
const projects = [
  { title: 'React Portfolio Project', course: 'React Fundamentals', dueDate: '2025-07-30' },
  { title: 'Python Capstone', course: 'Python for Beginners', dueDate: '2025-08-02' },
  { title: 'Data Science Final Project', course: 'Data Science 101', dueDate: '2025-08-05' },
  { title: 'Web Dev Final Project', course: 'Web Development', dueDate: '2025-08-10' },
  { title: 'ML Capstone', course: 'Machine Learning Basics', dueDate: '2025-08-15' },
];

const completedCourses = [
  { name: 'Python for Beginners', completedAt: '2025-07-16' },
  { name: 'Machine Learning Basics', completedAt: '2025-07-16' },
  // Add more as needed
];

interface DashboardNavbarProps {
  onMenuClick?: () => void;
}

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ onMenuClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifRead, setNotifRead] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Notifications: completed courses, assignments, and projects assigned
  const notifications = [
    ...completedCourses.map(c => ({
      type: 'course',
      message: `Course completed: ${c.name}`,
      date: c.completedAt,
    })),
    ...filteredAssignments.map(a => ({
      type: 'assignment',
      message: `Assignment assigned: ${a.title} (${a.course})`,
      date: a.dueDate,
    })),
    // Add project assignment notifications for completed courses
    ...completedCourses.map(c => {
      const project = projects.find(p => p.course === c.name);
      return project
        ? {
            type: 'project',
            message: `Project assigned: ${project.title} (${project.course})`,
            date: project.dueDate,
          }
        : null;
    }).filter(Boolean),
  ].reverse(); // Latest notification at the top
  const unreadCount = notifRead ? 0 : notifications.length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/'); // Redirect to landing page
  };

  // Helper to format time ago
  function timeAgo(dateString: string) {
    const now = new Date();
    const date = new Date(dateString);
    const diff = (now.getTime() - date.getTime()) / 1000; // seconds
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? 's' : ''} ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        {/* Hamburger for mobile */}
        <button
          onClick={onMenuClick}
          className="dashboard-hamburger"
          style={{
            background: 'none',
            border: 'none',
            fontSize: 28,
            marginRight: 10,
            cursor: 'pointer',
            color: '#2d3a4a',
            display: 'none',
          }}
          aria-label="Open sidebar menu"
        >
          ☰
        </button>
        {/* Logo */}
        <span className={styles.logo} style={{ cursor: 'pointer' }} onClick={() => router.push('/dashboard')}>
          <Image src="/next.svg" alt="NEXT.js Logo" width={100} height={40} className={styles.logo} />
        </span>
        {/* Removed Courses Dropdown */}
      </div>
      <div className={styles.rightSection}>
        <div className={styles.searchBox}>
          <input className={styles.searchInput} type="text" placeholder="Search Courses, Topics, Assignments" />
          <button className={styles.searchIconBtn}>
            <span className={styles.searchIcon} role="img" aria-label="search">📚</span>
          </button>
        </div>
        {/* Notifications Bell */}
        <span
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: notifOpen ? '#e0e7ef' : '#eee',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: 22,
            cursor: 'pointer',
            color: '#2d3a4a',
            transition: 'background 0.2s',
            marginLeft: 10,
            position: 'relative',
          }}
          title="Notifications"
          role="img"
          aria-label="notifications"
          onClick={() => { setNotifOpen(!notifOpen); }}
        >
          🔔
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: 7,
              right: 7,
              background: '#ef4444',
              color: '#fff',
              borderRadius: '50%',
              fontSize: 11,
              width: 16,
              height: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              zIndex: 2,
            }}>{unreadCount}</span>
          )}
          {/* Notification Dropdown */}
          {notifOpen && (
            <div style={{
              position: 'absolute',
              top: 44,
              right: 0,
              background: '#f3f7fd',
              border: '1.5px solid #e5e7eb',
              borderRadius: 14,
              boxShadow: '0 8px 32px 0 rgba(60,72,100,0.13)',
              minWidth: 300,
              zIndex: 20,
              padding: '0 0 10px 0',
              overflow: 'hidden',
              borderTop: '4px solid #2563eb',
            }}
              onClick={() => setNotifRead(true)}
            >
              {/* Close button */}
              <button
                onClick={e => { e.stopPropagation(); setNotifOpen(false); }}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 12,
                  background: 'none',
                  border: 'none',
                  fontSize: 20,
                  color: '#64748b',
                  cursor: 'pointer',
                  fontWeight: 700,
                  zIndex: 2,
                }}
                aria-label="Close"
              >
                ×
              </button>
              <div style={{ fontWeight: 800, fontSize: 16, color: '#232946', padding: '16px 20px 10px 20px', borderBottom: '1px solid #e5e7eb', marginBottom: 0, textAlign: 'left', letterSpacing: '-0.5px', background: 'transparent' }}>
                Notifications
              </div>
              <div style={{
                maxHeight: 6 * 64 + 24, // 6 notifications, each ~64px tall, plus header
                overflowY: notifications.length > 6 ? 'auto' : 'visible',
                paddingBottom: 4,
              }}>
                {notifications.length === 0 ? (
                  <div style={{ color: '#64748b', fontSize: 14, padding: '18px 20px', textAlign: 'center', background: 'transparent' }}>No notifications</div>
                ) : notifications.filter(Boolean).map((n, idx) => {
                    if (!n) return null;
                    return (
                      <div key={n.message + idx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 12,
                        padding: '14px 20px',
                        fontSize: 14,
                        color: '#232946',
                        borderBottom: idx !== notifications.length - 1 ? '1px solid #e5e7eb' : 'none',
                        background: 'transparent',
                        position: 'relative',
                        transition: 'background 0.18s',
                        boxShadow: n.type === 'assignment' ? '0 1px 6px 0 rgba(60,72,100,0.06)' : 'none',
                        borderRadius: 8,
                      }}>
                        <span style={{ fontSize: 18, marginTop: 2, color: n.type === 'assignment' ? '#2563eb' : n.type === 'project' ? '#a21caf' : '#f59e42' }}>
                          {n.type === 'assignment' ? '📝' : n.type === 'project' ? '💻' : '🎓'}
                        </span>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontWeight: 600 }}>{n.message}</span>
                          <div
                            style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}
                            title={new Date(n.date).toLocaleString()}
                          >
                            {n.date} · <span style={{ color: '#2563eb' }}>{timeAgo(n.date)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </span>
        {/* Profile Avatar Dropdown */}
        <div ref={profileRef} style={{ position: 'relative' }}>
          <span
            style={{ width: 38, height: 38, borderRadius: '50%', background: '#eee', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 18, cursor: 'pointer', color: '#2d3a4a', transition: 'background 0.2s', marginLeft: 10 }}
            onClick={() => setProfileOpen((open) => !open)}
            onMouseOver={e => (e.currentTarget.style.background = '#e0e7ef')}
            onMouseOut={e => (e.currentTarget.style.background = '#eee')}
          >
            A
          </span>
          {profileOpen && (
            <div style={{ position: 'absolute', right: 0, top: 44, background: '#fff', border: '1px solid #eee', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', minWidth: 210, zIndex: 10, padding: '6px 0' }}>
              <button style={{ display: 'block', width: '100%', padding: '12px 20px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 15 }} onClick={() => router.push('/dashboard/profile')}>My Profile</button>
              <button style={{ display: 'block', width: '100%', padding: '12px 20px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 15 }} onClick={() => router.push('/dashboard/settings')}>Account Settings</button>
              <button style={{ display: 'block', width: '100%', padding: '12px 20px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 15 }} onClick={() => alert('Help Center coming soon!')}>Help Center</button>
              <button style={{ display: 'block', width: '100%', padding: '12px 20px', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: 15 }} onClick={() => alert('Contact Support coming soon!')}>Contact Support</button>
              <div style={{ borderTop: '1px solid #eee', margin: '6px 0' }} />
              <button style={{ display: 'block', width: '100%', padding: '12px 20px', background: 'none', border: 'none', textAlign: 'left', color: '#d00', cursor: 'pointer', fontSize: 15 }} onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 900px) {
          .dashboard-hamburger {
            display: inline-block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default DashboardNavbar; 