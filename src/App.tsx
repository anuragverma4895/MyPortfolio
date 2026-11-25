import { lazy, Suspense, useEffect, useLayoutEffect, useCallback, useState } from 'react';

import About from './components/sections/About';
import Hero from './components/sections/Hero';
import Works from './components/sections/Works';
import Education from './components/sections/Education';
import Achievements from './components/sections/Achievements';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { config } from './constants/config';
import { technologies } from './constants';

const SkillsBallSection = lazy(() => import('./components/sections/SkillsBallSection'));
const StarsCanvas = lazy(() => import('./components/canvas/Stars'));
const EarthCanvas = lazy(() => import('./components/canvas/Earth'));
const ProfileSection = lazy(() => import('./components/sections/ProfileSection'));
const Contact = lazy(() => import('./components/sections/Contact'));
const SocialSidebar = lazy(() => import('./components/layout/SocialSidebar'));
const ResumeButton = lazy(() => import('./components/layout/ResumeButton'));
const WhatsAppButton = lazy(() => import('./components/layout/WhatsAppButton'));
const AiAssistant = lazy(() => import('./components/layout/AiAssistant'));

const pageIds = ['home', 'about', 'skills', 'education', 'achievements', 'work', 'contact'] as const;
type PageId = (typeof pageIds)[number];

const isPageId = (id: string): id is PageId => pageIds.includes(id as PageId);

const getPageFromHash = (): PageId => {
  const id = window.location.hash.slice(1);
  return isPageId(id) ? id : 'home';
};

const SectionFallback = () => <div className="min-h-[28rem]" aria-busy="true" />;

const App = () => {
  const [activePage, setActivePage] = useState<PageId>(getPageFromHash);

  const navigateTo = useCallback((page: PageId) => {
    const base = window.location.pathname + window.location.search;
    const nextUrl = page === 'home' ? base : base + '#' + page;
    const currentUrl = base + window.location.hash;
    if (currentUrl !== nextUrl) {
      window.history.pushState(null, '', nextUrl);
    }
    setActivePage(page);
  }, []);

  useEffect(() => {
    document.title = config.html.title;
    const syncPage = () => setActivePage(getPageFromHash());
    window.addEventListener('popstate', syncPage);
    window.addEventListener('hashchange', syncPage);
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.removeEventListener('popstate', syncPage);
      window.removeEventListener('hashchange', syncPage);
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [activePage]);

  useEffect(() => {
    const handleNavigation = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
      const page = anchor.hash.slice(1);
      if (!isPageId(page)) return;
      event.preventDefault();
      navigateTo(page);
    };
    document.addEventListener('click', handleNavigation);
    return () => document.removeEventListener('click', handleNavigation);
  }, [navigateTo]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || event.defaultPrevented || activePage === 'home') return;
      if (event.target instanceof HTMLElement && (event.target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName))) return;
      if (document.querySelector('.ai-chat-window')) return;
      navigateTo('home');
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [activePage, navigateTo]);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Hero />;
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
        return (
          <>
            <Contact />
            <ProfileSection />
          </>
        );
    }
  };

  return (
    <div className="relative z-0 min-h-screen theme-transition">
      <div
        className="fixed inset-0 z-[-1] noise-bg theme-transition pointer-events-none"
        style={{ background: 'var(--bg-primary)' }}
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <StarsCanvas />
          <div className="absolute inset-0 m-auto flex h-[80vh] w-full max-w-[800px] items-center justify-center opacity-20">
            <EarthCanvas />
          </div>
        </Suspense>
      </div>

      <div className="relative z-[50]">
        <Navbar activeSection={activePage} />
      </div>

      <main
        key={activePage}
        className={activePage === 'home'
          ? 'bg-hero-pattern bg-cover bg-center bg-no-repeat relative z-10'
          : 'portfolio-section-page relative z-10'}
        aria-label={activePage === 'home' ? 'Home page' : activePage + ' page'}
      >
        <Suspense fallback={<SectionFallback />}>
          {renderPage()}
        </Suspense>
        {activePage === 'contact' && <Footer />}
      </main>

      <Suspense fallback={null}>
        <SocialSidebar />
        <WhatsAppButton onClick={() => navigateTo('contact')} />
        <ResumeButton />
        <AiAssistant />
      </Suspense>
    </div>
  );
};

export default App;
