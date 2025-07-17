import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/DashboardLayout';
import styles from '../../styles/Home.module.css';

const sidebarItems = [
  { icon: '📚', label: 'Dashboard', path: '/dashboard' },
  { icon: '📝', label: 'My Courses', path: '/dashboard/courses' },
  { icon: '🧑‍🏫', label: 'Assignments', path: '/dashboard/assignments' },
  { icon: '📅', label: 'Schedule / Calendar', path: '/dashboard/calendar' },
  { icon: '🏆', label: 'Achievements', path: '/dashboard/achievements' },
  { icon: '💬', label: 'Messages', path: '/dashboard/messages' },
  { icon: '⚙️', label: 'Settings', path: '/dashboard/settings' },
];

const quickStats = [
  { label: 'Courses Enrolled', value: 5, color: '#2563eb' },
  { label: 'Completed', value: 2, color: '#059669' },
  { label: 'In Progress', value: 3, color: '#f59e42' },
  { label: 'Certificates', value: 2, color: '#a21caf' },
];

const continueLearning = [
  { name: 'React Fundamentals', progress: 80 },
  { name: 'Python for Beginners', progress: 55 },
  { name: 'Data Science 101', progress: 30 },
  { name: 'Web Development', progress: 60 },
];

const announcements = [
  { title: 'New Course: Advanced JavaScript', date: '12 July 2024' },
  { title: 'Live Q&A with Assignments this Friday!', date: '10 July 2024' },
  { title: 'Assignment 2 Deadline Extended', date: '8 July 2024' },
];

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn !== 'true') {
        router.replace('/login');
      } else {
        setLoading(false);
      }
    }
  }, [router]);

  if (loading) return null;

  return (
    <DashboardLayout>
      {/* Welcome Message */}
      <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 8, color: '#22223b' }}>
        Welcome back, Arbaz <span role="img" aria-label="wave">👋</span>
      </div>
      <div style={{ fontSize: 18, color: '#64748b', marginBottom: 32 }}>
        Ready to continue learning?
      </div>
      {/* Quick Stats */}
      <div className={styles.quickStatsGrid}>
        {quickStats.map(stat => (
          <div key={stat.label} className={styles.quickStatCard} style={{ borderTop: `4px solid ${stat.color}` }}>
            <div className={styles.quickStatValue} style={{ color: stat.color }}>{stat.value}</div>
            <div className={styles.quickStatLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
      {/* Continue Learning Section */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Continue Learning</div>
        <div style={{ display: 'flex', gap: 18, overflowX: 'auto', paddingBottom: 8 }}>
          {continueLearning.map(course => (
            <div key={course.name} style={{
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
              minWidth: 260,
              maxWidth: 260,
              padding: '1.2rem 1.4rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{course.name}</div>
              <div style={{ height: 8, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden', margin: '8px 0' }}>
                <div style={{ width: `${course.progress}%`, height: '100%', background: '#2563eb', borderRadius: 4, transition: 'width 0.3s' }}></div>
              </div>
              <div style={{ fontSize: 14, color: '#64748b' }}>{course.progress}% complete</div>
              <button style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '7px 0',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                marginTop: 4,
              }}>
                ▶️ Resume
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Upcoming Schedule */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Upcoming Schedule</div>
        <div style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
          padding: '1.2rem 1.4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 420,
        }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 16 }}>Next class: React Fundamentals</div>
            <div style={{ fontSize: 15, color: '#64748b', marginTop: 2 }}>14 July, 8:00 PM</div>
          </div>
          <button style={{
            background: '#059669',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 18px',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            marginLeft: 18,
          }}>
            🔗 Join
          </button>
        </div>
      </div>
      {/* Announcements Section */}
      <div>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Announcements</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {announcements.map(a => (
            <div key={a.title} style={{
              background: '#fff',
              borderRadius: 10,
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
              padding: '1rem 1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: 15 }}>{a.title}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{a.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 