"use client";

import { Toaster } from "react-hot-toast";

export default function ClientToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          width: "400px",
          maxWidth: "90vw",
          background: "var(--bg-primary)",
          color: "var(txt-primary)",
          padding: "20px",
          borderRadius: "10px",
        },
        duration: 3000,
      }}
    />
  );
}
