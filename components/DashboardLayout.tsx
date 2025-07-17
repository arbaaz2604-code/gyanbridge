import React, { useState } from 'react';
import { useRouter } from 'next/router';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f3f4f6' }}>
        <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} currentPath={router.pathname} />
        <main style={{ flex: 1, padding: '2.5rem 2rem', background: '#f3f4f6', marginLeft: 230 }}>
          {children}
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
};

export default DashboardLayout; 