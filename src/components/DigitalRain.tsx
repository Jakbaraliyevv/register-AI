import { useEffect, useRef } from 'react';

export function DigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const characters = "01";
    const fontSize = 18;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    // ❗ 10 baravar YENGIL QILINDI
    let columns = Math.floor(canvas.width / fontSize / 3); // oldingisidan 3–5 baravar kam
    let drops = Array.from({ length: columns }, () => Math.random() * -20);

    let resizeTimeout: any;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        columns = Math.floor(canvas.width / fontSize / 3); // same as above
        drops = Array.from({ length: columns }, () => Math.random() * -20);
      }, 200);
    };
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#a78bfa";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize * 3, drops[i] * fontSize);

        // ❗ juda sekin tushsin
        drops[i] += 0.3;

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.995) {
          drops[i] = 0;
        }
      }

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.08]"
    />
  );
}
