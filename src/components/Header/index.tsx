import { AuthContext } from '@/contexts/AuthContext';
import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

export default function Header() {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <Navbar className='mb-3' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand>
          <i aria-hidden={true} className='fas fa-tools me-2'></i>
          Installation Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/companies'>Companies</Nav.Link>
            <Nav.Link href='/stores'>Stores</Nav.Link>
            <Nav.Link href='/users'>Users</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className='justify-content-end' onClick={logoutUser}>
              {user?.username}
              <i aria-hidden={true} className='fas fa-sign-out ms-2'></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
