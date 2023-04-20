import React, { FormEvent, useState } from 'react';
import { Button, Col, Form, InputGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { INewUser } from '@/interfaces/user';
import { ICompanyProps } from '@/interfaces/company';

export interface INewUserModalProps {
  companiesList: ICompanyProps[];
  show: boolean;
  loading: boolean;
  onSubmit: (data: INewUser) => void;
  onRefresh: () => void;
  onClose: () => void;
}

export default function NewUserModal(props: INewUserModalProps) {
  const initialState = { company_prefix: '', username: '', email: '', password: '' };
  const [newUser, setNewUser] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    props.onSubmit(newUser);
    props.onClose();
    props.onRefresh();
    setNewUser(initialState);
  };

  return (
    <Modal show={props.show} onHide={props.onClose} size='lg'>
      <Form onSubmit={handleSubmit}>
        <Modal.Header className='bg-light'>
          <Modal.Title>New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='g-3'>
            <Col md={3}>
              <Form.Select name='company_prefix' value={newUser.company_prefix} onChange={handleInputChange}>
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
            <Col md={9}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>Email</InputGroup.Text>
                <Form.Control
                  name='email'
                  required={true}
                  value={newUser.email}
                  onChange={handleInputChange}
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
                  name='username'
                  required={true}
                  value={newUser.username}
                  onChange={handleInputChange}
                  placeholder='gspada'
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Password</InputGroup.Text>
                <Form.Control
                  name='password'
                  type='password'
                  required={true}
                  value={newUser.password}
                  onChange={handleInputChange}
                  placeholder='••••••••'
                />
              </InputGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className='bg-light'>
          <Button variant='danger' onClick={props.onClose}>
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
