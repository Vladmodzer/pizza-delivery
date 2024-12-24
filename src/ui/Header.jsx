import React from "react";
import { Link, useLocation } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  const location = useLocation();

  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-500 px-4 py-3 font-medium uppercase sm:px-6">
      <Link to="/" className="text-clamp-sm tracking-widest">
        {`${location.pathname === "/" ? "De Luca" : "Home"} `}
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
