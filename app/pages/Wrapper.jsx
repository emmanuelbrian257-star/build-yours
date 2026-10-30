import React, { useRef } from "react";
import gsap from "gsap";
import Billboard from "../components/client/Billboard";
import useAppReady from "../hooks/AppReady";
import ImageSlider from "../components/client/ImageSlider";
import { Draggable } from "gsap/Draggable";
import ExperienceCard from "../components/client/Experience";
import ContainerWrapper from "../components/client/ContainerWrapper";

gsap.registerPlugin(Draggable);

const slider = [
  "/assets/latest.jpg",
  "/assets/latest01.jpg",
  "/assets/latest02.jpg",
];

const Wrapper = ({ cardDetails }) => {
  const container = useRef();
  return (
    <div ref={container} className="flex flex-col gap-3 relative">
      <div className="sxs:block md:hidden">
        <ContainerWrapper cardDetails={cardDetails} />
      </div>

      {/* <Billboard
        className="title_text"
        title="We inspire, empower and build creative arsenols for your brand."
      />

      <div className="flex flex-col items-center">
        <div className="sm:w-[400px] sxs:w-full sm:h-[700px] sxs:h-screen">
          <ImageSlider images={slider} />
        </div>
      </div> */}
    </div>
  );
};

export default Wrapper;
