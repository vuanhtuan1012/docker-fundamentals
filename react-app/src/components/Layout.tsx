import { Outlet } from "react-router";
import Navigation from "./Navigation";


function Layout() {
  return (
    <div className="app-layout">
      <Navigation />

      <main className="app">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;