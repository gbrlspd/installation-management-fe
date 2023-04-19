import React from 'react';
import { IUserProps } from '@/interfaces/user';
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';

export interface IUsersTableProps {
  usersList: IUserProps[];
  deleteUser: (id: string) => void;
}

export default function UsersTable(props: IUsersTableProps) {
  return (
    <Table hover={true} className='mb-0'>
      <thead className='bg-primary text-white'>
        <tr>
          <th className='d-none d-sm-table-cell'>
            Company
            <i aria-hidden={true} className='fas fa-arrow-down ms-2'></i>
          </th>
          <th className='d-none d-sm-table-cell'>ID</th>
          <th>Username</th>
          <th className='d-none d-sm-table-cell'>Email</th>
          <th className='d-none d-sm-table-cell'>Updated at</th>
          <th className='text-center'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.usersList.map((user) => (
          <tr key={user.id} className='align-middle'>
            <td className='d-none d-sm-table-cell'>{user.company.name}</td>
            <td className='d-none d-sm-table-cell'>{user.id}</td>
            <td>{user.username}</td>
            <td className='d-none d-sm-table-cell'>{user.email}</td>
            <td className='d-none d-sm-table-cell'>{user.updated_at.split('T')[0]}</td>
            <td className='text-center'>
              <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                <Button size='sm' variant='success' className='me-2'>
                  <i aria-hidden={true} className='text-white fas fa-wrench'></i>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                <Button size='sm' variant='danger' onClick={() => props.deleteUser(user.id)}>
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
