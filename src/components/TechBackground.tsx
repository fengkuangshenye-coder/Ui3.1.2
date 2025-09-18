import React, { useEffect, useRef } from 'react';

function StarfieldCanvas() {
    const ref = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const canvas = ref.current!;
        const ctx = canvas.getContext('2d')!;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let raf = 0;

        function resize() {
            const { innerWidth: w, innerHeight: h } = window;
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        const stars = Array.from({ length: 160 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 1.2 + 0.2,
            a: Math.random() * Math.PI * 2,
            s: Math.random() * 0.4 + 0.1,
        }));

        function paint(bgOnly = false) {
            const w = window.innerWidth, h = window.innerHeight;
            ctx.clearRect(0, 0, w, h);
            const g = ctx.createLinearGradient(0, 0, 0, h);
            g.addColorStop(0, '#021526');
            g.addColorStop(1, '#0a1742');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, w, h);
            if (bgOnly) return;
            ctx.fillStyle = 'rgba(255,255,255,0.9)';
            stars.forEach((s) => {
                s.a += s.s * 0.03;
                const twinkle = 0.5 + Math.sin(s.a) * 0.5;
                ctx.globalAlpha = 0.3 + twinkle * 0.7;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
        }

        function draw() {
            paint(false);
            raf = requestAnimationFrame(draw);
        }

        resize();
        if (prefersReduce) {
            paint(true);
        } else {
            draw();
        }
        window.addEventListener('resize', resize);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, []);
    return <canvas ref={ref} className="fixed inset-0 -z-10" />;
}

function ParallaxLayers() {
    return (
        <>
            <div className="parallax layer-1" />
            <div className="parallax layer-2" />
            <div className="parallax layer-3" />
        </>
    );
}

function ExtraStyles() {
    return (
        <style>{`
      /* 渐变动画背景 */
      .gradient-shift {
        background: radial-gradient(1200px 600px at 20% 10%, rgba(0,209,255,.10), transparent),
                    radial-gradient(1000px 500px at 80% 20%, rgba(138,124,255,.10), transparent),
                    radial-gradient(1000px 600px at 50% 90%, rgba(0,194,168,.10), transparent);
        animation: gradientShift 20s ease-in-out infinite alternate;
      }
      @keyframes gradientShift {
        0% { filter: hue-rotate(0deg) saturate(1); }
        100% { filter: hue-rotate(25deg) saturate(1.2); }
      }

      /* 视差层 */
      .parallax { position: fixed; left:0; right:0; height:50vh; pointer-events:none; z-index:-1; }
      .layer-1 { top:20vh; background: radial-gradient(60% 80% at 50% 50%, rgba(13,148,136,0.08), transparent); transform: translateY(calc(var(--scroll,0) * .15)); }
      .layer-2 { top:40vh; background: radial-gradient(50% 60% at 30% 70%, rgba(56,189,248,0.07), transparent); transform: translateY(calc(var(--scroll,0) * .25)); }
      .layer-3 { top:60vh; background: radial-gradient(60% 70% at 70% 30%, rgba(99,102,241,0.08), transparent); transform: translateY(calc(var(--scroll,0) * .35)); }
      
      /* 噪点覆盖 */
      .noise { background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/></filter><rect width="120" height="120" filter="url(#n)" opacity=".035"/></svg>`)}'); mix-blend-mode: soft-light; }

      /* 标题渐变 */
      .title-gradient { background: linear-gradient(90deg,#fff, #9ae6ff 30%, #c7b8ff 60%, #fff); -webkit-background-clip: text; background-clip:text; color: transparent; }

      /* 霓虹按钮 */
      .btn-neon { position: relative; background: linear-gradient(90deg,#06b6d4,#4f46e5); box-shadow: 0 0 32px rgba(34,211,238,.35), inset 0 0 12px rgba(255,255,255,.15); border: none; }
      .btn-neon:hover { filter: brightness(1.05); box-shadow: 0 0 48px rgba(34,211,238,.45), inset 0 0 12px rgba(255,255,255,.25); }

      .btn-neon:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(34,211,238,.35), 0 0 32px rgba(34,211,238,.35); }

      html { --scroll: 0px; }

      @media (prefers-reduced-motion: reduce) {
        .gradient-shift { animation: none !important; }
        .card-tilt { transform: none !important; transition: none !important; }
      }

      /* ScrollReveal 扫描线入场 */
      .reveal-section { opacity: 0; transform: translateY(24px); position: relative; }
      .reveal-section::before { content:""; position:absolute; inset:0 0 60% 0; background: repeating-linear-gradient(0deg, rgba(255,255,255,.06) 0, rgba(255,255,255,.06) 1px, transparent 2px, transparent 6px); opacity:0; pointer-events:none; }
      .reveal-section.revealed { opacity: 1; transform: none; transition: opacity .8s ease, transform .8s ease; }
      .reveal-section.revealed::before { animation: scan 1.2s ease 1; }
      @keyframes scan { 0% { opacity:.7; transform: translateY(-40%);} 100% { opacity:0; transform: translateY(40%);} }

      /* 卡片 Tilt 过渡 */
      .card-tilt { transition: transform .15s ease, box-shadow .2s ease; will-change: transform; }
      .card-tilt:hover { box-shadow: 0 10px 30px rgba(0,0,0,.25), 0 0 30px rgba(34,211,238,.15); }
    `}</style>
    );
}

export function TechBackground() {
    return (
        <>
            <StarfieldCanvas />
            <ParallaxLayers />
            <div className="fixed inset-0 -z-10 gradient-shift" />
            <div className="fixed inset-0 -z-10 noise" />
        </>
    );
}