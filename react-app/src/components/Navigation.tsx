import { NavLink } from 'react-router';


function Navigation() {
  return (
    <nav className="navigation">
      <NavLink
        to="/" end
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        Home
      </NavLink>

      <NavLink
        to="/users"
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        Users
      </NavLink>

      <NavLink
        to="/api-users"
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        API Users
      </NavLink>
    </nav>
  );
}

export default Navigation;