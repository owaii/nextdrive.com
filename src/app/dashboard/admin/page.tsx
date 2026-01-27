"use client";

import Image from "next/image";

function ListItem({ text, imgSrc }: { text: string, imgSrc: string }) {
  return (
    <tr className="w-full cursor-pointer">
      <td>
        <Image
          src={imgSrc}
          alt="Icon"
          width={24}
          height={24}
          className="object-contain"
        />
      </td>
      <td className="flex-1 flex items-center justify-start ml-5">
        <span className="text-xl text-white">{ text }</span>
      </td>
    </tr>
  );
}

export default function UserDashboard() {
  return (
    <main className="bg-[#0A0A0A] h-screen w-screen overflow-x-hidden">
      <div className="w-full h-full flex items-center justify-center">
        <section className="w-2/3 h-[90vh] flex bg-[#1A1A1A] rounded-lg">
          {/* SideBar */}
          <section className="h-full flex flex-col border-r border-gray-500 w-50">
            <div className="flex items-center justify-center py-5">
              <Image 
                src="/images/ProfilePicture.png"
                alt="Logo"
                width={140}
                height={140}
                className="object-contain rounded-full"
              />
            </div>
            <section className="w-full flex justify-center">
              <table className="">
                <ListItem text="Użytkownicy" imgSrc="/icons/Users.png" />
                <ListItem text="Kalendarz" imgSrc="/icons/Calendar.png" />
                <ListItem text="Tickety" imgSrc="/icons/Tickets.png" />
                <ListItem text="Ustawienia" imgSrc="/icons/Settings.png" />
              </table>
            </section>
          </section>
          {/* Main Content Area */}
          <section className="flex-1 h-full">
            {/* Main content goes here */}
          </section>
        </section>
      </div>      
    </main>
  );
} 