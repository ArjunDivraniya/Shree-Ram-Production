import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        setIsTouch(true);
      }
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      setIsVisible(true);
      setPosition({ x: e.clientX, y: e.clientY });

      // Check hover targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (interactiveEl) {
        setIsHovered(true);
        setCursorText(interactiveEl.getAttribute('data-cursor') || '');
      } else if (target.closest('a, button, [role="button"]')) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouch]);

  // Smooth lag effect for the outer cursor ring
  useEffect(() => {
    if (isTouch || !isVisible) return;
    let animationFrameId: number;

    const followMouse = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.2,
        y: prev.y + (position.y - prev.y) * 0.2,
      }));
      animationFrameId = requestAnimationFrame(followMouse);
    };

    animationFrameId = requestAnimationFrame(followMouse);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isTouch, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--accent-orange)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0)`,
          transition: 'width 0.2s, height 0.2s, background-color 0.2s',
          opacity: isHovered && cursorText ? 0 : 1,
        }}
      />

      {/* Outer Ring / Label Bubble */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: cursorText ? 'auto' : isHovered ? '48px' : '36px',
          height: cursorText ? '32px' : isHovered ? '48px' : '36px',
          padding: cursorText ? '0 16px' : '0',
          border: cursorText ? 'none' : '1px solid rgba(255, 106, 42, 0.5)',
          backgroundColor: cursorText
            ? 'var(--accent-orange)'
            : isHovered
            ? 'rgba(255, 106, 42, 0.15)'
            : 'transparent',
          borderRadius: cursorText ? '16px' : '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          fontFamily: 'var(--font-heading)',
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          backdropFilter: isHovered && !cursorText ? 'blur(4px)' : 'none',
          transform: `translate3d(${
            cursorText
              ? trailingPos.x - 40
              : trailingPos.x - (isHovered ? 24 : 18)
          }px, ${
            cursorText
              ? trailingPos.y - 16
              : trailingPos.y - (isHovered ? 24 : 18)
          }px, 0)`,
          transition: 'width 0.2s, height 0.2s, background-color 0.2s, border 0.2s',
          boxShadow: isHovered ? '0 0 20px rgba(255, 106, 42, 0.3)' : 'none',
        }}
      >
        {cursorText}
      </div>
    </>
  );
};
