import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/DashboardLayout';

const certificates = [
  { id: 1, course: 'React Fundamentals', date: '2024-07-15', instructor: 'Jane Doe', url: '/certificate-template.jpg', shareUrl: '#' },
  { id: 2, course: 'Python for Beginners', date: '2024-06-10', instructor: 'John Smith', url: '/certificate-template.jpg', shareUrl: '#' },
];

const badges = [
  { name: 'First Course Completed', earned: true, icon: '🏅', desc: 'Complete your first course.' },
  { name: 'Top Scorer', earned: false, icon: '🥇', desc: 'Score 90%+ in a course.' },
  { name: 'Consistent Learner', earned: true, icon: '📆', desc: 'Learn 7 days in a row.' },
  { name: 'Gold Badge', earned: false, icon: '🥇', desc: 'Complete 5 courses.' },
];

const completedCourses = [
  { name: 'React Fundamentals', date: '2024-07-15' },
  { name: 'Python for Beginners', date: '2024-06-10' },
];

const milestones = [
  { name: 'Learning Streak', value: 7, goal: 14 },
  { name: 'Hours Learned', value: 32, goal: 50 },
  { name: 'Assignments Completed', value: 5, goal: 10 },
];

const leaderboard = [
  { name: 'Arbaz Khan (You)', points: 1200, rank: 3 },
  { name: 'Jane Doe', points: 1500, rank: 1 },
  { name: 'John Smith', points: 1350, rank: 2 },
  { name: 'Emily Clark', points: 1100, rank: 4 },
];

export default function Achievements() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shareMsg, setShareMsg] = useState('');

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

  const handleShare = (type: string, name: string) => {
    setShareMsg(`Shared ${type}: ${name} (Demo only)`);
    setTimeout(() => setShareMsg(''), 2000);
  };

  // Get completed courses and certificates
  const completedCourses = [
    { name: 'React Fundamentals', date: '2024-07-15' },
    { name: 'Python for Beginners', date: '2024-06-10' },
  ];
  const certificates = [
    { id: 1, course: 'React Fundamentals', date: '2024-07-15', instructor: 'Jane Doe', url: '/certificate-template.jpg', shareUrl: '#' },
    { id: 2, course: 'Python for Beginners', date: '2024-06-10', instructor: 'John Smith', url: '/certificate-template.jpg', shareUrl: '#' },
  ];

  // Generate badges for completed courses
  const courseCompletionBadges = completedCourses.map((course, idx) => ({
    name: `Completed: ${course.name}`,
    earned: true,
    icon: '🏅',
    desc: `You completed the course: ${course.name}`,
    date: course.date,
  }));

  const badges = [
    ...courseCompletionBadges,
    { name: 'First Course Completed', earned: true, icon: '🏅', desc: 'Complete your first course.' },
    { name: 'Top Scorer', earned: false, icon: '🥇', desc: 'Score 90%+ in a course.' },
    { name: 'Consistent Learner', earned: true, icon: '📆', desc: 'Learn 7 days in a row.' },
    { name: 'Gold Badge', earned: false, icon: '🥇', desc: 'Complete 5 courses.' },
  ];

  return (
    <DashboardLayout>
      <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 24, color: '#22223b' }}>
        Achievements
      </div>
      {/* Certificates */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>My Certificates</div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {certificates.map(cert => (
            <div key={cert.id} style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)', padding: '1.2rem 2rem', minWidth: 260, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{cert.course}</div>
              <div style={{ fontSize: 14, color: '#64748b' }}>Instructor: {cert.instructor}</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>Date: {cert.date}</div>
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button
                  onClick={async () => {
                    const userName = "Arbaz Khan"; // Replace with dynamic user name if available
                    const res = await fetch(`/api/generate-certificate?name=${encodeURIComponent(userName)}&course=${encodeURIComponent(cert.course)}`);
                    const blob = await res.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `certificate-${cert.course.replace(/\s+/g, '-')}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                  }}
                  style={{ background: '#059669', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 500, fontSize: 14, cursor: 'pointer' }}
                >
                  Download
                </button>
                <button onClick={() => handleShare('Certificate', cert.course)} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 500, fontSize: 14, cursor: 'pointer' }}>Share</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Badges */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Badges</div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          {badges.map(badge => (
            <div key={badge.name} style={{ background: badge.earned ? '#fff' : '#f3f4f6', borderRadius: 12, boxShadow: badge.earned ? '0 2px 8px 0 rgba(0,0,0,0.04)' : 'none', padding: '1.2rem 1.4rem', minWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: badge.earned ? 1 : 0.5, border: badge.earned ? '2px solid #2563eb' : '2px dashed #e5e7eb' }}>
              <span style={{ fontSize: 32 }}>{badge.icon}</span>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{badge.name}</div>
              <div style={{ fontSize: 13, color: '#64748b', textAlign: 'center' }}>{badge.desc}</div>
              {'date' in badge && badge.date && (
                <div style={{ fontSize: 12, color: '#059669', marginTop: 2 }}>Unlocked: {badge.date}</div>
              )}
              <div style={{ fontSize: 13, color: badge.earned ? '#059669' : '#64748b', marginTop: 4 }}>{badge.earned ? 'Earned' : 'Locked'}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Course Completion */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Completed Courses</div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          {completedCourses.map(c => (
            <div key={c.name} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)', padding: '1.2rem 1.4rem', minWidth: 180, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{c.name}</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>Completed: {c.date}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Milestones */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Milestones</div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          {milestones.map(m => (
            <div key={m.name} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)', padding: '1.2rem 1.4rem', minWidth: 180, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>{m.name}</div>
              <div style={{ height: 8, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden', margin: '8px 0' }}>
                <div style={{ width: `${(m.value / m.goal) * 100}%`, height: '100%', background: '#2563eb', borderRadius: 4, transition: 'width 0.3s' }}></div>
              </div>
              <div style={{ fontSize: 13, color: '#64748b' }}>{m.value} / {m.goal}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Leaderboard */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Leaderboard</div>
        <div style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)', padding: '1.2rem 2rem', maxWidth: 400 }}>
          <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 8 }}>Your Rank: <span style={{ color: '#2563eb', fontWeight: 700 }}>{leaderboard.find(l => l.name.includes('You'))?.rank}</span></div>
          <ol style={{ paddingLeft: 18, margin: 0 }}>
            {leaderboard.map(l => (
              <li key={l.name} style={{ fontSize: 15, color: l.name.includes('You') ? '#2563eb' : '#22223b', fontWeight: l.name.includes('You') ? 700 : 500, marginBottom: 2 }}>{l.name}  {l.points} pts</li>
            ))}
          </ol>
        </div>
      </div>
      {/* Share Achievements */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Share Achievements</div>
        <div style={{ display: 'flex', gap: 14 }}>
          <button onClick={() => handleShare('Achievements', 'LinkedIn')} style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Share to LinkedIn</button>
          <button onClick={() => handleShare('Achievements', 'Twitter')} style={{ background: '#1da1f2', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Share to Twitter</button>
          <button onClick={() => handleShare('Achievements', 'WhatsApp')} style={{ background: '#25d366', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Share to WhatsApp</button>
        </div>
      </div>
      {shareMsg && <div style={{ marginTop: 18, color: '#059669', fontWeight: 500 }}>{shareMsg}</div>}
    </DashboardLayout>
  );
} 