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