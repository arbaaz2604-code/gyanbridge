import DashboardLayout from '../../components/DashboardLayout';
import React from 'react';

// Define projects for each course (should match DashboardNavbar)
const projects = [
  { title: 'React Portfolio Project', course: 'React Fundamentals', dueDate: '2025-07-30' },
  { title: 'Python Capstone', course: 'Python for Beginners', dueDate: '2025-08-02' },
  { title: 'Data Science Final Project', course: 'Data Science 101', dueDate: '2025-08-05' },
  { title: 'Web Dev Final Project', course: 'Web Development', dueDate: '2025-08-10' },
  { title: 'ML Capstone', course: 'Machine Learning Basics', dueDate: '2025-08-15' },
];

// Simulate completed courses (should match DashboardNavbar)
const completedCourses = [
  { name: 'Python for Beginners', completedAt: '2025-07-16' },
  { name: 'Machine Learning Basics', completedAt: '2025-07-16' },
  // Add more as needed
];

// Only show projects for completed courses
const assignedProjects = projects.filter(p => completedCourses.some(c => c.name === p.course));

export default function Projects() {
  return (
    <DashboardLayout>
      <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 24, color: '#22223b' }}>
        Projects
      </div>
      <div style={{
        background: '#f8fafc',
        borderRadius: 16,
        boxShadow: '0 2px 12px 0 rgba(30,41,59,0.07)',
        padding: '2rem 1.5rem',
        margin: '0 auto',
        maxWidth: 700,
        color: '#232946',
        fontSize: 16,
      }}>
        {assignedProjects.length === 0 ? (
          <div style={{ textAlign: 'center' }}>No projects yet. Projects assigned to you will appear here.</div>
        ) : (
          assignedProjects.map((p, idx) => (
            <div key={p.title + p.course} style={{
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 1px 4px 0 rgba(30,41,59,0.04)',
              padding: '1.2rem 1rem',
              marginBottom: 18,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}>
              <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 2 }}>{p.title}</div>
              <div style={{ fontSize: 15, color: '#64748b', marginBottom: 4 }}>Course: {p.course}</div>
              <div style={{ fontSize: 14, color: '#2563eb', marginBottom: 2 }}>Due: {p.dueDate}</div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
} 