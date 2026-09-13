import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';
import { SectionWrapper } from '../../hoc';
import codeChefLogo from '../../assets/codechef.svg';

const contactInfo = {
  email: 'anuragverma4895@gmail.com',
  phone: '+91 8874096365',
  education: 'B.Tech in CSE (AI) - NIET, Greater Noida',
  location: 'Greater Noida, India',
  responseTime: 'Usually within 24 hours',
};

const contactHighlights = [
  { label: 'Location', value: contactInfo.location },
  { label: 'Availability', value: 'Open to freelance and full-time roles' },
  { label: 'Response', value: contactInfo.responseTime },
];

const ctaHighlights = ['Web Apps', 'Realtime Systems', 'AI Integrations', 'MERN Stack'];

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/anuragverma4895',
    accent: '#00F0FF',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/anuragverma4895/',
    accent: '#60a5fa',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/AnuragVerma2035/',
    accent: '#f59e0b',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    name: 'CodeChef',
    url: 'https://www.codechef.com/users/anuragverma203',
    accent: '#fb923c',
    icon: (
      <img src={codeChefLogo} alt="CodeChef" className="w-[22px] h-[22px] rounded-full object-cover" style={{ objectPosition: 'left' }} />
    ),
  },
];

const ProfileSection = () => {
  return (
    <>
      {/* Tagline */}
      <motion.div
        variants={fadeIn('up', 'tween', 0, 0.6)}
        className="mb-16 flex flex-col items-center text-center"
      >
        <p className="max-w-xl text-[18px] font-medium text-secondary">
          Engineered with precision, built for scale. Open to impactful engineering roles and client collaborations.
        </p>
      </motion.div>

      {/* Three Cards Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Contact Me Card */}
        <motion.div
          variants={fadeIn('up', 'spring', 0, 0.75)}
          className="glass-card card-lift rounded-3xl p-6 lg:aspect-square flex flex-col"
        >
          <h4 className="mb-6 flex items-center gap-3 text-[20px] font-bold">
            <span
              className="h-[2px] w-8"
              style={{ background: 'linear-gradient(90deg, #00F0FF, transparent)' }}
            />
            <span className="gradient-text-cyan">CONTACT ME</span>
          </h4>
          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${contactInfo.email}`}
              className="truncate text-[16px] text-white transition-all duration-200 hover:text-accent-cyan hover:glow-text"
              aria-label={`Send email to ${contactInfo.email}`}
            >
              {contactInfo.email}
            </a>
            <a
              href={`tel:${contactInfo.phone}`}
              className="text-[16px] text-white transition-all duration-200 hover:text-accent-cyan"
              aria-label={`Call phone number ${contactInfo.phone}`}
            >
              {contactInfo.phone}
            </a>
            <p className="mt-2 border-t border-white/5 pt-4 text-[14px] text-secondary">
              {contactInfo.education}
            </p>
          </div>
          <div className="mt-auto grid gap-3 pt-4">
            {contactHighlights.map(item => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:border-accent-cyan/20 hover:bg-white/[0.04]"
              >
                <p className="text-[11px] uppercase tracking-[0.24em]" style={{ color: 'rgba(0, 240, 255, 0.6)' }}>
                  {item.label}
                </p>
                <p className="mt-1 text-[14px] text-white/85">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Profiles Card */}
        <motion.div
          variants={fadeIn('up', 'spring', 0.15, 0.75)}
          className="glass-card card-lift rounded-3xl p-6 lg:aspect-square flex flex-col"
        >
          <h4 className="mb-6 flex items-center gap-3 text-[20px] font-bold">
            <span
              className="h-[2px] w-8"
              style={{ background: 'linear-gradient(90deg, #FF006E, transparent)' }}
            />
            <span className="gradient-text-magenta">PROFILES</span>
          </h4>
          <p className="mb-6 text-[14px] text-secondary">
            Connect with me across coding and professional networks.
          </p>
          <div className="mt-auto grid grid-cols-2 gap-4">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Anurag's ${link.name} profile`}
                className="group flex min-w-0 flex-col items-center justify-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-3 py-4 text-center transition-all duration-300 hover:-translate-y-2 hover:border-white/15 hover:bg-white/[0.05]"
                style={{
                  ['--hover-glow' as string]: link.accent,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 30px ${link.accent}20, 0 0 20px ${link.accent}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/[0.06] bg-black/25 text-white transition-all duration-300 group-hover:scale-110"
                  style={{ boxShadow: `0 0 24px ${link.accent}15` }}
                >
                  {link.icon}
                </span>
                <span className="block max-w-full truncate text-[15px] font-semibold text-white sm:text-[16px]">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          variants={fadeIn('up', 'spring', 0.3, 0.75)}
          className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl p-6 text-center card-lift lg:aspect-square"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.06) 0%, rgba(255, 0, 110, 0.06) 100%)',
            border: '1px solid rgba(0, 240, 255, 0.15)',
          }}
        >
          {/* Animated background orbs */}
          <div className="absolute right-0 top-0 -mr-10 -mt-10 h-24 w-24 rounded-full animate-pulse-glow" style={{ background: 'rgba(0, 240, 255, 0.1)', filter: 'blur(40px)' }} />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-6 h-28 w-28 rounded-full animate-pulse-glow" style={{ background: 'rgba(255, 0, 110, 0.08)', filter: 'blur(40px)', animationDelay: '1.5s' }} />

          <h4 className="mb-4 text-[22px] font-bold text-white">Ready to collaborate?</h4>
          <p className="mb-5 max-w-xs text-[15px] leading-7 text-white/70">
            From modern web applications to scalable backend architectures and AI pipelines, let&apos;s build something exceptional.
          </p>
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {ctaHighlights.map(item => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 transition-all duration-300 hover:border-accent-cyan/30 hover:bg-accent-cyan/10"
              >
                {item}
              </span>
            ))}
          </div>
          <a
            href="#contact"
            className="btn-solid rounded-xl px-7 py-3 text-[15px] font-bold"
          >
            Get in Touch →
          </a>
          <p className="mt-4 text-[13px] text-white/50">Fast response · Open to global opportunities</p>
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(ProfileSection, '');
