import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Slider.css";

const totalCards = 10;
const cardsData = Array.from({ length: totalCards }).map((_, i) => ({
  id: i + 1,
}));

function getCardTransform(delta) {
  // delta represents the exact step/distance from center (0).
  const abs = Math.abs(delta);
  const i = Math.floor(abs);
  const progress = abs - i;

  // Keyframes for the concave arc
  const xBase = [0, 260, 460, 640, 800, 950, 1100];
  const zBase = [0, -140, -280, -420, -560, -700, -850];
  const ryBase = [0, -35, -50, -60, -70, -80, -90];
  const sBase = [1, 0.92, 0.85, 0.8, 0.75, 0.6, 0.5];
  const oBase = [1, 0.8, 0.55, 0.2, 0.0, 0.0, 0.0];

  if (i >= xBase.length - 1) {
    return { x: 0, z: -1000, ry: 0, scale: 0, opacity: 0, zIndex: 0 };
  }

  const x = gsap.utils.interpolate(xBase[i], xBase[i + 1], progress);
  const z = gsap.utils.interpolate(zBase[i], zBase[i + 1], progress);
  const ry = gsap.utils.interpolate(ryBase[i], ryBase[i + 1], progress);
  const s = gsap.utils.interpolate(sBase[i], sBase[i + 1], progress);
  const o = gsap.utils.interpolate(oBase[i], oBase[i + 1], progress);

  const sign = delta < 0 ? -1 : 1;

  return {
    x: x * sign,
    z: z, // z is intrinsically 0 or negative
    ry: ry * sign, // rotate inward toward camera
    scale: s,
    opacity: o,
    zIndex: 100 - Math.round(abs * 10),
  };
}

export default function Slider() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Initial static distribution
    cardsRef.current.forEach((card, idx) => {
      let delta = idx;
      delta = gsap.utils.wrap(-totalCards / 2, totalCards / 2, delta);
      const { x, z, ry, scale, opacity, zIndex } = getCardTransform(delta);
      gsap.set(card, {
        xPercent: -50,
        yPercent: -50,
        x,
        z,
        rotationY: ry,
        scale,
        opacity,
        zIndex,
      });
    });

    // Infinite Timeline for cycling
    const state = { position: 0 };
    const tl = gsap.to(state, {
      position: totalCards,
      duration: 20, // 20s as specified for smooth cinematic loop
      ease: "linear",
      repeat: -1,
      onUpdate: () => {
        cardsRef.current.forEach((card, idx) => {
          let delta = idx - state.position;
          // keeps delta anchored between -5 and 5 roughly
          delta = gsap.utils.wrap(-totalCards / 2, totalCards / 2, delta);
          
          const { x, z, ry, scale, opacity, zIndex } = getCardTransform(delta);
          
          // Use set instead of to because timeline interpolation is smooth via onUpdate linearly
          gsap.set(card, {
            x,
            z,
            rotationY: ry,
            scale,
            opacity,
            zIndex,
          });
        });
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="slider-section">
      <div className="carousel-container" ref={containerRef}>
        {cardsData.map((item, i) => (
          <div
            key={item.id}
            className="card-positioner"
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <div className="card-content">
              <div className="app-icon">
                <img src={`https://picsum.photos/id/${item.id + 10}/64/64`} alt="App Icon" />
              </div>
              <div className="app-mockup">
                <img src={`https://picsum.photos/id/${item.id + 40}/280/400`} alt="App Mockup" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
