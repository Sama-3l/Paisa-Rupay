"use client";

import React, { forwardRef } from "react";
import "./OrangeRadialInput.css";

export interface OrangeRadialInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The distance (radius) of the radial fill.
   * Can be a percentage (e.g. '70%') or pixel value (e.g. '200px').
   * Defaults to '70%'.
   */
  radialDistance?: string;
  /**
   * The color of the radial gradient in hex, rgb, or hsl.
   * Defaults to '#FF6D28'.
   */
  radialColor?: string;
  /**
   * Start opacity of the radial gradient (0 to 1).
   * Defaults to 0.
   */
  startOpacity?: number;
  /**
   * End opacity of the radial gradient (0 to 1).
   * Defaults to 0.4.
   */
  endOpacity?: number;
}

export const OrangeRadialInput = forwardRef<HTMLInputElement, OrangeRadialInputProps>(
  ({ radialDistance = "70%", radialColor = "#FF6D28", startOpacity = 0, endOpacity = 0.4, className = "", style, ...props }, ref) => {

    // Convert hex color to rgb components if possible to handle opacities easily
    // Standard color is #FF6D28, which is rgb(255, 109, 40)
    let rgbColor = "255, 109, 40";
    if (radialColor.startsWith("#")) {
      const hex = radialColor.replace("#", "");
      if (hex.length === 6) {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        rgbColor = `${r}, ${g}, ${b}`;
      } else if (hex.length === 3) {
        const r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16);
        const g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16);
        const b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16);
        rgbColor = `${r}, ${g}, ${b}`;
      }
    }

    // Set custom CSS variables to feed into the stylesheet
    const combinedStyle = {
      "--radial-rgb": rgbColor,
      "--radial-distance": radialDistance,
      "--start-opacity": startOpacity,
      "--end-opacity": endOpacity,
      ...style,
    } as React.CSSProperties;

    return (
      <input
        ref={ref}
        style={combinedStyle}
        className={`orange-radial-input font-sans tracking-wide transition-all placeholder:text-zinc-500/60 ${className}`}
        {...props}
      />
    );
  }
);
