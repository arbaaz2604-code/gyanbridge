import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import DashboardLayout from '../../../components/DashboardLayout';
import { courses } from '../courses';
import { assignments } from '../assignments';
// Demo user info
const demoUser = { name: 'Arbaz', avatar: '🧑' };
const randomAvatars = ['🧑', '👩‍💻', '👨‍🎓', '👩‍🎓', '👨‍💻', '🧑‍💻'];

// Q&A data model (simplified)
type QAReply = {
  id: string;
  text: string;
  user: { name: string; avatar: string };
  createdAt: number;
};
type QAQuestion = {
  id: string;
  text: string;
  user: { name: string; avatar: string };
  createdAt: number;
  replies: QAReply[];
  resolved: boolean;
};

// Sample videos for each course slug
const courseVideos: Record<string, { title: string; url: string }[]> = {
  'react-fundamentals': [
    { title: 'Module 1: JSX & Components', url: 'https://www.youtube.com/embed/Ke90Tje7VS0' },
    { title: 'Module 2: State & Props', url: 'https://www.youtube.com/embed/35lXWvCuM8o' },
    { title: 'Module 3: Lifecycle Methods', url: 'https://www.youtube.com/embed/Tn6-PIqc4UM' },
    { title: 'Module 4: Handling Events', url: 'https://www.youtube.com/embed/6ThXsUwLWvc' },
    { title: 'Module 5: Conditional Rendering', url: 'https://www.youtube.com/embed/3e1GHCA3GP0' },
    { title: 'Module 6: Lists and Keys', url: 'https://www.youtube.com/embed/Ke90Tje7VS0' },
    { title: 'Module 7: Forms in React', url: 'https://www.youtube.com/embed/oY5FFGcYbNI' },
    { title: 'Module 8: Context API', url: 'https://www.youtube.com/embed/35lXWvCuM8o' },
    { title: 'Module 9: React Router', url: 'https://www.youtube.com/embed/Law7wfdg_ls' },
    { title: 'Module 10: Hooks Deep Dive', url: 'https://www.youtube.com/embed/f687hBjwFcM' },
  ],
  'python-for-beginners': [
    { title: 'Module 1: Variables & Data Types', url: 'https://www.youtube.com/embed/kqtD5dpn9C8' },
    { title: 'Module 2: Control Flow', url: 'https://www.youtube.com/embed/7lmCu8wz8ro' },
    { title: 'Module 3: Functions', url: 'https://www.youtube.com/embed/NSbOtYzIQI0' },
    { title: 'Module 4: Working with Files', url: 'https://www.youtube.com/embed/Uh2ebFW8OYM' },
    { title: 'Module 5: Error Handling', url: 'https://www.youtube.com/embed/NIWwJbo-9_8' },
    { title: 'Module 6: Lists & Dictionaries', url: 'https://www.youtube.com/embed/ZX1CVvZLE6c' },
    { title: 'Module 7: Introduction to OOP', url: 'https://www.youtube.com/embed/JeznW_7DlB0' },
    { title: 'Module 8: Modules & Packages', url: 'https://www.youtube.com/embed/CqvZ3vGoGs0' },
    { title: 'Module 9: Virtual Environments', url: 'https://www.youtube.com/embed/N5vscPTWKOk' },
    { title: 'Module 10: Project: Simple Calculator', url: 'https://www.youtube.com/embed/8ext9G7xspg' },
  ],
  'data-science-101': [
    { title: 'Module 1: Python for Data Science', url: 'https://www.youtube.com/embed/r-uOLxNrNk8' },
    { title: 'Module 2: Data Analysis with Pandas', url: 'https://www.youtube.com/embed/vmEHCJofslg' },
    { title: 'Module 3: Data Visualization', url: 'https://www.youtube.com/embed/0z2z2xV5n6g' },
    { title: 'Module 4: Introduction to Machine Learning', url: 'https://www.youtube.com/embed/GwIo3gDZCVQ' },
    { title: 'Module 5: Regression Analysis', url: 'https://www.youtube.com/embed/PaFPbb66DxQ' },
    { title: 'Module 6: Classification Techniques', url: 'https://www.youtube.com/embed/AoeEHqVSNOw' },
    { title: 'Module 7: Model Evaluation & Validation', url: 'https://www.youtube.com/embed/85dtiMz9tSo' },
    { title: 'Module 8: Clustering Algorithms', url: 'https://www.youtube.com/embed/ev2bLZIVP6g' },
    { title: 'Module 9: Feature Engineering', url: 'https://www.youtube.com/embed/3e1GHCA3GP0' },
    { title: 'Module 10: Capstone Project', url: 'https://www.youtube.com/embed/5tvmMX8r_OM' },
  ],
  'web-development': [
    { title: 'Module 1: HTML Basics', url: 'https://www.youtube.com/embed/pQN-pnXPaVg' },
    { title: 'Module 2: CSS Fundamentals', url: 'https://www.youtube.com/embed/1Rs2ND1ryYc' },
    { title: 'Module 3: JavaScript Essentials', url: 'https://www.youtube.com/embed/PkZNo7MFNFg' },
    { title: 'Module 4: Responsive Design', url: 'https://www.youtube.com/embed/srvUrASNj0s' },
    { title: 'Module 5: Flexbox & Grid', url: 'https://www.youtube.com/embed/JJSoEo8JSnc' },
    { title: 'Module 6: Web Accessibility', url: 'https://www.youtube.com/embed/3f31oufqFSM' },
    { title: 'Module 7: Deploying Websites', url: 'https://www.youtube.com/embed/Rem5e6h3A2E' },
    { title: 'Module 8: Version Control with Git', url: 'https://www.youtube.com/embed/8JJ101D3knE' },
    { title: 'Module 9: Intro to Frontend Frameworks', url: 'https://www.youtube.com/embed/Ke90Tje7VS0' },
    { title: 'Module 10: Final Project', url: 'https://www.youtube.com/embed/5tvmMX8r_OM' },
  ],
  'machine-learning-basics': [
    { title: 'Module 1: Supervised vs Unsupervised', url: 'https://www.youtube.com/embed/IpGxLWOIZy4' },
    { title: 'Module 2: Regression', url: 'https://www.youtube.com/embed/PaFPbb66DxQ' },
    { title: 'Module 3: Classification', url: 'https://www.youtube.com/embed/AoeEHqVSNOw' },
    { title: 'Module 4: Model Evaluation', url: 'https://www.youtube.com/embed/85dtiMz9tSo' },
    { title: 'Module 5: Clustering', url: 'https://www.youtube.com/embed/ev2bLZIVP6g' },
    { title: 'Module 6: Neural Networks', url: 'https://www.youtube.com/embed/aircAruvnKk' },
    { title: 'Module 7: Real-world ML Applications', url: 'https://www.youtube.com/embed/5tvmMX8r_OM' },
    { title: 'Module 8: Deep Learning Basics', url: 'https://www.youtube.com/embed/aircAruvnKk' },
    { title: 'Module 9: Natural Language Processing', url: 'https://www.youtube.com/embed/8rXD5-xhemo' },
    { title: 'Module 10: ML Project Walkthrough', url: 'https://www.youtube.com/embed/5tvmMX8r_OM' },
  ],
};

// Export number of modules for each course
export const courseModuleCounts = Object.fromEntries(
  Object.entries(courseVideos).map(([slug, videos]) => [slug, videos.length])
);

// Helper to safely get user info
function getUser(user: any) {
  if (user && typeof user === 'object' && user.avatar && user.name) return user;
  return { name: 'User', avatar: '👤' };
}

export default function CourseDetails() {
  const router = useRouter();
  const { courseId } = router.query;
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<any>(null);
  const courseList: any[] = courses;
  const [completedModules, setCompletedModules] = useState(0);

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
    if (courseId && typeof courseId === 'string') {
      const found = courseList.find((c: any) => c.slug === courseId);
      setCourse(found);
    }
  }, [courseId]);

  // On mount, read progress from localStorage
  useEffect(() => {
    if (course?.slug) {
      const progressData = JSON.parse(localStorage.getItem('courseProgress') || '{}');
      setCompletedModules(progressData[course.slug] || 0);
    }
  }, [course?.slug]);

  // Mark module as complete
  function markModuleComplete(idx: number) {
    if (!course?.slug) return;
    const progressData = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    const newCompleted = Math.max(progressData[course.slug] || 0, idx + 1);
    progressData[course.slug] = newCompleted;
    localStorage.setItem('courseProgress', JSON.stringify(progressData));
    setCompletedModules(newCompleted);
  }

  const videos = courseVideos[course?.slug] || [];
  const [selectedVideoIdx, setSelectedVideoIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'notes' | 'qa' | 'projects' | 'assignments'>('notes');

  useEffect(() => {
    if (router.query.module && !isNaN(Number(router.query.module))) {
      setSelectedVideoIdx(Number(router.query.module));
    } else {
      setSelectedVideoIdx(completedModules);
    }
  }, [router.query.module, completedModules]);

  // Q&A state
  const [questions, setQuestions] = useState<QAQuestion[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all'|'unanswered'|'resolved'>('all');
  const [notify, setNotify] = useState('');
  const questionInputRef = useRef<HTMLInputElement>(null);
  const replyInputRef = useRef<HTMLInputElement>(null);
  const [replyingTo, setReplyingTo] = useState<string|null>(null);
  const [editId, setEditId] = useState<string|null>(null);
  const [editText, setEditText] = useState('');

  // Load questions from localStorage on mount or when course/module changes
  useEffect(() => {
    if (course?.slug && typeof selectedVideoIdx === 'number') {
      const qnaKey = `qna_${course.slug}_${selectedVideoIdx}`;
      const saved = localStorage.getItem(qnaKey);
      setQuestions(saved ? JSON.parse(saved) : []);
    }
  }, [course?.slug, selectedVideoIdx]);

  // Save questions to localStorage
  function saveQuestions(qs: QAQuestion[]) {
    if (course?.slug) {
      const qnaKey = `qna_${course.slug}_${selectedVideoIdx}`;
      localStorage.setItem(qnaKey, JSON.stringify(qs));
    }
  }

  // Add a new question
  function handleAddQuestion(e: React.FormEvent) {
    e.preventDefault();
    const value = questionInputRef.current?.value.trim();
    if (!value) return;
    const newQ: QAQuestion = {
      id: Date.now() + '_' + Math.random(),
      text: value,
      user: demoUser,
      createdAt: Date.now(),
      replies: [],
      resolved: false,
    };
    const newQuestions = [newQ, ...questions];
    setQuestions(newQuestions);
    saveQuestions(newQuestions);
    if (questionInputRef.current) questionInputRef.current.value = '';
  }

  // Add a reply
  function handleAddReply(qid: string, e: React.FormEvent) {
    e.preventDefault();
    const value = replyInputRef.current?.value.trim();
    if (!value) return;
    const newReply: QAReply = {
      id: Date.now() + '_' + Math.random(),
      text: value,
      user: { name: 'Student', avatar: randomAvatars[Math.floor(Math.random()*randomAvatars.length)] },
      createdAt: Date.now(),
    };
    const newQuestions = questions.map(q =>
      q.id === qid ? { ...q, replies: [...q.replies, newReply] } : q
    );
    setQuestions(newQuestions);
    saveQuestions(newQuestions);
    setReplyingTo(null);
    setNotify('You have a new answer!');
    setTimeout(() => setNotify(''), 2000);
    if (replyInputRef.current) replyInputRef.current.value = '';
  }

  // Edit/delete moderation
  function handleEdit(qid: string, text: string) {
    setEditId(qid);
    setEditText(text);
  }
  function handleEditSave(qid: string) {
    const newQuestions = questions.map(q =>
      q.id === qid ? { ...q, text: editText } : q
    );
    setQuestions(newQuestions);
    saveQuestions(newQuestions);
    setEditId(null);
    setEditText('');
  }
  function handleDelete(qid: string) {
    const newQuestions = questions.filter(q => q.id !== qid);
    setQuestions(newQuestions);
    saveQuestions(newQuestions);
  }

  // Tag filter
  const filteredQuestions = questions
    .filter(q =>
      (filter === 'all' || (filter === 'unanswered' && !q.resolved) || (filter === 'resolved' && q.resolved)) &&
      (search === '' ||
        (typeof q.text === 'string' && q.text.toLowerCase().includes(search.toLowerCase()))
      )
    );

  if (loading || !course) return null;

  // Responsive styles helper
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;
  const tabBarStyle = {
    display: 'flex',
    gap: 0,
    marginTop: 24,
    borderBottom: '2px solid #e5e7eb',
    flexWrap: 'wrap' as 'wrap',
    flexDirection: isMobile ? 'column' as 'column' : 'row' as 'row',
  };
  const tabButtonBase = {
    padding: '12px 32px',
    cursor: 'pointer',
    fontWeight: 700,
    background: 'none',
    fontSize: 16,
    transition: 'color 0.2s, border-bottom 0.2s',
    border: 'none',
    outline: 'none',
    minWidth: 100,
    textAlign: 'center' as 'center',
  };
  const tabContentStyle = {
    padding: '24px 0 0 0',
    minHeight: 120,
    width: '100%',
    boxSizing: 'border-box' as 'border-box',
  };

  return (
    <DashboardLayout>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '32px 0 0 0',
      }}>
        {/* Header Card */}
        <div style={{
          background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)',
          borderRadius: 18,
          padding: '2.2rem 2.2rem 1.5rem 2.2rem',
          marginBottom: 36,
          color: '#fff',
          boxShadow: '0 4px 24px 0 rgba(37,99,235,0.10)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
          <div>{course.title}</div>
          <div style={{ fontSize: 18, fontWeight: 500, opacity: 0.95 }}>Instructor: {course.instructor}</div>
          <div style={{ fontSize: 16, fontWeight: 400, opacity: 0.9 }}>Rating: {course.rating} <span style={{ fontSize: 18 }}>⭐</span></div>
        </div>
        <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
          {/* Main Video Player Card */}
          <div style={{
            flex: 2,
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 2px 12px 0 rgba(30,41,59,0.07)',
            padding: '2rem 2rem 1.5rem 2rem',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}>
            {videos[selectedVideoIdx] ? (
              <>
                <div style={{ fontWeight: 700, fontSize: 22, color: '#232946', marginBottom: 8 }}>{videos[selectedVideoIdx].title}</div>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 12, boxShadow: '0 2px 8px 0 rgba(30,41,59,0.06)' }}>
                  <iframe
                    src={videos[selectedVideoIdx].url}
                    title={videos[selectedVideoIdx].title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  ></iframe>
                </div>
                {/* Horizontal Tabs */}
                <div style={tabBarStyle}>
                  <button
                    type="button"
                    onClick={() => setActiveTab('notes')}
                    style={{
                      ...tabButtonBase,
                      color: activeTab === 'notes' ? '#2563eb' : '#64748b',
                      borderBottom: activeTab === 'notes' ? '3px solid #2563eb' : '3px solid transparent',
                    }}
                  >Notes</button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('qa')}
                    style={{
                      ...tabButtonBase,
                      color: activeTab === 'qa' ? '#2563eb' : '#64748b',
                      borderBottom: activeTab === 'qa' ? '3px solid #2563eb' : '3px solid transparent',
                    }}
                  >Q&amp;A</button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('assignments')}
                    style={{
                      ...tabButtonBase,
                      color: activeTab === 'assignments' ? '#2563eb' : '#64748b',
                      borderBottom: activeTab === 'assignments' ? '3px solid #2563eb' : '3px solid transparent',
                    }}
                  >Assignments</button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('projects')}
                    style={{
                      ...tabButtonBase,
                      color: activeTab === 'projects' ? '#2563eb' : '#64748b',
                      borderBottom: activeTab === 'projects' ? '3px solid #2563eb' : '3px solid transparent',
                    }}
                  >Projects</button>
                </div>
                {/* Tab Content */}
                <div style={tabContentStyle}>
                  {activeTab === 'notes' && (
                    <div style={{
                      background: '#f8fafc',
                      borderRadius: 16,
                      boxShadow: '0 2px 12px 0 rgba(30,41,59,0.07)',
                      padding: '2rem 1.5rem',
                      margin: '0 auto',
                      maxWidth: 600,
                      color: '#232946',
                      fontSize: 15,
                      textAlign: 'center',
                    }}>
                      No notes yet. You can add your notes here in the future.
                    </div>
                  )}
                  {activeTab === 'qa' && (
                    <div style={{
                      background: '#f8fafc',
                      borderRadius: 16,
                      boxShadow: '0 2px 12px 0 rgba(30,41,59,0.07)',
                      padding: '2rem 1.5rem',
                      margin: '0 auto',
                      maxWidth: 600,
                    }}>
                      {/* Notification */}
                      {notify && <div style={{ color: '#059669', fontWeight: 700, marginBottom: 10 }}>{notify}</div>}
                      {/* Ask a question */}
                      <form onSubmit={handleAddQuestion} style={{ display: 'flex', gap: 10, marginBottom: 22, flexWrap: 'wrap', alignItems: 'center', background: '#fff', borderRadius: 10, boxShadow: '0 1px 4px 0 rgba(30,41,59,0.04)', padding: '12px 10px' }}>
                        <input
                          ref={questionInputRef}
                          type="text"
                          placeholder="Ask a question..."
                          style={{ flex: 2, minWidth: 120, padding: '10px 14px', borderRadius: 6, border: '1.5px solid #e5e7eb', fontSize: 15, background: '#f8fafc' }}
                        />
                        <button
                          type="submit"
                          style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '0 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px 0 rgba(37,99,235,0.08)' }}
                        >Ask</button>
                      </form>
                      {/* Questions List */}
                      {filteredQuestions.length === 0 ? (
                        <div style={{ color: '#64748b', fontSize: 15, textAlign: 'center', marginTop: 24 }}>No questions found.</div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                          {filteredQuestions.map(q => (
                            <div key={q.id} style={{ background: '#fff', borderRadius: 10, padding: '18px 18px', border: '1.5px solid #e5e7eb', position: 'relative', boxShadow: '0 1px 4px 0 rgba(30,41,59,0.04)' }}>
                              {/* User & tags */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                                <span style={{ fontSize: 22 }}>{getUser(q.user).avatar}</span>
                                <span style={{ fontWeight: 700, color: '#232946', fontSize: 15 }}>{getUser(q.user).name}</span>
                                <span style={{ color: '#64748b', fontSize: 13, marginLeft: 8 }}>{new Date(q.createdAt).toLocaleString()}</span>
                              </div>
                              {/* Question text or edit */}
                              {editId === q.id ? (
                                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                                  <input
                                    value={editText}
                                    onChange={e => setEditText(e.target.value)}
                                    style={{ flex: 1, padding: '8px 12px', borderRadius: 6, border: '1.5px solid #e5e7eb', fontSize: 15, background: '#f8fafc' }}
                                    autoFocus
                                  />
                                  <button onClick={() => handleEditSave(q.id)} style={{ background: '#059669', color: '#fff', border: 'none', borderRadius: 6, padding: '0 12px', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px 0 rgba(5,150,105,0.08)' }}>Save</button>
                                </div>
                              ) : (
                                <div style={{ color: '#232946', fontSize: 15, marginBottom: 8 }}>{q.text}</div>
                              )}
                              {/* Edit, delete, reply, resolved */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                                <button onClick={() => setReplyingTo(q.id)} style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Reply</button>
                                <button onClick={() => handleEdit(q.id, q.text)} style={{ background: 'none', border: 'none', color: '#f59e42', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Edit</button>
                                <button onClick={() => handleDelete(q.id)} style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Delete</button>
                                {q.resolved && <span style={{ color: '#059669', fontWeight: 700, fontSize: 14, marginLeft: 8 }}>Resolved</span>}
                              </div>
                              {/* Replies */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginLeft: 24 }}>
                                {(Array.isArray(q.replies) ? q.replies : []).map(r => (
                                  <div key={r.id} style={{ background: '#f8fafc', borderRadius: 8, padding: '8px 12px', border: '1.5px solid #e5e7eb', position: 'relative' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                      <span style={{ fontSize: 18 }}>{getUser(r.user).avatar}</span>
                                      <span style={{ fontWeight: 600, color: '#232946', fontSize: 14 }}>{getUser(r.user).name}</span>
                                      <span style={{ color: '#64748b', fontSize: 12 }}>{new Date(r.createdAt).toLocaleString()}</span>
                                    </div>
                                    <div style={{ color: '#232946', fontSize: 14, margin: '4px 0 0 0' }}>{r.text}</div>
                                  </div>
                                ))}
                              </div>
                              {/* Reply form */}
                              {replyingTo === q.id && (
                                <form onSubmit={e => handleAddReply(q.id, e)} style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                                  <input ref={replyInputRef} type="text" placeholder="Write a reply..." style={{ flex: 1, padding: '8px 12px', borderRadius: 6, border: '1.5px solid #e5e7eb', fontSize: 15, background: '#f8fafc' }} />
                                  <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '0 14px', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px 0 rgba(37,99,235,0.08)' }}>Reply</button>
                                  <button type="button" onClick={() => setReplyingTo(null)} style={{ background: '#e5e7eb', color: '#232946', border: 'none', borderRadius: 6, padding: '0 10px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Cancel</button>
                                </form>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {activeTab === 'assignments' && (
                    <div style={{
                      background: '#f8fafc',
                      borderRadius: 16,
                      boxShadow: '0 2px 12px 0 rgba(30,41,59,0.07)',
                      padding: '2rem 1.5rem',
                      margin: '0 auto',
                      maxWidth: 600,
                      color: '#232946',
                      fontSize: 15,
                    }}>
                      <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 18, textAlign: 'center' }}>Assignments for {course?.title}</div>
                      {assignments.filter(a => a.course === course?.title).length === 0 ? (
                        <div style={{ color: '#64748b', fontSize: 16, textAlign: 'center' }}>No assignments yet. Assignments for this course will be shown here.</div>
                      ) : (
                        assignments.filter(a => a.course === course?.title).map(a => (
                          <div key={a.title + a.course} style={{
                            background: '#fff',
                            borderRadius: 12,
                            boxShadow: '0 1px 4px 0 rgba(30,41,59,0.04)',
                            padding: '1.2rem 1rem',
                            marginBottom: 18,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                          }}>
                            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 2 }}>{a.title}</div>
                            <div style={{ fontSize: 15, color: '#64748b', marginBottom: 4 }}>{a.description}</div>
                            <div style={{ fontSize: 14, color: '#2563eb', marginBottom: 2 }}>Due: {a.dueDate}</div>
                            <div style={{ fontSize: 14, color: a.status === 'Completed' ? '#059669' : '#ef4444', fontWeight: 600 }}>Status: {a.status}</div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                  {activeTab === 'projects' && (
                    <div style={{
                      background: '#f8fafc',
                      borderRadius: 16,
                      boxShadow: '0 2px 12px 0 rgba(30,41,59,0.07)',
                      padding: '2rem 1.5rem',
                      margin: '0 auto',
                      maxWidth: 600,
                      color: '#232946',
                      fontSize: 15,
                      textAlign: 'center',
                    }}>
                      No projects yet. Project assignments will be shown here.
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div>No video available.</div>
            )}
          </div>
          {/* Video List Sidebar */}
          <div style={{
            flex: 1,
            background: '#f8fafc',
            borderRadius: 16,
            boxShadow: '0 2px 12px 0 rgba(30,41,59,0.05)',
            padding: '1.5rem 1.2rem',
            minWidth: 260,
            maxHeight: 540,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#232946', marginBottom: 18, letterSpacing: '-0.5px' }}>Video List</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {videos.map((video, idx: number) => (
                <div
                  key={video.title + idx}
                  onClick={() => setSelectedVideoIdx(idx)}
                  style={{
                    padding: '15px 18px',
                    borderRadius: 10,
                    background: idx === selectedVideoIdx ? 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)' : '#fff',
                    color: idx === selectedVideoIdx ? '#fff' : '#232946',
                    fontWeight: idx === selectedVideoIdx ? 700 : 500,
                    cursor: 'pointer',
                    boxShadow: idx === selectedVideoIdx ? '0 2px 8px 0 rgba(37,99,235,0.10)' : 'none',
                    border: '1.5px solid #e5e7eb',
                    marginBottom: 8,
                    transition: 'background 0.2s, color 0.2s',
                    position: 'relative',
                    outline: idx === selectedVideoIdx ? '2px solid #2563eb' : 'none',
                    opacity: 1,
                  }}
                  onMouseOver={e => (e.currentTarget.style.background = idx === selectedVideoIdx ? 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)' : '#f1f5f9')}
                  onMouseOut={e => (e.currentTarget.style.background = idx === selectedVideoIdx ? 'linear-gradient(90deg, #2563eb 0%, #60a5fa 100%)' : '#fff')}
                >
                  {video.title}
                  {idx === selectedVideoIdx && (
                    <span style={{
                      position: 'absolute',
                      right: 18,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: 18,
                      color: '#fff',
                    }}>▶</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 