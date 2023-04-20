import React from 'react';
import Link from 'next/link';
import { Alert, Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { IStoreProps } from '@/interfaces/store';

export interface IStoreCredentialsModalProps {
  store: IStoreProps;
  show: boolean;
  onClose: () => void;
}

export default function StoreCredentialsModal(props: IStoreCredentialsModalProps) {
  const {
    id,
    company,
    name,
    router_user,
    router_password,
    esxi01_ip,
    esxi01_user,
    esxi01_password,
    esxi02_ip,
    esxi02_user,
    esxi02_password,
    nas_user,
    nas_password,
    os_user,
    os_password,
  } = props.store;

  return (
    <Modal show={props.show} onHide={props.onClose} size='lg'>
      <Form>
        <Modal.Header className='bg-light'>
          <Modal.Title>
            {name}
            <small className='text-muted ms-2'>{company.name}</small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant='warning'>
            The information shown here is read-only, go to the management page to change it
            <i aria-hidden={true} className='fas fa-lock ms-2'></i>
          </Alert>
          <Row className='g-3'>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Router User</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={router_user ? false : true}
                  value={router_user ? router_user : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>Router Password</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={router_password ? false : true}
                  value={router_password ? router_password : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-3'>
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>ESXi01 IP</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={esxi01_ip ? false : true}
                  value={esxi01_ip ? esxi01_ip : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>ESXi01 User</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={esxi01_user ? false : true}
                  value={esxi01_user ? esxi01_user : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>ESXi01 Password</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={esxi01_password ? false : true}
                  value={esxi01_password ? esxi01_password : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-3'>
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>ESXi02 IP</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={esxi02_ip ? false : true}
                  value={esxi02_ip ? esxi02_ip : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>ESXi02 User</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={esxi02_user ? false : true}
                  value={esxi02_user ? esxi02_user : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>ESXi02 Password</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={esxi02_password ? false : true}
                  value={esxi02_password ? esxi02_password : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-3'>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>NAS User</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={nas_user ? false : true}
                  value={nas_user ? nas_user : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>NAS Password</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={nas_password ? false : true}
                  value={nas_password ? nas_password : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-3'>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Windows User</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={os_user ? false : true}
                  value={os_user ? os_user : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>Windows Password</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={os_password ? false : true}
                  value={os_password ? os_password : 'N/A'}
                  readOnly={true}
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
            <Link href={`/stores/${id}`}>
              <Button variant='info' type='submit'>
                Edit
              </Button>
            </Link>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
