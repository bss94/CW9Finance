import {Container, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const Toolbar = () => {
  return (
    <Navbar bg="success" data-bs-theme="dark">
      <Container>
        <NavLink className="navbar-brand" to="/">
         Finance Tracker
        </NavLink>
        <NavLink className="nav-link" to="/categories">
          categories
        </NavLink>

      </Container>
    </Navbar>
  );
};

export default Toolbar;