import { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { styles } from '../../constants/styles';
import { fadeIn } from '../../utils/motion';
import { useTheme } from '../../context/ThemeContext';

export type SkillItem = {
  name: string;
  icon: string;
};

type SkillsBallSectionProps = {
  subtitle?: string;
  title?: string;
  skills: SkillItem[];
  id?: string;
};

// ─── Skill categories ───
const skillCategories = [
  {
    title: 'Frontend',
    gradient: 'from-blue-500 to-cyan-400',
    borderGradient: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
    glowColor: 'rgba(59,130,246,0.25)',
    accentHex: '#3b82f6',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: ['HTML 5', 'CSS 3', 'JavaScript', 'TypeScript', 'React JS', 'Redux Toolkit', 'Tailwind CSS', 'Three JS'],
  },
  {
    title: 'Backend',
    gradient: 'from-emerald-500 to-teal-400',
    borderGradient: 'linear-gradient(135deg, #10b981, #2dd4bf)',
    glowColor: 'rgba(16,185,129,0.25)',
    accentHex: '#10b981',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    skills: ['Node JS', 'MongoDB', 'Express.js', 'Socket.io', 'WebRTC', 'REST APIs'],
  },
  {
    title: 'AI / ML',
    gradient: 'from-purple-500 to-pink-500',
    borderGradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
    glowColor: 'rgba(168,85,247,0.25)',
    accentHex: '#a855f7',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.4V11h3a3 3 0 0 1 3 3v1.6c1.2.6 2 1.9 2 3.4a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.4V14a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v1.6c1.2.6 2 1.9 2 3.4a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.4V14a3 3 0 0 1 3-3h3V9.4C7.8 8.8 7 7.5 7 6a4 4 0 0 1 5-3.9" />
      </svg>
    ),
    skills: ['Python', 'TensorFlow', 'Scikit-Learn', 'NLP', 'Pandas', 'RAG Pipelines', 'HuggingFace', 'Deep Learning'],
  },
  {
    title: 'Tools & DevOps',
    gradient: 'from-amber-500 to-orange-500',
    borderGradient: 'linear-gradient(135deg, #f59e0b, #f97316)',
    glowColor: 'rgba(245,158,11,0.25)',
    accentHex: '#f59e0b',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    skills: ['Git', 'GitHub', 'Docker', 'Figma', 'VS Code', 'Postman', 'Vercel', 'Render'],
  },
];

// ─── Animated skill pill ───
const SkillPill: React.FC<{
  name: string;
  icon?: string;
  index: number;
  accentHex: string;
}> = ({ name, icon, index, accentHex }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.35, type: 'spring', stiffness: 200 }}
      whileHover={{
        scale: 1.08,
        y: -4,
        transition: { duration: 0.2 },
      }}
      className="group/pill relative cursor-default"
    >
      <div
        className="skill-pill relative flex items-center gap-2.5 rounded-xl border border-white/[0.08] px-4 py-3 text-[13px] font-semibold text-white/75 backdrop-blur-sm transition-all duration-300 group-hover/pill:border-white/25 group-hover/pill:text-white group-hover/pill:shadow-xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        }}
      >
        {/* Hover glow background */}
        <div
          className="absolute inset-0 opacity-0 group-hover/pill:opacity-100 transition-opacity duration-400"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${accentHex}15, transparent 70%)`,
          }}
        />

        {icon ? (
          <img
            src={icon}
            alt={name}
            className="relative z-10 h-5 w-5 object-contain transition-all duration-300 group-hover/pill:scale-125 group-hover/pill:drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
            loading="lazy"
          />
        ) : (
          <span
            className="relative z-10 h-2.5 w-2.5 rounded-full transition-all duration-300 group-hover/pill:scale-150 group-hover/pill:shadow-[0_0_8px_currentColor]"
            style={{ backgroundColor: accentHex }}
          />
        )}
        <span className="relative z-10 whitespace-nowrap text-[14px] font-semibold text-neutral-900">{name}</span>
      </div>
    </motion.div>
  );
};

// ─── 3D Category Card ───
const CategoryCard: React.FC<{
  category: (typeof skillCategories)[0];
  index: number;
  allSkillIcons: SkillItem[];
}> = ({ category, index, allSkillIcons }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const getIconForSkill = (skillName: string) => {
    const found = allSkillIcons.find(
      s => s.name.toLowerCase() === skillName.toLowerCase()
    );
    return found?.icon;
  };

  const defaultBg = isLight
    ? `linear-gradient(135deg, ${category.accentHex}10, rgba(255,255,255,0.5) 40%, ${category.accentHex}08)`
    : `linear-gradient(135deg, ${category.accentHex}20, transparent 40%, ${category.accentHex}10)`;

  const hoverGlowColor = isLight
    ? category.glowColor.replace('0.25', '0.12')
    : category.glowColor;

  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.12, 0.75)}
    >
      <Tilt
        tiltEnable
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        glareEnable
        glareMaxOpacity={isLight ? 0.04 : 0.08}
        glareColor={category.accentHex}
        glarePosition="all"
        perspective={1200}
        transitionSpeed={800}
        className="h-full"
      >
        <div
          className="skill-card group relative h-full rounded-2xl p-[1px] transition-all duration-500"
          style={{
            background: defaultBg,
          }}
          onMouseEnter={e => {
            const el = e.currentTarget;
            el.style.background = category.borderGradient;
            el.style.boxShadow = `0 12px 50px ${hoverGlowColor}, 0 0 80px ${category.glowColor.replace('0.25', '0.04')}`;
          }}
          onMouseLeave={e => {
            const el = e.currentTarget;
            el.style.background = defaultBg;
            el.style.boxShadow = 'none';
          }}
        >
          <div
            className={`relative h-full rounded-[15px] p-6 overflow-hidden ${isLight ? '' : 'bg-[#070515]'}`}
            style={isLight ? { background: 'linear-gradient(135deg, #ffffff, #fafaf8)' } : undefined}
          >
            {/* Animated background pattern */}
            <div
              className="absolute inset-0 opacity-[0.015] group-hover:opacity-[0.04] transition-opacity duration-700"
              style={{
                backgroundImage: `radial-gradient(circle, ${category.accentHex} 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }}
            />

            {/* Corner glow */}
            <div
              className="absolute -top-16 -right-16 h-40 w-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
              style={{ backgroundColor: isLight ? category.glowColor.replace('0.25', '0.08') : category.glowColor }}
            />
            <div
              className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
              style={{ backgroundColor: category.glowColor.replace('0.25', isLight ? '0.06' : '0.12') }}
            />

            {/* Category header */}
            <div className="relative z-10 mb-6 flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 12, scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex h-12 w-12 items-center justify-center rounded-xl text-white transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${category.accentHex}25, ${category.accentHex}08)`,
                  border: `1px solid ${category.accentHex}30`,
                  boxShadow: `0 4px 20px ${category.accentHex}15`,
                }}
              >
                {category.icon}
              </motion.div>
              <div>
                <h3
                  className={`bg-gradient-to-r ${category.gradient} bg-clip-text text-[20px] font-bold text-transparent`}
                >
                  {category.title}
                </h3>
                <p className="text-[12px] text-white/40 font-medium tracking-wide">
                  {category.skills.length} technologies
                </p>
              </div>

              {/* Skill count badge */}
              <div
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-[12px] font-bold text-white/60 transition-all duration-300 group-hover:text-white group-hover:scale-110"
                style={{
                  background: `${category.accentHex}12`,
                  border: `1px solid ${category.accentHex}20`,
                }}
              >
                {category.skills.length}
              </div>
            </div>

            {/* Gradient divider */}
            <div className="relative z-10 mb-5">
              <div className={`h-px bg-gradient-to-r ${category.gradient} opacity-15 group-hover:opacity-40 transition-opacity duration-500`} />
            </div>

            {/* Skills grid */}
            <div className="relative z-10 flex flex-wrap gap-2.5">
              {category.skills.map((skill, i) => (
                <SkillPill
                  key={skill}
                  name={skill}
                  icon={getIconForSkill(skill)}
                  index={i}
                  accentHex={category.accentHex}
                />
              ))}
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

// ─── Main Component ───
function SkillsBallSection({
  subtitle = 'My skills',
  title = 'Tech Stack.',
  skills,
  id = 'skills',
}: SkillsBallSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const totalSkills = useMemo(
    () => skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0),
    []
  );

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ type: 'tween', duration: 0.5, ease: 'easeOut' }}
      className="relative overflow-hidden py-8 sm:py-10"
    >
      <span className="hash-span">&nbsp;</span>
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-cyan-500/[0.06] blur-[100px]" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-purple-500/[0.06] blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-emerald-500/[0.06] blur-[100px]" />
        <div className="absolute right-1/4 bottom-20 h-60 w-60 rounded-full bg-amber-500/[0.04] blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className={styles.sectionSubText}>{subtitle}</p>
          <h2 className={styles.sectionHeadText}>{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-white/55">
            A versatile toolkit spanning{' '}
            <span className="text-white font-medium">frontend frameworks</span>,{' '}
            <span className="text-white font-medium">backend systems</span>,{' '}
            <span className="text-white font-medium">AI/ML pipelines</span>, and{' '}
            <span className="text-white font-medium">DevOps tools</span> — forged through
            real-world projects and relentless learning.
          </p>
        </div>

        {/* Floating stats pills */}
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mx-auto mb-12 flex max-w-4xl flex-wrap items-center justify-center gap-3"
          >
            {skillCategories.map(cat => (
              <div
                key={cat.title}
                className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05] hover:-translate-y-0.5 cursor-default"
              >
                <span
                  className={`inline-block h-2 w-2 rounded-full bg-gradient-to-r ${cat.gradient}`}
                />
                <span className="text-[12px] font-semibold tracking-wide text-white/60">
                  {cat.skills.length} {cat.title}
                </span>
              </div>
            ))}
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div
              className="flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/[0.06] px-4 py-2 backdrop-blur-sm cursor-default"
            >
              <span className="text-[12px] font-bold tracking-wide text-accent-cyan">
                {totalSkills}+ Skills
              </span>
            </div>
          </motion.div>
        )}

        {/* 3D Category cards grid */}
        {isVisible && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {skillCategories.map((category, index) => (
              <CategoryCard
                key={category.title}
                category={category}
                index={index}
                allSkillIcons={skills}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

export default SkillsBallSection;
