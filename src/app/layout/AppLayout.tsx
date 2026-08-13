import {Outlet, useLocation} from "react-router-dom";
import {Topbar} from "@/app/layout/TopBar.tsx";
import {Footer} from "@/app/layout/Footer.tsx";


export function AppLayout() {
  const {pathname} = useLocation();
  const hideFooter = pathname === "/main";

  return (
    <div className="">
      <Topbar></Topbar>
      <Outlet/>
      {!hideFooter && <Footer></Footer>}
    </div>
  );
}