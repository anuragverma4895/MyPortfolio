import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { config } from "../../constants/config";
import { anuragHero } from "../../assets";

const ConstellationCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<
    { x: number; y: number; vx: number; vy: number; radius: number; opacity: number }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 36 : 72;
    const CONNECTION_DIST = isMobile ? 120 : 160;
    const MOUSE_RADIUS = isMobile ? 140 : 200;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    if (nodesRef.current.length === 0) {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodesRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.6 + 0.6,
          opacity: Math.random() * 0.45 + 0.2,
        });
      }
    }

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    if (!('ontouchstart' in window)) {
      canvas.addEventListener("mousemove", handleMouse);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }
    window.addEventListener("resize", resize);

    const draw = () => {
      if (document.hidden) {
        animFrameId = requestAnimationFrame(draw);
        return;
      }

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.14;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 200, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        const mdx = nodes[i].x - mouse.x;
        const mdy = nodes[i].y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_RADIUS) {
          const alpha = (1 - mDist / MOUSE_RADIUS) * 0.32;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        const mdx = node.x - mouse.x;
        const mdy = node.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const isNearMouse = mDist < MOUSE_RADIUS;
        const glowAlpha = isNearMouse ? 0.6 + (1 - mDist / MOUSE_RADIUS) * 0.4 : node.opacity;
        const glowRadius = isNearMouse ? node.radius * 1.4 : node.radius;

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = isNearMouse
          ? `rgba(0, 240, 255, ${glowAlpha})`
          : `rgba(100, 180, 255, ${node.opacity})`;
        ctx.fill();

        if (isNearMouse) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowRadius + 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 240, 255, ${(1 - mDist / MOUSE_RADIUS) * 0.15})`;
          ctx.fill();
        }
      }

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] h-full w-full"
      style={{ pointerEvents: "auto" }}
    />
  );
};

const homeActions = [
  { label: "View My Work", href: "#work", external: false },
  { label: "Get In Touch", href: "#contact", external: false },
  { label: "Resume", href: "/resume.pdf", external: false },
  { label: "View GitHub", href: "https://github.com/anuragverma4895", external: true },
];

const HomeActions = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % homeActions.length);
    }, 2000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="home-actions">
      {homeActions.map((action, index) => (
        <a
          key={action.href}
          href={action.href}
          className={index === activeIndex ? "home-action is-highlighted" : "home-action"}
          target={action.external ? "_blank" : undefined}
          rel={action.external ? "noopener noreferrer" : undefined}
        >
          {action.label}
        </a>
      ))}
    </div>
  );
};

const Hero = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="home-hero" id="home">
      {!reduceMotion && <ConstellationCanvas />}
      <div className="hero-gradient-overlay" aria-hidden="true" />
      <div className="hero-surface-grid" aria-hidden="true" />

      <div className="home-layout">
        <div className="home-intro-grid">
          <motion.div
            className="home-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="home-availability">
              <span className="status-dot" aria-hidden="true" />
              Available for work
            </div>

            <h1 className="home-title">Hi, I'm {config.hero.name}</h1>
            <p className="home-role">Full-Stack Developer &amp; AI Engineer</p>

            <p className="home-summary">
              I build scalable web applications, intelligent AI-powered systems,
              and reliable backend services. With a strong foundation in data
              structures, algorithms, and competitive programming, I enjoy turning
              complex problems into practical software solutions.
            </p>

            <div className="home-stack" aria-label="Core technical skills">
              {["C++", "MERN Stack", "TypeScript", "AI/ML", "System Design", "SQL"].map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            <HomeActions />
          </motion.div>

          <motion.div
            className="home-profile"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
          >
            <div className="home-portrait">
              <img src={anuragHero} alt="Portfolio display picture" loading="eager" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
