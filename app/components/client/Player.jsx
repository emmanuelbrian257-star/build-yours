import ReactPlayer from "react-player";
import {
  MediaController,
  MediaPlayButton,
  MediaControlBar,
} from "media-chrome/react";
import { useState } from "react";
import useAppReady from "@/app/hooks/AppReady";

const Player = ({ src, showControl }) => {
  const ready = useAppReady();

  if (!ready) return;
  return (
    <div>
      <MediaController
        className="h-full"
        style={{ width: "100%", aspectRatio: "16/9" }}
      >
        <video
          slot="media"
          src={src}
          controls={false}
          loop={false}
          playing={true}
          muted={true}
          style={{ width: "100%", height: "100%" }}
        />
        {showControl && (
          <MediaControlBar
            className={`flex justify-center items-center h-full `}
          >
            <MediaPlayButton
              /* onClick={()=>setPlaying(!playing)} */ className="bg-red-500"
            />
          </MediaControlBar>
        )}
      </MediaController>
    </div>
  );
};

export default Player;
