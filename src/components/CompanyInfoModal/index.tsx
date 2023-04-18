import { ICompanyProps } from '@/interfaces/company';
import React, { FormEvent, useState } from 'react';
import { Button, Col, Form, InputGroup, Modal, Row, Spinner } from 'react-bootstrap';

export interface ICompanyInfoModalProps {
  company: ICompanyProps;
  isOpen: boolean;
  toggleInfoModal: () => void;
}

export default function CompanyInfoModal(props: ICompanyInfoModalProps) {
  const {
    prefix,
    name,
    country,
    stores,
    crm_url,
    opb_url,
    validator_code,
    validator_qty,
    owner_name,
    owner_email,
    created_at,
    updated_at,
  } = props.company;

  return (
    <Modal show={props.isOpen} onHide={props.toggleInfoModal} size='lg'>
      <Modal.Header className='bg-light'>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button>Test</Button>
      </Modal.Body>
      <Modal.Footer className='bg-light'>
        <Button variant='danger' onClick={props.toggleInfoModal}>
          Cancel
        </Button>
        <div className='d-grid'>
          <Button variant='info' type='submit'>
            Save Changes
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
