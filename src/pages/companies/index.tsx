import Head from 'next/head';
import React, { FormEvent, useState } from 'react';
import { GetServerSideProps } from 'next';
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

import { authenticatedPage } from '@/utils/authenticatedPage';
import Header from '@/components/Header';
import { api } from '@/services/apiClient';
import { apiConfiguration } from '@/services/api';
import Link from 'next/link';

interface CompanyProps {
  prefix: string;
  name: string;
  country: string;
  updated_at: string;
}

interface CompaniesProps {
  companies: CompanyProps[];
}

export default function Companies({ companies }: CompaniesProps) {
  const initialState = { prefix: '', name: '', country: '' };
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCompany, setNewCompany] = useState(initialState);
  const [companiesList, setCompaniesList] = useState(
    /* This function sorts an array alphabetically based on the given field */
    companies.slice().sort((a, b) => a.country.localeCompare(b.country)) || []
  );

  const toggleModal = () => setShow(!show);

  async function handleRegister(event: FormEvent) {
    setLoading(true);
    event.preventDefault();
    await api.post('/company', newCompany);
    toggleModal();
    setLoading(false);
    setNewCompany(initialState);
    handleRefresh();
  }

  async function handleRefresh() {
    const res = await api.get('/company');
    setCompaniesList(res.data.slice().sort((a, b) => a.country.localeCompare(b.country)));
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
              Companies
              <i aria-hidden={true} className='fas fa-landmark ms-2'></i>
              <Badge className='ms-2 fw-normal bg-info'>{companiesList.length}</Badge>
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
                    Country
                    <i aria-hidden={true} className='fas fa-arrow-down ms-2'></i>
                  </th>
                  <th className='text-center'>Prefix</th>
                  <th>Name</th>
                  <th>Updated at</th>
                  <th className='text-center'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {companiesList.map((company) => (
                  <tr key={company.prefix} className='align-middle'>
                    <td>{company.country}</td>
                    <td className='fw-bold text-center'>{company.prefix}</td>
                    <td className='fw-bold'>{company.name}</td>
                    <td>{company.updated_at.split('T')[0]}</td>
                    <td className='text-center'>
                      <OverlayTrigger overlay={<Tooltip>Info</Tooltip>}>
                        <Button size='sm' variant='info me-2'>
                          <i aria-hidden={true} className='fas fa-info-circle'></i>
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger overlay={<Tooltip>Manage</Tooltip>}>
                        <Link href={`/companies/${company.prefix}`}>
                          <Button size='sm' variant='success' className='me-2'>
                            <i aria-hidden={true} className='text-white fas fa-wrench'></i>
                          </Button>
                        </Link>
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
            <Modal.Title>New Company</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className='g-3'>
              <Col md={3}>
                <InputGroup className='mb-3'>
                  <InputGroup.Text>Prefix</InputGroup.Text>
                  <Form.Control
                    type='text'
                    required={true}
                    value={newCompany.prefix}
                    onChange={(e) => setNewCompany({ ...newCompany, prefix: e.target.value })}
                    placeholder='I4'
                  />
                </InputGroup>
              </Col>
              <Col md={9}>
                <InputGroup className='mb-3'>
                  <InputGroup.Text>Country</InputGroup.Text>
                  <Form.Control
                    type='text'
                    required={true}
                    value={newCompany.country}
                    onChange={(e) => setNewCompany({ ...newCompany, country: e.target.value })}
                    placeholder='South Africa'
                  />
                </InputGroup>
              </Col>
            </Row>
            <InputGroup>
              <InputGroup.Text>Name</InputGroup.Text>
              <Form.Control
                type='text'
                required={true}
                value={newCompany.name}
                onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                placeholder='Fun Company'
              />
            </InputGroup>
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
  const res = await api.get('/company');

  return {
    props: {
      companies: res.data,
    },
  };
});
