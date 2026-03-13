import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Slider.css";

const TOTAL_CARDS = 12;
const SLOTS = 9;

/**
 * TRUE CYLINDRICAL ARC — like a curved display monitor / theatre screen.
 * Center card pushed deeper (Z_OFFSET), sides wrap toward viewer.
 *   x = R · sin(θ)
 *   z = Z_OFFSET + R · (1 − cos(θ))
 *   rotateY = −θ  (each card faces the viewer)
 */
const R        = 620;
const Z_OFFSET = -300;
const ANGLES_DEG = [-90, -67, -45, -22, 0, 22, 45, 67, 90];

const ARC_SLOTS = ANGLES_DEG.map((deg) => {
  const rad = (deg * Math.PI) / 180;
  return {
    x:       Math.round(R * Math.sin(rad)),
    z:       Z_OFFSET + Math.round(R * (1 - Math.cos(rad))),
    ry:      -deg,
    scale:   1,
    rz:      0,
    opacity: Math.abs(deg) >= 80 ? 0.7 : 1,
  };
});

const SLIDE_IMAGES = [
  '/assets/slide1.webp',
  '/assets/slide2.webp',
  '/assets/slide3.webp',
  '/assets/slide4.webp',
  '/assets/slide5.webp',
  '/assets/slide6.webp',
];

const CARD_DATA = Array.from({ length: TOTAL_CARDS }).map((_, i) => ({
  id: i + 1,
  img: SLIDE_IMAGES[i % SLIDE_IMAGES.length],
}));

export default function Slider() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, idx) => {
      const slot = ARC_SLOTS[idx % SLOTS];
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50,
        x: slot.x,
        y: -20,
        z: slot.z,
        rotationY: slot.ry,
        rotationZ: 0,
        rotationX: -4,
        scale: 1,
        opacity: slot.opacity,
        zIndex: Math.round((R - slot.z) / 10),
      });
    });

    const state = { offset: 0 };

    gsap.to(state, {
      offset: SLOTS,
      duration: 22,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        cardsRef.current.forEach((card, idx) => {
          let slotPos = ((idx - state.offset) % SLOTS + SLOTS) % SLOTS;

          const slotIndex = Math.floor(slotPos);
          const slotA = ARC_SLOTS[slotIndex];
          const slotB = ARC_SLOTS[(slotIndex + 1) % SLOTS];
          const frac  = slotPos - slotIndex;

          const lerp = (a, b) => a + (b - a) * frac;

          const x  = lerp(slotA.x,  slotB.x);
          const z  = lerp(slotA.z,  slotB.z);
          const ry = lerp(slotA.ry, slotB.ry);

          const isWrapping   = slotIndex >= SLOTS - 1;
          const finalOpacity = isWrapping ? 0 : lerp(slotA.opacity, slotB.opacity);

          gsap.set(card, {
            x,
            y: -20,
            z,
            rotationY: ry,
            rotationZ: 0,
            rotationX: -4,
            scale: 1,
            opacity: finalOpacity,
            zIndex: Math.round((R - z) / 10),
          });
        });
      },
    });

    return () => gsap.killTweensOf(state);
  }, []);

  return (
    <div className="slider-section">
      <div className="carousel-container" ref={containerRef}>
        {CARD_DATA.map((data, i) => (
          <div
            key={i}
            className="card-positioner"
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <div className="card-content">
              <div className="card-app-icon">
                <img src={data.img} alt="icon" />
              </div>
              <div className="card-mockup">
                <img src={data.img} alt="App mockup" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}