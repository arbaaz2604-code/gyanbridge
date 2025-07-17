import Head from 'next/head';
import Navbar from '../components/Navbar';

const courses = [
  { title: 'React for Beginners', description: 'Start your journey with React.js from scratch.' },
  { title: 'Advanced JavaScript', description: 'Deep dive into modern JavaScript concepts.' },
  { title: 'UI/UX Design Basics', description: 'Learn the fundamentals of user interface and experience design.' },
];

export default function Courses() {
  return (
    <>
      <Head>
        <title>Courses | Gyanbridge</title>
      </Head>
      <Navbar />
      <main style={{ maxWidth: 800, margin: '2rem auto', padding: '1rem' }}>
        <h1>Courses</h1>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {courses.map((course, idx) => (
            <li key={idx} style={{ background: '#f1f5f9', borderRadius: '1rem', margin: '1rem 0', padding: '1.5rem' }}>
              <h2 style={{ margin: 0 }}>{course.title}</h2>
              <p style={{ margin: '0.5rem 0 0 0' }}>{course.description}</p>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
} 