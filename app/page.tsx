"use client";

import { useState } from "react";

import OSIntro from "@/components/intro/os-intro";
import Desktop from "@/components/os/desktop";

const Main: React.FC = () => {
  const [osStarted, setOStarted] = useState<boolean>(false);
  return (
    <div className="fixed inset-0 flex font-amiri
    items-center justify-center bg-black w-full h-screen">
      {
        !osStarted &&
        <OSIntro
          setOSStarted={() => setOStarted(true)}
        />
      }
      {
        osStarted &&
        <Desktop />
      }
    </div>
  );
};

export default Main;
