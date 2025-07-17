import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const sidebarItems = [
  { icon: '📚', label: 'Dashboard', path: '/dashboard' },
  { icon: '📝', label: 'My Courses', path: '/dashboard/courses' },
  { icon: '🧑‍🏫', label: 'Assignments', path: '/dashboard/assignments' },
  { icon: '📅', label: 'Schedule / Calendar', path: '/dashboard/calendar' },
  { icon: '🏆', label: 'Achievements', path: '/dashboard/achievements' },
  { icon: '💬', label: 'Messages', path: '/dashboard/messages' },
  { icon: '⚙️', label: 'Settings', path: '/dashboard/settings' },
];

const fallbackUser = {
  name: 'Arbaz Khan',
  email: 'admin@gmail.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  currentPath: string;
}

const DashboardSidebar: React.FC<SidebarProps> = ({ open, onClose, currentPath }) => {
  const router = useRouter();
  const [user, setUser] = useState(fallbackUser);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dashboardUser');
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(fallbackUser);
        }
      }
    }
  }, []);

  const sidebarBg = 'linear-gradient(135deg, #f8f6f2 0%, #f7ecd0 60%, #e7cba9 100%)';

  return (
    <>
      {/* Overlay for mobile */}
      <div
        onClick={onClose}
        style={{
          display: open ? 'block' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.18)',
          zIndex: 120,
        }}
      />
      <aside
        style={{
          width: 240,
          background: sidebarBg,
          borderRight: '1px solid #e5e7eb',
          padding: '4.2rem 1rem 1.2rem 1rem', // Increased top padding to match navbar height
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          boxShadow: '2px 0 12px 0 rgba(185,122,86,0.07)',
          position: 'fixed',
          top: 0,
          left: open ? 0 : -260,
          height: '100vh',
          zIndex: 130,
          transition: 'left 0.25s',
        }}
      >
        {/* User Info Card at the top */}
        <div style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 12px 0 #e7cba922',
          padding: '1.2rem 0.5rem 1.1rem 0.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 0,
        }}>
          <img src={user.avatar} alt={user.name} style={{ width: 62, height: 62, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e7cba9', marginBottom: 10 }} />
          <div style={{ fontWeight: 700, fontSize: 16, color: '#7c3f18', marginBottom: 2 }}>{user.name}</div>
          <div style={{ fontSize: 13, color: '#a15c2f', marginBottom: 2 }}>{user.email}</div>
        </div>
        <div style={{ height: 1, background: '#e7cba9', borderRadius: 1, margin: '0.7rem 0 0.2rem 0' }} />
        {/* Close button for mobile */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 6 }}>
          <button
            onClick={onClose}
            style={{
              display: 'inline-block',
              background: 'none',
              border: 'none',
              fontSize: 26,
              cursor: 'pointer',
              color: '#a15c2f',
              marginRight: 2,
            }}
            className="sidebar-close-btn"
          >
            ×
          </button>
        </div>
        <div style={{ fontWeight: 700, fontSize: 15, color: '#7c3f18', marginBottom: 8, marginLeft: 8, letterSpacing: 1 }}>MENU</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {sidebarItems.map(item => (
            <button
              key={item.label}
              onClick={() => { router.push(item.path); onClose(); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 18px',
                background: currentPath === item.path ? '#fff' : 'transparent',
                border: 'none',
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 500,
                color: currentPath === item.path ? '#b97a56' : '#7c3f18',
                cursor: 'pointer',
                transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
                boxShadow: currentPath === item.path ? '0 2px 12px #e7cba922' : 'none',
                marginBottom: 2,
                outline: 'none',
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#f7ecd0';
                (e.currentTarget as HTMLButtonElement).style.color = '#a15c2f';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 12px #e7cba922';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLButtonElement).style.background = currentPath === item.path ? '#fff' : 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = currentPath === item.path ? '#b97a56' : '#7c3f18';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = currentPath === item.path ? '0 2px 12px #e7cba922' : 'none';
              }}
            >
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </aside>
      {/* Desktop sidebar (hidden on mobile) */}
      <aside
        style={{
          width: 240,
          background: sidebarBg,
          borderRight: '1px solid #e5e7eb',
          padding: '4.2rem 1rem 1.2rem 1rem', // Increased top padding to match navbar height
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          boxShadow: '2px 0 12px 0 rgba(185,122,86,0.07)',
          minHeight: '100vh',
          position: 'relative',
        }}
        className="sidebar-desktop"
      >
        {/* User Info Card at the top */}
        <div style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 12px 0 #e7cba922',
          padding: '1.2rem 0.5rem 1.1rem 0.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 0,
        }}>
          <img src={user.avatar} alt={user.name} style={{ width: 62, height: 62, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e7cba9', marginBottom: 10 }} />
          <div style={{ fontWeight: 700, fontSize: 16, color: '#7c3f18', marginBottom: 2 }}>{user.name}</div>
          <div style={{ fontSize: 13, color: '#a15c2f', marginBottom: 2 }}>{user.email}</div>
        </div>
        <div style={{ height: 1, background: '#e7cba9', borderRadius: 1, margin: '0.7rem 0 0.2rem 0' }} />
        <div style={{ fontWeight: 700, fontSize: 15, color: '#7c3f18', marginBottom: 8, marginLeft: 8, letterSpacing: 1 }}>MENU</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {sidebarItems.map(item => (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 18px',
                background: currentPath === item.path ? '#fff' : 'transparent',
                border: 'none',
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 500,
                color: currentPath === item.path ? '#b97a56' : '#7c3f18',
                cursor: 'pointer',
                transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
                boxShadow: currentPath === item.path ? '0 2px 12px #e7cba922' : 'none',
                marginBottom: 2,
                outline: 'none',
              }}
              onMouseOver={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#f7ecd0';
                (e.currentTarget as HTMLButtonElement).style.color = '#a15c2f';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 12px #e7cba922';
              }}
              onMouseOut={e => {
                (e.currentTarget as HTMLButtonElement).style.background = currentPath === item.path ? '#fff' : 'transparent';
                (e.currentTarget as HTMLButtonElement).style.color = currentPath === item.path ? '#b97a56' : '#7c3f18';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = currentPath === item.path ? '0 2px 12px #e7cba922' : 'none';
              }}
            >
              <span style={{ fontSize: 22 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </aside>
      <style jsx global>{`
        @media (max-width: 900px) {
          .sidebar-desktop {
            display: none !important;
          }
        }
        @media (min-width: 901px) {
          .sidebar-close-btn {
            display: none !important;
          }
          aside[style*='position:fixed'] {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default DashboardSidebar; 