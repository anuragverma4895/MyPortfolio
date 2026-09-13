import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

import { github } from '../../assets';
import { SectionWrapper } from '../../hoc';
import { projects, aimlProjects } from '../../constants';
import { fadeIn } from '../../utils/motion';
import { config } from '../../constants/config';
import { Header } from '../atoms/Header';
import { TProject } from '../../types';
import { TAimlProject } from '../../constants';

const ProjectCard: React.FC<{ index: number } & TProject> = ({
  index,
  name,
  description,
  image,
  sourceCodeLink,
  deployLink,
}) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.2, 0.75)}
      className="w-full flex"
    >
      <Tilt
        glareEnable
        glareMaxOpacity={0.08}
        glareColor="#00F0FF"
        glarePosition="all"
        tiltEnable
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        className="w-full"
      >
        <div className="glass-card card-lift group w-full aspect-square rounded-2xl p-4 relative overflow-hidden flex flex-col">
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 0%, rgba(0, 240, 255, 0.06) 0%, transparent 60%)',
            }}
          />

          <div>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl shrink-0">
              <img
                src={image}
                alt={`${name} preview`}
                className="h-full w-full rounded-xl object-cover object-top transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />

              {/* Action buttons */}
              <div className="card-img_hover absolute inset-0 m-3 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {deployLink && (
                  <button
                    type="button"
                    onClick={() => window.open(deployLink, '_blank')}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-glow-cyan"
                    style={{ background: 'rgba(3, 0, 20, 0.7)' }}
                    title="Live Demo"
                    aria-label={`Open live demo of ${name}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[50%] w-[50%] text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => window.open(sourceCodeLink, '_blank')}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-accent-cyan/50 hover:shadow-glow-cyan"
                  style={{ background: 'rgba(3, 0, 20, 0.7)' }}
                  title="Source Code"
                  aria-label={`View source code for ${name} on GitHub`}
                >
                  <img src={github} alt="" className="project-github-icon h-1/2 w-1/2 object-contain" />
                </button>
              </div>
            </div>

            <div className="mt-4 relative z-10 flex flex-col flex-1">
              <h3 className="text-[18px] sm:text-[20px] font-bold text-white group-hover:gradient-text-cyan transition-colors duration-300 line-clamp-1">{name}</h3>
              <p className="text-secondary mt-2 text-[13px] leading-[20px] line-clamp-4">{description}</p>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const AimlProjectCard: React.FC<{ index: number } & TAimlProject> = ({
  index,
  name,
  description,
  image,
  sourceCodeLink,
}) => {
  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.2, 0.75)}
      className="w-full flex"
    >
      <Tilt
        glareEnable
        glareMaxOpacity={0.12}
        glareColor="#FF006E"
        glarePosition="all"
        tiltEnable
        tiltMaxAngleX={20}
        tiltMaxAngleY={20}
        className="w-full"
      >
        <div className="aiml-card card-lift group w-full aspect-square rounded-2xl p-4 relative overflow-hidden flex flex-col">
          {/* Animated background glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255, 0, 110, 0.06) 0%, transparent 70%)',
            }}
          />

          <div>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl shrink-0">
              <img
                src={image}
                alt={`${name} preview`}
                className="h-full w-full rounded-xl object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none" />

              <div className="absolute inset-0 m-3 flex justify-end items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  type="button"
                  onClick={() => window.open(sourceCodeLink, '_blank')}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 backdrop-blur-md hover:border-accent-magenta/50 hover:shadow-glow-magenta transition-all duration-300"
                  style={{ background: 'rgba(3, 0, 20, 0.7)' }}
                  title="View Source Code"
                  aria-label={`View source code for ${name} on GitHub`}
                >
                  <img src={github} alt="" className="project-github-icon h-1/2 w-1/2 object-contain" />
                </button>
              </div>
            </div>

            <div className="mt-4 relative z-10 flex flex-col flex-1">
              <h3 className="text-[18px] sm:text-[20px] font-bold text-white group-hover:text-pink-200 transition-colors duration-300 line-clamp-1">{name}</h3>
              <p className="text-secondary mt-2 text-[13px] leading-[20px] line-clamp-4">{description}</p>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

// Category label component
const CategoryBadge: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  gradientFrom: string;
  gradientTo: string;
  delay?: number;
}> = ({ icon, title, subtitle, gradientFrom, gradientTo, delay = 0 }) => (
  <motion.div
    variants={fadeIn('right', 'spring', delay, 0.75)}
    className="flex items-center gap-4 mb-4"
  >
    <motion.div
      whileHover={{ rotate: 12, scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="flex items-center justify-center w-12 h-12 rounded-xl shadow-lg"
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        boxShadow: `0 4px 25px ${gradientFrom}50`,
      }}
    >
      {icon}
    </motion.div>
    <div>
      <h3 className="text-white text-[22px] sm:text-[26px] font-bold tracking-tight">{title}</h3>
      <p className="text-secondary text-[13px] sm:text-[14px]">{subtitle}</p>
    </div>
  </motion.div>
);

const Works = () => {
  return (
    <>
      <Header useMotion={true} p="" h2={config.sections.works.h2} />

      <div className="flex w-full">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="text-secondary mt-3 max-w-3xl text-[17px] leading-[30px]"
        >
          I build across the full spectrum of software engineering — from{' '}
          <span className="text-white font-medium">production-grade full-stack web applications</span>{' '}
          to{' '}
          <span className="text-white font-medium">intelligent AI & Machine Learning systems</span>.
          Below are projects that showcase my versatility, problem-solving ability, and passion for building
          impactful solutions across both domains.
        </motion.p>
      </div>

      {/* ─── Full-Stack Development Section ─── */}
      <div className="mt-20">
        <CategoryBadge
          icon={
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
              <line x1="14" y1="4" x2="10" y2="20" />
            </svg>
          }
          title="Full-Stack Development"
          subtitle="Production-grade web applications & scalable architectures"
          gradientFrom="#00F0FF"
          gradientTo="#3b82f6"
        />
        <div
          className="h-px w-full mb-10"
          style={{
            background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.4), rgba(59, 130, 246, 0.2), transparent)',
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
      </div>

      {/* ─── AI / ML Section ─── */}
      <div className="mt-24">
        <CategoryBadge
          icon={
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.4V11h3a3 3 0 0 1 3 3v1.6c1.2.6 2 1.9 2 3.4a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.4V14a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v1.6c1.2.6 2 1.9 2 3.4a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.4V14a3 3 0 0 1 3-3h3V9.4C7.8 8.8 7 7.5 7 6a4 4 0 0 1 5-3.9" />
            </svg>
          }
          title="AI / ML & Data Science"
          subtitle="Intelligent systems, deep learning models & data-driven insights"
          gradientFrom="#FF006E"
          gradientTo="#a855f7"
          delay={0.2}
        />
        <div
          className="h-px w-full mb-10"
          style={{
            background: 'linear-gradient(90deg, rgba(255, 0, 110, 0.4), rgba(168, 85, 247, 0.2), transparent)',
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {aimlProjects.map((project, index) => (
            <AimlProjectCard key={`aiml-${index}`} index={index} {...project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Works, 'work');
