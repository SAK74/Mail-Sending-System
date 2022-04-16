import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
   return <div className="dashboard">
      <nav>
         <NavLink to="/subscribers">Subscribers</NavLink>
         <NavLink to="mails">E-mails</NavLink>
      </nav>
      <hr />
      <Outlet />
   </div>
}