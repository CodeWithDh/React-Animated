import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function ProjectTag({ count }) {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 30, // ↓ slower movement
    damping: 50, // ↑ smoother / less jitter
    mass: 1, // ↑ adds delay feeling
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 30,
    damping: 50,
    mass: 1,
  });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    mouseX.set(distanceX * 0.02);
    mouseY.set(distanceY * 0.02);
  };
  return (
    <div
      className="translate-x-[-5.5rem] translate-y-[-2rem]"
      ref={ref}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        className="flex justify-between items-center 
        w-full max-w-[600px] mx-auto"
      >
        <div className="w-[8rem] h-[5rem] pl-5 p-4 rounded-xl bg-white shadow-md">
          <h3 className="text-xl">{count}+</h3>
          <p className="text-sm text-gray-500">projects</p>
        </div>

        <img
          src="../assets/figmaLogo.png"
          alt="Figma Logo"
          className="w-[4rem] h-[6rem] translate-x-[8rem]"
        />
      </motion.div>
    </div>
  );
}
