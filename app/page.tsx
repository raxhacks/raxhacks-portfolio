"use client";

import { useState } from "react";

import OSIntro from "@/components/intro/os-intro";
import Desktop from "@/components/os/desktop";
import Mobile from "@/components/mobile/mobile";

const Main: React.FC = () => {
  const [osStarted, setOStarted] = useState<boolean>(false);
  return (
    <div className="fixed inset-0 flex font-amiri
    items-center justify-center bg-black w-full h-screen">
      <Mobile />
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
