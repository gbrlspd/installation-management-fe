import Head from 'next/head';
import React, { FormEvent, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { authenticatedPage } from '@/authentication/authenticatedPage';
import { api } from '@/services/apiClient';
import { apiConfiguration } from '@/services/api';
import { IUser } from '@/interfaces/user';
import Header from '@/components/Header';
import UsersTable from '@/components/UsersTable';

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

interface IUserPage {
  users: IUser[];
}

export default function Users({ users }: IUserPage) {
  const initialState = { company_prefix: '', username: '', email: '', password: '' };
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [newUser, setNewUser] = useState(initialState);
  const [usersList, setUsersList] = useState(users || []);
  const toggleModal = () => setShow(!show);

  async function filterBySearch({ users, search }) {
    const tempUsers = users.filter(
      (user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.company.name.toLowerCase().includes(search.toLowerCase())
    );
    /* This function sorts an array alphabetically based on the given field */
    setUsersList(tempUsers.slice().sort((a, b) => a.company.name.localeCompare(b.company.name)));
  }

  async function handleRefresh() {
    const res = await api.get('/user');
    setUsersList(res.data.slice().sort((a, b) => a.company.name.localeCompare(b.company.name)));
  }

  async function handleRegister(event: FormEvent) {
    setLoading(true);
    event.preventDefault();
    await api.post('/user', newUser);
    toggleModal();
    setLoading(false);
    setNewUser(initialState);
    handleRefresh();
  }

  useEffect(() => {
    filterBySearch({ users, search });
  }, [users, search]);

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
              Users
              <i aria-hidden={true} className='fas fa-user-friends ms-2'></i>
              <Badge className='ms-2 fw-normal bg-info'>{usersList.length}</Badge>
            </Card.Title>
            <Form className='d-flex mb-2'>
              <InputGroup>
                <InputGroup.Text>
                  <i aria-hidden={true} className='fas fa-search'></i>
                </InputGroup.Text>
                <Form.Control
                  type='text'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search...'
                />
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
            <UsersTable usersList={usersList} refresh={handleRefresh} />
          </Card.Body>
        </Card>
      </Container>

      <Modal show={show} onHide={toggleModal} size='lg'>
        <Form onSubmit={handleRegister}>
          <Modal.Header className='bg-light'>
            <Modal.Title>New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className='g-3'>
              <Col md={3}>
                <InputGroup className='mb-3'>
                  <InputGroup.Text>Prefix</InputGroup.Text>
                  <Form.Control
                    required={true}
                    value={newUser.company_prefix}
                    onChange={(e) => setNewUser({ ...newUser, company_prefix: e.target.value })}
                    placeholder='U0'
                  />
                </InputGroup>
              </Col>
              <Col md={9}>
                <InputGroup className='mb-3'>
                  <InputGroup.Text>Email</InputGroup.Text>
                  <Form.Control
                    required={true}
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder='gabriel.spada@lanevo.com.br'
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row className='g-3'>
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text>Username</InputGroup.Text>
                  <Form.Control
                    required={true}
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    placeholder='gspada'
                  />
                </InputGroup>
              </Col>
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text>Password</InputGroup.Text>
                  <Form.Control
                    required={true}
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    type='password'
                    placeholder='••••••••'
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
  const res = await api.get('/user');

  return {
    props: {
      users: res.data,
    },
  };
});
