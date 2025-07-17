import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import DashboardNavbar from '../../components/DashboardNavbar';
import DashboardSidebar from '../../components/DashboardSidebar';

const mockProfile = {
  name: 'Arbaz Khan',
  email: 'admin@gmail.com',
  profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
  phone: '+91 91370 23462',
};

export default function Settings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(mockProfile);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

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

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProfile({ ...profile, profilePic: url });
    }
  };

  const handleProfileSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMessage('Profile updated! (Demo only)');
    setTimeout(() => setMessage(''), 2000);
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }
    setMessage('Password changed! (Demo only)');
    setPassword('');
    setConfirmPassword('');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <>
      <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f3f4f6' }}>
        <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} currentPath={router.pathname} />
        <main style={{ flex: 1, padding: '2.5rem 2rem', background: '#f3f4f6', marginLeft: 230, maxWidth: 600 }}>
          <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 24, color: '#22223b' }}>
            Profile Settings
          </div>
          {/* Edit Profile Form */}
          <form onSubmit={handleProfileSubmit} style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)', padding: '2rem', marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <img src={profile.profilePic} alt="Profile" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e0e7eb' }} />
              <label style={{ cursor: 'pointer', color: '#2563eb', fontWeight: 500 }}>
                Change Photo
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleProfilePicChange} />
              </label>
            </div>
            <div>
              <label style={{ fontWeight: 500, color: '#22223b' }}>Name</label>
              <input name="name" value={profile.name} onChange={handleProfileChange} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 15, marginTop: 4 }} />
            </div>
            <div>
              <label style={{ fontWeight: 500, color: '#22223b' }}>Email</label>
              <input name="email" value={profile.email} onChange={handleProfileChange} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 15, marginTop: 4 }} />
            </div>
            <div>
              <label style={{ fontWeight: 500, color: '#22223b' }}>Phone</label>
              <input name="phone" value={profile.phone} onChange={handleProfileChange} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 15, marginTop: 4 }} />
            </div>
            <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 0', fontWeight: 600, fontSize: 16, cursor: 'pointer', marginTop: 8 }}>Save Changes</button>
          </form>
          {/* Change Password Form */}
          <form onSubmit={handlePasswordSubmit} style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Change Password</div>
            <div>
              <label style={{ fontWeight: 500, color: '#22223b' }}>New Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 15, marginTop: 4 }} />
            </div>
            <div>
              <label style={{ fontWeight: 500, color: '#22223b' }}>Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 15, marginTop: 4 }} />
            </div>
            <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 0', fontWeight: 600, fontSize: 16, cursor: 'pointer', marginTop: 8 }}>Change Password</button>
          </form>
          {message && <div style={{ marginTop: 18, color: '#059669', fontWeight: 500 }}>{message}</div>}
        </main>
      </div>
      <style jsx global>{`
        @media (max-width: 900px) {
          main {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </>
  );
} 