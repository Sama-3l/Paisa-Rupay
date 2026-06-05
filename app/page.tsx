"use client";

import React, { useState } from "react";
import { OrangeRadialInput } from "@/src/common/InputField/OrangeRadialInput";
import "./page.css";

export default function Home() {
  return (
    <div className="w-[600px] flex items-center justify-center">
      <OrangeRadialInput
        radialColor={"#FF6D28"}
        radialDistance={"250%"}
        startOpacity={0 / 100}
        endOpacity={40 / 100}
        placeholder={"raghvendramishra2002@gmail.com"}
      />
    </div>
  );
}