"use client";

import Youtube from "react-youtube";
import { AnimeListData } from "./jikan-anime-types";

export const TrailerYoutube = ({ data }: { data: AnimeListData["trailer"] }) => {
  return (
    <div className="w-full bg-black rounded-lg overflow-hidden">
      <Youtube
        videoId={data?.youtube_id}
        onReady={(e) => e.target.pauseVideo()}
        opts={{ width: "100%", height: "240" }}
        // className="h-[490px]"
      />
    </div>
  );
};
