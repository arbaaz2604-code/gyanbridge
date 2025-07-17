import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog | Gyanbridge</title>
      </Head>
      <Navbar />
      <main style={{ maxWidth: 700, margin: '2rem auto', padding: '1rem' }}>
        <h1>Blog</h1>
        <p>Coming soon: Read the latest articles, tips, and news from Gyanbridge!</p>
      </main>
    </>
  );
} 