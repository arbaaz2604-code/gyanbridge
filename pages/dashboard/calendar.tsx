import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/DashboardLayout';
// Import assignments from assignments.tsx
import { assignments, filteredAssignments } from './assignments';
import React from 'react';

const sidebarItems = [
  { icon: '📚', label: 'Dashboard', path: '/dashboard' },
  { icon: '📝', label: 'My Courses', path: '/dashboard/courses' },
  { icon: '🧑‍🏫', label: 'Assignments', path: '/dashboard/assignments' },
  { icon: '📅', label: 'Schedule / Calendar', path: '/dashboard/calendar' },
  { icon: '🏆', label: 'Achievements', path: '/dashboard/achievements' },
  { icon: '💬', label: 'Messages', path: '/dashboard/messages' },
  { icon: '⚙️', label: 'Settings', path: '/dashboard/settings' },
];

// Simulate completed courses with completion dates (hardcoded, same as assignments.tsx)
const completedCourses = [
  { name: 'React Fundamentals', completedAt: '2025-07-16' },
  { name: 'Python for Beginners', completedAt: '2025-07-16' },
  { name: 'Data Science 101', completedAt: '2025-07-16' },
  // Add more as needed
];

// Build assignment events only for completed courses
const assignmentEvents = filteredAssignments.map((a: any) => ({
  date: a.dueDate,
  type: 'Assignment Due',
  title: a.title + ' (' + a.course + ')',
  time: '11:59 PM',
  assignment: a,
}));

const events = [
  { date: '2025-07-14', type: 'Live Class', title: 'React Fundamentals', time: '8:00 PM' },
  { date: '2025-07-18', type: 'Workshop', title: 'Data Science Bootcamp', time: '6:00 PM' },
  { date: '2025-07-20', type: 'Live Class', title: 'Web Development', time: '7:00 PM' },
  ...assignmentEvents,
];

function getMonthDays(year: number, month: number) {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export default function CalendarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAssignments, setModalAssignments] = useState<any[]>([]);
  const [modalDate, setModalDate] = useState<string>('');

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

  const days = getMonthDays(currentYear, currentMonth);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <DashboardLayout>
      <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 24, color: '#22223b' }}>
        Calendar
      </div>
      {/* Calendar Grid */}
      <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)', padding: '1.5rem', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <button onClick={() => setCurrentMonth(m => m === 0 ? 11 : m - 1)} style={{ fontSize: 20, background: 'none', border: 'none', cursor: 'pointer' }}>◀️</button>
          <div style={{ fontWeight: 600, fontSize: 18 }}>{monthNames[currentMonth]} {currentYear}</div>
          <button onClick={() => setCurrentMonth(m => m === 11 ? 0 : m + 1)} style={{ fontSize: 20, background: 'none', border: 'none', cursor: 'pointer' }}>▶️</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 8 }}>
          {weekDays.map(day => (
            <div key={day} style={{ fontWeight: 600, color: '#64748b', textAlign: 'center' }}>{day}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 }}>
          {[...Array(firstDay)].map((_, i) => <div key={i}></div>)}
          {days.map(date => {
            const dateStr = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            const dayEvents = events.filter(e => e.date === dateStr);
            const dayAssignments = assignmentEvents.filter(e => e.date === dateStr);
            return (
              <div
                key={dateStr}
                style={{
                  background: dayEvents.length ? '#e0e7ef' : '#f8fafc',
                  borderRadius: 8,
                  minHeight: 48,
                  padding: 4,
                  textAlign: 'center',
                  border: '1px solid #e5e7eb',
                  fontWeight: 500,
                  color: '#22223b',
                  position: 'relative',
                  cursor: dayAssignments.length > 0 ? 'pointer' : 'default',
                }}
                onClick={() => {
                  if (dayAssignments.length > 0) {
                    setModalAssignments(dayAssignments.map(e => e.assignment));
                    setModalDate(dateStr);
                    setModalOpen(true);
                  }
                }}
              >
                {date.getDate()}
                {dayEvents.length > 0 && (
                  <span style={{ display: 'block', fontSize: 11, color: '#2563eb', marginTop: 2 }}>
                    {dayEvents.map(e => e.type).join(', ')}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Assignment Details Modal */}
      {modalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(30,40,60,0.18)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 8px 32px 0 rgba(60,72,100,0.13)',
              padding: '2.2rem 2.2rem 2rem 2.2rem',
              minWidth: 320,
              maxWidth: 400,
              position: 'relative',
              border: '1.5px solid #e5e7eb',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                background: 'none',
                border: 'none',
                fontSize: 22,
                color: '#64748b',
                cursor: 'pointer',
                fontWeight: 700,
                zIndex: 2,
              }}
              aria-label="Close"
            >
              ×
            </button>
            <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 10, color: '#232946', textAlign: 'center', letterSpacing: '-0.5px' }}>
              Assignment Due
            </div>
            <div style={{ height: 3, width: 48, background: '#2563eb', borderRadius: 2, margin: '0 auto 18px auto' }} />
            {modalAssignments.map((a, idx) => (
              <div key={a.title + idx} style={{
                marginBottom: 18,
                background: '#f7fafd',
                borderRadius: 10,
                padding: '1rem 1.1rem',
                boxShadow: '0 1px 6px 0 rgba(60,72,100,0.06)',
                border: '1px solid #e5e7eb',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#181c32', marginBottom: 2 }}>{a.title}</div>
                <div style={{ fontSize: 13, color: '#60a5fa', fontWeight: 600 }}>Course: {a.course}</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>Due Date: <span style={{ color: '#181c32', fontWeight: 600 }}>{a.dueDate}</span></div>
                <div style={{ fontSize: 13, color: a.status === 'Completed' ? '#059669' : '#ef4444', fontWeight: 700 }}>Status: {a.status || 'Pending'}</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>Time: 11:59 PM</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Events List */}
      <div>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Upcoming Events</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {events.map(e => (
            <div key={e.title + e.date} style={{
              background: '#fff',
              borderRadius: 10,
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)',
              padding: '1rem 1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: 15 }}>{e.title}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{e.type} • {e.date} • {e.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
} 