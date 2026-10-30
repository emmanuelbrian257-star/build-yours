import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { urlFor } from "../../lib/sanity/client";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Billboard from "./Billboard";

gsap.registerPlugin(ScrollTrigger);

const Card = ({ experience, type, index }) => {
  const container = useRef();

  const containerRef = container.current;
  useEffect(() => {
    if (!containerRef) return;
    gsap.from(containerRef, {
      opacity: 0,
      translateY: "-100",
      duration: 1,
      scrollTrigger: {
        trigger: containerRef,
        start: "top 70%",
        end: "top top",
      },
    });
  }, [containerRef]);
  return (
    <div ref={container} className="space-y-4">
      <p className="title_text">
        {`${index + 1}) `}{" "}
        <Billboard
          animateEvent={true}
          title={experience.subtitle || experience.problemTitle}
          animateChars={true}
        />
      </p>
      <div className="h-[350px] flex justify-center">
        <img
          src={urlFor(experience.cardImage.asset._ref).url()}
          alt={experience.subtitle}
          className="h-full object-contain"
        />
      </div>

      <h3 className="heading-small">{experience.title}</h3>

      {type === "experience" && (
        <p className="title_sub-description p-2">{experience.solutionTitle}</p>
      )}
      <div>
        <Billboard
          animateEvent={true}
          title={"Features:"}
          className="title_text"
          animateChars={true}
        />
        <ul className="mt-5 list-disc ml-5 space-y-2">
          {experience?.cardTitle?.map((point, index) => (
            <li className="heading-small" key={`experience-point-${index}`}>
              <Billboard
                className="heading-small"
                animateChars={false}
                title={point}
                animateEvent={true}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ExperienceCard = ({ cardDetails, layout, type }) => {
  if (!cardDetails?.length > 0) return;
  console.log(type, "type");
  return (
    <div className=" mt-12 px-6">
      {cardDetails?.slice(0, 2)?.map((experience, index) => (
        <Card
          key={`experience-${index}`}
          index={index}
          experience={experience}
          type={type}
        />
      ))}
    </div>
  );
};

export default ExperienceCard;
