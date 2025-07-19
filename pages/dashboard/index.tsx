import { useRouter } from 'next/router';
import DashboardLayout from '../../components/DashboardLayout';
import styles from '../../styles/Home.module.css';
import { courses } from './courses';
import { courseModuleCounts } from './courses/[courseId]';
import { FaBookOpen, FaCheckCircle, FaHourglassHalf, FaCertificate } from 'react-icons/fa';
// @ts-ignore
import type {} from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

type LiveClass = {
  id: number;
  title: string;
  start: string;
  end: string;
};

const sidebarItems = [
  { icon: '📚', label: 'Dashboard', path: '/dashboard' },
  { icon: '📝', label: 'My Courses', path: '/dashboard/courses' },
  { icon: '🧑‍🏫', label: 'Assignments', path: '/dashboard/assignments' },
  { icon: '📅', label: 'Schedule / Calendar', path: '/dashboard/calendar' },
  { icon: '🏆', label: 'Achievements', path: '/dashboard/achievements' },
  { icon: '💬', label: 'Messages', path: '/dashboard/messages' },
  { icon: '⚙️', label: 'Settings', path: '/dashboard/settings' },
];

// Compute real-time quick stats
const quickStatsColors = {
  enrolled: '#2563eb',
  completed: '#059669',
  inProgress: '#f59e42',
  certificates: '#a21caf',
};

type ProgressData = { [key: string]: number };
type ModuleCounts = { [key: string]: number };

const announcements = [
  { title: 'New Course: Advanced JavaScript', date: '12 July 2024' },
  { title: 'Live Q&A with Assignments this Friday!', date: '10 July 2024' },
  { title: 'Assignment 2 Deadline Extended', date: '8 July 2024' },
];

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progressData, setProgressData] = useState<ProgressData>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn !== 'true') {
        router.replace('/login');
      } else {
        setLoading(false);
      }
      const data = JSON.parse(localStorage.getItem('courseProgress') || '{}');
      setProgressData(data);
    }
  }, [router]);

  if (loading) return null;

  // Build continue learning list from real progress
  const continueLearning = courses
    .map(course => {
      const totalModules = (courseModuleCounts as ModuleCounts)[course.slug] || 1;
      const completedModules = (progressData as ProgressData)[course.slug] || 0;
      const progress = Math.round((completedModules / totalModules) * 100);
      return {
        name: course.title,
        slug: course.slug,
        progress,
        completedModules,
        totalModules,
        status: course.status,
      };
    })
    .filter(c => c.progress > 0 && c.progress < 100);

  // Compute real-time quick stats
  const enrolledCount = courses.length;
  const completedCount = courses.filter(course => {
    const totalModules = (courseModuleCounts as ModuleCounts)[course.slug] || 1;
    const completedModules = (progressData as ProgressData)[course.slug] || 0;
    return Math.round((completedModules / totalModules) * 100) === 100;
  }).length;
  const inProgressCount = courses.filter(course => {
    const totalModules = (courseModuleCounts as ModuleCounts)[course.slug] || 1;
    const completedModules = (progressData as ProgressData)[course.slug] || 0;
    const progress = Math.round((completedModules / totalModules) * 100);
    return progress > 0 && progress < 100;
  }).length;
  const certificatesCount = completedCount; // For now, certificates = completed
  const quickStats = [
    { label: 'Courses Enrolled', value: enrolledCount, color: quickStatsColors.enrolled },
    { label: 'Completed', value: completedCount, color: quickStatsColors.completed },
    { label: 'In Progress', value: inProgressCount, color: quickStatsColors.inProgress },
    { label: 'Certificates', value: certificatesCount, color: quickStatsColors.certificates },
  ];

  const statIcons = [
    <FaBookOpen size={28} />, // Courses Enrolled
    <FaCheckCircle size={28} />, // Completed
    <FaHourglassHalf size={28} />, // In Progress
    <FaCertificate size={28} />, // Certificates
  ];

  return (
    <DashboardLayout>
      <div style={{
        background: '#f3f6fa',
        minHeight: '100vh',
        padding: '72px 0 40px 0', // Add top padding for navbar
      }}>
        {/* Welcome Message */}
        <div style={{
          fontSize: 32,
          fontWeight: 800,
          color: '#232946',
          marginBottom: 6,
          marginTop: 18,
          letterSpacing: '-1px',
        }}>
          Welcome back, Arbaz <span role="img" aria-label="wave">👋</span>
        </div>
        <div style={{ fontSize: 18, color: '#64748b', marginBottom: 32 }}>
          Ready to continue learning?
        </div>
        {/* Quick Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: 24,
          marginBottom: 38,
        }}>
          {quickStats.map((stat, i) => (
            <div key={stat.label} style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 2px 12px 0 rgba(30,41,59,0.07)',
              padding: '1.6rem 1.2rem 1.2rem 1.2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderTop: `4px solid ${stat.color}`,
              minHeight: 120,
              position: 'relative',
              transition: 'box-shadow 0.2s',
            }}>
              <div style={{ color: stat.color, marginBottom: 8 }}>{statIcons[i]}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: stat.color, marginBottom: 2 }}>{stat.value}</div>
              <div style={{ fontSize: 15, color: '#64748b', fontWeight: 600 }}>{stat.label}</div>
            </div>
          ))}
        </div>
        {/* Announcements Section */}
        <div style={{ marginBottom: 38 }}>
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 16, color: '#232946', letterSpacing: '-0.5px' }}>Announcements</div>
          <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            {announcements.map((a, idx) => (
              <div
                key={a.title + a.date}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  boxShadow: '0 4px 16px 0 rgba(30,41,59,0.08)',
                  padding: '1.4rem 1.6rem 1.2rem 1.2rem',
                  minWidth: 270,
                  maxWidth: 340,
                  marginBottom: 12,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: 16,
                  borderLeft: '5px solid #2563eb',
                  transition: 'box-shadow 0.18s, transform 0.18s',
                  cursor: 'pointer',
                  position: 'relative',
                  outline: 'none',
                }}
                onMouseOver={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px 0 rgba(37,99,235,0.13)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px) scale(1.02)';
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px 0 rgba(30,41,59,0.08)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'none';
                }}
                tabIndex={0}
              >
                <div style={{ fontSize: 28, color: '#2563eb', marginRight: 8, marginTop: 2 }} aria-label="announcement" role="img">📢</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ fontWeight: 700, fontSize: 17, color: '#232946', marginBottom: 2 }}>{a.title}</div>
                  <div style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>{a.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Continue Learning Carousel */}
        <div style={{ marginBottom: 38 }}>
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 16, color: '#232946', letterSpacing: '-0.5px' }}>Continue Learning</div>
          <div style={{ display: 'flex', gap: 24, overflowX: 'auto', paddingBottom: 8 }}>
            {continueLearning.length === 0 && (
              <div style={{ color: '#64748b', fontSize: 16, padding: 24, background: '#fff', borderRadius: 14, minWidth: 260, textAlign: 'center', boxShadow: '0 2px 8px 0 rgba(30,41,59,0.06)' }}>No courses in progress. Start learning a new course!</div>
            )}
            {continueLearning.map(course => (
              <div key={course.name} style={{
                background: '#fff',
                borderRadius: 18,
                boxShadow: '0 2px 12px 0 rgba(30,41,59,0.06)',
                minWidth: 260,
                maxWidth: 320,
                padding: '1.3rem 1.3rem 1.1rem 1.1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                alignItems: 'flex-start',
                position: 'relative',
                borderLeft: '4px solid #60a5fa',
                transition: 'box-shadow 0.18s, transform 0.18s',
                cursor: 'pointer',
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px 0 rgba(37,99,235,0.10)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px) scale(1.01)';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px 0 rgba(30,41,59,0.06)';
                (e.currentTarget as HTMLDivElement).style.transform = 'none';
              }}
              tabIndex={0}
              >
                <div style={{ fontSize: 22, color: '#60a5fa', marginBottom: 2, marginRight: 4 }} aria-label="course" role="img">📘</div>
                <div style={{ fontWeight: 700, fontSize: 17, color: '#232946', marginBottom: 2 }}>{course.name}</div>
                <div style={{ height: 8, background: '#e5e7eb', borderRadius: 6, overflow: 'hidden', width: '100%', margin: '8px 0' }}>
                  <div style={{ width: `${course.progress}%`, height: '100%', background: 'linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)', borderRadius: 6, transition: 'width 0.3s' }}></div>
                </div>
                <div style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>{course.progress}% complete</div>
                <button style={{
                  background: 'linear-gradient(90deg, #60a5fa 0%, #2563eb 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 7,
                  padding: '8px 0',
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: 'pointer',
                  marginTop: 4,
                  width: '100%',
                  boxShadow: '0 1px 4px 0 rgba(37,99,235,0.06)',
                  letterSpacing: '0.3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 7,
                  transition: 'background 0.18s',
                }}
                  onClick={() => {
                    router.push({
                      pathname: `/dashboard/courses/${course.slug}`,
                      query: course.completedModules > 0 ? { module: course.completedModules } : undefined,
                    });
                  }}
                >
                  <span style={{ fontSize: 17 }}>▶️</span> Resume
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Upcoming Schedule Section */}
        <div style={{ marginBottom: 38 }}>
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 16, color: '#232946', letterSpacing: '-0.5px' }}>Upcoming Schedule</div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {/* Demo: Next class card */}
            <div style={{
              background: '#fff',
              borderRadius: 18,
              boxShadow: '0 2px 12px 0 rgba(30,41,59,0.06)',
              minWidth: 260,
              maxWidth: 320,
              marginBottom: 12,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 14,
              borderLeft: '4px solid #059669',
              transition: 'box-shadow 0.18s, transform 0.18s',
              cursor: 'pointer',
              position: 'relative',
              outline: 'none',
              padding: '1.3rem 1.3rem 1.1rem 1.1rem',
            }}
              onMouseOver={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px 0 rgba(5,150,105,0.10)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px) scale(1.01)';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px 0 rgba(30,41,59,0.06)';
                (e.currentTarget as HTMLDivElement).style.transform = 'none';
              }}
              tabIndex={0}
            >
              <div style={{ fontSize: 26, color: '#059669', marginRight: 8, marginTop: 2 }} aria-label="calendar" role="img">📅</div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#232946', marginBottom: 2 }}>Next class: React Fundamentals</div>
                <div style={{ fontSize: 13, color: '#64748b', fontWeight: 500 }}>14 July, 8:00 PM</div>
                <button style={{
                  background: 'linear-gradient(90deg, #34d399 0%, #059669 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 7,
                  padding: '7px 0',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  marginTop: 10,
                  width: 100,
                  boxShadow: '0 1px 4px 0 rgba(5,150,105,0.06)',
                  letterSpacing: '0.3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 7,
                  transition: 'background 0.18s',
                }}
                  onClick={() => {
                    // Demo: join link
                    window.open('https://zoom.us/j/123456789', '_blank');
                  }}
                >
                  <span style={{ fontSize: 16 }}>🔗</span> Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 