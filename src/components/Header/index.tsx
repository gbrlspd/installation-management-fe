import React from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='#home'>
          <i aria-hidden={true} className='fas fa-tools me-2'></i>
          Installation Management
        </Navbar.Brand>
        <Button className='d-flex align-items-center' variant='danger'>
          Logout
          <i aria-hidden={true} className='fas fa-sign-out ms-2'></i>
        </Button>
      </Container>
    </Navbar>
  );
}
