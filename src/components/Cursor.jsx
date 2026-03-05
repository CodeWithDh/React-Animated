import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Keyframe animations:
   • textOut  — Text 1 keeps still, then gets swept up out of view
   • wipe     — Full-height yellow band rises from below, covers button, exits above
   • textIn   — Text 2 starts hidden below the wiper and rises into center
───────────────────────────────────────────────────────────────────────────── */
const styles = `
  @keyframes textOut {
    0%   { transform: translateY(0%);    }
    35%  { transform: translateY(0%);    }
    65%  { transform: translateY(-130%); }
    100% { transform: translateY(-130%); }
  }

  @keyframes wipe {
    0%   { transform: translateY(130%);  }
    25%  { transform: translateY(130%);  }
    55%  { transform: translateY(0%);    }
    75%  { transform: translateY(0%);    }
    100% { transform: translateY(-130%); }
  }

  @keyframes textIn {
    0%   { transform: translateY(130%);  }
    55%  { transform: translateY(130%);  }
    85%  { transform: translateY(0%);    }
    100% { transform: translateY(0%);    }
  }

  .btn-anim-text1  { transform: translateY(0%);    will-change: transform; }
  .btn-anim-wipe   { transform: translateY(130%);  will-change: transform; }
  .btn-anim-text2  { transform: translateY(130%);  will-change: transform; }

  .btn-hover:hover .btn-anim-text1 {
    animation: textOut 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
  }
  .btn-hover:hover .btn-anim-wipe {
    animation: wipe    1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
  }
  .btn-hover:hover .btn-anim-text2 {
    animation: textIn  1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards;
  }
`;

export default function Cursor() {
  const containerRef = useRef(null);

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  const smoothX = useSpring(offsetX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(offsetY, { stiffness: 80, damping: 20 });

  const MAX_OFFSET = 15;

  function handleMouseMove(e) {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    let dx = e.clientX - (rect.left + rect.width / 2);
    let dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > MAX_OFFSET) { dx = (dx / dist) * MAX_OFFSET; dy = (dy / dist) * MAX_OFFSET; }
    offsetX.set(dx);
    offsetY.set(dy);
  }

  function handleMouseLeave() {
    offsetX.set(0);
    offsetY.set(0);
  }

  return (
    <>
      <style>{styles}</style>

      <div className="flex items-center justify-center h-screen translate-x-[31rem] w-[20rem] h-[8rem] translate-y-[-5rem]">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex items-center justify-center"
          style={{ width: 280, height: 140 }}
        >
          <motion.button
            style={{ x: smoothX, y: smoothY }}
            /* btn-hover triggers :hover on class selectors above */
            className="btn-hover relative overflow-hidden px-10 py-4 rounded-full bg-blue-600/60 text-white text-lg font-medium cursor-pointer shadow-lg border-[0.3rem] border-white/60"
          >
            {/*
              Single clip container — overflow:hidden clips everything.
              All 3 layers are absolute and stack in the same space.
            */}
            <span className="relative block overflow-hidden" style={{ height: "1.75rem", minWidth: "6rem" }}>

              {/* Layer 1 — original "Let's Talk", sits at 0, gets swept upward */}
              <span className="btn-anim-text1 absolute inset-0 flex items-center justify-center z-10">
                Let's Talk
              </span>

              {/* Layer 2 — full-height yellow wiper band, rises from below */}
              <span
                className="btn-anim-wipe absolute z-20 rounded-full bg-yellow-400"
                style={{
                  /* Extend well beyond button padding on all sides to fill full button */
                  left: "-3rem",
                  right: "-3rem",
                  top: "-1rem",
                  bottom: "-1rem",
                }}
              />

              {/* Layer 3 — new "Let's Talk", rises from below wiper into center */}
              <span className="btn-anim-text2 absolute inset-0 flex items-center justify-center z-30 ">
                Let's Talk
              </span>

            </span>
          </motion.button>
        </div>
      </div>
    </>
  );
}
