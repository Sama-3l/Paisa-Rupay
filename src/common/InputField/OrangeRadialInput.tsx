"use client";

import React, { forwardRef } from "react";
import "./OrangeRadialInput.css";

export interface OrangeRadialInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  radialDistance?: string;
  radialColor?: string;
  startOpacity?: number;
  title: string;
  required: boolean;
  placeholder?: string;
  endOpacity?: number;
  multiline?: boolean;        // ← add this
  rows?: number;              // ← and this
}

export const OrangeRadialInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, OrangeRadialInputProps>(
  ({ radialDistance = "250%", radialColor = "#FF6D28", startOpacity = 0, endOpacity = 0.4, className = "", placeholder = "Enter text", title, required, style, multiline = false, rows = 5, ...props }, ref) => {

    let rgbColor = "255, 109, 40";
    if (radialColor.startsWith("#")) {
      const hex = radialColor.replace("#", "");
      if (hex.length === 6) {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        rgbColor = `${r}, ${g}, ${b}`;
      }
    }

    const combinedStyle = {
      "--radial-rgb": rgbColor,
      "--radial-distance": radialDistance,
      "--start-opacity": startOpacity,
      "--end-opacity": endOpacity,
      ...style,
    } as React.CSSProperties;

    const sharedClassName = `orange-radial-input font-(--font-fustat) tracking-[-2.5%] transition-all placeholder:var(--placeholder) text-(--text-color) ${className}`;

    return (
      <div>
        <div className="flex flex-row justify-between items-end pb-2">
          <div className="input_field_label">{title}</div>
          <div className={`input_field_required ${required ? "flex" : "hidden"}`}>*required</div>
        </div>

        {multiline ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            style={combinedStyle}
            placeholder={placeholder}
            rows={rows}
            className={`${sharedClassName} resize-none`}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            style={combinedStyle}
            placeholder={placeholder}
            className={sharedClassName}
            {...props}
          />
        )}
      </div>
    );
  }
);