"use client";

import React, { useState, useEffect, useRef } from "react";
import "./OrangeRadialDropdown.css";
import { LoanOption } from "@/src/lib/types";

interface OrangeRadialDropdownProps {
  title: string;
  name: string;
  options: LoanOption[];
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  radialDistance?: string;
  radialColor?: string;
  startOpacity?: number;
  endOpacity?: number;
}

export function OrangeRadialDropdown({
  title,
  name,
  options,
  required = false,
  defaultValue = "",
  placeholder = "Select an option",
  disabled = false,
  radialDistance = "250%",
  radialColor = "#FF6D28",
  startOpacity = 0,
  endOpacity = 0.4,
}: OrangeRadialDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update selected value if defaultValue changes (e.g. preselected loan type from URL)
  useEffect(() => {
    if (defaultValue) {
      setSelectedValue(defaultValue);
    }
  }, [defaultValue]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  // Convert hex color to rgb
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
  } as React.CSSProperties;

  return (
    <div ref={dropdownRef} className="orange-radial-dropdown-container">
      <div className="flex flex-row justify-between items-end pb-2">
        <div className="input_field_label">{title}</div>
        <div className={`input_field_required ${required ? "flex" : "hidden"}`}>*required</div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          disabled={disabled}
          style={combinedStyle}
          className={`orange-radial-input font-(--font-fustat) tracking-[-2.5%] transition-all text-left flex items-center justify-between cursor-pointer ${isOpen ? "orange-radial-dropdown-active" : ""
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <span className={selectedOption ? "text-(--text-color) font-semibold" : "text-(--placeholder) font-light"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <i className={`ti ti-chevron-down text-lg transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}></i>
        </button>

        {isOpen && (
          <ul className="orange-radial-dropdown-list z-50">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`orange-radial-dropdown-item ${option.value === selectedValue ? "selected" : ""
                  }`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Hidden input for native HTML form submission */}
      <input type="hidden" name={name} value={selectedValue} />
    </div>
  );
}
