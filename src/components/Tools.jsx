function Tools({ tilt, first, fimg, second, simg, third, timg }) {
  return (
    <div
      className={
        "bg-white/70 w-[18rem] h-[12rem] rounded-3xl translate-y-[2rem] translate-x-[-2rem] translate-z-[2rem] flex flex-col justify-center items-end p-2 "
      }
    >
      <div className="tool m-2">
        <h4 className="inline">{first}</h4>
        <img src={fimg} alt="Figma Logo" className="w-8 inline ml-8" />
      </div>
      <div className="tool m-2">
        <h4 className="inline">{second}</h4>
        <img src={simg} alt="Figma Logo" className="w-8 inline ml-8" />
      </div>
      <div className="tool m-2">
        <h4 className="inline">{third}</h4>
        <img src={timg} alt="Figma Logo" className="w-8 inline ml-8" />
      </div>
    </div>
  );
}

export default Tools;
