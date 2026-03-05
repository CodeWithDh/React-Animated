import ProjectTag from "./ProjectTag";
import Tools from "./Tools";
import Cursor from "./Cursor.jsx";

function Hero() {
  return (
    <>
      <div
        className="hero bg-gradient-to-r 
    from-[#e0eefb] via-[#4fabf3] to-[#dfedfb]"
      >
        <div className="fixed-text p-4 mt-[-3rem] translate-y-[1rem]">
          <h2 className="text-5xl md:text-7xl text-center font-semibold leading-tight">
            {/* Line 1 */}
            <span className="block text-white">Design partner</span>

            {/* Line 2 */}
            <span className="block bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent">
              for your <span className="block md:inline">project</span>
            </span>
          </h2>
          <ProjectTag
            count={100}
            details={"projects"}
            logo={"figmaLogo"}
            sequence={true}
          />
        </div>
        <div className="flex justify-center">
          <Tools
            tilt={"left"}
            first={"figma"}
            fimg={"figmaLogo"}
            second={"framer"}
            simg={"framerLogo"}
            third={"Ai Tools"}
            timg={"gptLogo"}
            alt={["Senior", "Expert", "Middle"]}
          />
          <div className="relative flex items-center justify-center bg-white/40 shadow-lg shadow-white/50 rounded-full  w-[20rem] z-10 translate-y-[-2rem]">
            <video
              className="w-[20rem] h-[20rem] relative z-1 rounded-full "
              src="../assets/hero.webm"
              autoPlay
              loop
              muted
            />
          </div>
          <Tools
            tilt="right"
            first="Behance"
            fimg="behanceLogo"
            second="Twitter"
            simg="xLogo"
            third="Telegram"
            timg="telegramLogo"
            alt={["My Cases", "Shots", "Contact Me"]}
          />
        </div>
        <ProjectTag
          count={5}
          details={"experience"}
          logo={"framerLogo"}
          sequence={false}
        />
      <Cursor/>
      </div>
    </>
  );
}

export default Hero;
