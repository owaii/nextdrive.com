"use client";

import { useState, useEffect } from "react";
import UserProfileBlock from "@/components/dashboard/student/userProfileBlock";
import ProgressBarBlock from "@/components/dashboard/student/progressBlock";
import CalendarBlock from "@/components/dashboard/student/calendarBlock";
import UpdatesBlock from "@/components/dashboard/student/updatesBlock";
import SettingsBlock from "@/components/dashboard/student/settingsBlock";
import CountdownBlock from "@/components/dashboard/student/countdownBlock";

import getNearestStartDate from "@/components/dashboard/student/getNearestDate";

export default function UserDashboard() {
  const user = {
    fullName: "Jan Kowalski",
    mail: "jan.kowalski@example.com",
    password: "JanaNieMa123",
    carType: "Manual",
    profilePic: "",
    currH: 18.0,
    totalH: 30.0,
    calendar: [
      { id: 0, startDate: "2026-01-27T13:00:00", endDate: "2026-01-27T15:00:00", carType: "Manual" },
      { id: 1, startDate: "2026-01-29T13:00:00", endDate: "2026-01-29T15:00:00", carType: "Manual" },
      { id: 2, startDate: "2026-01-30T13:00:00", endDate: "2026-01-30T15:00:00", carType: "Manual" },
      { id: 3, startDate: "2026-01-31T13:00:00", endDate: "2026-01-31T15:00:00", carType: "Manual" },
      { id: 4, startDate: "2026-02-01T13:00:00", endDate: "2026-02-01T15:00:00", carType: "Manual" },
    ],
  };

  const [FullNameVal, SetFullNameVal] = useState(user.fullName);
  const [MailVal, SetMailVal] = useState(user.mail);
  const [PasswordVal, SetPasswordVal] = useState(user.password);
  const [ProfilePicVal, SetProfilePicVal] = useState(user.profilePic);

  const [calendarItems, setCalendarItems] = useState(user.calendar);
  
  const [nearestDate, setNearestDay] = useState<Date | null>(null);

  useEffect(() => {
    const nearest = getNearestStartDate(calendarItems);
    setNearestDay(nearest);
  }, [calendarItems]);

  return (
    <div className="bg-[#0A0A0A] h-screen w-screen overflow-x-hidden">
      <section className="w-full h-full flex flex-col">
        <header className="w-full h-12 bg-[#1A1C1E] flex justify-end">
          <button onClick={() => {window.location.href = "/"}} className="text-white text-xl font-bold mr-5 cursor-pointer">
            Wyloguj
          </button>
        </header> 
        <main className="w-full flex-1 flex items-center justify-center">
          <section className="w-[95%] lg:w-[75%] 2xl:w-[50%] h-[90vh] flex flex-col gap-7">
            
            {/* Row 1 */}
            <section className="w-full flex-1 flex lg:flex-row flex-col gap-4">
              <UserProfileBlock FullName={FullNameVal} Mail={MailVal} ImgSrc={ProfilePicVal}/>
              <ProgressBarBlock CurrH={user.currH} TotalH={user.totalH}/>
            </section>

            {/* Row 2 */}
            <section className="w-full flex-1 flex lg:flex-row flex-col gap-4">
              <CalendarBlock
                items={calendarItems}
                setItems={setCalendarItems}
                CarType={user.carType}
              />
              <UpdatesBlock />
            </section>

            {/* Row 3 */}
            <section className="w-full flex-1 flex lg:flex-row flex-col gap-4">
              <SettingsBlock 
                FullNameVal={FullNameVal} MailVal={MailVal} PasswordVal={PasswordVal}
                SetFullNameVal={SetFullNameVal} SetMailVal={SetMailVal} SetPasswordVal={SetPasswordVal}
              />
              <CountdownBlock TargetDate={nearestDate}/>
            </section>

          </section>
        </main>
      </section>
    </div>
  );
}
