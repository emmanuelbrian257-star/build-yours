import React from "react";
import ExperienceCard from "./Experience";
import Player from "./Player";

const ContainerWrapper = ({ cardDetails }) => {
  return (
    <div>
      <div className="lg:h-screen max-h-screen">
        <Player showControl={false} src={"/assets/intro.mp4"} />
      </div>
      <div>
        <ExperienceCard
          cardDetails={cardDetails?.card.slice()}
          layout={"1-column-left"}
        />
      </div>
      <div></div>
    </div>
  );
};

export default ContainerWrapper;
