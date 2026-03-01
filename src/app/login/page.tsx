"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const shown = useRef(false);
  const router = useRouter();

  const [MailInputValue, setMailInputValue] = useState("");
  const [PasswordInputValue, setPasswordInputValue] = useState("");

  const [IsCorrectValue, SetIsCorrectValue] = useState(true);

  useEffect(() => {
    if (shown.current) return;
    shown.current = true;

    toast.success(
      "Logowanie oraz rejestracja są obecnie nieaktywne w wersji demo.",
      { duration: 8000 }
    );
  }, []);

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: MailInputValue,
          password: PasswordInputValue,
        }),
      });

      const data = await res.json();
        if (res.ok) {
          if (data.user.role == "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push("/user/dashboard");
          }
        } else {
          alert(data.error || "Login failed");
        }
    } catch (err) {
      alert("Błąd logowania");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="LoginFormBackground w-screen h-screen flex items-center justify-center">
      <div className="w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] h-auto min-h-[400px] flex flex-col p-6 py-10 rounded-2xl transition-all cursor-pointer bg-gradient-to-b from-[#f7fcff] via-[#e9f7fc] to-[#d9f1fa] border border-cyan-200 border-t-white shadow-[0_0_34px_2px_rgba(66,68,90,0.15)] hover:shadow-[0_0_40px_4px_rgba(66,68,90,0.25)] transition-shadow duration-300">
        
        <div className="w-full flex justify-between text-sm mb-4">
          <Link
            href="/"
            className="hover:underline cursor-pointer"
          >
            {"< Strona Główna"}
          </Link>

          <Link
            href="/register"
            className="hover:underline cursor-pointer"
          >
            {"Rejestracja >"}
          </Link>
        </div>

        <div className="text-center py-4">
          <span className="text-3xl md:text-4xl text-(--txt-primary) font-bold">
            Logowanie
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="InputFieldsCon w-full flex flex-col px-4 sm:px-10">
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-(--txt-primary)"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                value={MailInputValue}
                onChange={(e) => setMailInputValue(e.target.value)}
                type="email"
                id="email"
                className="border border-(--bg-secondary) text-(--txt-primary) text-sm rounded-lg focus:ring-(--bg-special) focus:border-(--bg-special) block w-full pl-10 p-2.5"
                placeholder="Email"
              />
            </div>
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-(--txt-primary)"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 4a6 6 0 0 1 6 6v2H4v-2a6 6 0 0 1 6-6zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                </svg>
              </div>
              <input
                value={PasswordInputValue}
                onChange={(e) => setPasswordInputValue(e.target.value)}
                type="password"
                id="password"
                className="border border-(--bg-secondary) text-(--txt-primary) text-sm rounded-lg focus:ring-(--bg-special) focus:border-(--bg-special) block w-full pl-10 p-2.5"
                placeholder="Hasło"
              />
            </div>

            <div onClick={() => {
              toast.error("Aby zresertować hasło, skontaktuj się z administratorem.");
            }} className="flex justify-end mb-4 text-sm hover:underline">
              Zapomniałeś Hasła?
            </div>

            <div
              className="SignInButton w-full flex items-center justify-center py-2">
              <button
                type="submit"
                disabled={loading}
                className="LoginButton w-full p-2 rounded-xl text-(--txt-secondary) bg-(--bg-primary) hover:opacity-90 transition cursor-pointer"
              >
                {loading ? "Logowanie..." : "Zaloguj"}
              </button>
            </div>

            <span className="text-center text-(--txt-primary) my-4">albo</span>

            <button className="w-full border-2 border-(--bg-secondary) flex justify-center items-center py-2 gap-3 rounded-xl hover:opacity-90 transition cursor-pointer">
              <GoogleIcon />
              <span>Zaloguj się za pomocą Google</span>
            </button>

          </div>
        </form>
        </div>
      </div>
  );
}