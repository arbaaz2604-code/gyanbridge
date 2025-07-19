import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/DashboardLayout';

const sidebarItems = [
  { icon: '📚', label: 'Dashboard', path: '/dashboard' },
  { icon: '📝', label: 'My Courses', path: '/dashboard/courses' },
  { icon: '🧑‍🏫', label: 'Assignments', path: '/dashboard/assignments' },
  { icon: '📅', label: 'Schedule / Calendar', path: '/dashboard/calendar' },
  { icon: '🏆', label: 'Achievements', path: '/dashboard/achievements' },
  { icon: '💬', label: 'Messages', path: '/dashboard/messages' },
  { icon: '⚙️', label: 'Settings', path: '/dashboard/settings' },
];

// Replace the assignments array with assignment objects
export const assignments = [
  {
    title: 'React Hooks Project',
    description: 'Build a Todo app using React Hooks.',
    dueDate: '2025-07-20', // after 16/07/2025
    course: 'React Fundamentals',
    status: 'Pending',
  },
  {
    title: 'Python Basics Quiz',
    description: 'Complete the quiz on Python basics.',
    dueDate: '2025-07-22', // after 16/07/2025
    course: 'Python for Beginners',
    status: 'Pending',
  },
  {
    title: 'Data Science Mini Project',
    description: 'Analyze a dataset and present your findings.',
    dueDate: '2025-07-25', // after 16/07/2025
    course: 'Data Science 101',
    status: 'Pending',
  },
  {
    title: 'Web Dev Portfolio',
    description: 'Create a personal portfolio website.',
    dueDate: '2025-07-28', // after 16/07/2025
    course: 'Web Development',
    status: 'Pending',
  },
  {
    title: 'ML Basics Assignment',
    description: 'Implement a simple linear regression model.',
    dueDate: '2025-08-01', // after 16/07/2025
    course: 'Machine Learning Basics',
    status: 'Pending',
  },
];

// Add the user's enrolled courses (copied from courses.tsx)
const enrolledCourses = [
  'React Fundamentals',
  'Python for Beginners',
  'Data Science 101',
  'Web Development',
  'Machine Learning Basics',
];

// Simulate completed courses with completion dates (hardcoded)
const completedCourses = [
  { name: 'Python for Beginners', completedAt: '2025-07-16' },
  { name: 'Machine Learning Basics', completedAt: '2025-07-16' },
  // Add more as needed
];

// Show assignments for all enrolled courses (immediately upon enrollment)
export const filteredAssignments = assignments.filter(a =>
  enrolledCourses.includes(a.course)
);

export default function Assignments() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  // Filter by search
  const filtered = filteredAssignments.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.description.toLowerCase().includes(search.toLowerCase()) ||
    a.course.toLowerCase().includes(search.toLowerCase()) ||
    a.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 24, color: '#22223b' }}>
        Assignments
      </div>
      {/* Search/Filter Bar */}
      <div style={{ marginBottom: 28 }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search assignments, course, or status..."
          style={{
            width: 340,
            padding: '10px 16px',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            fontSize: 16,
            background: '#fff',
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.03)',
          }}
        />
      </div>
      {/* Assignment Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
        gap: 28,
      }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1/-1', color: '#64748b', fontSize: 18 }}>No assignments found.</div>
        ) : (
          filtered.map(a => (
            <div key={a.title + a.course} style={{
              background: '#fff',
              borderRadius: 14,
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
              padding: '1.5rem 1.4rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              minWidth: 0,
            }}>
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 2 }}>{a.title}</div>
              <div style={{ fontSize: 15, color: '#64748b', marginBottom: 6 }}>{a.description}</div>
              <div style={{ fontSize: 14, color: '#2563eb', marginBottom: 4 }}>Course: {a.course}</div>
              <div style={{ fontSize: 14, color: '#f59e42', marginBottom: 4 }}>Due: {a.dueDate}</div>
              <div style={{ fontSize: 14, color: a.status === 'Completed' ? '#059669' : '#ef4444', fontWeight: 600 }}>
                Status: {a.status}
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
} 