import React, { useState } from 'react';
import Link from 'next/link';
import { Accordion, Badge, Button, Card, Col, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { IStoreProps, IStoreUpdate } from '@/interfaces/store';
import { ICompanyProps } from '@/interfaces/company';

export interface IStoreManagementProps {
  store: IStoreProps;
  companiesList: ICompanyProps[];
  loading: boolean;
  onSubmit: (prefix: string, data: IStoreUpdate) => void;
}

export default function StoreManagement(props: IStoreManagementProps) {
  const [storeUpdate, setStoreUpdate] = useState(props.store);

  function handleInputChange(event) {
    const { name, value } = event.target;
    const numberFields = ['pos_qty', 'mpos_qty', 'kiosk_qty', 'rms_qty', 'controllers_qty'];
    let parsedValue = value;

    /* Converts the values of the inputs that have names defined within the array to integer values,
    thus preventing a number as a string from being passed to the request */
    if (numberFields.includes(name)) {
      parsedValue = parseInt(value);
      if (isNaN(parsedValue)) {
        parsedValue = null;
      }
    }
    setStoreUpdate({ ...storeUpdate, [name]: parsedValue });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const updatedFields = {};
    /* If there are any differences between the updated values and the original values, 
    these differences are added to the object that will be sent to the request */
    for (const key in storeUpdate) {
      if (storeUpdate.hasOwnProperty(key) && storeUpdate[key] !== props.store[key]) {
        updatedFields[key] = storeUpdate[key];
      }
    }
    props.onSubmit(storeUpdate.id, updatedFields);
  }

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <Card.Body>
          <Row className='g-3'>
            <Col md={3}>
              <Form.Select name='company_prefix' value={storeUpdate.company_prefix} onChange={handleInputChange}>
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
              <InputGroup>
                <InputGroup.Text>Prefix</InputGroup.Text>
                <Form.Control type='text' disabled={true} value={storeUpdate.id} readOnly={true} />
                <InputGroup.Text>
                  <i aria-hidden={true} className='fas fa-lock'></i>
                </InputGroup.Text>
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>Name</InputGroup.Text>
                <Form.Control name='name' type='text' value={storeUpdate.name} onChange={handleInputChange} />
              </InputGroup>
            </Col>
          </Row>
          <Row className='g-3'>
            <Col md={6}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>City</InputGroup.Text>
                <Form.Control name='city' type='text' value={storeUpdate.city} onChange={handleInputChange} />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className='mb-3'>
                <InputGroup.Text>Status</InputGroup.Text>
                <Form.Control name='status' type='text' value={storeUpdate.status} onChange={handleInputChange} />
              </InputGroup>
            </Col>
          </Row>

          <Accordion defaultActiveKey={['0']} flush={false} alwaysOpen={true}>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>
                Store Info
                <Badge className='ms-2 py-2 fw-normal bg-info'>
                  <i aria-hidden={true} className='fas fa-info-circle'></i>
                </Badge>
              </Accordion.Header>
              <Accordion.Body className='px-3 py-3'>
                <InputGroup className='mb-3'>
                  <InputGroup.Text>OS</InputGroup.Text>
                  <Form.Control name='os' type='text' value={storeUpdate.os ?? ''} onChange={handleInputChange} />
                </InputGroup>
                <Row className='g-3'>
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text>Installed by</InputGroup.Text>
                      <Form.Control
                        name='installed_by'
                        type='text'
                        value={storeUpdate.installed_by ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup className='mb-3'>
                      <InputGroup.Text>Installed at</InputGroup.Text>
                      <Form.Control
                        disabled={true}
                        name='installed_at'
                        type='text'
                        value={storeUpdate.installed_at ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className='g-3'>
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text>Migrated by</InputGroup.Text>
                      <Form.Control
                        name='migrated_by'
                        type='text'
                        value={storeUpdate.migrated_by ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup className='mb-3'>
                      <InputGroup.Text>Migrated at</InputGroup.Text>
                      <Form.Control
                        disabled={true}
                        name='migrated_at'
                        type='text'
                        value={storeUpdate.migrated_at ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className='g-3'>
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text>Router Model</InputGroup.Text>
                      <Form.Control
                        name='router_model'
                        type='text'
                        value={storeUpdate.router_model ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup className='mb-3'>
                      <InputGroup.Text>NAS Model</InputGroup.Text>
                      <Form.Control
                        name='nas_model'
                        type='text'
                        value={storeUpdate.nas_model ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className='g-3'>
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text>Server01 Model</InputGroup.Text>
                      <Form.Control
                        name='server01_model'
                        type='text'
                        value={storeUpdate.server01_model ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup className='mb-3'>
                      <InputGroup.Text>Server02 Model</InputGroup.Text>
                      <Form.Control
                        name='server02_model'
                        type='text'
                        value={storeUpdate.server02_model ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className='g-3'>
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text>ESXi01 Version</InputGroup.Text>
                      <Form.Control
                        name='esxi01_version'
                        type='text'
                        value={storeUpdate.esxi01_version ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup className='mb-3'>
                      <InputGroup.Text>ESXi02 Version</InputGroup.Text>
                      <Form.Control
                        name='esxi02_version'
                        type='text'
                        value={storeUpdate.esxi02_version ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className='g-3'>
                  <Col md={4}>
                    <InputGroup>
                      <InputGroup.Text>POS</InputGroup.Text>
                      <Form.Control
                        name='pos_qty'
                        type='text'
                        value={storeUpdate.pos_qty ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={4}>
                    <InputGroup>
                      <InputGroup.Text>mPOS</InputGroup.Text>
                      <Form.Control
                        name='mpos_qty'
                        type='text'
                        value={storeUpdate.mpos_qty ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={4}>
                    <InputGroup className='mb-3'>
                      <InputGroup.Text>RMS</InputGroup.Text>
                      <Form.Control
                        name='rms_qty'
                        type='text'
                        value={storeUpdate.rms_qty ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className='g-3'>
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text>Kiosk Model</InputGroup.Text>
                      <Form.Control
                        name='kiosk_model'
                        type='text'
                        value={storeUpdate.kiosk_model ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup className='mb-3'>
                      <InputGroup.Text>Qty.</InputGroup.Text>
                      <Form.Control
                        name='kiosk_qty'
                        type='text'
                        value={storeUpdate.kiosk_qty ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className='g-3'>
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text>Controllers</InputGroup.Text>
                      <Form.Control
                        name='controllers_model'
                        type='text'
                        value={storeUpdate.controllers_model ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text>Qty.</InputGroup.Text>
                      <Form.Control
                        name='controllers_qty'
                        type='text'
                        value={storeUpdate.controllers_qty ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey='1'>
              <Accordion.Header>
                Store Credentials
                <Badge className='ms-2 py-2 fw-normal bg-warning'>
                  <i aria-hidden={true} className='fas fa-key'></i>
                </Badge>
              </Accordion.Header>
              <Accordion.Body>
                <Row className='g-3'>
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text>Router User</InputGroup.Text>
                      <Form.Control
                        name='router_user'
                        type='text'
                        value={storeUpdate.router_user ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup className='mb-3'>
                      <InputGroup.Text>Router Password</InputGroup.Text>
                      <Form.Control
                        name='router_password'
                        type='text'
                        value={storeUpdate.router_password ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className='g-3'>
                  <Col md={4}>
                    <InputGroup>
                      <InputGroup.Text>ESXi01 IP</InputGroup.Text>
                      <Form.Control
                        name='esxi01_ip'
                        type='text'
                        value={storeUpdate.esxi01_ip ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={4}>
                    <InputGroup>
                      <InputGroup.Text>ESXi01 User</InputGroup.Text>
                      <Form.Control
                        name='esxi01_user'
                        type='text'
                        value={storeUpdate.esxi01_user ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={4}>
                    <InputGroup className='mb-3'>
                      <InputGroup.Text>ESXi01 Password</InputGroup.Text>
                      <Form.Control
                        name='esxi01_password'
                        type='text'
                        value={storeUpdate.esxi01_password ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className='g-3'>
                  <Col md={4}>
                    <InputGroup>
                      <InputGroup.Text>ESXi02 IP</InputGroup.Text>
                      <Form.Control
                        name='esxi02_ip'
                        type='text'
                        value={storeUpdate.esxi02_ip ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={4}>
                    <InputGroup>
                      <InputGroup.Text>ESXi02 User</InputGroup.Text>
                      <Form.Control
                        name='esxi02_user'
                        type='text'
                        value={storeUpdate.esxi02_user ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={4}>
                    <InputGroup className='mb-3'>
                      <InputGroup.Text>ESXi02 Password</InputGroup.Text>
                      <Form.Control
                        name='esxi02_password'
                        type='text'
                        value={storeUpdate.esxi02_password ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className='g-3'>
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text>NAS User</InputGroup.Text>
                      <Form.Control
                        name='nas_user'
                        type='text'
                        value={storeUpdate.nas_user ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup className='mb-3'>
                      <InputGroup.Text>NAS Password</InputGroup.Text>
                      <Form.Control
                        name='nas_password'
                        type='text'
                        value={storeUpdate.nas_password ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                </Row>
                <Row className='g-3'>
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text>Windows User</InputGroup.Text>
                      <Form.Control
                        name='os_user'
                        type='text'
                        value={storeUpdate.os_user ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text>Windows Password</InputGroup.Text>
                      <Form.Control
                        name='os_password'
                        type='text'
                        value={storeUpdate.os_password ?? ''}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
        <Card.Footer className='d-flex justify-content-between align-items-center py-3'>
          <small className='text-muted'>Updated at {storeUpdate.updated_at.split('T')[0]}</small>
          <div>
            <Link href={'/stores'}>
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
