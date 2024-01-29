"use client";
import Main from "./_components/main";
import Navbar from "./_components/navbar";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Main />
    </div>
  );
}
