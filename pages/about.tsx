import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <>
      <Head>
        <title>About | EduPath</title>
      </Head>
      <Navbar />
      <main style={{ maxWidth: 700, margin: '2rem auto', padding: '1rem' }}>
        <h1>About EduPath</h1>
        <p>EduPath is an innovative educational platform designed to empower learners with high-quality courses, interactive content, and a supportive community. Our mission is to make learning accessible, engaging, and effective for everyone.</p>
      </main>
    </>
  );
} 