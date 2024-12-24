import React from "react";
import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick, width }) {
  const base = `${width ? "w-[100%]" : ""} text-sm text-center rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-100 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 active:bg-yellow-100 active:text-yellow-500 disabled:cursor-not-allowed `;

  const styles = {
    primary: base + "px-4 py-3 md:px-6 md:py-4",
    small: base + "  px-2 py-1 md:px-5 md:py-2.5 text-xs ",
    round: base + "px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
    secondary:
      " text-sm rounded-full px-4 py-3 md:px-6 md:py-4 border border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-100 hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:ring-offset-2 active:bg-ystone-100 active:text-stone-100 disabled:cursor-not-allowed ",
  };
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
