import Head from 'next/head';
import React, { FormEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
import { authenticatedPage } from '@/utils/authenticatedPage';
import Header from '@/components/Header';
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Modal,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from 'react-bootstrap';
import { api } from '@/services/apiClient';
import { apiConfiguration } from '@/services/api';
import StoresTable from '@/components/StoresTable';

interface StoreProps {
  company: {
    name: string;
  };
  id: string;
  name: string;
  city: string;
  status: string;
  updated_at: string;
}

interface StoresProps {
  stores: StoreProps[];
}

export default function Stores({ stores }: StoresProps) {
  const initialState = { id: '', company_prefix: '', name: '', city: '', status: '' };
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newStore, setNewStore] = useState(initialState);
  const [storesList, setStoresList] = useState(
    /* This function sorts an array alphabetically based on the given field */
    stores.slice().sort((a, b) => a.company.name.localeCompare(b.company.name)) || []
  );

  const toggleModal = () => setShow(!show);

  async function handleRegister(event: FormEvent) {
    setLoading(true);
    event.preventDefault();
    await api.post('/store', newStore);
    toggleModal();
    setLoading(false);
    setNewStore(initialState);
    handleRefresh();
  }

  async function handleRefresh() {
    const res = await api.get('/store');
    setStoresList(res.data.slice().sort((a, b) => a.company.name.localeCompare(b.company.name)));
  }

  return (
    <React.Fragment>
      <Head>
        <title>Installation Management</title>
      </Head>
      <Header />
      <Container>
        <Card>
          <Card.Header>
            <Card.Title className='mt-2 mb-3 d-flex align-items-center'>
              Stores
              <i aria-hidden={true} className='fas fa-store ms-2'></i>
              <Badge className='ms-2 fw-normal bg-info'>{storesList.length}</Badge>
            </Card.Title>
            <Form className='d-flex mb-2'>
              <InputGroup>
                <InputGroup.Text>
                  <i aria-hidden={true} className='fas fa-search'></i>
                </InputGroup.Text>
                <Form.Control type='text' placeholder='Search...' />
              </InputGroup>
              <OverlayTrigger overlay={<Tooltip>New</Tooltip>}>
                <Button variant='success' className='ms-2' onClick={toggleModal}>
                  <i aria-hidden={true} className='fas fa-plus'></i>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger overlay={<Tooltip>Refresh</Tooltip>}>
                <Button variant='info' className='ms-2' onClick={handleRefresh}>
                  <i aria-hidden={true} className='fas fa-sync-alt'></i>
                </Button>
              </OverlayTrigger>
            </Form>
          </Card.Header>
          <Card.Body className='p-0'>
            <StoresTable storesList={storesList} />
          </Card.Body>
        </Card>
      </Container>

      <Modal show={show} onHide={toggleModal} size='lg'>
        <Form onSubmit={handleRegister}>
          <Modal.Header className='bg-light'>
            <Modal.Title>New Store</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className='g-3'>
              <Col md={3}>
                <InputGroup className='mb-3'>
                  <InputGroup.Text>Prefix</InputGroup.Text>
                  <Form.Control
                    required={true}
                    value={newStore.company_prefix}
                    onChange={(e) => setNewStore({ ...newStore, company_prefix: e.target.value })}
                    placeholder='I4'
                  />
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup className='mb-3'>
                  <InputGroup.Text>ID</InputGroup.Text>
                  <Form.Control
                    required={true}
                    value={newStore.id}
                    onChange={(e) => setNewStore({ ...newStore, id: e.target.value })}
                    placeholder='JH'
                  />
                </InputGroup>
              </Col>
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text>City</InputGroup.Text>
                  <Form.Control
                    required={true}
                    value={newStore.city}
                    onChange={(e) => setNewStore({ ...newStore, city: e.target.value })}
                    placeholder='Pretoria'
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row className='g-3'>
              <Col md={8}>
                <InputGroup>
                  <InputGroup.Text>Name</InputGroup.Text>
                  <Form.Control
                    required={true}
                    value={newStore.name}
                    onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                    placeholder='Menlyn'
                  />
                </InputGroup>
              </Col>
              <Col md={4}>
                <InputGroup>
                  <InputGroup.Text>Status</InputGroup.Text>
                  <Form.Control
                    required={true}
                    value={newStore.status}
                    onChange={(e) => setNewStore({ ...newStore, status: e.target.value })}
                    placeholder='Operational'
                  />
                </InputGroup>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className='bg-light'>
            <Button variant='danger' onClick={toggleModal}>
              Cancel
            </Button>
            <div className='d-grid'>
              <Button variant='info' type='submit' disabled={loading}>
                Save Changes
                {loading && <Spinner size='sm' className='ms-2'></Spinner>}
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = authenticatedPage(async (ctx) => {
  const api = apiConfiguration(ctx);
  const res = await api.get('/store');

  return {
    props: {
      stores: res.data,
    },
  };
});