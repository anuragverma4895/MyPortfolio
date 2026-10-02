import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

import { styles } from "../../constants/styles";
import { config } from "../../constants/config";
import { anuragHero } from "../../assets";

function useTypingEffect(texts: string[], speed = 50, _pause = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const fullText = texts.join(" ");
    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
        timeout = setTimeout(type, speed);
      } else {
        setIsTyping(false);
      }
    };

    timeout = setTimeout(type, 1200);
    return () => clearTimeout(timeout);
  }, [texts, speed, _pause]);

  return { displayText, isTyping };
}

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

const Hero = () => {
  const { displayText, isTyping } = useTypingEffect(config.hero.p, 35);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imgX = useTransform(mouseX, [-500, 500], [-8, 8]);
  const imgY = useTransform(mouseY, [-500, 500], [-6, 6]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    },
    [mouseX, mouseY]
  );

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative mx-auto min-h-[100svh] w-full overflow-hidden"
    >
      <ConstellationCanvas />
      <div className="hero-gradient-overlay" />
      <div className="hero-surface-grid" aria-hidden="true" />

      <div
        className={`relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center justify-between gap-10 pb-24 pt-28 ${styles.paddingX} lg:gap-14 lg:pb-20 lg:pt-24`}
      >
        <div className="relative z-50 flex min-w-0 flex-1 items-start gap-4 sm:gap-6">
          <div className="mt-3 hidden flex-col items-center justify-center sm:flex">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="h-5 w-5 rounded-full"
              style={{
                background: "linear-gradient(135deg, #00F0FF, #FF006E)",
                boxShadow:
                  "0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.2)",
              }}
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="h-56 w-1 origin-top lg:h-72"
              style={{
                background: "linear-gradient(180deg, #00F0FF, transparent)",
              }}
            />
          </div>

          <div className="w-full min-w-0 max-w-[680px]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md"
            >
              <span className="status-dot" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/60">
                Available for work
              </span>
            </motion.div>

            <h1 className={`${styles.heroHeadText} hero-headline text-white`}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="block"
              >
                Hi, I'm
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.55, duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="relative mt-2 block w-fit"
              >
                <span className="hero-name-gradient relative block">{config.hero.name}</span>
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6 }}
              className="hero-role-title mt-5"
            >
              Full-Stack Developer & AI Engineer
            </motion.p>

            <p className={`${styles.heroSubText} hero-subtitle mt-4 max-w-[560px]`}>
              <span>{displayText}</span>
              <span
                className={`ml-1 inline-block h-[1em] w-[2px] bg-accent-cyan align-middle ${
                  isTyping ? "animate-pulse" : "opacity-0"
                }`}
              />
            </p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.45, duration: 0.65 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              {["MERN Stack", "AI/ML Systems", "Realtime Apps"].map((item) => (
                <span key={item} className="hero-skill-pill">
                  {item}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="relative z-[60] mt-10 flex flex-wrap items-center gap-4"
            >
              <a href="#work" className="hero-cta-primary cursor-pointer">
                <span className="relative z-10">View My Work</span>
              </a>
              <a href="#contact" className="hero-cta-secondary cursor-pointer">
                Get In Touch
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            delay: 0.5,
            duration: 1.4,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="hero-avatar-container pointer-events-none relative hidden flex-1 items-center justify-end lg:flex"
        >
          <div className="hero-avatar-glow" />
          <motion.div style={{ x: imgX, y: imgY }} className="hero-avatar-wrapper pointer-events-auto">
            <img
              src={anuragHero}
              alt="Anurag Verma - Full Stack Developer and AI Engineer"
              className="hero-avatar-img"
              loading="eager"
            />
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
