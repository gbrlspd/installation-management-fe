import React, { FormEvent, useContext, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Button, Card, Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';

import { AuthContext } from '@/contexts/AuthContext';
import logo from '../../public/logo.png';
import { unauthenticatedPage } from '@/authentication/unauthenticatedPage';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(AuthContext);

  async function handleLogin(event: FormEvent) {
    setLoading(true);
    event.preventDefault();
    await loginUser({ username, password });
    setLoading(false);
  }

  return (
    <React.Fragment>
      <Head>
        <title>Installation Management</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container className='vh-100 align-items-center d-flex justify-content-md-center'>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Image
                  className='m-4'
                  src={logo}
                  alt='Installation Management'
                  height={120}
                  quality={100}
                  priority={true}
                />
              </Card.Header>
              <Card.Body>
                <Card.Title className='text-center py-2'>
                  Installation Management
                  <i aria-hidden={true} className='fas fa-tools ms-2'></i>
                </Card.Title>
                <Form onSubmit={handleLogin}>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text>
                      <i aria-hidden={true} className='fas fa-user'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      placeholder='Username'
                      required={true}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text>
                      <i aria-hidden={true} className='fas fa-lock'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='password'
                      placeholder='••••••••'
                      required={true}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                  <div className='d-grid'>
                    <Button variant='info' type='submit' disabled={loading}>
                      Login
                      {loading && <Spinner size='sm' className='ms-2'></Spinner>}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = unauthenticatedPage(async (ctx) => {
  return {
    props: {},
  };
});
