import {Outlet} from "react-router-dom";



export function AppLayout() {
  return (
    <div className="">
      <Outlet />
    </div>
  );
}