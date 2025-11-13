"use client";

import { Home, Calendar, Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function UserDashboard() {
  const [view, setView] = useState<"home" | "editProfile" | "Calendar">("home");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash === "editProfile") setView("editProfile");
      else setView("home");
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const goToHome = () => {
    window.location.hash = "home";
    setView("home");
  };

  const goToEditProfile = () => {
    window.location.hash = "editProfile";
    setView("editProfile");
  };

  const goToEditCalendar = () => {
    window.location.hash = "Calendar";
    setView("Calendar");
  };

  const Logout = () => {
    window.location.href = "/../../";
  };

  return (
    <div className="w-full h-screen flex bg-blue-950 text-white">
      <SideBar onNavigateHome={goToHome} onNavigateCalendar={goToEditCalendar}  onNavigateLogout={Logout} />
      
      <main className="flex-1 flex flex-col p-6 gap-6 overflow-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 bg-amber-100 text-black p-4 rounded-xl shadow-md">
          <span className="text-4xl font-bold">Strefa Ucznia</span>
          <div className="flex-1 md:flex-2 flex items-center justify-center bg-amber-500 rounded-md h-10"></div>
          <div
            onClick={goToEditProfile}
            className="w-18 aspect-square relative cursor-pointer group transition"
          >
            <Image
              src="/profilePic.png"
              alt="Profile picture"
              fill
              className="rounded-full object-cover"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <Edit size={14} className="text-white" />
            </div>
          </div>
        </header>

        {/* Content */}
        <section className="flex-1 bg-blue-800 rounded-xl p-4 overflow-auto">
          {view === "home" ? (
            <HomeView />
          ) : (
            <EditProfileView goBack={goToHome} />
          )}
        </section>
      </main>
    </div>
  );
}

function SideBar({ onNavigateHome, onNavigateCalendar, onNavigateLogout }: { onNavigateHome: () => void, onNavigateCalendar: () => void, onNavigateLogout: () => void }) {
  return (
    <aside className="md:flex md:w-1/9 lg:w-1/10 bg-amber-300 p-4 rounded-r-2xl flex flex-col">
      <div className="SideBarHeader flex-1"></div>
      <div className="SideBarMain flex-3 flex flex-col justify-center items-center gap-3">
        <button
          onClick={onNavigateHome}
          className="text-black font-semibold rounded-lg py-2 hover:bg-amber-400 transition cursor-pointer"
        >
          <Home size={50}/>
        </button>

        <button
          onClick={onNavigateCalendar}
          className="text-black font-semibold rounded-lg py-2 hover:bg-amber-400 transition cursor-pointer"
        >
          <Calendar size={50}/>
        </button>
      </div>
      <div className="SideBarFooter flex-1 flex items-end pb-5">
        <button
          onClick={onNavigateLogout}
          className=" bg-red-600 text-black font-semibold rounded-lg py-2 hover:bg-red-500 transition cursor-pointer w-full"
        >
          Wyloguj
        </button>
      </div>
    </aside>
  );
}

function HomeView() {
  return (
    <div className="w-full h-full flex justify-between gap-4">
      <div className="HomeLeft flex-1 flex flex-col gap-5">
        <div className="LeftTopBlock flex-4 rounded-4xl bg-amber-100"></div>
        <div className="LeftBotBlock flex-3 flex justify-between gap-4">
          <div className="Block flex-1 bg-purple-950 rounded-4xl"/>
          <div className="Block flex-1 bg-purple-950 rounded-4xl"/>
          <div className="Block flex-1 bg-purple-950 rounded-4xl"/>
        </div>
      </div>
      <div className="HomeRight flex-1 flex items-center justify-center p-4">
        <div className="RightBlock w-full h-full bg-purple-700 rounded-4xl"></div>
      </div>
    </div>
  );
}

function EditProfileView({ goBack }: { goBack: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-semibold mb-4">Edytuj profil</h2>
      <button
        onClick={goBack}
        className="bg-amber-400 text-black px-4 py-2 rounded-lg hover:bg-amber-300 transition"
      >
        Powrót
      </button>
    </div>
  );
}

