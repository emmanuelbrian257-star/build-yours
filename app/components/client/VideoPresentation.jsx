import React, { useState, useLayoutEffect, useRef } from "react";
import Player from "./Player";
import useAppReady from "@/app/hooks/AppReady";
import gsap from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import SplitType from "split-type";
import Billboard from "./Billboard";
import { numericBreakpoints } from "@/app/constants/breakpoints";

gsap.registerPlugin(Draggable, InertiaPlugin, ScrollTrigger);

const VideoPresentation = () => {
  const animateHeading = useRef();
  const videoRef = useRef();
  const secondContainer = useRef();
  const animateVideo = useRef();
  const parentContainer = useRef();
  const ready = useAppReady();

  const parentContainerRef = parentContainer.current;

  useLayoutEffect(() => {
    if (!parentContainerRef) return;

    let sections = gsap.utils.toArray(videoRef.current.children);
    const itemWidth = sections[0].offsetWidth;
    const snapPoints = Array.from(sections).map(
      (_, index) => index * itemWidth
    );
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parentContainer.current,
          start: "top center",
          end: "bottom top",
        },
        defaults: { ease: "power2.inOut", duration: 2.5 },
      });

      ScrollTrigger.create({
        trigger: parentContainer.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        //pinSpacing:false,
        //markers:true
      });

      const headingChars = new SplitType(animateHeading.current, {
        type: "chars",
      });

      tl.to(animateVideo.current, { clipPath: "circle(75% at 50% 50%)" });

      let mainScroll = gsap.to(parentContainer.current, {
        ease: "none",
        xPercent: "-100",
        scrollTrigger: {
          trigger: parentContainer.current,
          start: "top top",

          scrub: true,
        },
      });

      gsap.from(headingChars.chars, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: "0.025",
        scrollTrigger: {
          trigger: secondContainer.current,
          containerAnimation: mainScroll,
          start: "left center",
          end: "left left",
          toggleActions: "play play play reverse",

          /* scrub: 1, */
          //markers:true
        },
      });

      /*  Draggable.create(videoRef.current, {
        type: "x",
        edgeResistance: 0.0005,
        inertia: true,
        bounds: parentContainer.current,
        snap: {
          x: function (endValue) {
            let sectionWidth = 500;
            return Math.round(endValue / itemWidth) * itemWidth;
          },
        },
      }); */
    });
    return () => ctx.revert();
  }, [parentContainerRef]);

  return (
    <>
      <div ref={parentContainer} className="col-span-full max-h-screen mt-14">
        <div ref={videoRef} className="relative h-full flex w-max">
          <div
            style={{ clipPath: "circle(0% at 50% 50%)" }}
            ref={animateVideo}
            className="w-screen pointer-events-none" /* className="absolute top-0 right-0 left-0 h-full" */
          >
            <video
              slot="media"
              src={"/assets/intro.mp4"}

              loop
              autoPlay
              muted
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div
            ref={secondContainer}
            className="w-screen  flex flex-col justify-center h-screen pointer-events-none relative" /* className="absolute top-0 right-0 left-0 h-full translate-x-full" */
          >
            <div>
              <h1
                ref={animateHeading}
                className={`text-wrap upper py-5 uppercase bg-red-500`}
              >
                The ultimate Toolkit for Creators, Producers, and 3D Architects.
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen w-screen bg-black">hi</div>
    </>
  );
};

export default VideoPresentation;
