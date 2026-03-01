"use client";

import SettingsIcon from "@mui/icons-material/Settings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useRouter } from "next/navigation";
import Calendar from "@/components/calendar/Calendar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

type User = {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  current_hours: number;
  total_hours: number;
  car_type: string;
};

function UserBlock({ id, name, email, phoneNum, ImgSrc, onClick, minH = 0, maxH = 30 }: { id: number, name: string, email: string, phoneNum: string, ImgSrc?: string, onClick?: () => void, minH?: number, maxH?: number }) {
  const percentage = Math.min(100, Math.max(0, Math.floor((minH / maxH) * 100)));

  return (
    <div onClick={onClick} className="w-75 h-36 px-6 py-3 flex flex-col gap-2 bg-(--student-bg-block) rounded-xl cursor-pointer hover:scale-103 duration-300 hover:bg-(--student-bg-hover)">
      <div className="w-full flex">
        <Image
          src={`/images/${ImgSrc}`}
          alt="Profile Pic"
          width={100}
          height={100}
          className="object-contain rounded-full"
        />
        <div className="ml-4 flex flex-col justify-center">
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <p className="text-sm text-gray-400">{email}</p>
          <p className="text-sm text-gray-400">{phoneNum}</p>
          <p className="text-xs text-gray-500">
            {minH} / {maxH} godzin
          </p>
        </div>
      </div>
      <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function HeaderItem({title, click, svg }: {title: string, click: () => void, svg: React.ReactNode}) {
  return (
    <div onClick={click} className="flex items-center justify-center hover:bg-(--student-bg-hover) rounded-lg gap-2 transition-colors duration-200 cursor-pointer px-2 py-2">
      {svg}
      <h2 className="text-lg font-bold text-white">{title}</h2>
    </div>
  );
}
export default function AdminDashboard() {
  const [mode, setMode] = useState<"calendar" | "settings">("calendar");
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCalendarEventEdit, setCalendarEventEdit] = useState(false);
  const [isCalendarFreeEvents, setIsCalendarFreeEvents] = useState(false);
  const [isSetFreeTime, setIsSetFreeTime] = useState(false);

  const [currentUserClick, setCurrentUserClick] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("?");
  const [currentUserHours, setCurrentUserHours] = useState(0);
  const [currentUser, setCurrentUser] = useState<User[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const [isBreakDateChosen, SetIsBreakDateChosen] = useState(false);
  const [BreakDateText, setBreakDateText] = useState<string>("");
  const [DateTimeStartText, setDateTimeStartText] = useState<string>("");
  const [DateTimeEndText, setDateTimeEndText] = useState<string>("");

  const dateRef = useRef<HTMLInputElement>(null);
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mode === "settings") {
      const fetchUsers = async () => {
        try {
          const res = await fetch("/api/admin/root");

          if (!res.ok) {
            throw new Error("Failed to fetch users");
          }

          const data = await res.json();
          setUsers(data);
        } catch (err) {
          console.error(err);
        }
      };

      fetchUsers();
    }
  }, [mode]);

  const handlePasswordChange = async () => {
    if (!selectedUser || !newPassword) {
      toast.error("Wprowadź nowe hasło");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/update/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedUser.id,
          newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Hasło zostało zmienione!");
        setSelectedUser(null);
        setNewPassword("");
      } else {
        toast.error(data.error || "Błąd zmiany hasła");
      }
    } catch (err) {
      console.error(err);
      toast.error("Błąd połączenia z serwerem");
    } finally {
      setLoading(false);
    }
  };

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    setLoading(false);
    router.push("/login");
  }

  return (
    <main className="relative bg-cover bg-center h-screen w-screen overflow-x-hidden flex items-center justify-center" style={{ backgroundImage: "url('/images/bg.png')" }}>
      <div onClick={handleLogout} className="absolute top-4 right-4 flex items-center justify-center bg-[--student-bg-block]/70 backdrop-blur-lg border border-white/10 shadow-xl rounded-full p-1 hover:cursor-pointer hover:bg-[--student-bg-block]/90 transition-colors duration-200 rounded-circle">
        <PowerSettingsNewIcon sx={{ fontSize: 40 }} className="text-red-600" />
      </div>
      <section className="absolute top-10 left-1/2 -translate-x-1/2 bg-(--student-bg-header)/80 rounded-2xl py-1 px-10 gap-3 flex items-center justify-center border border-(--student-txt-prim) ">
        <HeaderItem title="Ustawienia" click={() => setMode("settings")} svg={<SettingsIcon sx={{ fontSize: 25 }} className="text-white" />} />
        <HeaderItem title="Kalendarz" click={()  => setMode("calendar")} svg={<CalendarMonthIcon sx={{ fontSize: 25 }} className="text-white" />} />
      </section>
      {mode === "calendar" && (
        <div className="relative w-1/2 h-3/5 bg-(--student-bg-header)/80 rounded-2xl border border-(--student-txt-prim) gap-4 p-4 overflow-y-auto flex flex-col">
          <section className="w-full h-fit px-2 flex justify-between min-h-14">
            <div className="flex items-center">
              <div onClick={() => setCalendarEventEdit(true)} className={`bg-(--calendar-block-bg-primary) rounded-full w-7 h-7 mr-2 cursor-pointer `}/>
              <div onClick={() => setIsSetFreeTime(true)} className={`bg-(--bg-primary) rounded-full w-7 h-7 mr-2 cursor-pointer `}/>
            </div>
            { currentUserClick && !isSetFreeTime  && (
                <div className="flex justify-between py-2 gap-5">
                  <button className="px-2 py-2 rounded-lg hover:bg-(--student-bg-hover) cursor-pointer text-(--txt-secondary) flex items-center gap-1">
                    <AccountCircleIcon sx={{ fontSize: 25 }} className="text-(--student-icon)" />
                    Zmień
                  </button>
                  <div className="flex my-1">
                    <button onClick={() => {setCurrentUserHours(prev => prev > 0 ? prev - 0.5 : prev );}} className="bg-(--student-bg-content) flex items-center justify-center px-1 text-2xl text-(--txt-secondary) rounded-xl rounded-r-none cursor-pointer hover:bg-(--student-bg-content)">-</button>
                    <div className="bg-(--student-bg-main) text-2xl text-(--txt-secondary) min-w-12 flex justify-center items-center">{currentUserHours}</div>
                    <button onClick={() => { setCurrentUserHours(prev => prev < 2 ? prev + 0.5 : prev );}} className="bg-(--student-bg-content) flex items-center justify-center px-1 text-2xl text-(--txt-secondary) rounded-xl rounded-l-none cursor-pointer hover:bg-(--student-bg-content)">+</button>
                  </div>
                  <button className="px-2 py-2 rounded-lg hover:bg-(--student-bg-hover) cursor-pointer text-(--txt-secondary) flex items-center gap-1">
                    <DeleteIcon sx={{ fontSize: 25 }} className="text-(--student-icon)" />
                    Usuń
                  </button>
                </div>
              )}
            {!currentUserClick && !isSetFreeTime && (
              <div onClick={() => setCurrentUserClick(true)} className="py-2 min-w-100 hover:bg-(--student-bg-hover) transition-color duration-300 cursor-pointer rounded-lg text-white text-2xl text-center">
                {currentUserName}
              </div>
            )}    
            {isSetFreeTime && (
              <div className="py-2 cursor-pointer rounded-lg text-white text-xl text-center flex items-center justify-center gap-2">
                <button className="px-2 py-2 rounded-lg hover:bg-(--student-bg-hover) cursor-pointer text-(--txt-secondary) flex items-center gap-1">
                  {isBreakDateChosen ? (
                    BreakDateText
                  ) : (
                    <>
                      Ustaw Date
                      <CalendarMonthIcon sx={{ fontSize: 25 }} className="text-white" />
                    </>
                  )}
                </button>
                <button className="px-2 py-2 rounded-lg hover:bg-(--student-bg-hover) cursor-pointer text-(--txt-secondary) flex items-center gap-1">
                  {isBreakDateChosen ? (
                    DateTimeStartText
                  ) : (
                    <>
                      Początek
                      <AccessTimeIcon sx={{ fontSize: 25 }} className="text-white" />
                    </>
                  )}
                </button>
                <button className="px-2 py-2 rounded-lg hover:bg-(--student-bg-hover) cursor-pointer text-(--txt-secondary) flex items-center gap-1">
                  {isBreakDateChosen ? (
                    DateTimeEndText
                  ) : (
                    <>
                      Koniec
                      <AccessTimeIcon sx={{ fontSize: 25 }} className="text-white" />
                    </>
                  )}
                </button>
                <button className="px-2 py-2 rounded-lg hover:bg-(--student-bg-hover) cursor-pointer text-(--txt-secondary) flex items-center gap-1">Zastosuj</button>
              </div>
            )}

            <div className="flex items-center">
              <div onClick={() => { 
                if (isSetFreeTime == true) { setIsSetFreeTime(false); } 
                if (currentUserClick == true) { setCurrentUserClick(false); }
              }} 
                className={`bg-(--student-btn-gray-prim) hover:bg-(--student-btn-gray-hover) rounded-full w-7 h-7 mr-2 cursor-pointer }`
              }/>
              <div className={`bg-(--student-btn-green-prim) hover:bg-(--student-btn-green-hover) rounded-full w-7 h-7 mr-2 cursor-pointer }`}/>
              <div className={`bg-(--student-btn-red-prim) hover:bg-(--student-btn-red-hover) rounded-full w-7 h-7 mr-2 cursor-pointer `}/>
            </div>
          </section>
          <Calendar SetCurrentUserName={setCurrentUserName} />
        </div>
      )}
      
      {mode === "settings" && (
        <div className="w-1/2 h-3/5 bg-(--student-bg-header)/80 rounded-2xl border border-(--student-txt-prim) gap-4 p-4 overflow-y-auto flex">
          {users.map((user) => (
            <UserBlock
              key={user.id}
              id={user.id}
              name={user.full_name}
              email={user.email}
              ImgSrc="DefaultProfilePicture.png"
              phoneNum={user.phone_number}
              minH={user.current_hours}
              maxH={user.total_hours}
              onClick={() => setSelectedUser(user)}
            />
          ))}
        </div>
      )}
      {selectedUser && (
        <div className="w-full h-full bg-(--student-bg-header)/50 absolute top-0 left-0 flex items-center justify-center">
          <div className="w-fit px-5 py-2 flex flex-col">
            <div className="w-full flex space-between gap-10">
              <h2 className="text-2xl font-bold text-white">Ustaw nowe hasło</h2>
              <button onClick={() => {setSelectedUser(null); setNewPassword("");}} className="text-white bg-(--student-bg-block) px-3 py-1 rounded-lg hover:bg-(--student-bg-hover) transition-colors duration-200 cursor-pointer">X</button>
            </div>
            <input value={newPassword ?? ""} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="Nowe hasło" className="mt-4 px-3 py-2 rounded-lg bg-(--student-bg-block) text-white focus:outline-none focus:ring-2 focus:ring-(--student-txt-prim)" />
            <button onClick={handlePasswordChange} disabled={loading} className="mt-4 bg-(--student-bg-block) text-white px-4 py-2 rounded-lg hover:bg-(--student-bg-hover) transition-colors duration-200 cursor-pointer">{loading ? "Trwa zmiana..." : "Zmień hasło"}</button>
          </div>
        </div>
      )}
    </main>
  );
} 