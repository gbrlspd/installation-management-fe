import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { AuthContext } from '@/contexts/AuthContext';

export default function Header() {
  const { user, logoutUser } = useContext(AuthContext);
  const router = useRouter();

  return (
    <Navbar className='navbar mb-3' bg='primary' expand='lg' variant='dark'>
      <Container>
        <Navbar.Brand>
          <i aria-hidden={true} className='fas fa-tools me-2'></i>
          Installation Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link active={router.pathname == '/companies' ? true : false} href='/companies'>
              Companies
            </Nav.Link>
            <Nav.Link active={router.pathname == '/stores' ? true : false} href='/stores'>
              Stores
            </Nav.Link>
            <Nav.Link active={router.pathname == '/users' ? true : false} href='/users'>
              Users
            </Nav.Link>
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
