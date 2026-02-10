"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserProfileBlock from "@/components/dashboard/student/userProfileBlock";
import ProgressBarBlock from "@/components/dashboard/student/progressBlock";
import CalendarBlock from "@/components/dashboard/student/calendarBlock";
import UpdatesBlock from "@/components/dashboard/student/updatesBlock";
import SettingsBlock from "@/components/dashboard/student/settingsBlock";
import CountdownBlock from "@/components/dashboard/student/countdownBlock";

import getNearestStartDate from "@/components/dashboard/student/getNearestDate";

import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user/root");
        const data = await res.json();

        if (res.ok) {
          setUser(data);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }

    fetchUser();
  }, []);

  const [FullNameVal, SetFullNameVal] = useState("");
  const [MailVal, SetMailVal] = useState("");
  const [PasswordVal, SetPasswordVal] = useState("");
  const [ProfilePicVal, SetProfilePicVal] = useState("");
  const [calendarItems, setCalendarItems] = useState<any[]>([]);
  const [nearestDate, setNearestDay] = useState<Date | null>(null);

  useEffect(() => {
    if (!user) return;

    SetFullNameVal(user.fullName);
    SetMailVal(user.mail);
    SetPasswordVal(user.password);
    SetProfilePicVal(user.profilePic || "");
    setCalendarItems(user.calendar || []);
  }, [user]);

  useEffect(() => {
    if (!calendarItems.length) return;
    const nearest = getNearestStartDate(calendarItems);
    setNearestDay(nearest);
  }, [calendarItems]);

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    setLoading(false);
    router.push("/login");
  }

  return (
    <div className="bg-cover bg-center h-screen w-screen overflow-x-hidden" style={{ backgroundImage: "url('/images/bg.png')" }}>
      <section className="relative w-full h-full flex flex-col">
        <div onClick={handleLogout} className="absolute top-4 right-4 flex items-center justify-center bg-[--student-bg-block]/70 backdrop-blur-lg border border-white/10 shadow-xl rounded-full p-1 hover:cursor-pointer hover:bg-[--student-bg-block]/90 transition-colors duration-200 rounded-circle">
          <PowerSettingsNewIcon sx={{ fontSize: 40 }} className="text-red-600" />
        </div>
        <main className="w-full flex-1 flex items-center justify-center">
          <section className="w-[95%] lg:w-[75%] 2xl:w-[50%] lg:h-[900px] 2xl:1080 flex flex-col gap-7">
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
