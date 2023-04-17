import React from 'react';
import { api } from '@/services/apiClient';

import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';

export default function UsersTable({ usersList, refresh }) {
  async function handleDelete(id: string) {
    await api.delete(`/user/${id}`);
    refresh();
  }

  return (
    <Table hover={true} className='mb-0'>
      <thead className='bg-primary text-white'>
        <tr>
          <th>
            Company
            <i aria-hidden={true} className='fas fa-arrow-down ms-2'></i>
          </th>
          <th>UUID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Updated at</th>
          <th className='text-center'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {usersList.map((user) => (
          <tr key={user.id} className='align-middle'>
            <td>{user.company.name}</td>
            <td>{user.id}</td>
            <td className='fw-bold'>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.updated_at.split('T')[0]}</td>
            <td className='text-center'>
              <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                <Button size='sm' variant='success' className='me-2'>
                  <i aria-hidden={true} className='text-white fas fa-wrench'></i>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                <Button size='sm' variant='danger' onClick={() => handleDelete(user.id)}>
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
