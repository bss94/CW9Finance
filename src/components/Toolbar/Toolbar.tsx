import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {openAddTransaction} from '../../store/transactionSlice';
import {useDispatch} from 'react-redux';

const Toolbar = () => {
  const dispatch = useDispatch();
  return (
    <Navbar bg="success" data-bs-theme="dark">
      <Container>
        <NavLink className="navbar-brand" to="/">
          Finance Tracker
        </NavLink>
        <Nav>
          <NavLink className="nav-link" to="/categories">
            Categories
          </NavLink>
          <Button variant="link" className="nav-link" onClick={() => dispatch(openAddTransaction())}>Add
            Transaction</Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Toolbar;