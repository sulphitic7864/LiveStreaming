import React from "react";
import VideoSection from "../VideoSection";
import InfoSection from "../InfoSection";
import ChatSection from "../ChatSection";
import Card from '../Card'
import OtherFlame from "../OtherFlame";

function About() {
  return (
    <div>
      <div className="flex items-start gap-5 md:p-5 p-0 xl:flex-row flex-col">
        <div className="xl:w-[70%] w-full">
          <VideoSection />
          <InfoSection />
        </div>
        <div className="xl:w-[30%] w-full">
          <ChatSection />
        </div>
      </div>
         <Card/>
         <OtherFlame/>
    </div>
  );
}

export default About;
