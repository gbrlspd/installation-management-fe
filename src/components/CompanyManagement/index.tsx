import React, { useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { ICompanyProps, ICompanyUpdate } from '@/interfaces/company';
import Link from 'next/link';

export interface ICompanyManagementProps {
  company: ICompanyProps;
  loading: boolean;
  onSubmit: (prefix: string, data: ICompanyUpdate) => void;
}

export default function CompanyManagement(props: ICompanyManagementProps) {
  const [companyUpdate, setCompanyUpdate] = useState(props.company);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setCompanyUpdate({ ...companyUpdate, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const updatedFields = {};
    for (const key in companyUpdate) {
      if (companyUpdate.hasOwnProperty(key) && companyUpdate[key] !== props.company[key]) {
        updatedFields[key] = companyUpdate[key];
      }
    }
    props.onSubmit(companyUpdate.prefix, updatedFields);
  }

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <Card.Body>
          <Row className='g-3'>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>Prefix</InputGroup.Text>
                <Form.Control type='text' disabled={true} value={companyUpdate.prefix} readOnly={true} />
                <InputGroup.Text>
                  <i aria-hidden={true} className='fas fa-lock'></i>
                </InputGroup.Text>
              </InputGroup>
            </Col>
            <Col md={5}>
              <InputGroup>
                <InputGroup.Text>Name</InputGroup.Text>
                <Form.Control name='name' type='text' value={companyUpdate.name} onChange={handleInputChange} />
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>Country</InputGroup.Text>
                <Form.Control name='country' type='text' value={companyUpdate.country} onChange={handleInputChange} />
              </InputGroup>
            </Col>
          </Row>
          <InputGroup className='mb-3'>
            <InputGroup.Text>CRM</InputGroup.Text>
            <Form.Control name='crm_url' type='text' value={companyUpdate.crm_url ?? ''} onChange={handleInputChange} />
          </InputGroup>
          <InputGroup className='mb-3'>
            <InputGroup.Text>OPB</InputGroup.Text>
            <Form.Control name='opb_url' type='text' value={companyUpdate.opb_url ?? ''} onChange={handleInputChange} />
          </InputGroup>
          <Row className='g-3'>
            <Col md={8}>
              <InputGroup>
                <InputGroup.Text>Validator</InputGroup.Text>
                <Form.Control
                  name='validator_code'
                  type='text'
                  value={companyUpdate.validator_code ?? ''}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Col>
            <Col md={4}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>Qty.</InputGroup.Text>
                <Form.Control
                  name='validator_qty'
                  type='text'
                  value={companyUpdate.validator_qty ?? ''}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-3'>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Owner Name</InputGroup.Text>
                <Form.Control
                  name='owner_name'
                  type='text'
                  value={companyUpdate.owner_name ?? ''}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Owner Email</InputGroup.Text>
                <Form.Control
                  name='owner_email'
                  type='text'
                  value={companyUpdate.owner_email ?? ''}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className='d-flex justify-content-between align-items-center py-3'>
          <small className='text-muted'>Updated at {companyUpdate.updated_at.split('T')[0]}</small>
          <div>
            <Link href={'/companies'}>
              <Button className='me-2' variant='secondary'>
                Return
              </Button>
            </Link>
            <Button variant='info' type='submit' disabled={props.loading}>
              Edit
              {props.loading && <Spinner size='sm' className='ms-2'></Spinner>}
            </Button>
          </div>
        </Card.Footer>
      </Form>
    </React.Fragment>
  );
}
