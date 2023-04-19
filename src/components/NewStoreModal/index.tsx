import React, { FormEvent, useState } from 'react';
import { ICompanyProps } from '@/interfaces/company';
import { Button, Col, Form, InputGroup, Modal, Row, Spinner } from 'react-bootstrap';

export interface INewStore {
  id: string;
  company_prefix: string;
  name: string;
  city: string;
  status: string;
}

export interface INewStoreModalProps {
  loading: boolean;
  isOpen: boolean;
  companiesList: ICompanyProps[];
  onSubmit: (data: INewStore) => void;
  refreshTable: () => void;
  toggleRegisterModal: () => void;
}

export default function NewStoreModal(props: INewStoreModalProps) {
  const initialState = { id: '', company_prefix: '', name: '', city: '', status: '' };
  const [newStore, setNewStore] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStore({ ...newStore, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    props.onSubmit(newStore);
    props.toggleRegisterModal();
    props.refreshTable();
    setNewStore(initialState);
  };

  return (
    <Modal show={props.isOpen} onHide={props.toggleRegisterModal} size='lg'>
      <Form onSubmit={handleSubmit}>
        <Modal.Header className='bg-light'>
          <Modal.Title>New Store</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='g-3'>
            <Col md={3}>
              <Form.Select name='company_prefix' value={newStore.company_prefix} onChange={handleInputChange}>
                <option>Company</option>
                {props.companiesList
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((company) => (
                    <option key={company.prefix} value={company.prefix}>
                      {company.name}
                    </option>
                  ))}
              </Form.Select>
            </Col>
            <Col md={3}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>ID</InputGroup.Text>
                <Form.Control
                  name='id'
                  required={true}
                  value={newStore.id}
                  onChange={handleInputChange}
                  placeholder='JH'
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>City</InputGroup.Text>
                <Form.Control
                  name='city'
                  required={true}
                  value={newStore.city}
                  onChange={handleInputChange}
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
                  name='name'
                  required={true}
                  value={newStore.name}
                  onChange={handleInputChange}
                  placeholder='Menlyn'
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>Status</InputGroup.Text>
                <Form.Control
                  name='status'
                  required={true}
                  value={newStore.status}
                  onChange={handleInputChange}
                  placeholder='Operational'
                />
              </InputGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className='bg-light'>
          <Button variant='danger' onClick={props.toggleRegisterModal}>
            Cancel
          </Button>
          <div className='d-grid'>
            <Button variant='info' type='submit' disabled={props.loading}>
              Create
              {props.loading && <Spinner size='sm' className='ms-2'></Spinner>}
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
