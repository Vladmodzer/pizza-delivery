import React from "react";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();

  const isloading = navigation.state === "loading";

  return (
    <div className="mx-auto my-0 grid h-screen grid-rows-[auto_1fr_auto]">
      {/* {isloading && <Loader />} */}
      {isloading && <Loader />}
      <Header />
      <div className="overflow-scroll bg-stone-50 px-3">
        <main className="mx-auto min-w-[320px] max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
