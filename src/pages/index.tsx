import Head from 'next/head';
import { Button, Card, Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';

import logo from '../../public/logo.png';
import Image from 'next/image';
import React from 'react';

export default function Home() {
  const loading: boolean = false;

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
                <Form>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text>
                      <i aria-hidden={true} className='fas fa-user'></i>
                    </InputGroup.Text>
                    <Form.Control type='text' placeholder='Username' />
                  </InputGroup>
                  <InputGroup className='mb-3'>
                    <InputGroup.Text>
                      <i aria-hidden={true} className='fas fa-lock'></i>
                    </InputGroup.Text>
                    <Form.Control type='password' placeholder='Password' />
                  </InputGroup>
                  <div className='d-grid'>
                    <Button type='submit' disabled={loading}>
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
