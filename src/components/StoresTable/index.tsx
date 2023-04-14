import Link from 'next/link';
import React from 'react';
import { Alert, Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';

export default function StoresTable({ storesList }) {
  const validateStatus = (status) => {
    switch (status) {
      case 'Operational':
        return 'success';
      case 'Closed':
        return 'danger';
    }
  };

  return (
    <Table hover={true} className='mb-0'>
      <thead className='bg-primary text-white'>
        <tr>
          <th>
            Company
            <i aria-hidden={true} className='fas fa-arrow-down ms-2'></i>
          </th>
          <th className='text-center'>ID</th>
          <th>Name</th>
          <th>City</th>
          <th className='text-center'>Status</th>
          <th>Updated at</th>
          <th className='text-center'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {storesList.map((store) => (
          <tr key={store.id} className='align-middle'>
            <td>{store.company.name}</td>
            <td className='text-center fw-bold'>{store.id}</td>
            <td className='fw-bold'>{store.name}</td>
            <td>{store.city}</td>
            <td className='text-center d-flex justify-content-center'>
              <Alert
                variant={validateStatus(store.status)}
                className='px-2 py-1 m-0 d-flex align-items-center justify-content-center'
                style={{ height: '31px' }}
              >
                {store.status}
              </Alert>
            </td>
            <td>{store.updated_at.split('T')[0]}</td>

            <td className='text-center'>
              <OverlayTrigger overlay={<Tooltip>Info</Tooltip>}>
                <Button size='sm' variant='info me-2'>
                  <i aria-hidden={true} className='fas fa-info-circle'></i>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger overlay={<Tooltip>Credentials</Tooltip>}>
                <Button size='sm' variant='warning me-2'>
                  <i aria-hidden={true} className='fas fa-key'></i>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger overlay={<Tooltip>Manage</Tooltip>}>
                <Link href={`/stores/${store.id}`}>
                  <Button size='sm' variant='success' className='me-2'>
                    <i aria-hidden={true} className='text-white fas fa-wrench'></i>
                  </Button>
                </Link>
              </OverlayTrigger>
              <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                <Button size='sm' variant='danger'>
                  <i aria-hidden={true} className='fas fa-trash'></i>
                </Button>
              </OverlayTrigger>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
