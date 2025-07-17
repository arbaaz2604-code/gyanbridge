import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/DashboardLayout';

const sidebarItems = [
  { icon: '📚', label: 'Dashboard', path: '/dashboard' },
  { icon: '📝', label: 'My Courses', path: '/dashboard/courses' },
  { icon: '🧑‍🏫', label: 'Assignments', path: '/dashboard/assignments' },
  { icon: '📅', label: 'Schedule / Calendar', path: '/dashboard/calendar' },
  { icon: '🏆', label: 'Achievements', path: '/dashboard/achievements' },
  { icon: '💬', label: 'Messages', path: '/dashboard/messages' },
  { icon: '⚙️', label: 'Settings', path: '/dashboard/settings' },
];

interface Contact {
  id: string;
  name: string;
  type: string;
  avatar: string;
  group?: boolean;
}

interface Message {
  from: string;
  text: string;
  time: string;
}

const contacts: Contact[] = [
  { id: 'instructor-jane', name: 'Jane Doe', type: 'Instructor', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 'classmate-john', name: 'John Smith', type: 'Classmate', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 'group-react', name: 'React Fundamentals (Group)', type: 'Group', avatar: '', group: true },
  { id: 'group-python', name: 'Python for Beginners (Group)', type: 'Group', avatar: '', group: true },
];

type MessageMap = { [key: string]: Message[] };

const mockMessages: MessageMap = {
  'instructor-jane': [
    { from: 'Jane Doe', text: 'Hi Arbaz! Let me know if you have any questions about React.', time: '09:00' },
    { from: 'You', text: 'Thank you! I will.', time: '09:01' },
  ],
  'classmate-john': [
    { from: 'John Smith', text: 'Hey, did you finish the assignment?', time: '10:15' },
    { from: 'You', text: 'Almost done! Need any help?', time: '10:16' },
  ],
  'group-react': [
    { from: 'Jane Doe', text: 'Welcome to the React Fundamentals group!', time: '08:00' },
    { from: 'You', text: 'Excited to learn together!', time: '08:01' },
  ],
  'group-python': [
    { from: 'John Smith', text: 'Python group chat is open!', time: '11:00' },
    { from: 'You', text: 'Hi everyone!', time: '11:01' },
  ],
};

export default function Messages() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string>(contacts[0].id);
  const [messages, setMessages] = useState<Message[]>(mockMessages[contacts[0].id]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setMessages(mockMessages[selected] || []);
  }, [selected]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (loading) return null;

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev: Message[]) => [
      ...prev,
      { from: 'You', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
    setInput('');
  };

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', gap: 32 }}>
        {/* Contacts List */}
        <div style={{ width: 270, background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)', padding: '1.2rem 0.5rem', display: 'flex', flexDirection: 'column', gap: 6, height: 520, minHeight: 400 }}>
          <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 10, marginLeft: 10 }}>Chats</div>
          {contacts.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '10px 12px',
                background: selected === c.id ? '#e0e7ef' : 'transparent',
                border: 'none',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 500,
                color: '#2d3a4a',
                cursor: 'pointer',
                transition: 'background 0.18s',
                marginBottom: 2
              }}
            >
              {c.avatar ? <img src={c.avatar} alt={c.name} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e0e7eb' }} /> : <span style={{ fontSize: 22 }}>👥</span>}
              <span>{c.name}</span>
            </button>
          ))}
        </div>
        {/* Chat Area */}
        <div style={{ flex: 1, background: '#fff', borderRadius: 14, boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', height: 520, minHeight: 400 }}>
          <div style={{ fontWeight: 600, fontSize: 17, padding: '1.2rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            {contacts.find(c => c.id === selected)?.name}
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((m: Message, idx: number) => (
              <div key={idx} style={{
                alignSelf: m.from === 'You' ? 'flex-end' : 'flex-start',
                background: m.from === 'You' ? '#2563eb' : '#e0e7ef',
                color: m.from === 'You' ? '#fff' : '#22223b',
                borderRadius: 8,
                padding: '8px 14px',
                maxWidth: '70%',
                fontSize: 15,
                boxShadow: '0 1px 4px 0 rgba(0,0,0,0.03)',
                position: 'relative',
              }}>
                <div style={{ fontWeight: 500 }}>{m.text}</div>
                <div style={{ fontSize: 11, color: m.from === 'You' ? '#e0e7eb' : '#64748b', marginTop: 2, textAlign: 'right' }}>{m.time}</div>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
          <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid #e5e7eb', padding: '1rem 1.5rem', gap: 10 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                fontSize: 15,
              }}
            />
            <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 18px', fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>
              Send
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
} 