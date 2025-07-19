import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/DashboardLayout';
import { courseModuleCounts } from './courses/[courseId]';

type ProgressData = { [key: string]: number };
type ModuleCounts = { [key: string]: number };

const sidebarItems = [
  { icon: '📚', label: 'Dashboard', path: '/dashboard' },
  { icon: '📝', label: 'My Courses', path: '/dashboard/courses' },
  { icon: '🧑‍🏫', label: 'Assignments', path: '/dashboard/assignments' },
  { icon: '💻', label: 'Projects', path: '/dashboard/projects' },
  { icon: '📅', label: 'Schedule / Calendar', path: '/dashboard/calendar' },
  { icon: '🏆', label: 'Achievements', path: '/dashboard/achievements' },
  { icon: '💬', label: 'Messages', path: '/dashboard/messages' },
  { icon: '⚙️', label: 'Settings', path: '/dashboard/settings' },
];

const courses = [
  {
    title: 'React Fundamentals',
    instructor: 'Jane Doe',
    rating: 4.8,
    progress: 80,
    status: 'In Progress',
    slug: 'react-fundamentals',
  },
  {
    title: 'Python for Beginners',
    instructor: 'John Smith',
    rating: 4.6,
    progress: 100,
    status: 'Completed',
    slug: 'python-for-beginners',
  },
  {
    title: 'Data Science 101',
    instructor: 'Emily Clark',
    rating: 4.7,
    progress: 30,
    status: 'In Progress',
    slug: 'data-science-101',
  },
  {
    title: 'Web Development',
    instructor: 'Michael Lee',
    rating: 4.9,
    progress: 60,
    status: 'In Progress',
    slug: 'web-development',
  },
  {
    title: 'Machine Learning Basics',
    instructor: 'Sarah Kim',
    rating: 4.5,
    progress: 100,
    status: 'Completed',
    slug: 'machine-learning-basics',
  },
];

export { courses };

export default function MyCourses() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState<ProgressData>({});

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = JSON.parse(localStorage.getItem('courseProgress') || '{}');
      setProgressData(data);
    }
  }, []);

  if (loading) return null;

  return (
    <DashboardLayout>
      <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 24, color: '#22223b' }}>
        My Courses
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
        gap: 28,
      }}>
        {courses.map(course => {
          const totalModules = (courseModuleCounts as ModuleCounts)[course.slug] || 1;
          const completedModules = (progressData as ProgressData)[course.slug] || 0;
          const progress = Math.round((completedModules / totalModules) * 100);
          return (
            <div key={course.title} style={{
              background: '#fff',
              borderRadius: 14,
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
              padding: '1.5rem 1.4rem',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              minWidth: 0,
              cursor: 'pointer',
            }}
            onClick={() => router.push(`/dashboard/courses/${course.slug}`)}
            >
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 2 }}>{course.title}</div>
              <div style={{ fontSize: 15, color: '#64748b', marginBottom: 2 }}>Instructor: {course.instructor}</div>
              <div style={{ fontSize: 15, color: '#f59e42', marginBottom: 2 }}>
                Rating: {course.rating} <span style={{ fontSize: 17 }}>⭐</span>
              </div>
              {/* Show progress bar for all courses */}
              <div style={{ height: 8, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden', margin: '8px 0' }}>
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: course.status === 'Completed' ? '#059669' : '#2563eb',
                    borderRadius: 4,
                    transition: 'width 0.3s'
                  }}
                ></div>
              </div>
              <div style={{ fontSize: 14, color: '#64748b' }}>
                {progress}% {course.status === 'Completed' ? 'Completed' : 'In Progress'}
              </div>
              <button style={{
                background: course.status === 'Completed' ? '#059669' : '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '8px 0',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                marginTop: 4,
              }}
              onClick={e => {
                e.stopPropagation();
                const lastModule = (progressData as ProgressData)[course.slug] || 0;
                router.push({
                  pathname: `/dashboard/courses/${course.slug}`,
                  query: lastModule > 0 ? { module: lastModule } : undefined,
                });
              }}
              >
                {course.status === 'Completed' ? 'View Course' : '▶️ Resume'}
              </button>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
} 