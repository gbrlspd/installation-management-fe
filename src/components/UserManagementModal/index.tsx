import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Modal, Row, Spinner } from 'react-bootstrap';
import { IUserProps, IUserUpdate } from '@/interfaces/user';
import { ICompanyProps } from '@/interfaces/company';

export interface IUserManagementModalProps {
  user: IUserProps;
  companiesList: ICompanyProps[];
  show: boolean;
  loading: boolean;
  onSubmit: (id: string, data: IUserUpdate) => void;
  onRefresh: () => void;
  onClose: () => void;
}

export default function UserManagementModal(props: IUserManagementModalProps) {
  const { id, company_prefix, username, email } = props.user;
  const initialUserState = { company_prefix: company_prefix, username: username, email: email, password: '' };
  const [userUpdate, setUserUpdate] = useState(initialUserState);
  const [passwordLocked, setPasswordLocked] = useState(true);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserUpdate({ ...userUpdate, [name]: value });
  }

  function handleSubmit(event: FormEvent) {
    const updatedFields: IUserUpdate = {};
    event.preventDefault();

    if (userUpdate.company_prefix !== initialUserState.company_prefix) {
      updatedFields.company_prefix = userUpdate.company_prefix;
    }
    if (userUpdate.username !== initialUserState.username) {
      updatedFields.username = userUpdate.username;
    }
    if (userUpdate.email !== initialUserState.email) {
      updatedFields.email = userUpdate.email;
    }
    if (userUpdate.password !== '' && userUpdate.password !== initialUserState.password) {
      updatedFields.password = userUpdate.password;
    }

    props.onSubmit(id, updatedFields);
    props.onClose();
    props.onRefresh();
    setUserUpdate(initialUserState);
  }

  useEffect(() => {
    setUserUpdate({
      company_prefix: props.user.company_prefix,
      username: props.user.username,
      email: props.user.email,
      password: '',
    });
  }, [props.user]);

  return (
    <Modal show={props.show} onHide={props.onClose} size='lg'>
      <Form onSubmit={handleSubmit}>
        <Modal.Header className='bg-light'>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='g-3'>
            <Col md={3}>
              <Form.Select name='company_prefix' value={userUpdate.company_prefix} onChange={handleInputChange}>
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
                <Form.Control name='email' type='text' value={userUpdate.email} onChange={handleInputChange} />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-3'>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Username</InputGroup.Text>
                <Form.Control name='username' type='text' value={userUpdate.username} onChange={handleInputChange} />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Password</InputGroup.Text>
                <Form.Control
                  disabled={passwordLocked}
                  name='password'
                  type='text'
                  value={userUpdate.password}
                  onChange={handleInputChange}
                />
                <Button variant='warning' id='button-addon2' onClick={() => setPasswordLocked(!passwordLocked)}>
                  {passwordLocked ? <i className='fas fa-unlock'></i> : <i className='fas fa-lock'></i>}
                </Button>
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
              Edit
              {props.loading && <Spinner size='sm' className='ms-2'></Spinner>}
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
