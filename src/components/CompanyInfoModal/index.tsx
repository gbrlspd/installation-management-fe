import React from 'react';
import { Alert, Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { ICompanyProps } from '@/interfaces/company';

export interface ICompanyInfoModalProps {
  company: ICompanyProps;
  show: boolean;
  onClose: () => void;
}

export default function CompanyInfoModal(props: ICompanyInfoModalProps) {
  const { prefix, name, country, crm_url, opb_url, validator_code, validator_qty, owner_name, owner_email } =
    props.company;

  return (
    <Modal show={props.show} onHide={props.onClose} size='lg'>
      <Form>
        <Modal.Header className='bg-light'>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant='warning'>
            The information shown here is read-only, go to the management page to change it
            <i aria-hidden={true} className='fas fa-lock ms-2'></i>
          </Alert>
          <Row className='g-3'>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>Prefix</InputGroup.Text>
                <Form.Control type='text' value={prefix} readOnly={true} />
              </InputGroup>
            </Col>
            <Col md={9}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>Country</InputGroup.Text>
                <Form.Control type='text' value={country} readOnly={true} />
              </InputGroup>
            </Col>
          </Row>
          <InputGroup className='mb-3'>
            <InputGroup.Text>CRM</InputGroup.Text>
            <Form.Control
              type='text'
              disabled={crm_url ? false : true}
              value={crm_url ? crm_url : 'N/A'}
              readOnly={true}
            />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Text>OPB</InputGroup.Text>
            <Form.Control
              type='text'
              disabled={opb_url ? false : true}
              value={opb_url ? opb_url : 'N/A'}
              readOnly={true}
            />
          </InputGroup>
          <Row className='g-3'>
            <Col md={8}>
              <InputGroup>
                <InputGroup.Text>Validator</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={validator_code ? false : true}
                  value={validator_code ? validator_code : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>Qty.</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={validator_qty ? false : true}
                  value={validator_qty ? validator_qty : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-3'>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Owner Name</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={owner_name ? false : true}
                  value={owner_name ? owner_name : 'N/A'}
                  readOnly={true}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Owner Email</InputGroup.Text>
                <Form.Control
                  type='text'
                  disabled={owner_email ? false : true}
                  value={owner_email ? owner_email : 'N/A'}
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
            <Button variant='info' type='submit'>
              Edit
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
