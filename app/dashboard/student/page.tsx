"use client";
import React, { useState, useEffect } from "react";
import Calendar from "@/components/Calendar";
import Image from "next/image";

export default function StudentDashboard() {
  const today = new Date();
  const [viewMode, setViewMode] = useState("Week");

  const MAX_HOURS = 30;
  const CURRENT_HOURS = 7;

  const progressPercentage = (CURRENT_HOURS / MAX_HOURS) * 100;

  const orders = [
    { id: 1, type: "Manual", time: new Date(today.getTime() + 1000 * 60 * 60 * 5), img: "/manual.jpg" },
    { id: 2, type: "Automatic", time: new Date(today.getTime() + 1000 * 60 * 60 * 12), img: "/automaticjpg.jpg" },
  ];

  const [timeLeft, setTimeLeft] = useState<Record<number, string>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimes: Record<number, string> = {};
      orders.forEach((order) => {
        const diff = order.time.getTime() - new Date().getTime();
        if (diff <= 0) newTimes[order.id] = "00:00:00";
        else {
          const hours = Math.floor(diff / 1000 / 60 / 60);
          const minutes = Math.floor((diff / 1000 / 60) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          newTimes[order.id] = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        }
      });
      setTimeLeft(newTimes);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="Page" className="w-full h-full flex">
      <div id="Sidebar" className="w-[20%] h-full flex flex-col justify-between bg-gray-50">
        <div>
          <div id="UserBackgroundPic" className="w-full aspect-video bg-gray-300"></div>
          <div className="flex flex-col items-center mt-6">
            <div id="ProfilePic" className="relative w-[35%] aspect-square rounded-full overflow-hidden mt-[-30%]">
              <Image src="/profilePic.png" alt="Profile Pic" fill style={{ objectFit: "cover" }} />
            </div>
            <span className="mt-3 text-lg font-semibold text-gray-800">Jan Kowalski</span>
          </div>

          <div className="flex flex-col items-center mt-10 px-4">
            <h2 className="text-base font-semibold text-gray-700 mb-3">Przejechane godziny</h2>
            <div className="w-full relative">
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-[var(--defaultAccentColor)] rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>{MAX_HOURS}</span>
              </div>
              <div
                className="absolute -bottom-2 flex flex-col items-center"
                style={{ left: `${progressPercentage}%`, transform: "translateX(-50%)" }}
              >
                <div className="w-1 h-3 bg-[var(--defaultAccentColor)] rounded-full"></div>
                <span className="text-[10px] text-gray-700 mt-1">{CURRENT_HOURS}</span>
              </div>
            </div>
          </div>

          <div id="Ordered" className="w-full flex flex-wrap justify-center gap-4 mt-10 px-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="w-[45%] bg-white shadow-md rounded-2xl flex flex-col items-center p-3 border border-gray-200"
              >
                <div className="relative w-full h-20 rounded-lg overflow-hidden mb-2">
                  <Image src={order.img} alt="Order Image" fill style={{ objectFit: "cover" }} />
                </div>
                <span className="text-sm font-semibold text-gray-700 mb-1">
                  {order.type === "Manual" ? "Manual" : "Automat"}
                </span>
                <span className="text-xs text-gray-500 mb-1">
                  {order.time.toLocaleDateString()}
                </span>
                <span className="text-sm font-medium text-[var(--defaultAccentColor)] mb-3">
                  {timeLeft[order.id] || "--:--:--"}
                </span>
                <div className="flex flex-col gap-2">
                  <button className="px-3 py-1 bg-[var(--ngButtonColor)] text-white text-xs rounded-lg hover:bg-[var(--ngHoverButton)]">
                    Usuń
                  </button>
                  <button className="px-3 py-1 bg-[var(--posButtonColor)] text-white text-xs rounded-lg hover:bg-[var(--posHoverButton)]">
                    Edytuj
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button className="px-6 py-2 bg-[var(--ngButtonColor)] text-white rounded-xl shadow hover:bg-[var(--ngHoverButton)] transition">
            Wyloguj
          </button>
        </div>
      </div>

      <div id="MainPage" className="w-[80%] h-full flex flex-col">
        <div id="NavBar" className="w-full h-[10vh] flex bg-gray-200 items-center justify-between px-6">
          <div id="LogoContainer" className="flex items-center">
            <div id="Logo" className="relative w-24 h-10">
              <Image src="/logo.png" alt="Logo" fill style={{ objectFit: "contain" }} />
            </div>
          </div>
          <div id="MainNav" className="flex items-center gap-6">
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white shadow border text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Day">Day</option>
              <option value="Week">Week</option>
              <option value="Month">Month</option>
            </select>
            <div className="relative w-6 h-6 cursor-pointer hover:opacity-80 transition">
              <Image src="/setting-icon.png" alt="Settings" fill style={{ objectFit: "contain" }} />
            </div>
          </div>
        </div>

        <div id="MainContainer" className="w-full h-[80vh] flex items-center justify-center">
          <div id="Calendar" className="w-[95%] h-full rounded-3xl shadow-2xl flex flex-col">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}
