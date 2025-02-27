import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary p-2 px-4">
      <div className="container-fluid">
        <Link className="navbar-brand flex-grow-1 ">
          <img
            src="https://icons.iconarchive.com/icons/jeanette-foshee/simpsons-06/32/Townspeople-Secret-Service-guy-icon.png"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top mx-2"
          />
          URL Shortening
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <NavLink to="/new" className="nav-link" aria-current="page">
                New
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/update" className="nav-link">
                Update
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/delete" className="nav-link">
                Delete
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/stats" className="nav-link">
                Stats
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
