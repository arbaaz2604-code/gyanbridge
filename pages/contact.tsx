import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | EduPath</title>
      </Head>
      <Navbar />
      <main style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
        <h1>Contact Us</h1>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
          <input type="text" placeholder="Your Name" required style={{ padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
          <input type="email" placeholder="Your Email" required style={{ padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
          <textarea placeholder="Your Message" required rows={5} style={{ padding: '0.8rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1' }} />
          <button type="submit" style={{ background: '#6366f1', color: '#fff', padding: '0.9rem', borderRadius: '0.5rem', border: 'none', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>Send Message</button>
        </form>
      </main>
    </>
  );
} 