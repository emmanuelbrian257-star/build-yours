"use client";

import React, { useLayoutEffect, useRef, Suspense } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useAppReady from "../hooks/AppReady";
import { numericBreakpoints } from "../constants/breakpoints";
import { Canvas } from "@react-three/fiber";
import Model from "../components/client/Model";
import CanvasLoader from "../components/client/CanvasLoader";

gsap.registerPlugin(ScrollTrigger);

const Container = () => {
  const ready = useAppReady();
  const container = useRef();
  const headingRef = useRef();
  const containerHeading = useRef(null);
  const scrollState = useRef({ progress: 0 });
  const ref = useRef();

  const containerRef = container.current;

  useLayoutEffect(() => {
    if (!containerRef) return;

    const containerHeadingChars = new SplitType(containerHeading.current, {
      type: "chars",
      charClass: "char",
    });

    const headingContainer = new SplitType(headingRef.current, {
      type: "lines",
    });

    containerHeadingChars.chars.forEach(
      (char) => (char.innerHTML = `<span>${char.innerHTML}</span>`)
    );
    const containerWidth =
      containerHeading?.current.getBoundingClientRect().width;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({});
      timeline.from(containerHeadingChars.chars, {
        y: 30,
        duration: 2,
        ease: "power3.out",
        stagger: 0.025,
      });

      gsap.to(containerHeading.current, {
        x: -containerWidth,
        ease: "power.out",
        duration: 5,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=1000",
          scrub: 1,
        },
      });

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: window.innerWidth < numericBreakpoints.xs ? "+=500" : "+=1000",
          pin: true,
          scrub: 1,
        },
      });

      tl2.from(headingRef.current, {
        y: window.innerHeight,
        duration: 2,
      });

      tl2.to(scrollState.current, {
        progress: 1,
        scrollTrigger: {
          trigger: container.current,
          start: "top 50%",
          end: "+=1200",
          scrub: 1,
          //markers:true
        },
      });
    });
    return () => ctx.revert();
  }, [containerRef]);
  return (
    <section ref={container}>
      <div className="relative overflow-hidden">
        <div className="p-2 relative min-h-[clamp(130px,10vh,250px)]">
          <div className="sm:flex absolute z-[99] top-0 left-0 right-0 justify-between">
            <h2
              ref={headingRef}
              className="heading-small sm:w-[400px] sxs:bg-white "
            >
              Level up your music and 3D art with next-gen tools. From amazing
              stock plugins and addons designed by creators for creators.
            </h2>
            <h2 className="heading-small sm:w-[450px] bg-transparent sxs:absolute z-[-999] top-0 sm:relative">
              From high end VST Plugins and procedural assets designed to break
              your creative limits, get the power-ups your software has been
              missing, and turn your wildest concepts into reality
            </h2>
          </div>
        </div>

        <div className="relative h-[480px]">
          <div className="absolute sxs:top-[25%] sm:top-[50%]">
            <h1
              ref={containerHeading}
              className="w-[500vw] text-nowrap upper uppercase"
            >
              The ultimate Toolkit for Creators, Producers, and 3D Architects.
            </h1>
          </div>
          <div className="absolute top-0">
            <Canvas
              frameloop="always"
              camera={{ fov: 80, near: 0.5, far: 1000 }}
              gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
              dpr={[1, 2]}
            >
              <Suspense fallback={<CanvasLoader />}>
                <directionalLight
                  position={[1, 2, 3]}
                  intensity={1.0}
                  shadow-mapSize={[1024, 1024]}
                  castShadow
                />
                <directionalLight
                  color={0xffffff}
                  intensity={0.5}
                  position={[-2, 0, -2]}
                />
                <ambientLight color={"0xffffff"} intensity={0.7} />

                <Model ref={ref} scrollState={scrollState} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Container;
