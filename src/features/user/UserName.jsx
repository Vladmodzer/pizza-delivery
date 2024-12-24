import React from "react";
import { useSelector } from "react-redux";

function UserName() {
  const username = useSelector((state) => state.user.username);
  if (!username) return null;
  return (
    <div className="text-clamp-sm hidden font-semibold md:block">
      {username}
    </div>
  );
}

export default UserName;
