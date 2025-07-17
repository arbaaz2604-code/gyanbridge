import Head from 'next/head';
import styles from '../styles/Landing.module.scss';
import CarouselSection from '../components/CarouselSection';
import newStyles from '../styles/BelowCarousel.module.scss';
import glassStyles from '../styles/BelowCarouselGlass.module.scss';
import StatsSection from '../components/StatsSection';
import CoursesShowcaseSection from '../components/CoursesShowcaseSection';
import AlumniCompaniesSection from '../components/AlumniCompaniesSection';
import StudentReviewSection from '../components/StudentReviewSection';
import FooterSection from '../components/FooterSection';
import NewsletterSubscribeSection from '../components/NewsletterSubscribeSection';

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>EduPath - Unlock Your Learning Journey</title>
          <meta name="description" content="EduPath: The best platform to learn, grow, and achieve your goals." />
        </Head>
        <main className={styles.main}>
          <CarouselSection />
          {/* Four feature blocks below the carousel */}
          <section className={glassStyles.glassFeaturesSection}>
            <div className={glassStyles.glassFeatureCard}>
              <div className={glassStyles.glassFeatureIcon}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2"/><path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3>Online Courses</h3>
              <p>Wide range of expertly crafted courses covering the latest in technology and education.</p>
            </div>
            <div className={glassStyles.glassFeatureCard}>
              <div className={glassStyles.glassFeatureIcon}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="#fff" strokeWidth="2"/><path d="M8 12h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <h3>Expert Instruction</h3>
              <p>Learn from industry professionals with real-world experience and insights.</p>
            </div>
            <div className={glassStyles.glassFeatureCard}>
              <div className={glassStyles.glassFeatureIcon}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="6" stroke="#fff" strokeWidth="2"/><path d="M12 8v4l2 2" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <h3>Hands-On Learning</h3>
              <p>Interactive, practical projects and exercises to reinforce your knowledge.</p>
            </div>
            <div className={glassStyles.glassFeatureCard}>
              <div className={glassStyles.glassFeatureIcon}>
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="8" stroke="#fff" strokeWidth="2"/><path d="M8 16h8M8 12h8" stroke="#fff" strokeWidth="2"/><circle cx="12" cy="8" r="1.5" fill="#fff"/></svg>
              </div>
              <h3>Proven Track Record</h3>
              <p>Trusted by thousands of learners with a history of successful graduates.</p>
            </div>
          </section>
          <h2 className={styles.sectionTitle}>Our Classes & Topics</h2>
          <p className={styles.sectionDescription}>
            Stay up-to-date with our <b>upcoming online</b> and <b>offline classes!</b> Check the batch schedule below to find out about the latest courses, workshops, and training programs.
          </p>
          <div className={styles.horizontalBlocks}>
            <div className={styles.movingBlocks}>
              <div className={styles.rectBlock}>
                <div className={styles.rectBlockTop}>
                  <div className={styles.rectBlockPlaceholder}>
                    <img src="https://via.placeholder.com/120x64?text=Image" alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
                  </div>
                </div>
                <div className={styles.rectBlockBottom}>
                  <button className={styles.rectBlockBtn} aria-label="Calendar">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="5" width="14" height="12" rx="2" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M3 8h14" stroke="#1e293b" strokeWidth="1.5"/>
                      <rect x="6.5" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                      <rect x="12" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                    </svg>
                  </button>
                  <span className={styles.rectBlockTitle}>Cyber Security</span>
                  <p className={styles.rectBlockDesc}>
                    With increased reliance on digital platforms, the webinar highlights the importance of robust security measures.
                  </p>
                  <button className={styles.rectBlockBtn} aria-label="Clock">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="8" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M10 5v5l3 2" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className={styles.rectBlock}>
                <div className={styles.rectBlockTop}>
                  <div className={styles.rectBlockPlaceholder}>
                    <img src="https://via.placeholder.com/120x64?text=Image" alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
                  </div>
                </div>
                <div className={styles.rectBlockBottom}>
                  <button className={styles.rectBlockBtn} aria-label="Calendar">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="5" width="14" height="12" rx="2" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M3 8h14" stroke="#1e293b" strokeWidth="1.5"/>
                      <rect x="6.5" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                      <rect x="12" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                    </svg>
                  </button>
                  <span className={styles.rectBlockTitle}>Cloud Computing</span>
                  <p className={styles.rectBlockDesc}>
                    Participants learn about the Shared Responsibility Model, emphasizing client and provider roles in data protection.
                  </p>
                  <button className={styles.rectBlockBtn} aria-label="Clock">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="8" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M10 5v5l3 2" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className={styles.rectBlock}>
                <div className={styles.rectBlockTop}>
                  <div className={styles.rectBlockPlaceholder}>
                    <img src="https://via.placeholder.com/120x64?text=Image" alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
                  </div>
                </div>
                <div className={styles.rectBlockBottom}>
                  <button className={styles.rectBlockBtn} aria-label="Calendar">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="5" width="14" height="12" rx="2" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M3 8h14" stroke="#1e293b" strokeWidth="1.5"/>
                      <rect x="6.5" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                      <rect x="12" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                    </svg>
                  </button>
                  <span className={styles.rectBlockTitle}>Supply Chain & Logistics</span>
                  <p className={styles.rectBlockDesc}>
                    The integration of cloud computing enhances efficiency, transparency, and collaboration in supply chain.
                  </p>
                  <button className={styles.rectBlockBtn} aria-label="Clock">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="8" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M10 5v5l3 2" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className={styles.rectBlock}>
                <div className={styles.rectBlockTop}>
                  <div className={styles.rectBlockPlaceholder}>
                    <img src="https://via.placeholder.com/120x64?text=Image" alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
                  </div>
                </div>
                <div className={styles.rectBlockBottom}>
                  <button className={styles.rectBlockBtn} aria-label="Calendar">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="5" width="14" height="12" rx="2" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M3 8h14" stroke="#1e293b" strokeWidth="1.5"/>
                      <rect x="6.5" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                      <rect x="12" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                    </svg>
                  </button>
                  <span className={styles.rectBlockTitle}>Digital Marketing</span>
                  <p className={styles.rectBlockDesc}>
                    Strategies for leveraging cloud technologies to optimize marketing efforts and improve customer.
                  </p>
                  <button className={styles.rectBlockBtn} aria-label="Clock">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="8" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M10 5v5l3 2" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className={styles.rectBlock}>
                <div className={styles.rectBlockTop}>
                  <div className={styles.rectBlockPlaceholder}>
                    <img src="https://via.placeholder.com/120x64?text=Image" alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
                  </div>
                </div>
                <div className={styles.rectBlockBottom}>
                  <button className={styles.rectBlockBtn} aria-label="Calendar">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="5" width="14" height="12" rx="2" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M3 8h14" stroke="#1e293b" strokeWidth="1.5"/>
                      <rect x="6.5" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                      <rect x="12" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                    </svg>
                  </button>
                  <span className={styles.rectBlockTitle}>AI & Data Science</span>
                  <p className={styles.rectBlockDesc}>
                    Explore the world of artificial intelligence and data science with hands-on projects and expert guidance.
                  </p>
                  <button className={styles.rectBlockBtn} aria-label="Clock">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="8" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M10 5v5l3 2" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              {/* Duplicate blocks for continuous loop */}
              <div className={styles.rectBlock}>
                <div className={styles.rectBlockTop}>
                  <div className={styles.rectBlockPlaceholder}>
                    <img src="https://via.placeholder.com/120x64?text=Image" alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
                  </div>
                </div>
                <div className={styles.rectBlockBottom}>
                  <button className={styles.rectBlockBtn} aria-label="Calendar">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="5" width="14" height="12" rx="2" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M3 8h14" stroke="#1e293b" strokeWidth="1.5"/>
                      <rect x="6.5" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                      <rect x="12" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                    </svg>
                  </button>
                  <span className={styles.rectBlockTitle}>Cyber Security</span>
                  <p className={styles.rectBlockDesc}>
                    With increased reliance on digital platforms, the webinar highlights the importance of robust security measures.
                  </p>
                  <button className={styles.rectBlockBtn} aria-label="Clock">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="8" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M10 5v5l3 2" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className={styles.rectBlock}>
                <div className={styles.rectBlockTop}>
                  <div className={styles.rectBlockPlaceholder}>
                    <img src="https://via.placeholder.com/120x64?text=Image" alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
                  </div>
                </div>
                <div className={styles.rectBlockBottom}>
                  <button className={styles.rectBlockBtn} aria-label="Calendar">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="5" width="14" height="12" rx="2" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M3 8h14" stroke="#1e293b" strokeWidth="1.5"/>
                      <rect x="6.5" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                      <rect x="12" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                    </svg>
                  </button>
                  <span className={styles.rectBlockTitle}>Cloud Computing</span>
                  <p className={styles.rectBlockDesc}>
                    Participants learn about the Shared Responsibility Model, emphasizing client and provider roles in data protection.
                  </p>
                  <button className={styles.rectBlockBtn} aria-label="Clock">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="8" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M10 5v5l3 2" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className={styles.rectBlock}>
                <div className={styles.rectBlockTop}>
                  <div className={styles.rectBlockPlaceholder}>
                    <img src="https://via.placeholder.com/120x64?text=Image" alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
                  </div>
                </div>
                <div className={styles.rectBlockBottom}>
                  <button className={styles.rectBlockBtn} aria-label="Calendar">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="5" width="14" height="12" rx="2" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M3 8h14" stroke="#1e293b" strokeWidth="1.5"/>
                      <rect x="6.5" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                      <rect x="12" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                    </svg>
                  </button>
                  <span className={styles.rectBlockTitle}>Supply Chain & Logistics</span>
                  <p className={styles.rectBlockDesc}>
                    The integration of cloud computing enhances efficiency, transparency, and collaboration in supply chain.
                  </p>
                  <button className={styles.rectBlockBtn} aria-label="Clock">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="8" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M10 5v5l3 2" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className={styles.rectBlock}>
                <div className={styles.rectBlockTop}>
                  <div className={styles.rectBlockPlaceholder}>
                    <img src="https://via.placeholder.com/120x64?text=Image" alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
                  </div>
                </div>
                <div className={styles.rectBlockBottom}>
                  <button className={styles.rectBlockBtn} aria-label="Calendar">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="5" width="14" height="12" rx="2" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M3 8h14" stroke="#1e293b" strokeWidth="1.5"/>
                      <rect x="6.5" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                      <rect x="12" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                    </svg>
                  </button>
                  <span className={styles.rectBlockTitle}>Digital Marketing</span>
                  <p className={styles.rectBlockDesc}>
                    Strategies for leveraging cloud technologies to optimize marketing efforts and improve customer.
                  </p>
                  <button className={styles.rectBlockBtn} aria-label="Clock">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="8" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M10 5v5l3 2" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className={styles.rectBlock}>
                <div className={styles.rectBlockTop}>
                  <div className={styles.rectBlockPlaceholder}>
                    <img src="https://via.placeholder.com/120x64?text=Image" alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
                  </div>
                </div>
                <div className={styles.rectBlockBottom}>
                  <button className={styles.rectBlockBtn} aria-label="Calendar">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="5" width="14" height="12" rx="2" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M3 8h14" stroke="#1e293b" strokeWidth="1.5"/>
                      <rect x="6.5" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                      <rect x="12" y="2" width="1.5" height="3" rx="0.75" fill="#1e293b"/>
                    </svg>
                  </button>
                  <span className={styles.rectBlockTitle}>AI & Data Science</span>
                  <p className={styles.rectBlockDesc}>
                    Explore the world of artificial intelligence and data science with hands-on projects and expert guidance.
                  </p>
                  <button className={styles.rectBlockBtn} aria-label="Clock">
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="8" stroke="#1e293b" strokeWidth="1.5"/>
                      <path d="M10 5v5l3 2" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Prayug Courses Section */}
          <section className={styles.prayugCoursesSection}>
            <span className={styles.exploreCoursesCta}>Explore 500+ Online Courses</span>
          
            <div className={styles.prayugCoursesGrid}>
              <div className={styles.prayugCourseCard}><span role="img" aria-label="Development" style={{fontSize: '2rem', display: 'block', marginBottom: '0.5rem'}}>💻</span>Development</div>
              <div className={styles.prayugCourseCard}><span role="img" aria-label="Business" style={{fontSize: '2rem', display: 'block', marginBottom: '0.5rem'}}>💼</span>Business</div>
              <div className={styles.prayugCourseCard}><span role="img" aria-label="Personal Development" style={{fontSize: '2rem', display: 'block', marginBottom: '0.5rem'}}>🌱</span>Personal Development</div>
              <div className={styles.prayugCourseCard}><span role="img" aria-label="Finance & Accounting" style={{fontSize: '2rem', display: 'block', marginBottom: '0.5rem'}}>💰</span>Finance & Accounting</div>
              <div className={styles.prayugCourseCard}><span role="img" aria-label="Marketing" style={{fontSize: '2rem', display: 'block', marginBottom: '0.5rem'}}>📈</span>Marketing</div>
              <div className={styles.prayugCourseCard}><span role="img" aria-label="Teaching & Academics" style={{fontSize: '2rem', display: 'block', marginBottom: '0.5rem'}}>🎓</span>Teaching & Academics</div>
              <div className={styles.prayugCourseCard}><span role="img" aria-label="Office Productivity" style={{fontSize: '2rem', display: 'block', marginBottom: '0.5rem'}}>🗂️</span>Office Productivity</div>
              <div className={styles.prayugCourseCard}><span role="img" aria-label="Management" style={{fontSize: '2rem', display: 'block', marginBottom: '0.5rem'}}>📋</span>Management</div>
              <div className={styles.prayugCourseCard}><span role="img" aria-label="IT & Software" style={{fontSize: '2rem', display: 'block', marginBottom: '0.5rem'}}>🖥️</span>IT & Software</div>
              <div className={styles.prayugCourseCard}><span role="img" aria-label="Design" style={{fontSize: '2rem', display: 'block', marginBottom: '0.5rem'}}>🎨</span>Design</div>
            </div>
          </section>
          {/* Add StatsSection at the end of the page */}
          <StatsSection />
          <CoursesShowcaseSection />
        </main>
      </div>
      <AlumniCompaniesSection />
      <StudentReviewSection />
      <NewsletterSubscribeSection />
      <FooterSection />
    </>
  );
}
