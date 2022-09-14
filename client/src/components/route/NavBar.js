import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchBar from "../pages/SearchBar";
import Logout from "../buttons/Logout";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const NavBar = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <Navbar expand="xl" className="sticky-top" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/" >
        RECIPE BOOK
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link as={Link} to="/browse">
            Browse Recipe
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/random">
            Random Recipe
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav className="mr-auto">
        <SearchBar />
      </Nav>
      <Nav>
        <Nav.Link as={Link} to="/about">
          About
        </Nav.Link>
      </Nav>
      {user ? (
        user.username === "NOT_LOGGED_IN" ? (
          <Nav>
            <Nav.Item>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
            </Nav.Item>
          </Nav>
        ) : (
          <Nav>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/fave">
                My Favourite
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/planner">
                My Planner
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/recipe/user">
                My Recipes
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/recipe/new">
                Add New Recipe
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
              <Logout />
            </Nav.Item>
          </Nav>
        )
      ) : null}
    </Navbar>
  );
};

export default NavBar;
