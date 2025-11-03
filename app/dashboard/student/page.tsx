"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function StudentDashboard() {
  const today = new Date();
  const HourFrom = 12;
  const HourTo = 24;
  const [viewMode, setViewMode] = useState("Week");

  const MAX_HOURS = 30;
  const CURRENT_HOURS = 7;

  const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - (dayOfWeek - 1));

  const daysOfWeek = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const dayName = weekDays[i];
    const shortDay = dayName.slice(0, 3);
    const dayNum = day.getDate();
    const isToday = day.toDateString() === today.toDateString();
    daysOfWeek.push({ shortDay, dayNum, isToday });
  }

  const hours = [];
  for (let h = HourFrom; h <= HourTo; h++) {
    if (h === 24) hours.push(`    `);
    else hours.push(`${h}:00`);
  }

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
            <div id="ProfilePic" className="relative w-20 h-20 rounded-full overflow-hidden mt-[-20%]">
              <Image src="/profilePic.png" alt="Profile Pic" fill style={{ objectFit: "cover" }} />
            </div>
            <span className="mt-3 text-lg font-semibold text-gray-800">Jan Kowalski</span>
          </div>

          <div className="flex flex-col items-center mt-10 px-4">
            <h2 className="text-base font-semibold text-gray-700 mb-3">Przejechane godziny</h2>
            <div className="w-full relative">
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-blue-500 rounded-full transition-all"
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
                <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
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
                <span className="text-sm font-medium text-blue-500 mb-3">
                  {timeLeft[order.id] || "--:--:--"}
                </span>
                <div className="flex flex-col gap-2">
                  <button className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600">
                    Usuń
                  </button>
                  <button className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600">
                    Zamów ponownie
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <button className="px-6 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition">
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

        <div id="MainContainer" className="w-full h-[90vh] flex items-center justify-center">
          <div id="Calendar" className="w-[95%] h-[80vh] rounded-3xl shadow-2xl flex flex-col">
            <div id="TopPanel" className="w-full h-[10vh] flex border-b">
              <div id="TimeZoneValue" className="w-[5%] h-full flex items-end justify-end pr-1">
                <span className="font-semibold">CET</span>
              </div>
              <div className="flex w-[95%] justify-between">
                {daysOfWeek.map((day, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-end flex-1 border-l border-gray-300 relative"
                  >
                    <span className={`font-semibold ${day.isToday ? "text-blue-600" : ""}`}>
                      {day.shortDay}
                    </span>
                    <span
                      className={`${
                        day.isToday
                          ? "bg-blue-500 text-white rounded-full px-3 py-1"
                          : "text-gray-600"
                      }`}
                    >
                      {day.dayNum}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div id="MainCalendar" className="w-full h-[70vh] flex">
              <div
                id="CalendarHours"
                className="w-[5%] h-full flex flex-col justify-end items-end pr-1 border-r border-gray-300"
              >
                {hours.map((hour, idx) => (
                  <div
                    key={idx}
                    className="h-[calc(70vh/12)] flex items-end justify-end text-sm text-gray-700"
                  >
                    {hour}
                  </div>
                ))}
              </div>
              <div className="w-[95%] flex">
                {daysOfWeek.map((day, idx) => (
                  <div key={idx} className="flex-1 border-l border-gray-300 flex flex-col justify-end">
                    {hours.map((_, hIdx) => (
                      <div key={hIdx} className="h-[calc(70vh/12)] border-t border-gray-100"></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
