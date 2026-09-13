import type { TNavLink, TService, TTechnology, TProject } from '../types';

import {
  backend,
  mobile,
  creator,
  web,
  aiml,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  aiVideoAds,
  videoInterview,
  paymentSystem,
  socialMedia,
  techStore,
  shopez,
  threejs,
  aimlTextDetection,
  aimlChurnPrediction,
  aimlSalesAnalysis,
  aimlRagPipeline,
  aimlImageGenerator,
  aimlAiCodingAgent,
  aiMockInterview,
  aiRevenueRecovery,
  researchGrantSystem,
  aimlTextDetectionPlatform,
} from '../assets';

export const navLinks: TNavLink[] = [
  {
    id: 'home',
    title: 'Home',
  },
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'skills',
    title: 'Skills',
  },
  {
    id: 'education',
    title: 'Education',
  },
  {
    id: 'achievements',
    title: 'Achievements',
  },
  {
    id: 'work',
    title: 'Work',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services: TService[] = [
  {
    title: 'Full Stack Developer',
    icon: web,
  },
  {
    title: 'MERN Stack Expert',
    icon: reactjs,
  },
  {
    title: 'Backend Architect',
    icon: backend,
  },
  {
    title: 'AI / ML Engineer',
    icon: aiml,
  },
  {
    title: 'API & System Design',
    icon: mobile,
  },
  {
    title: 'DevOps & Cloud',
    icon: docker,
  },
  {
    title: 'Creative Problem Solver',
    icon: creator,
  },
];

const technologies: TTechnology[] = [
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Redux Toolkit',
    icon: redux,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  {
    name: 'MongoDB',
    icon: mongodb,
  },
  {
    name: 'Three JS',
    icon: threejs,
  },

  {
    name: 'git',
    icon: git,
  },
  {
    name: 'figma',
    icon: figma,
  },
  {
    name: 'docker',
    icon: docker,
  },
];

/* ─── Full-Stack Development Projects (best first) ─── */
const projects: TProject[] = [
  {
    name: 'AI Mock Interview Platform',
    description:
      'AI-powered mock interview platform for resume-based practice, interview questions, feedback, analytics, and video recording.',
    tags: [
      { name: 'typescript', color: 'blue-text-gradient' },
      { name: 'ai', color: 'green-text-gradient' },
      { name: 'webrtc', color: 'pink-text-gradient' },
    ],
    image: aiMockInterview,
    sourceCodeLink: 'https://github.com/anuragverma4895/AI-Mock-Interview-Platform',
    deployLink: 'https://ai-mock-interview-platform-cizl.onrender.com/',
  },
  {
    name: 'AI Revenue Recovery Agent',
    description:
      'AI-powered revenue recovery agent that detects failed payments, assesses recovery risk, chooses safe recovery actions, retries payments through a secure API, and tracks recovered revenue.',
    tags: [
      { name: 'javascript', color: 'blue-text-gradient' },
      { name: 'ai', color: 'green-text-gradient' },
      { name: 'api', color: 'pink-text-gradient' },
    ],
    image: aiRevenueRecovery,
    sourceCodeLink: 'https://github.com/anuragverma4895/AI-Revenue-Recovery-Agent',
    deployLink: 'https://ai-revenue-recovery-agent-x294.onrender.com/',
  },
  {
    name: 'Research Grant Management System',
    description:
      'Research Grant Management System is a web-based application designed to digitally manage the research grant applications efficiently.',
    tags: [
      { name: 'php', color: 'blue-text-gradient' },
      { name: 'mysql', color: 'green-text-gradient' },
      { name: 'html/css', color: 'pink-text-gradient' },
    ],
    image: researchGrantSystem,
    sourceCodeLink: 'https://github.com/anuragverma4895/Research-Grant-Management-System',
    deployLink: 'https://grant-management-system.infinityfreeapp.com/',
  },
  {
    name: 'SHOP-EZ',
    description:
      'Modern full-stack retail ecosystem with a dedicated FastAPI recommendation engine, Razorpay gateway integration, JWT authentication, and comprehensive administrative dashboards.',
    tags: [
      { name: 'react', color: 'blue-text-gradient' },
      { name: 'fastapi', color: 'green-text-gradient' },
      { name: 'mongodb', color: 'pink-text-gradient' },
    ],
    image: shopez,
    sourceCodeLink: 'https://github.com/anuragverma4895/SHOP-EZ',
    deployLink: 'https://shop-ez-ob6b.onrender.com/',
  },
  {
    name: 'Video Calling Interview Platform',
    description:
      'Full-stack real-time collaboration platform featuring WebRTC peer video streaming, low-latency Socket.io signaling, synchronized live code editing, and integrated evaluation tooling.',
    tags: [
      { name: 'react', color: 'blue-text-gradient' },
      { name: 'webrtc', color: 'green-text-gradient' },
      { name: 'socketio', color: 'pink-text-gradient' },
    ],
    image: videoInterview,
    sourceCodeLink: 'https://github.com/anuragverma4895/Video-Calling-Interview-Platform',
    deployLink: 'https://video-calling-interview-platform-pjna.onrender.com/',
  },
  {
    name: 'Payment Processing System',
    description:
      'Production-ready payment gateway architecture inspired by Razorpay, featuring idempotent transaction pipelines, automated retry protocols, and cryptographic webhook simulations.',
    tags: [
      { name: 'react', color: 'blue-text-gradient' },
      { name: 'nodejs', color: 'green-text-gradient' },
      { name: 'mongodb', color: 'pink-text-gradient' },
    ],
    image: paymentSystem,
    sourceCodeLink: 'https://github.com/anuragverma4895/payment-processing-system',
    deployLink: 'https://payment-processing-system-theta.vercel.app/',
  },
  {
    name: 'Social Media Platform',
    description:
      'Full-featured MERN social network incorporating AI post creation, JWT-based security, real-time messaging, activity feeds, and fluid interactive UI states.',
    tags: [
      { name: 'mern', color: 'blue-text-gradient' },
      { name: 'ai', color: 'green-text-gradient' },
      { name: 'socketio', color: 'pink-text-gradient' },
    ],
    image: socialMedia,
    sourceCodeLink: 'https://github.com/anuragverma4895/Social-Media-Platform',
    deployLink: 'https://social-media-platform-six-taupe.vercel.app/',
  },
  {
    name: 'AI Short Video Ads Generator',
    description:
      'AI-driven platform that synthesizes high-converting video advertisements from product imagery and prompt configurations with customizable creative outputs.',
    tags: [
      { name: 'react', color: 'blue-text-gradient' },
      { name: 'nodejs', color: 'green-text-gradient' },
      { name: 'ai', color: 'pink-text-gradient' },
    ],
    image: aiVideoAds,
    sourceCodeLink: 'https://github.com/anuragverma4895/AI-Short-Video-Ads-Generator',
    deployLink: 'https://ai-short-video-ads-generator.onrender.com/',
  },
  {
    name: 'Ecommerce Tech Store',
    description:
      'Full-stack electronics storefront built with React, Node.js, Express & MongoDB featuring responsive catalogs, persistent cart state, and modular RESTful APIs.',
    tags: [
      { name: 'react', color: 'blue-text-gradient' },
      { name: 'express', color: 'green-text-gradient' },
      { name: 'mongodb', color: 'pink-text-gradient' },
    ],
    image: techStore,
    sourceCodeLink: 'https://github.com/anuragverma4895/Ecommerce-Tech-Store',
    deployLink: 'https://ecommerce-tech-store-seven.vercel.app/',
  },
];

export type TAimlProject = {
  name: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  sourceCodeLink: string;
  deployLink?: string;
};

/* ─── AI/ML & Data Science Projects (best first) ─── */
const aimlProjects: TAimlProject[] = [
  {
    name: 'AI Coding Agent',
    description:
      'Autonomous agent engineered in Python that explores repositories, parses architecture, and implements user specifications via Gemini LLM with a 6-stage ReAct loop and safe tool execution.',
    tags: [
      { name: 'LLM', color: 'blue-text-gradient' },
      { name: 'ReAct', color: 'green-text-gradient' },
      { name: 'agents', color: 'pink-text-gradient' },
    ],
    image: aimlAiCodingAgent,
    sourceCodeLink: 'https://github.com/anuragverma4895/AI-Coding-Agent',
  },
  {
    name: 'AI-Generated Text Detection Platform',
    description:
      'An advanced AI-powered text authenticity analysis platform. Detects machine-generated content with detailed confidence scoring, sentence-level highlighting, and enterprise-grade reporting.',
    tags: [
      { name: 'typescript', color: 'blue-text-gradient' },
      { name: 'transformers', color: 'green-text-gradient' },
      { name: 'NLP', color: 'pink-text-gradient' },
    ],
    image: aimlTextDetectionPlatform,
    sourceCodeLink: 'https://github.com/anuragverma4895/AI-Generated-Text-Detection-Platform',
  },
  {
    name: 'RAG Pipeline with Answer Evaluation',
    description:
      'Enterprise-grade Retrieval-Augmented Generation pipeline combining vector search with LLM synthesis, featuring automated benchmark metrics for contextual relevance and factual accuracy.',
    tags: [
      { name: 'LLM', color: 'blue-text-gradient' },
      { name: 'RAG', color: 'green-text-gradient' },
      { name: 'vector-db', color: 'pink-text-gradient' },
    ],
    image: aimlRagPipeline,
    sourceCodeLink:
      'https://github.com/anuragverma4895/RAG-Pipeline-with-Automated-Answer-Evaluation',
  },
  {
    name: 'AI-Generated Text Detection',
    description:
      'Deep learning browser extension and server pipeline utilizing transformer NLP models for real-time classification of AI-synthesized text across web pages, documents, and direct input.',
    tags: [
      { name: 'NLP', color: 'blue-text-gradient' },
      { name: 'transformers', color: 'green-text-gradient' },
      { name: 'deep-learning', color: 'pink-text-gradient' },
    ],
    image: aimlTextDetection,
    sourceCodeLink: 'https://github.com/anuragverma4895/AI-generated-text-detection',
  },
  {
    name: 'AI Image Generator',
    description:
      'Generative AI studio leveraging state-of-the-art diffusion models for high-fidelity text-to-image synthesis, intuitive prompt weighting, style customization, and batch generation.',
    tags: [
      { name: 'generative-AI', color: 'blue-text-gradient' },
      { name: 'diffusion', color: 'green-text-gradient' },
      { name: 'python', color: 'pink-text-gradient' },
    ],
    image: aimlImageGenerator,
    sourceCodeLink: 'https://github.com/anuragverma4895/Image-generator',
  },
  {
    name: 'Customer Churn Prediction',
    description:
      'End-to-end predictive ML system performing feature engineering, exploratory data analysis, hyperparameter tuning, and classification algorithms to proactively identify at-risk client segments.',
    tags: [
      { name: 'scikit-learn', color: 'blue-text-gradient' },
      { name: 'pandas', color: 'green-text-gradient' },
      { name: 'classification', color: 'pink-text-gradient' },
    ],
    image: aimlChurnPrediction,
    sourceCodeLink: 'https://github.com/anuragverma4895/Customer-Churn-Prediction',
  },
  {
    name: 'Sales Data Analysis & Business Insights',
    description:
      'Comprehensive data analytics workflow extracting actionable strategic insights from large-scale sales telemetry, including trend identification, revenue forecasting, and cohort segmentation.',
    tags: [
      { name: 'data-analysis', color: 'blue-text-gradient' },
      { name: 'visualization', color: 'green-text-gradient' },
      { name: 'python', color: 'pink-text-gradient' },
    ],
    image: aimlSalesAnalysis,
    sourceCodeLink: 'https://github.com/anuragverma4895/Sales-Data-Analysis-Business-Insights',
  },
];

export { services, technologies, projects, aimlProjects };
