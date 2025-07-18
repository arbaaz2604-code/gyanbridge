import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/DashboardLayout';
import styles from '../../styles/Home.module.css';
import { courses } from './courses';
import { courseModuleCounts } from './courses/[courseId]';
import { FaBookOpen, FaCheckCircle, FaHourglassHalf, FaCertificate } from 'react-icons/fa';
// @ts-ignore
import type {} from 'react-icons/fa';

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
        {/* Continue Learning Carousel */}
        <div style={{ marginBottom: 38 }}>
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 16, color: '#232946', letterSpacing: '-0.5px' }}>Continue Learning</div>
          <div style={{ display: 'flex', gap: 22, overflowX: 'auto', paddingBottom: 8 }}>
            {continueLearning.length === 0 && (
              <div style={{ color: '#64748b', fontSize: 16, padding: 24, background: '#fff', borderRadius: 12, minWidth: 260, textAlign: 'center' }}>No courses in progress. Start learning a new course!</div>
            )}
            {continueLearning.map(course => (
              <div key={course.name} style={{
                background: '#fff',
                borderRadius: 16,
                boxShadow: '0 2px 12px 0 rgba(30,41,59,0.07)',
                minWidth: 280,
                maxWidth: 320,
                padding: '1.5rem 1.6rem',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                alignItems: 'flex-start',
                position: 'relative',
              }}>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#232946', marginBottom: 2 }}>{course.name}</div>
                <div style={{ height: 10, background: '#e5e7eb', borderRadius: 5, overflow: 'hidden', width: '100%', margin: '8px 0' }}>
                  <div style={{ width: `${course.progress}%`, height: '100%', background: '#2563eb', borderRadius: 5, transition: 'width 0.3s' }}></div>
                </div>
                <div style={{ fontSize: 15, color: '#64748b' }}>{course.progress}% complete</div>
                <button style={{
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '9px 0',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  marginTop: 4,
                  width: '100%',
                  boxShadow: '0 1px 4px 0 rgba(37,99,235,0.08)',
                  letterSpacing: '0.5px',
                }}
                  onClick={() => {
                    router.push({
                      pathname: `/dashboard/courses/${course.slug}`,
                      query: course.completedModules > 0 ? { module: course.completedModules } : undefined,
                    });
                  }}
                >
                  ▶️ Resume
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Upcoming Schedule */}
        <div style={{ marginBottom: 38 }}>
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 16, color: '#232946', letterSpacing: '-0.5px' }}>Upcoming Schedule</div>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 2px 12px 0 rgba(30,41,59,0.07)',
            padding: '1.5rem 1.6rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: 480,
            minWidth: 260,
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#232946' }}>Next class: React Fundamentals</div>
              <div style={{ fontSize: 15, color: '#64748b', marginTop: 2 }}>14 July, 8:00 PM</div>
            </div>
            <button style={{
              background: '#059669',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 22px',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              marginLeft: 18,
              boxShadow: '0 1px 4px 0 rgba(5,150,105,0.08)',
            }}>
              🔗 Join
            </button>
          </div>
        </div>
        {/* Announcements Section */}
        <div>
          <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 16, color: '#232946', letterSpacing: '-0.5px' }}>Announcements</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {announcements.map(a => (
              <div key={a.title} style={{
                background: '#fff',
                borderRadius: 14,
                boxShadow: '0 2px 12px 0 rgba(30,41,59,0.07)',
                padding: '1.2rem 1.4rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, color: '#232946' }}>{a.title}</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{a.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 