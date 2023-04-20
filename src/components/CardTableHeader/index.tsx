import React from 'react';
import { Badge, Button, Card, Form, InputGroup } from 'react-bootstrap';

export interface ICardTableHeaderProps {
  title: string;
  icon: string;
  totalItems: number;
  searchValue: string;
  onSearchChange: (search: string) => void;
  onRefresh: () => void;
  onRegisterClick: () => void;
}

export default function CardTableHeader(props: ICardTableHeaderProps) {
  return (
    <Card.Header>
      <Card.Title className='mt-2 mb-3 d-flex align-items-center'>
        {props.title}
        <i aria-hidden={true} className={`fas ${props.icon} ms-2`}></i>
        <Badge className='ms-2 fw-normal bg-info'>{props.totalItems}</Badge>
      </Card.Title>
      <Form className='d-flex mb-2'>
        <InputGroup>
          <InputGroup.Text>
            <i aria-hidden={true} className='fas fa-search'></i>
          </InputGroup.Text>
          <Form.Control
            type='text'
            value={props.searchValue}
            onChange={(e) => props.onSearchChange(e.target.value)}
            placeholder='Search...'
          />
        </InputGroup>
        <Button variant='success' className='ms-2' onClick={props.onRegisterClick}>
          <i aria-hidden={true} className='fas fa-plus'></i>
        </Button>
        <Button variant='info' className='ms-2' onClick={props.onRefresh}>
          <i aria-hidden={true} className='fas fa-sync-alt'></i>
        </Button>
      </Form>
    </Card.Header>
  );
}
