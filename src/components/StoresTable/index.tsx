import React from 'react';
import Link from 'next/link';
import { Alert, Button, Table } from 'react-bootstrap';
import { IStoreProps } from '@/interfaces/store';

export interface IStoreTableProps {
  storesList: IStoreProps[];
  onStoreInfoClick: (id: string) => void;
  onStoreCredentialsClick: (id: string) => void;
  onDeleteStoreClick: (id: string) => void;
}

export default function StoresTable(props: IStoreTableProps) {
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
          <th className='d-none d-sm-table-cell'>
            Company
            <i aria-hidden={true} className='fas fa-arrow-down ms-2'></i>
          </th>
          <th className='text-center d-none d-sm-table-cell'>ID</th>
          <th>Name</th>
          <th className='d-none d-sm-table-cell'>City</th>
          <th className='text-center d-none d-sm-table-cell'>Status</th>
          <th className='d-none d-sm-table-cell'>Updated at</th>
          <th className='text-center'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.storesList.map((store) => (
          <tr key={store.id} className='align-middle'>
            <td className='d-none d-sm-table-cell'>{store.company.name}</td>
            <td className='text-center d-none d-sm-table-cell'>{store.id}</td>
            <td>{store.name}</td>
            <td className='d-none d-sm-table-cell'>{store.city}</td>
            <td className='text-center d-flex justify-content-center d-none d-sm-flex'>
              <Alert
                variant={validateStatus(store.status)}
                className='px-2 py-1 m-0 d-flex align-items-center justify-content-center'
                style={{ height: '31px' }}>
                {store.status}
              </Alert>
            </td>
            <td className='d-none d-sm-table-cell'>{store.updated_at.split('T')[0]}</td>
            <td className='text-center'>
              <Button size='sm' variant='info me-2' onClick={() => props.onStoreInfoClick(store.id)}>
                <i aria-hidden={true} className='fas fa-info-circle'></i>
              </Button>
              <Button size='sm' variant='warning me-2' onClick={() => props.onStoreCredentialsClick(store.id)}>
                <i aria-hidden={true} className='fas fa-key'></i>
              </Button>
              <Link href={`/stores/${store.id}`}>
                <Button size='sm' variant='success' className='me-2'>
                  <i aria-hidden={true} className='text-white fas fa-wrench'></i>
                </Button>
              </Link>
              <Button size='sm' variant='danger' onClick={() => props.onDeleteStoreClick(store.id)}>
                <i aria-hidden={true} className='fas fa-trash'></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
