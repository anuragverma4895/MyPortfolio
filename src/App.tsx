import { lazy, Suspense, useEffect, useCallback, useState } from 'react';

import About from './components/sections/About';
import Hero from './components/sections/Hero';
import Works from './components/sections/Works';
import Education from './components/sections/Education';
import Achievements from './components/sections/Achievements';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { config } from './constants/config';
import { technologies } from './constants';
import SectionDivider from './components/atoms/SectionDivider';

// Lazy load heavy components
const SkillsBallSection = lazy(() => import('./components/sections/SkillsBallSection'));
const StarsCanvas = lazy(() => import('./components/canvas/Stars'));
const EarthCanvas = lazy(() => import('./components/canvas/Earth'));
const ProfileSection = lazy(() => import('./components/sections/ProfileSection'));
const Contact = lazy(() => import('./components/sections/Contact'));
const SocialSidebar = lazy(() => import('./components/layout/SocialSidebar'));
const ResumeButton = lazy(() => import('./components/layout/ResumeButton'));
const WhatsAppButton = lazy(() => import('./components/layout/WhatsAppButton'));
const CustomCursor = lazy(() => import('./components/layout/CustomCursor'));

const overlaySectionIds = ['about', 'skills', 'education', 'achievements', 'work', 'contact'] as const;
type OverlaySectionId = (typeof overlaySectionIds)[number];

// Lightweight placeholder for lazy sections
const SectionFallback = ({ height = '20rem' }: { height?: string }) => (
  <div style={{ minHeight: height }} />
);

const isOverlaySectionId = (sectionId: string): sectionId is OverlaySectionId =>
  overlaySectionIds.includes(sectionId as OverlaySectionId);

/** Scroll to the first real content inside a section, accounting for the fixed navbar. */
function smoothScrollToElement(element: HTMLElement) {
  const navbar = document.querySelector('nav');
  const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
  const scrollAnchor =
    element.querySelector<HTMLElement>(':scope > .hash-span + *') ?? element;
  const elementTop =
    scrollAnchor.getBoundingClientRect().top + window.scrollY - navbarHeight - 12;

  window.scrollTo({ top: Math.max(0, elementTop), behavior: 'smooth' });
}

const App = () => {
  const [activeOverlaySection, setActiveOverlaySection] = useState<OverlaySectionId | null>(null);

  const openOverlaySection = useCallback((sectionId: OverlaySectionId) => {
    setActiveOverlaySection(sectionId);
    const nextHash = `#${sectionId}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }
  }, []);

  const closeOverlaySection = useCallback(() => {
    setActiveOverlaySection(null);
    const currentHash = window.location.hash.slice(1);
    if (isOverlaySectionId(currentHash)) {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  const renderOverlayContent = () => {
    switch (activeOverlaySection) {
      case 'about':
        return <About />;
      case 'skills':
        return <SkillsBallSection skills={technologies} />;
      case 'education':
        return <Education />;
      case 'achievements':
        return <Achievements />;
      case 'work':
        return <Works />;
      case 'contact':
        return <Contact />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (document.title !== config.html.title) {
      document.title = config.html.title;
    }
  }, []);

  useEffect(() => {
    const syncOverlayFromHash = () => {
      const sectionId = window.location.hash.slice(1);
      setActiveOverlaySection(isOverlaySectionId(sectionId) ? sectionId : null);
    };

    syncOverlayFromHash();
    window.addEventListener('popstate', syncOverlayFromHash);

    return () => {
      window.removeEventListener('popstate', syncOverlayFromHash);
    };
  }, []);

  useEffect(() => {
    if (!activeOverlaySection) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeOverlaySection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeOverlaySection, closeOverlaySection]);

  // Smooth scroll handler for non-overlay anchor links; section links open page-style overlays.
  const handleSmoothScroll = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    const sectionId = href.slice(1);

    if (sectionId === 'home') {
      e.preventDefault();
      closeOverlaySection();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '/');
      return;
    }

    if (isOverlaySectionId(sectionId)) {
      e.preventDefault();
      openOverlaySection(sectionId);
      return;
    }

    const element = document.getElementById(sectionId);
    if (!element) return;

    e.preventDefault();
    smoothScrollToElement(element);
    window.history.pushState(null, '', href);
  }, [openOverlaySection, closeOverlaySection]);

  useEffect(() => {
    document.addEventListener('click', handleSmoothScroll);
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, [handleSmoothScroll]);

  const isContactOverlay = activeOverlaySection === 'contact';

  return (
    <div className={`relative z-0 theme-transition`}>
      {/* Fixed Background Layer */}
      <div 
        className="fixed inset-0 z-[-1] noise-bg theme-transition pointer-events-none" 
        style={{ background: 'var(--bg-primary)' }}
      >
        <Suspense fallback={null}>
          <StarsCanvas />
        </Suspense>
        <div className="absolute inset-0 m-auto flex h-[80vh] w-full max-w-[800px] items-center justify-center opacity-20">
          <Suspense fallback={null}>
            <EarthCanvas />
          </Suspense>
        </div>
      </div>

      {/* Custom cursor (desktop only) */}
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>

      <div className="relative z-[50]">
        <Navbar activeSection={activeOverlaySection} />
      </div>

      <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat relative z-10">
        <Hero />
      </div>

      <div className="relative z-10">
        <About />

        <SectionDivider />

        <Suspense fallback={<SectionFallback height="32rem" />}>
          <SkillsBallSection skills={technologies} />
        </Suspense>

        <SectionDivider />

        <Education />

        <SectionDivider />

        <Achievements />

        <SectionDivider />

        <Works />

        <SectionDivider />

        <Suspense fallback={<SectionFallback height="28rem" />}>
          <ProfileSection />
        </Suspense>
        <Footer />
      </div>

      {activeOverlaySection && (
        <div
          className="fixed inset-0 z-[80] overflow-hidden theme-transition"
          style={{ background: 'var(--bg-primary)' }}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeOverlaySection} page`}
        >
          {/* Overlay Background Layer */}
          <div className="absolute inset-0 z-[-1] noise-bg pointer-events-none">
            <Suspense fallback={null}>
              <StarsCanvas />
            </Suspense>
            <div className="absolute inset-0 m-auto flex h-[80vh] w-full max-w-[800px] items-center justify-center opacity-20">
              <Suspense fallback={null}>
                <EarthCanvas />
              </Suspense>
            </div>
          </div>

          <Navbar activeSection={activeOverlaySection} />

          <Suspense fallback={null}>
            <SocialSidebar />
            <WhatsAppButton onClick={() => openOverlaySection('contact')} />
            <ResumeButton />
          </Suspense>

          <div
            className={
              isContactOverlay
                ? 'relative z-10 flex h-screen translate-y-8 items-center justify-center px-0 py-0'
                : 'overlay-page-scroll relative z-10 h-screen pt-28 pb-12'
            }
          >
            <Suspense fallback={<SectionFallback height="28rem" />}>
              {renderOverlayContent()}
            </Suspense>
          </div>
        </div>
      )}

      <Suspense fallback={null}>
        <SocialSidebar />
        <WhatsAppButton onClick={() => openOverlaySection('contact')} />
        <ResumeButton />
      </Suspense>
    </div>
  );
};

export default App;