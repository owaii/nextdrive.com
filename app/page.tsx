"use client"
import LoginForm from "@/components/forms/LoginForm";
import SignupForm from "@/components/forms/RegisterForm";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [view, setView] = useState<"home" | "login" | "signup">("home");

  useEffect(() => {
    const handleHashChange = () => {
    const hash = window.location.hash;
    if (hash === "#login") setView("login");
    else if (hash === "#signup") setView("signup");
    else setView("home");
  };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);


  const goToLogin = () => {
    window.location.hash = "login";
    setView("login");
  };

  const goToSignup = () => {
    window.location.hash = "signup";
    setView("signup");
  }

  const goHome = () => {
    window.location.hash = "";
    setView("home");
  };

  return (
    <>
    {view == "home" && (
      <div className="WebWindow w-full h-full flex justify-center">
        <div className="Header w-full h-30 bg-(--defaultAccentColor) flex justify-center gap-2">
          <div className="Logo w-1/5 h-full"></div>
          <div className="MainHeader w-2/5 h-full flex justify-center items-center gap-7">
            <Link href="#Price"><span className="HeaderSpan">Cennik</span></Link>
            <Link href="#Calendar"><span className="HeaderSpan">Terminarz</span></Link>
            <Link href="#Register"><span className="HeaderSpan">Zapisz się</span></Link>
            <Link href="#Info"><span className="HeaderSpan">Info</span></Link>
            <Link href="#Contact"><span className="HeaderSpan">Kontakt</span></Link>
          </div>
          <div className="Login w-1/5 h-full flex justify-end items-center gap-5">
              <button onClick={goToLogin} className="HomePageLoginButton">
                Login
              </button>
              <button onClick={goToSignup} className="HomePageLoginButton">
                Signup
              </button>
          </div>
        </div>
      </div>
    )}

    {view === "login" && <LoginForm goHome={goHome} goToSignup={goToSignup} />}
    {view === "signup" && <SignupForm goHome={goHome} goToLogin={goToLogin} />}
    </>
  );
}
