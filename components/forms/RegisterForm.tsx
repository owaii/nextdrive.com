"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";

export default function SignupForm({ goHome, goToLogin }: { goHome: () => void; goToLogin: () => void; }) {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 9);
    const parts = [];
    for (let i = 0; i < digits.length; i += 3) parts.push(digits.slice(i, i + 3));
    return parts.join(" ");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhone(formatPhone(e.target.value));

  const getStrength = (p: string) => {
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[a-z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const strength = getStrength(password);
  const text =
    strength === 0
      ? "Wpisz hasło"
      : strength <= 2
      ? "Słabe hasło"
      : strength === 3
      ? "Średnie hasło"
      : "Silne hasło";
  const color =
    strength === 0
      ? "bg-gray-200"
      : strength <= 2
      ? "bg-red-400"
      : strength === 3
      ? "bg-yellow-400"
      : "bg-green-500";


  return (
    <div className="LoginFormBackground w-screen h-screen flex items-center justify-center">
      <div className="MainLoginWindow w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] xl:w-[30%] 2xl:w-[25%] h-auto min-h-[400px] flex flex-col p-6 py-10 rounded-2xl transition-all cursor-pointer bg-gradient-to-b from-[#f7fcff] via-[#e9f7fc] to-[#d9f1fa] border border-cyan-200 border-t-white shadow-[0_0_34px_2px_rgba(66,68,90,0.15)] hover:shadow-[0_0_40px_4px_rgba(66,68,90,0.25)] transition-shadow duration-300">
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
            href="#login"
            onClick={(e) => {
              e.preventDefault();
              goToLogin();
            }}
            className="hover:underline cursor-pointer"
          >
            {"Logowanie >"}
          </Link>
        </div>

        <div className="text-center py-4">
          <span className="text-3xl md:text-4xl text-foreground font-bold">
            Rejestracja
          </span>
        </div>

        <div className="InputFieldsCon w-full flex flex-col px-4 sm:px-10 gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 20 20"><path d="M10 10a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.31 0-6 2.69-6 6h12c0-3.31-2.69-6-6-6Z" /></svg>
              </div>
              <input type="text" id="name" className="bg-(--backgroundMin) border border-(--borderColor) text-foreground text-sm rounded-lg focus:ring-(--defaultAccetColor) focus:border-(--defaultAccetColor) block w-full pl-10 p-2.5" placeholder="Imię" maxLength={20}/>
            </div>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 20 20"><path d="M10 10a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.31 0-6 2.69-6 6h12c0-3.31-2.69-6-6-6Z" /></svg>
              </div>
              <input type="text" id="surname" className="bg-(--backgroundMin) border border-(--borderColor) text-foreground text-sm rounded-lg focus:ring-(--defaultAccetColor) focus:border-(--defaultAccetColor) block w-full pl-10 p-2.5" placeholder="Nazwisko" maxLength={20}/>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884a1 1 0 0 1 1.09-.916 12.14 12.14 0 0 0 2.387.217 1 1 0 0 1 .987.789l.64 3.2a1 1 0 0 1-.272.919l-1.12 1.12a11.04 11.04 0 0 0 4.95 4.95l1.12-1.12a1 1 0 0 1 .918-.272l3.2.64a1 1 0 0 1 .79.987 12.14 12.14 0 0 0 .216 2.387 1 1 0 0 1-.915 1.09A16.14 16.14 0 0 1 2.003 5.884Z" /></svg>
            </div>
            <input type="tel" id="phone" value={phone} onChange={handlePhoneChange} inputMode="numeric" className="bg-(--backgroundMin) border border-(--borderColor) text-foreground text-sm rounded-lg focus:ring-(--defaultAccetColor) focus:border-(--defaultAccetColor) block w-full pl-10 p-2.5" placeholder="Numer telefonu" />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-foreground" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16"><path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" /><path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" /></svg>
            </div>
            <input type="email" id="email" className="bg-(--backgroundMin) border border-(--borderColor) text-foreground text-sm rounded-lg focus:ring-(--defaultAccetColor) focus:border-(--defaultAccetColor) block w-full pl-10 p-2.5" placeholder="Email albo nazwa użytkownika" />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a4 4 0 0 0-4 4v2H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1h-1V6a4 4 0 0 0-4-4Zm-2 6V6a2 2 0 1 1 4 0v2H8Z" /></svg>
            </div>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-(--backgroundMin) border border-(--borderColor) text-foreground text-sm rounded-lg focus:ring-(--defaultAccetColor) focus:border-(--defaultAccetColor) block w-full pl-10 p-2.5" placeholder="Hasło" />
          </div>

          <div className="flex flex-col gap-1 px-1 h-8">
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div className={`h-2 rounded-full transition-all duration-300 ${color}`} style={{ width: `${(strength / 5) * 100}%` }}></div>
            </div>
            <span className="text-xs text-foreground text-center">{text}</span>
          </div>
        </div>

        <div className="SignInButton w-full flex items-center justify-center py-4">
          <button className="LoginButton w-full p-2 rounded-xl text-(--backgroundMain) bg-foreground hover:opacity-90 transition cursor-pointer">
            Zarejestruj się
          </button>
        </div>

        <span className="text-center text-foreground my-4">albo</span>

        <button className="w-full border-2 bg-(--backgroundMain) border-(--borderColor) flex justify-center items-center py-2 gap-3 rounded-xl hover:bg-(--backgroundAFirHover) transition cursor-pointer">
            <GoogleIcon />
            <span>Zaloguj się za pomocą Google</span>
        </button>
      </div>
    </div>
  );
}
