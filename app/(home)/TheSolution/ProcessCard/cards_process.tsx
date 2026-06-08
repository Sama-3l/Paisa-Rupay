'use client'

import React, { useEffect, useRef, useState } from 'react';
import ProcessCard from './process_card';

type Process = {
  number: string;
  cardBackground: string;
  headline: React.ReactNode;
  description: string;
};

export function ProcessList({ processes }: { processes: Process[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [windowHeight, setWindowHeight] = useState(800);
  const [cardHeight, setCardHeight] = useState(500);

  // We will store scroll progress values in refs to update styles directly inside requestAnimationFrame
  const scrollProgress = useRef(0);
  const lerpProgress = useRef(0);

  useEffect(() => {
    // Measure actual heights on mount and resize
    const handleResize = () => {
      setWindowHeight(window.innerHeight);

      // Calculate responsive card height based on screen width
      if (window.innerWidth < 768) {
        setCardHeight(280);
      } else {
        setCardHeight(500);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const totalScrollable = rect.height - windowHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      // Map scroll to progress between 0 and processes.length - 1
      const progress = Math.max(0, Math.min(processes.length - 1, (currentScroll / totalScrollable) * (processes.length - 1)));
      scrollProgress.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [windowHeight, processes.length]);

  useEffect(() => {
    let animationFrameId: number;

    const updateCards = () => {
      // Smooth lerp: current = current + (target - current) * factor
      const diff = scrollProgress.current - lerpProgress.current;

      if (Math.abs(diff) < 0.0001) {
        lerpProgress.current = scrollProgress.current;
      } else {
        lerpProgress.current += diff * 0.12; // Lerping factor (0.12 feels very smooth)
      }

      const p = lerpProgress.current;

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        // Constants for animation
        const CARD_PEEK = window.innerWidth < 768 ? 8 : 24;
        const SCALE_STEP = 0.04;
        const TRANSLATE_STEP = -8;
        const startY = windowHeight; // Start below the screen

        let y = 0;
        let scale = 1;
        let opacity = 1;

        if (p < i) {
          // Card is not yet stuck (scrolling up)
          if (p < i - 1) {
            y = startY;
            scale = 1;
            opacity = 0;
          } else {
            // Snapping up transition zone (starts at i - 0.7, ends at i)
            const startThreshold = i - 0.7;
            if (p <= startThreshold) {
              y = startY;
              scale = 1;
              opacity = 0;
            } else {
              const t = (p - startThreshold) / 0.7;
              // Easing function: Cubic Out (snaps in fast at the end)
              const ease = 1 - Math.pow(1 - t, 3);
              const endY = i * CARD_PEEK;
              y = startY + (endY - startY) * ease;
              scale = 1;
              opacity = ease;
            }
          }
        } else {
          // Card is stuck (p >= i)
          const cardsAbove = p - i;
          y = i * CARD_PEEK + cardsAbove * TRANSLATE_STEP;
          scale = Math.max(0.8, 1 - cardsAbove * SCALE_STEP);
          opacity = 1;
        }

        // Apply transformations directly to style for high performance
        card.style.transform = `translateY(${y}px) scale(${scale})`;
        card.style.opacity = `${opacity}`;
        card.style.zIndex = `${i + 1}`;
      });

      animationFrameId = requestAnimationFrame(updateCards);
    };

    updateCards();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [windowHeight, cardHeight, processes.length]);

  // Height of scroll tracker container
  // E.g., for 5 cards: 100vh base + 4 * 70vh = 380vh scroll height
  const containerHeight = `${100 + (processes.length - 1) * 70}vh`;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: containerHeight }}
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Centered card stacking container */}
        <div
          className="relative w-[90vw] md:w-[75vw] h-[200px] md:h-[500px]"
          style={{ transformOrigin: 'top center' }}
        >
          {processes.map((p, i) => (
            <div
              key={p.number}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="absolute top-0 left-0 w-full h-full"
              style={{
                transformOrigin: 'top center',
                willChange: 'transform, opacity',
              }}
            >
              <ProcessCard
                cardBackground={p.cardBackground}
                headline={p.headline}
                description={p.description}
                number={p.number}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}