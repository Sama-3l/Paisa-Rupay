'use client';

import React from 'react';

export default function CookiePreferencesButton() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-cookie-settings'));
  };

  return (
    <button
      onClick={handleClick}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        color: 'inherit',
        font: 'inherit',
        cursor: 'pointer',
        textAlign: 'inherit',
        width: 'fit-content',
        display: 'inline-block',
      }}
      aria-label="Manage Cookie Preferences"
    >
      Cookie Preferences
    </button>
  );
}
