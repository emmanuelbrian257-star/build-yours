import React, { useLayoutEffect, useRef, useState } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { numericBreakpoints } from "../../constants/breakpoints";
import useAppReady from "../../hooks/AppReady";

gsap.registerPlugin(ScrollTrigger);

const Billboard = ({ title, className, animateEvent, animateChars }) => {
  const heading = useRef();
  const container = useRef();
  const ready = useAppReady();

  const containerRef = container.current;

  useLayoutEffect(() => {
    if (!containerRef) return;

    const headingChars = new SplitType(heading.current, {
      type: "chars",
    });

    const ctx = gsap.context(() => {
      if (animateChars) {
        gsap.from(headingChars.chars, {
          opacity: 0,
          y: 30,
          duration: 0.5,
          stagger: "0.025",
          scrollTrigger: {
            trigger: container.current,
            start:
              window.innerWidth < numericBreakpoints.xs
                ? "top 100%"
                : "top 70%",
            end: "top 35%",
            toggleActions: animateEvent
              ? "play play play reverse"
              : "play play play complete",
            /* scrub: 1, */
            //markers:true
          },
        });
      } else {
        gsap.from(heading.current, {
          y: "200px",
          duration: 0.5,
          scrollTrigger: {
            trigger: container.current,
            start:
              window.innerWidth < numericBreakpoints.xs
                ? "top 100%"
                : "top 70%",
            end: "top 35%",
            toggleActions: animateEvent
              ? "play play play reverse"
              : "play play play complete",
            /* scrub: 1, */
            //markers:true
          },
        });
      }
    });

    return () => ctx.revert();
  }, [containerRef]);
  return (
    <div ref={container} /* className="sm:px-20" */>
      <h1 ref={heading} className={`${className} `}>
        {title}
      </h1>
    </div>
  );
};

export default Billboard;
