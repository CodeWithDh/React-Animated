import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Slider.css";

import img1 from "../../assets/slide1.webp";
import img2 from "../../assets/slide2.webp";
import img3 from "../../assets/slide3.webp";
import img4 from "../../assets/slide4.webp";
import img5 from "../../assets/slide5.webp";
import img6 from "../../assets/slide6.webp";

const images = [img1, img2, img3, img4, img5, img6];

export default function Slider() {
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;

    cards.forEach((card, i) => {
      const offset = i - Math.floor(cards.length / 2);

      gsap.set(card, {
        rotateY: offset * -25,
        z: Math.abs(offset) * -200,
        x: offset * 220,
        scale: 1 - Math.abs(offset) * 0.1,
      });
    });
  }, []);

  return (
    <div className="slider-container">
      <div className="slider-track">
        {images.map((img, i) => (
          <div
            className="card"
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <img src={img} className="w-full h-[15rem]" alt={`slide-${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
