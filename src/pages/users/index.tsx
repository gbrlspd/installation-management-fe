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
  Table,
  Tooltip,
} from 'react-bootstrap';
import { apiConfiguration } from '@/services/api';
import { api } from '@/services/apiClient';

interface UserProps {
  company: {
    name: string;
  };
  id: string;
  username: string;
  email: string;
  updated_at: string;
}

interface UsersProps {
  users: UserProps[];
}

export default function Users({ users }: UsersProps) {
  const initialState = { company_prefix: '', username: '', email: '', password: '' };
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState(initialState);
  const [usersList, setUsersList] = useState(
    /* This function sorts an array alphabetically based on the given field */
    users.slice().sort((a, b) => a.company.name.localeCompare(b.company.name)) || []
  );

  const toggleModal = () => setShow(!show);

  async function handleRegister(event: FormEvent) {
    setLoading(true);
    event.preventDefault();
    await api.post('/user', newUser);
    toggleModal();
    setLoading(false);
    setNewUser(initialState);
    handleRefresh();
  }

  async function handleRefresh() {
    const res = await api.get('/user');
    setUsersList(res.data.slice().sort((a, b) => a.company.name.localeCompare(b.company.name)));
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
              Users
              <i aria-hidden={true} className='fas fa-user-friends ms-2'></i>
              <Badge className='ms-2 fw-normal bg-info'>{usersList.length}</Badge>
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
            <Table hover={true} className='mb-0'>
              <thead className='bg-primary text-white'>
                <tr>
                  <th>
                    Company
                    <i aria-hidden={true} className='fas fa-arrow-down ms-2'></i>
                  </th>
                  <th>UUID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Updated at</th>
                  <th className='text-center'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user) => (
                  <tr key={user.id} className='align-middle'>
                    <td>{user.company.name}</td>
                    <td>{user.id}</td>
                    <td className='fw-bold'>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.updated_at.split('T')[0]}</td>
                    <td className='text-center'>
                      <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                        <Button size='sm' variant='success' className='me-2'>
                          <i aria-hidden={true} className='text-white fas fa-wrench'></i>
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                        <Button size='sm' variant='danger'>
                          <i aria-hidden={true} className='fas fa-trash'></i>
                        </Button>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
