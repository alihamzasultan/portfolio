// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";

interface SquaresProps {
  direction?: "up" | "down" | "left" | "right" | "diagonal";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
}

export default function Squares({
  direction = "diagonal",
  speed = 0.5,
  borderColor = "rgba(255, 255, 255, 0.05)",
  squareSize = 40,
  hoverFillColor = "rgba(59, 130, 246, 0.15)",
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = containerRef.current?.offsetWidth || 800);
    let height = (canvas.height = containerRef.current?.offsetHeight || 600);

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    let offsetX = 0;
    let offsetY = 0;

    const cols = Math.ceil(width / squareSize) + 2;
    const rows = Math.ceil(height / squareSize) + 2;
    
    interface FlashingSquare {
      col: number;
      row: number;
      opacity: number;
      maxOpacity: number;
      fadeSpeed: number;
    }

    const flashingSquares: FlashingSquare[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (direction === "up") {
        offsetY = (offsetY - speed) % squareSize;
      } else if (direction === "down") {
        offsetY = (offsetY + speed) % squareSize;
      } else if (direction === "left") {
        offsetX = (offsetX - speed) % squareSize;
      } else if (direction === "right") {
        offsetX = (offsetX + speed) % squareSize;
      } else if (direction === "diagonal") {
        offsetX = (offsetX + speed) % squareSize;
        offsetY = (offsetY + speed) % squareSize;
      }

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 0.5;

      const cols = Math.ceil(width / squareSize) + 2;
      const rows = Math.ceil(height / squareSize) + 2;

      for (let c = -1; c < cols; c++) {
        const x = c * squareSize + offsetX;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let r = -1; r < rows; r++) {
        const y = r * squareSize + offsetY;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      if (Math.random() < 0.04 && flashingSquares.length < 15) {
        const col = Math.floor(Math.random() * cols);
        const row = Math.floor(Math.random() * rows);
        const exists = flashingSquares.some(s => s.col === col && s.row === row);
        if (!exists) {
          flashingSquares.push({
            col,
            row,
            opacity: 0,
            maxOpacity: 0.12 + Math.random() * 0.1,
            fadeSpeed: 0.003 + Math.random() * 0.005
          });
        }
      }

      for (let i = flashingSquares.length - 1; i >= 0; i--) {
        const sq = flashingSquares[i];
        const x = sq.col * squareSize + offsetX;
        const y = sq.row * squareSize + offsetY;

        sq.opacity += sq.fadeSpeed;
        if (sq.opacity >= sq.maxOpacity) {
          sq.opacity = sq.maxOpacity;
          sq.fadeSpeed = -Math.abs(sq.fadeSpeed);
        }

        if (sq.opacity <= 0) {
          flashingSquares.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(59, 130, 246, ${sq.opacity})`;
        ctx.fillRect(x + 0.5, y + 0.5, squareSize - 1, squareSize - 1);
      }

      if (mouse) {
        const mouseGridCol = Math.floor((mouse.x - offsetX) / squareSize);
        const mouseGridRow = Math.floor((mouse.y - offsetY) / squareSize);
        const x = mouseGridCol * squareSize + offsetX;
        const y = mouseGridRow * squareSize + offsetY;

        ctx.fillStyle = hoverFillColor;
        ctx.fillRect(x + 0.5, y + 0.5, squareSize - 1, squareSize - 1);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [direction, speed, borderColor, squareSize, hoverFillColor, mouse]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMouse(null);
  };

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
