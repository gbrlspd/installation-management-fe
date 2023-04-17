import React from 'react';

import { Badge, Button, Card, Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

export interface ICardTableHeaderProps {
  title: string;
  faIcon: string;
  itemQty: number;
  search: string;
  refreshTable: () => void;
  toggleRegisterModal: () => void;
  handleChangeSearch: (search: string) => void;
}

export default function CardTableHeader(props: ICardTableHeaderProps) {
  return (
    <Card.Header>
      <Card.Title className='mt-2 mb-3 d-flex align-items-center'>
        Stores
        <i aria-hidden={true} className={`fas ${props.faIcon} ms-2`}></i>
        <Badge className='ms-2 fw-normal bg-info'>{props.itemQty}</Badge>
      </Card.Title>
      <Form className='d-flex mb-2'>
        <InputGroup>
          <InputGroup.Text>
            <i aria-hidden={true} className='fas fa-search'></i>
          </InputGroup.Text>
          <Form.Control
            type='text'
            value={props.search}
            onChange={(e) => props.handleChangeSearch(e.target.value)}
            placeholder='Search...'
          />
        </InputGroup>
        <OverlayTrigger overlay={<Tooltip>New</Tooltip>}>
          <Button variant='success' className='ms-2' onClick={props.toggleRegisterModal}>
            <i aria-hidden={true} className='fas fa-plus'></i>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip>Refresh</Tooltip>}>
          <Button variant='info' className='ms-2' onClick={props.refreshTable}>
            <i aria-hidden={true} className='fas fa-sync-alt'></i>
          </Button>
        </OverlayTrigger>
      </Form>
    </Card.Header>
  );
}
