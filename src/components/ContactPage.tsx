"use client";

import Image from "next/image";
import clsx from "clsx";
import toast from "react-hot-toast";

export default function ContactPage() {
  const phone_number = "+48 571 542 411";
  const email = "jazdydoszkalajace24h@gmail.com";

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Skopiowano do schowka!");
    } catch (err) {
      toast.error("Nie udało się skopiować");
      console.error("Copy failed", err);
    }
  };

  return (
    <section
      id="Contact"
      className="relative w-full h-screen bg-transparent flex items-center justify-center"
    >
      {/* Parallax background */}
      <div className="absolute top-0 left-0 w-full h-screen bg-[url('/images/ParalaxBackground1.png')] bg-cover bg-center">
        <div className="absolute top-0 left-0 w-full h-full bg-black/60" />
      </div>

      {/* Foreground content */}
      <section
        className={clsx(
          "relative z-10 w-9/10 h-1/2 rounded-2xl flex flex-col",
          "sm:h-7/10 sm:w-9/10",
          "2xl:h-1/3 2xl:w-1/2"
        )}
      >
        <div className="w-full p-6 sm:p-7 flex justify-center items-center bg-txt-red rounded-t-2xl">
          <span className="text-5xl text-txt-white font-extrabold tracking-wider">
            Kontakt
          </span>
        </div>
        <div className="w-full flex-1 bg-brand-white rounded-b-2xl flex items-start justify-center">
          <section
            className={clsx(
              "flex flex-col h-auto py-10 gap-5",
              "sm:flex-row sm:w-full sm:px-2 sm:gap-0",
              "2xl:items-center 2xl:justify-center"
            )}
          >
            {/* First Section */}
            <section className="flex-1">
              <div className="w-full flex-1 p-3 flex items-center justify-center">
                <div className="w-10 2xl:w-15 aspect-square relative">
                  <Image
                    src="/images/PhoneIcon.png"
                    alt="Phone Icon"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div
                className={clsx(
                  "w-full flex-1 flex flex-col items-center justify-center"
                )}
              >
                <span
                  onClick={() => handleCopy(phone_number)}
                  className={clsx(
                    "text-xl text-brand-black font-bold",
                    "relative cursor-pointer",
                    "after:content-[''] after:absolute after:left-0 after:bottom-0",
                    "after:w-0 after:h-0.5 after:bg-black",
                    "after:transition-all after:duration-300",
                    "hover:after:w-full",
                    "2xl:text-2xl"
                  )}
                >
                  {phone_number}
                </span>
                <span className="text-xs 2xl:text-sm italic">
                  Pon - Pt: 8:00 - 20:00
                </span>
              </div>
            </section>

            {/* Second Section */}
            <section className="flex-1">
              <div className="w-full flex-1 p-3 flex items-center justify-center">
                <div className="w-10 2xl:w-15 aspect-square relative">
                  <Image
                    src="/images/EmailIcon.png"
                    alt="Email Icon"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="w-full flex-1 flex flex-col items-center justify-center">
                <span
                  onClick={() => handleCopy(email)}
                  className={clsx(
                    "text-xl text-brand-black font-bold",
                    "relative cursor-pointer",
                    "after:content-[''] after:absolute after:left-0 after:bottom-0",
                    "after:w-0 after:h-0.5 after:bg-black",
                    "after:transition-all after:duration-300",
                    "hover:after:w-full",
                    "2xl:text-2xl"
                  )}
                >
                  {email}
                </span>
                <span className="text-xs 2xl:text-sm italic">
                  Dostępne cały czas
                </span>
              </div>
            </section>
          </section>
        </div>
      </section>
    </section>
  );
}
