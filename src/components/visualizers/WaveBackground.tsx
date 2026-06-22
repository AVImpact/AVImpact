import React, { useEffect, useRef, useState } from "react";

export function WaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;

    // Handle Resize using ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        const dpr = window.devicePixelRatio || 1;
        
        width = w;
        height = h;
        
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Initialize connectivity mesh nodes
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    for (let i = 0; i < 35; i++) {
      nodes.push({
        x: Math.random() * 1200,
        y: Math.random() * 600,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    let time = 0;

    const animate = () => {
      time += 0.005;
      
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#faf8ff");
      bgGrad.addColorStop(1, "#f3f3fd");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // flowing connection waves
      ctx.strokeStyle = "rgba(37, 89, 189, 0.08)";
      ctx.lineWidth = 1.5;

      const drawWave = (
        amplitude: number,
        frequency: number,
        phaseShift: number,
        offsetY: number,
        color: string,
        lineWidth: number
      ) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        
        for (let x = 0; x < width; x += 5) {
          const y =
            offsetY +
            Math.sin(x * frequency + time + phaseShift) * amplitude +
            Math.cos(x * (frequency * 1.5) - time * 0.5) * (amplitude * 0.3);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      };

      const centerY = height * 0.5;
      drawWave(25, 0.003, 0, centerY, "rgba(37, 89, 189, 0.07)", 2);
      drawWave(15, 0.005, Math.PI / 3, centerY - 20, "rgba(108, 152, 255, 0.05)", 3);
      drawWave(35, 0.002, Math.PI / 1.5, centerY + 15, "rgba(0, 9, 36, 0.04)", 1.5);

      nodes.forEach((node) => {
        if (node.x > width) node.x = 0;
        else if (node.x < 0) node.x = width;

        if (node.y > height) node.y = 0;
        else if (node.y < 0) node.y = height;

        node.x += node.vx;
        node.y += node.vy;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(37, 89, 189, 0.2)";
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.12;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(37, 89, 189, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      if (mouse.active) {
        nodes.forEach((node) => {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.25;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `rgba(108, 152, 255, ${alpha})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
          }
        });

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(37, 89, 189, 0.5)";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [mouse]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMouse((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full opacity-60"
      />
    </div>
  );
}
