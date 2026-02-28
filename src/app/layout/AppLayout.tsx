import {Outlet} from "react-router-dom";
import {Topbar} from "@/app/layout/TopBar.tsx";
import {Footer} from "@/app/layout/Footer.tsx";


export function AppLayout() {
  return (
    <div className="">
      <Topbar></Topbar>
      <Outlet/>
      <Footer></Footer>
    </div>
  );
}