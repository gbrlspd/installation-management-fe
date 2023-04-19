import { IStoreProps } from '@/interfaces/store';
import Link from 'next/link';
import React from 'react';
import { Alert, Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';

export interface IStoreInfoModalProps {
  store: IStoreProps;
  show: boolean;
  onClose: () => void;
}

export default function StoreInfoModal(props: IStoreInfoModalProps) {
  const {
    company,
    id,
    name,
    city,
    status,
    installed_by,
    installed_at,
    migrated_by,
    migrated_at,
    router_model,
    server01_model,
    server02_model,
    esxi01_version,
    esxi02_version,
    nas_model,
    os,
    pos_qty,
    mpos_qty,
    kiosk_model,
    kiosk_qty,
    rms_qty,
    controllers_model,
    controllers_qty,
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
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>ID</InputGroup.Text>
                <Form.Control type='text' value={id} readOnly={true} />
              </InputGroup>
            </Col>
            <Col md={9}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>City</InputGroup.Text>
                <Form.Control type='text' value={city} readOnly={true} />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-3'>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>Status</InputGroup.Text>
                <Form.Control type='text' value={status} readOnly={true} />
              </InputGroup>
            </Col>
            <Col md={9}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>OS</InputGroup.Text>
                <Form.Control type='text' disabled={os ? false : true} value={os ? os : 'N/A'} readOnly={true} />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-3'>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Installed by</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={installed_by ? false : true}
                  value={installed_by ? installed_by : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>Installed at</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={installed_at ? false : true}
                  value={installed_at ? installed_at : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-3'>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Migrated by</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={migrated_by ? false : true}
                  value={migrated_by ? migrated_by : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>Migrated at</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={migrated_at ? false : true}
                  value={migrated_at ? migrated_at : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-3'>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Router Model</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={router_model ? false : true}
                  value={router_model ? router_model : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>NAS Model</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={nas_model ? false : true}
                  value={nas_model ? nas_model : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-3'>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Server01 Model</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={server01_model ? false : true}
                  value={server01_model ? server01_model : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>Server02 Model</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={server02_model ? false : true}
                  value={server02_model ? server02_model : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-3'>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>ESXi01 Version</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={esxi01_version ? false : true}
                  value={esxi01_version ? esxi01_version : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>ESXi02 Version</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={esxi02_version ? false : true}
                  value={esxi02_version ? esxi02_version : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-3'>
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>POS</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={pos_qty ? false : true}
                  value={pos_qty ? pos_qty : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text>mPOS</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={mpos_qty ? false : true}
                  value={mpos_qty ? mpos_qty : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>RMS</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={rms_qty ? false : true}
                  value={rms_qty ? rms_qty : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-3'>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Kiosk Model</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={kiosk_model ? false : true}
                  value={kiosk_model ? kiosk_model : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>Qty.</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={kiosk_qty ? false : true}
                  value={kiosk_qty ? kiosk_qty : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-3'>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Controllers</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={controllers_model ? false : true}
                  value={controllers_model ? controllers_model : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Qty.</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={controllers_qty ? false : true}
                  value={controllers_qty ? controllers_qty : 'N/A'}
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
