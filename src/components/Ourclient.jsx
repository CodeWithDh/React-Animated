import { motion } from "framer-motion";
import Slider from "./Slider";

export default function Ourclient() {
  return (
    <>
      <div className="relative w-full h-[15vh]">
        <motion.svg
          viewBox="0 0 1440 200"
          className="absolute top-0 w-full"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <defs>
            <linearGradient id="wave" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#e0eefb" />
              <stop offset="50%" stopColor="#4fabf3" />
              <stop offset="100%" stopColor="#dfedfb" />
            </linearGradient>
          </defs>

          <path
            fill="url(#wave)"
            d="M0 96L60 90C120 85 240 75 360 85C480 96 600 128 720 128C840 128 960 96 1080 85C1200 75 1320 85 1440 96V0H0Z"
          />
          <h2>Shivam</h2>
        </motion.svg>
      </div>
      <div className="w-full h-[20rem] flex flex-col justify-center items-center  ">
        <div className="flex flex-col items-center  gap-2">
          <img
            src="../assets/ClientIcon.png"
            alt="Our Clients"
            className="w-[2.5rem] h-[2.5rem]"
          />
          <h3>Our Clients</h3>
        </div>
        <p className="text-4xl px-8 w-[40rem] mt-8 text-center ">
          <span className="text-blue-500 font-bold">Brands that trust me </span>
          <span className="">
            to craft their digital presence with clarity, empathy, and precision
          </span>
        </p>
        <Slider />
      </div>
    </>
  );
}
