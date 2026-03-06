import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

export default function Cursor() {
  const containerRef = useRef(null);
  const [hover, setHover] = useState(false);

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  const smoothX = useSpring(offsetX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(offsetY, { stiffness: 80, damping: 20 });

  const MAX_OFFSET = 15;

  function handleMouseMove(e) {
    const rect = containerRef.current.getBoundingClientRect();

    let dx = e.clientX - (rect.left + rect.width / 2);
    let dy = e.clientY - (rect.top + rect.height / 2);

    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > MAX_OFFSET) {
      dx = (dx / dist) * MAX_OFFSET;
      dy = (dy / dist) * MAX_OFFSET;
    }

    offsetX.set(dx);
    offsetY.set(dy);
  }

  function handleMouseLeave() {
    offsetX.set(0);
    offsetY.set(0);
    setHover(false);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHover(true)}
      className="relative flex items-center justify-center translate-x-[32rem] translate-y-[-5rem]"
      style={{ width: 280, height: 140 }}
    >
      <motion.button
        style={{ x: smoothX, y: smoothY }}
        className="relative overflow-hidden h-[3rem]
        w-[8rem] rounded-full bg-blue-600/60 text-white text-lg font-medium border-[0.3rem] border-white/60"
      >
        <span className="relative block overflow-hidden h-[3rem] min-w-[6rem]">
          {/* TEXT 1 */}
          <motion.span
            className="absolute inset-0 flex items-center mb-3 justify-center z-10"
            animate={hover ? { y: "-130%" } : { y: "0%" }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          >
            Let's Talk
          </motion.span>

          {/* WIPE */}
          <motion.span
            className="absolute z-20 bg-yellow-500 rounded-full"
            style={{
              width: "180%",
              height: "160%",
              left: "50%",
              top: "50%",
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={hover ? { y: ["130%", "0%", "-130%"] } : { y: "130%" }}
            transition={{
              duration: 1.2,
              times: [0, 0.5, 1],
              ease: "easeInOut",
            }}
          />

          {/* TEXT 2 */}
          <motion.span
            className="absolute inset-0 flex items-center mb-3 justify-center z-30"
            animate={hover ? { y: "0%" } : { y: "130%" }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              ease: [0.65, 0, 0.35, 1],
            }}
          >
            Let's Talk
          </motion.span>
        </span>
      </motion.button>
    </div>
  );
}
