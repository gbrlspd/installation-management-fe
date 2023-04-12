import Head from 'next/head';
import React from 'react';
import { GetServerSideProps } from 'next';
import { authenticatedPage } from '@/utils/authenticatedPage';
import Header from '@/components/Header';
import { Button, Card, Container, Form, InputGroup } from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function Stores() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <React.Fragment>
      <Head>
        <title>Installation Management</title>
      </Head>
      <Header />
      <Container>
        <Card>
          <Card.Header>
            <Card.Title className='mt-2 mb-3'>
              ID: {id}
              <i aria-hidden={true} className='fas fa-store ms-2'></i>
            </Card.Title>
            <Form className='d-flex mb-2'>
              <InputGroup>
                <InputGroup.Text>
                  <i aria-hidden={true} className='fas fa-search'></i>
                </InputGroup.Text>
                <Form.Control type='text' placeholder='Search...' />
              </InputGroup>
              <Button variant='success' className='ms-2'>
                <i aria-hidden={true} className='fas fa-plus'></i>
              </Button>
            </Form>
          </Card.Header>
          <Card.Body></Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = authenticatedPage(async (ctx) => {
  return {
    props: {},
  };
});
