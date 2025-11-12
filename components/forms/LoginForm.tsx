import Link from "next/link";
import React from "react";
import GoogleIcon from '@mui/icons-material/Google'
import { Span } from "next/dist/trace";

export default function LoginForm() {
  return (
    <div className="LoginFormBackground WebWindow w-full h-full flex items-center justify-center">
      <div className="MainLoginWindow w-[30%] h-[55%] flex flex-col shadow-[0_0_34px_2px_rgba(66,68,90,1)] p-4 rounded-4xl">
        <div className="w-full flex flex-nowrap justify-between">
          <Link href={"#home"}>{"< Home"}</Link>
          <Link href={"#signup"}>{"Registration >"}</Link>
        </div>
        <div className="InputFieldsCon w-full flex flex-col px-10">
          <div className="relative mb-2 text-center py-4">
            <span className="text-4xl text-(--foreground) font-bold ">Logowanie</span>
          </div>

          <div className="relative mb-2">

          </div>

          <div className="relative mb-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-foreground"
                aria-hidden="true"
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
              className="bg-(--backgroundAFir) border-(--borderColor) text-(--foreground) text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              placeholder="Email albo Username"
            />
          </div>

          <div className="relative mb-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-foreground"
                aria-hidden="true"
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
              className="bg-(--backgroundAFir) border-(--borderColor) text-foreground text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              placeholder="Password"
            />
          </div>
        
          <div className="relative flex justify-end items-center">
            <Link 
              href={"#ForgotPassword"}
              className="text-sm "
            >Zapomniałeś Hasła?</Link>
          </div>

          <div className="SignInButton w-full flex items-center justify-center py-2 relative">
            <button className="LoginButton w-full p-2 rounded-4xl text-(--backgroundMain) cursor-pointer">
              Zaloguj
            </button>
          </div>

          <span className="relative mb-2 py-2 w-full text-center text-(--foreground)">
            or
          </span>

          <div className="relative">
            <button className="w-full border-2 bg-(--backgroundMain) border-(--borderColor) flex justify-center items-center flex-nowrap py-1 gap-4 cursor-pointer">
              <span>Zaloguj się za pomocą Google</span>
              <span><GoogleIcon/></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
