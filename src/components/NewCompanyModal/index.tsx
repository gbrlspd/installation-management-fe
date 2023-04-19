import React, { FormEvent, useState } from 'react';
import { Button, Col, Form, InputGroup, Modal, Row, Spinner } from 'react-bootstrap';

export interface INewCompany {
  prefix: string;
  name: string;
  country: string;
}

export interface INewCompanyModalProps {
  loading: boolean;
  isOpen: boolean;
  onSubmit: (data: INewCompany) => void;
  refreshTable: () => void;
  toggleRegisterModal: () => void;
}

export default function NewCompanyModal(props: INewCompanyModalProps) {
  const initialState = { prefix: '', name: '', country: '' };
  const [newCompany, setNewCompany] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCompany({ ...newCompany, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    props.onSubmit(newCompany);
    props.toggleRegisterModal();
    props.refreshTable();
    setNewCompany(initialState);
  };

  return (
    <Modal show={props.isOpen} onHide={props.toggleRegisterModal} size='lg'>
      <Form onSubmit={handleSubmit}>
        <Modal.Header className='bg-light'>
          <Modal.Title>New Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='g-3'>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>Prefix</InputGroup.Text>
                <Form.Control
                  name='prefix'
                  required={true}
                  value={newCompany.prefix}
                  onChange={handleInputChange}
                  placeholder='I4'
                />
              </InputGroup>
            </Col>
            <Col md={9}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>Country</InputGroup.Text>
                <Form.Control
                  name='country'
                  required={true}
                  value={newCompany.country}
                  onChange={handleInputChange}
                  placeholder='South Africa'
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup>
                <InputGroup.Text>Name</InputGroup.Text>
                <Form.Control
                  name='name'
                  required={true}
                  value={newCompany.name}
                  onChange={handleInputChange}
                  placeholder='Fun Company'
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
