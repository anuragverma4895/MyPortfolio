import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { fadeIn } from '../../utils/motion';
import { SectionWrapper } from '../../hoc';
import { Header } from '../atoms/Header';
import codeChefLogo from '../../assets/codechef.svg';

// ─── Animated Counter ───
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const unsub = rounded.on('change', (v) => setDisplayValue(v));
    return unsub;
  }, [rounded]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(count, target, { duration: 2, ease: 'easeOut' });
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [count, target]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

// ─── Data ───
const codingStats = [
  {
    platform: 'LeetCode',
    stat: '750+',
    label: 'Problems Solved',
    accent: '#f59e0b',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    platform: 'CodeChef',
    stat: '3★',
    label: 'Rating',
    accent: '#fb923c',
    icon: (
      <img src={codeChefLogo} alt="CodeChef" className="w-[24px] h-[24px] rounded-full object-cover" style={{ objectPosition: 'left' }} />
    ),
  },
  {
    platform: 'GitHub',
    stat: '30+',
    label: 'Repositories',
    accent: '#00F0FF',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    platform: 'Projects',
    stat: '10+',
    label: 'Built & Deployed',
    accent: '#FF006E',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m7 11 2-2-2-2" />
        <path d="M11 13h4" />
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      </svg>
    ),
  },
];

const achievements = [
  {
    title: 'AI-Generated Text Detection',
    description: 'Engineered a transformer NLP browser extension and server pipeline delivering real-time classification and confidence metrics.',
    type: 'Project',
    link: 'https://github.com/anuragverma4895/AI-generated-text-detection',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.4V11h3a3 3 0 0 1 3 3v1.6c1.2.6 2 1.9 2 3.4a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.4V14a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v1.6c1.2.6 2 1.9 2 3.4a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.4V14a3 3 0 0 1 3-3h3V9.4C7.8 8.8 7 7.5 7 6a4 4 0 0 1 5-3.9" />
      </svg>
    ),
  },
  {
    title: 'Real-Time Interview Platform',
    description: 'Built a full-stack WebRTC interview suite with synchronized code editing, automated code runner, and WebSockets chat.',
    type: 'Project',
    link: 'https://video-calling-interview-platform-pjna.onrender.com/',
    sourceCode: 'https://github.com/anuragverma4895/Video-Calling-Interview-Platform',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 8-6 4 6 4V8Z" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    title: 'Payment Processing System',
    description: 'Architected an idempotent payment gateway pipeline with webhook simulations, retry algorithms, and transaction audit trails.',
    type: 'Project',
    link: 'https://payment-processing-system-theta.vercel.app/',
    sourceCode: 'https://github.com/anuragverma4895/payment-processing-system',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    title: 'Full Stack Engineering',
    description: 'Expertise across the MERN stack with 10+ production-deployed web apps featuring modern UI/UX and cloud deployments.',
    type: 'Skill',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: 'Competitive Programming',
    description: '1200+ DSA problems solved across platforms (750+ LeetCode, 3-Star CodeChef) demonstrating deep algorithmic foundations.',
    type: 'Achievement',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
  },
  {
    title: 'AI / ML Engineering',
    description: 'Engineered ReAct autonomous agents, RAG vector pipelines, churn prediction systems, and generative diffusion tools.',
    type: 'Skill',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="3" />
        <path d="M12 8v3" />
        <line x1="8" y1="16" x2="8" y2="16" strokeWidth="3" strokeLinecap="round" />
        <line x1="16" y1="16" x2="16" y2="16" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
];

const Achievements = () => {
  return (
    <>
      <Header useMotion={true} p="What I've accomplished" h2="Achievements & Stats." />

      {/* ─── Coding Stats Row ─── */}
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        {codingStats.map((stat, i) => (
          <motion.div
            key={stat.platform}
            variants={fadeIn('up', 'spring', i * 0.1, 0.6)}
            className="glass-card card-lift group relative overflow-hidden rounded-2xl p-5 sm:p-6 text-center"
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${stat.accent}10, transparent 70%)`,
              }}
            />

            <div className="relative z-10">
              {/* Icon */}
              <div
                className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${stat.accent}15`,
                  border: `1px solid ${stat.accent}25`,
                  color: stat.accent,
                }}
              >
                {stat.icon}
              </div>

              {/* Stat value */}
              <p
                className="text-[28px] sm:text-[32px] font-black"
                style={{ color: stat.accent }}
              >
                {stat.stat}
              </p>

              {/* Label */}
              <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.15em] text-secondary">
                {stat.label}
              </p>

              {/* Platform name */}
              <p className="mt-2 text-[13px] font-medium text-white/50">
                {stat.platform}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ─── Achievements Grid ─── */}
      <div className="mt-14">
        <motion.h4
          variants={fadeIn('right', 'spring', 0.2, 0.75)}
          className="flex items-center gap-3 text-[18px] font-bold mb-8"
        >
          <span className="h-[2px] w-8" style={{ background: 'linear-gradient(90deg, #00F0FF, transparent)' }} />
          <span className="gradient-text-cyan">KEY HIGHLIGHTS</span>
        </motion.h4>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeIn('up', 'spring', 0.1 + i * 0.08, 0.6)}
              className="glass-card card-lift group relative overflow-hidden rounded-2xl p-6 flex flex-col h-full"
            >
              {/* Top glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 240, 255, 0.05), transparent 60%)',
                }}
              />

              <div className="relative z-10 flex flex-col h-full flex-1">
                {/* Type badge + icon */}
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center justify-center h-11 w-11 rounded-xl" style={{
                    background: item.type === 'Achievement'
                      ? 'rgba(0, 240, 255, 0.08)'
                      : item.type === 'Project'
                        ? 'rgba(255, 0, 110, 0.08)'
                        : 'rgba(145, 94, 255, 0.08)',
                    border: `1px solid ${item.type === 'Achievement'
                      ? 'rgba(0, 240, 255, 0.15)'
                      : item.type === 'Project'
                        ? 'rgba(255, 0, 110, 0.15)'
                        : 'rgba(145, 94, 255, 0.15)'}`,
                  }}>{item.icon}</span>
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{
                      background: item.type === 'Achievement'
                        ? 'rgba(0, 240, 255, 0.1)'
                        : item.type === 'Project'
                          ? 'rgba(255, 0, 110, 0.1)'
                          : 'rgba(145, 94, 255, 0.1)',
                      color: item.type === 'Achievement'
                        ? '#00F0FF'
                        : item.type === 'Project'
                          ? '#FF006E'
                          : '#915EFF',
                      border: `1px solid ${
                        item.type === 'Achievement'
                          ? 'rgba(0, 240, 255, 0.2)'
                          : item.type === 'Project'
                            ? 'rgba(255, 0, 110, 0.2)'
                            : 'rgba(145, 94, 255, 0.2)'
                      }`,
                    }}
                  >
                    {item.type}
                  </span>
                </div>

                <h5 className="text-[16px] font-bold text-white group-hover:text-accent-cyan transition-colors duration-300">
                  {item.title}
                </h5>
                <p className="mt-2 text-[13px] leading-[20px] text-white/55">
                  {item.description}
                </p>

                {/* Clickable links for projects */}
                {(item.link || item.sourceCode) && (
                  <div className="mt-auto pt-3 flex items-center gap-3">
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[12px] font-semibold text-accent-cyan/80 hover:text-accent-cyan transition-colors duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    {item.sourceCode && (
                      <a
                        href={item.sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[12px] font-semibold text-white/50 hover:text-white/80 transition-colors duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Bottom stat bar ─── */}
      <motion.div
        variants={fadeIn('up', 'tween', 0.4, 0.8)}
        className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 rounded-2xl border border-white/[0.04] bg-white/[0.01] px-6 py-5"
      >
        <div className="text-center">
          <p className="text-[28px] font-black gradient-text-cyan">
            <AnimatedCounter target={10} suffix="+" />
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Projects Deployed</p>
        </div>
        <div className="hidden sm:block h-8 w-px bg-white/10" />
        <div className="text-center">
          <p className="text-[28px] font-black gradient-text-magenta">
            <AnimatedCounter target={1200} suffix="+" />
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">DSA Problems</p>
        </div>
        <div className="hidden sm:block h-8 w-px bg-white/10" />
        <div className="text-center">
          <p className="text-[28px] font-black text-accent-purple">
            <AnimatedCounter target={15} suffix="+" />
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">Technologies</p>
        </div>
        <div className="hidden sm:block h-8 w-px bg-white/10" />
        <div className="text-center">
          <p className="text-[28px] font-black text-green-400">
            <AnimatedCounter target={30} suffix="+" />
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">GitHub Repos</p>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Achievements, 'achievements');
