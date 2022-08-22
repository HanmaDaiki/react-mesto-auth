import React from "react";

function Header({page}) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      {page}
    </header>
  );
}

export default Header;
