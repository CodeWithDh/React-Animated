import { motion } from "framer-motion";

function Tools({ tilt, first, fimg, second, simg, third, timg, alt }) {
  const rotateYValue = tilt === "right" ? 22 : -22;
  if (tilt == "right") {
    var add = "items-start";
    var margin = "mr-4";
  } else {
    var add = "items-end";
    margin = "margin-left:2rem;";
  }
  return (
    <div className="relative translate-y-[2rem]" style={{ perspective: 1400 }}>
      <motion.div
        initial={false}
        animate={{
          rotateY: rotateYValue,
          rotateX: 6,
        }}
        transition={{ duration: 0 }}
        style={{ transformStyle: "preserve-3d" }}
        className={`w-[22rem] h-[15rem]
                     bg-gradient-to-br from-white/70 to-white/40
                     backdrop-blur-xl
                     rounded-[28px]
                     border border-white/30
                     shadow-[0_60px_120px_rgba(0,0,0,0.25)]
                     p-2 flex flex-col ${add} justify-center gap-4 text-lg  [mask-image:linear-gradient(to_${tilt},black_60%,transparent)]`}
      >
        <div className="tool m-2 flex gap-4">
          {tilt !== "left" && (
            <img
              src={`../assets/${fimg}.png`}
              alt="Figma Logo"
              className={`w-10 h-8 inline ${margin}`}
            />
          )}

          <div className="group cursor-pointer">
            <div className="overflow-hidden h-10 inline-block">
              <div className="flex flex-col transition-transform duration-300 ease-in-out group-hover:-translate-y-10">
                <span className="h-10 flex items-center justify-center">
                  {first}
                </span>

                <span className="h-10 flex items-center justify-center">
                  {alt[0]}
                </span>
              </div>
            </div>
          </div>

          {tilt === "left" && (
            <img
              src={`../assets/${fimg}.png`}
              alt="Figma Logo"
              className="w-10 h-8 inline mr-4"
            />
          )}
        </div>

        <div className="tool m-2 flex gap-4">
          {tilt !== "left" && (
            <img
              src={`../assets/${simg}.png`}
              alt="Figma Logo"
              className="w-10 h-8 inline mr-4"
            />
          )}

          <div className="group cursor-pointer">
            <div className="overflow-hidden h-10 inline-block">
              <div className="flex flex-col transition-transform duration-300 ease-in-out group-hover:-translate-y-10">
                <span className="h-10 flex items-center justify-center">
                  {second}
                </span>

                <span className="h-10 flex items-center justify-center">
                  {alt[1]}
                </span>
              </div>
            </div>
          </div>

          {tilt === "left" && (
            <img
              src={`../assets/${simg}.png`}
              alt={second}
              className="w-10 h-8 inline mr-4"
            />
          )}
        </div>

        <div className="tool m-2 flex gap-4 ">
          {tilt !== "left" && (
            <img
              src={`../assets/${timg}.png`}
              alt="Figma Logo"
              className="w-10 h-8 inline mr-4"
            />
          )}

          <div className="group cursor-pointer">
            <div className="overflow-hidden h-10 inline-block">
              <div className="flex flex-col transition-transform duration-300 ease-in-out group-hover:-translate-y-10">
                <span className="h-10 flex items-center justify-center">
                  {third}
                </span>

                <span className="h-10 flex items-center justify-center">
                  {alt[2]}
                </span>
              </div>
            </div>
          </div>

          {tilt === "left" && (
            <img
              src={`../assets/${timg}.png`}
              alt="Figma Logo"
              className="w-10 h-8 inline mr-4 "
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Tools;
