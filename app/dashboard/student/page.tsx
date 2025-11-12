import React from "react";
import Image from "next/image";
import Calendar from "@/components/Calendar/Calendar";

export default function UserDashboard() {
  return (
    <div id="WebWindow" className="w-full h-full">
      <div id="ProfileCon" className="w-full h-(--ProfileConHeight) bg-(--backgroundAFir) flex items-center justify-center">
        <ProfileCon />
      </div>
      <div id="MainCon" className="w-full h-(--MainConHeight) flex flex-nowrap">
        <div id="MainSidebarL" className="w-(--MainSideBarLWidth) h-full"></div>
        <div id="MainMiddleCon" className="w-(--MainConWidth) h-full p-4">
          <div id="MainCalendar" className="w-full h-full shadow-2xl">
            <Calendar />
          </div>
        </div>
        <div id="MainSidebarR" className="w-(--MainSideBarRWidth) h-full"></div>
      </div>
    </div>
  );
}

function ProfileCon() {
  return (
    <div id="MainProfileCon" className="w-(--ProfileMainConWidth) h-full relative">
      <Image
          src="/ProfileBackground.png"
          alt="Banner"
          fill
          className="obejct-cover object-center"
        />
      <div id="ImageCon" className="w-full h-full absolute inset-0">
        <div id="ProfileCon" className="absolute inset-0 flex flex-nowrap">
        <div className="profile-info w-[40%] h-full flex items-center justify-center">
          <div className="profile-banner w-full aspect-video p-5">
            <div className="profile-banner-con w-full h-full flex ">
              <div className="profile-pic-con w-[50%] h-full flex items-center justify-center">
                <div className="profile-pic-wrapper w-[80%] aspect-square relative">
                  <Image 
                    src={"/profilePic.png"}
                    alt="ProfilePic"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="profile-info-con w-[50%] h-full flex flex-col justify-center">
                <span className="bg-black/70 text-4xl text-(--antiAccentColor) w-fit mb-1 py-0.5">
                  Jan Kowalski
                </span>
                <span className="bg-black/70 text-2xl text-(--antiAccentColor) w-fit  mt-2">
                  Bielany
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-description w-[60%] h-full">
          
        </div>
      </div>
  </div>
</div>
  );
}