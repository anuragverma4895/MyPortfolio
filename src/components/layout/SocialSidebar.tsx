import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/anuragverma4895',
    hoverColor: '#00F0FF',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/anuragverma4895/',
    hoverColor: '#60a5fa',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/AnuragVerma2035/',
    hoverColor: '#f59e0b',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    name: 'CodeChef',
    url: 'https://www.codechef.com/users/anuragverma203',
    hoverColor: '#fb923c',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7.2 10.4c-1.8-.5-3.2-1.8-3.2-3.4 0-2 2-3.6 4.5-3.6.8 0 1.5.2 2.1.5C11.4 2.7 12.8 2 14.4 2c2.5 0 4.6 1.7 4.6 3.8 0 1.6-1.2 2.9-2.9 3.5" />
        <path d="M6.7 10.1c.2 1.8.5 3.8 1 5.6.4 1.5 1.8 2.5 3.3 2.5h2c1.6 0 2.9-1 3.3-2.5.5-1.8.8-3.7 1-5.6" />
        <path d="M8 21h8" />
        <path d="M10 13h.01" />
        <path d="M14 13h.01" />
        <path d="M10 16c1.1.7 2.9.7 4 0" />
      </svg>
    ),
  },
];

const SocialSidebar = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
      className="fixed left-5 bottom-6 z-30 hidden md:flex flex-col items-center gap-4"
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          title={social.name}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.8 + index * 0.1, duration: 0.5 }}
          className="group relative flex items-center justify-center w-12 h-12 rounded-xl border border-white/[0.08] text-secondary hover:text-white transition-all duration-300"
          style={{
            background: 'rgba(12, 10, 30, 0.6)',
            backdropFilter: 'blur(10px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${social.hoverColor}50`;
            e.currentTarget.style.boxShadow = `0 0 25px ${social.hoverColor}30, 0 0 50px ${social.hoverColor}10`;
            e.currentTarget.style.color = social.hoverColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = document.documentElement.getAttribute('data-theme') === 'light' ? 'rgba(0,0,0,0.28)' : 'rgba(255,255,255,0.08)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.color = '';
          }}
        >
          {social.icon}
          <span
            className="absolute left-[3.8rem] px-3 py-1.5 rounded-lg text-white text-[12px] font-semibold whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none tracking-wide"
            style={{
              background: social.hoverColor,
              boxShadow: `0 4px 20px ${social.hoverColor}40`,
            }}
          >
            {social.name}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialSidebar;
