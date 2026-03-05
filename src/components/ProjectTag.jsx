import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function ProjectTag({ count, logo, sequence, details }) {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 70, // ↓ slower movement
    damping: 50, // ↑ smoother / less jitter
    mass: 0.5, // ↑ adds delay feeling
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 70,
    damping: 50,
    mass: 0.5,
  });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    mouseX.set(distanceX * 0.05);
    mouseY.set(distanceY * 0.05);
  };
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Center of window
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      mouseX.set(distanceX * 0.02);
      mouseY.set(distanceY * 0.02);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);
  return (
    <div
      className="translate-x-[-5.5rem] translate-y-[-2rem]"
      ref={ref}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="flex justify-between items-center 
        w-full max-w-[600px] mx-auto"
      >
        {!sequence ? (
          <>
            <img
              src={`../assets/${logo}.png`}
              alt="Figma Logo"
              className="w-[4rem] h-[6rem] translate-x-[8rem] translate-y-[-1rem]"
            />

            <div className="w-[8rem] h-[5rem] pl-5 p-4 rounded-xl bg-white shadow-md translate-x-[5rem] translate-y-[-1rem]">
              <h3 className="text-xl">{count}+</h3>
              <p className="text-sm text-gray-500">projects</p>
            </div>
          </>
        ) : (
          <>
            <div className="w-[8rem] h-[5rem] pl-5 p-4 rounded-xl bg-white shadow-md">
              <h3 className="text-xl">{count}+</h3>
              <p className="text-sm text-gray-500">projects</p>
            </div>

            <img
              src={`../assets/${logo}.png`}
              alt="Figma Logo"
              className="w-[4rem] h-[6rem] translate-x-[8rem]"
            />
          </>
        )}
      </motion.div>
    </div>
  );
}
