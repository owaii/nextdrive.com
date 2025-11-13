import Link from "next/link";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginForm({ goHome, goToSignup }: { goHome: () => void; goToSignup: () => void; }) {
  return (
    <div className="LoginFormBackground w-screen h-screen flex items-center justify-center">
      <div className="MainLoginWindow w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] h-auto min-h-[400px] flex flex-col p-6 py-10 rounded-2xl transition-all cursor-pointer bg-gradient-to-b from-[#f7fcff] via-[#e9f7fc] to-[#d9f1fa] border border-cyan-200 border-t-white shadow-[0_0_34px_2px_rgba(66,68,90,0.15)] hover:shadow-[0_0_40px_4px_rgba(66,68,90,0.25)] transition-shadow duration-300">
        
        <div className="w-full flex justify-between text-sm mb-4">
          <Link
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              goHome();
            }}
            className="hover:underline cursor-pointer"
          >
            {"< Strona Główna"}
          </Link>

          <Link
            href="#signup"
            onClick={(e) => {
              e.preventDefault();
              goToSignup();
            }}
            className="hover:underline cursor-pointer"
          >
            {"Rejestracja >"}
          </Link>
        </div>

        <div className="text-center py-4">
          <span className="text-3xl md:text-4xl text-foreground) font-bold">
            Logowanie
          </span>
        </div>

        <div className="InputFieldsCon w-full flex flex-col px-4 sm:px-10">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-foreground)"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              type="email"
              id="email"
              className="bg-(--backgroundMain) border border-(--borderColor) text-foreground) text-sm rounded-lg focus:ring-(--defaultAccentColor) focus:border-(--defaultAccentColor) block w-full pl-10 p-2.5"
              placeholder="Email albo Nazwa Użytkownika"
            />
          </div>
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-foreground)"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 4a6 6 0 0 1 6 6v2H4v-2a6 6 0 0 1 6-6zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              </svg>
            </div>
            <input
              type="password"
              id="password"
              className="bg-(--backgroundMain) border border-(--borderColor) text-foreground) text-sm rounded-lg focus:ring-(--defaultAccentColor) focus:border-(--defaultAccentColor) block w-full pl-10 p-2.5"
              placeholder="Hasło"
            />
          </div>

          <div className="flex justify-end mb-4">
            <Link href={"#ForgotPassword"} className="text-sm hover:underline">
              Zapomniałeś Hasła?
            </Link>
          </div>

          <div className="SignInButton w-full flex items-center justify-center py-2">
            <button className="LoginButton w-full p-2 rounded-xl text-(--backgroundMain) bg-foreground) hover:opacity-90 transition  cursor-pointer">
              Zaloguj
            </button>
          </div>

          <span className="text-center text-foreground) my-4">albo</span>

          <button className="w-full border-2 bg-(--backgroundMain) border-(--borderColor) flex justify-center items-center py-2 gap-3 rounded-xl hover:bg-(--backgroundAFirHover) transition cursor-pointer">
            <GoogleIcon />
            <span>Zaloguj się za pomocą Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
