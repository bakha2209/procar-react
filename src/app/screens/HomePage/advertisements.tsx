import { Container } from "@mui/material";
import React from "react";
import "../../../css/homepage.css"
export function Advertisements() {
  return (<div className="ads_car_frame">
  <video
    className={"ads_video"}
    autoPlay={true}
    loop
    muted
    playsInline
    data-video-media=""
  >
    <source
      data-src=""
      type="video/mp4"
      src="/video/ad_video2.mp4"
    />
  </video>
</div>);
}