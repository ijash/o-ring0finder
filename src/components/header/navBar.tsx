import React from "react";
import LanguageDropdown from "./languageDropdown";
export function NavBar() {
  return (
    <nav className="navbar bg-primary shadow-sm">
      <div className="container">
        <LanguageDropdown />
      </div>
    </nav>
  );
}
