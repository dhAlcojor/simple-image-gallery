import {useMemo, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import cn from "classnames";
import {useAuthContext} from "../context/AuthContext";
import {useFirestoreContext} from "../context/FirestoreContext";

const LogIn = () => {
  const {currentUser, login} = useAuthContext();

  return currentUser === null && (
      <button type="button" className="btn btn-warning" onClick={login}>
        Login
      </button>
  );
};

const LogOut = () => {
  const {currentUser, logout} = useAuthContext();

  return currentUser !== null && (
      <button type="button" className="btn btn-danger" onClick={logout}>
        Logout
      </button>
  );
};

const Navigation = () => {
  const {currentUser} = useAuthContext()
  const {pathname} = useLocation();
  return (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={cn("nav-link", {active: pathname === "/"})} aria-current="page" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className={cn("nav-link", {active: pathname === "/stockimages"})} to="/stockimages">
            My Stock Images
          </Link>
        </li>
        {currentUser && (
            <li className="nav-item">
              <Link className={cn("nav-link", {active: pathname === "/profile"})} to="/profile">
                Profile
              </Link>
            </li>
        )}
      </ul>
  );
};

const SearchForm = () => {
  const [text, search] = useState(null);
  const {filterItems} = useFirestoreContext();
  const handleOnChange = (event) => {
    search(event.target.value);
    filterItems(event.target.value);
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    filterItems(text);
  };

  return (
      <form className="d-flex" onSubmit={handleOnSubmit}>
        <input
            onChange={handleOnChange}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
  );
};

const Dropdown = () => {
  const {currentUser} = useAuthContext();
  const username = useMemo(() => {
    return currentUser?.displayName || "Profile";
  }, [currentUser]);
  const avatar = useMemo(() => {
    return currentUser !== null ? (
        <img
            src={currentUser.photoURL}
            className="rounded-circle"
            width="34"
            height="34"
            alt={username}
        />
    ) : "Login";
  }, [currentUser]);

  return (
      <ul className="navbar-nav mb-2 mb-lg-0">
        {" "}
        <li className="nav-item dropdown">
          <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
          >
            {avatar}
          </a>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li>
              <a className="dropdown-item text-center" href="#">
                {currentUser && <Link to="/profile">{username}</Link>}
              </a>
            </li>
            <li>
              <hr className="dropdown divider"/>
            </li>
            <div className="d-flex justify-content-center">
              <LogIn/><LogOut/>
            </div>
          </ul>
        </li>
      </ul>
  );
};

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          ⚡ Firestock
        </a>
        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Navigation/>
          <SearchForm/>
          <Dropdown/>
        </div>
      </div>
    </nav>
);

export default Navbar;
