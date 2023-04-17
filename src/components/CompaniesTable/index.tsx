import Link from 'next/link';
import React from 'react';
import { api } from '@/services/apiClient';

import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';

export default function CompaniesTable({ companiesList, refresh }) {
  async function handleDelete(prefix: string) {
    await api.delete(`/company/${prefix}`);
    refresh();
  }

  return (
    <Table hover={true} className='mb-0'>
      <thead className='bg-primary text-white'>
        <tr>
          <th>
            Country
            <i aria-hidden={true} className='fas fa-arrow-down ms-2'></i>
          </th>
          <th className='text-center'>Prefix</th>
          <th>Name</th>
          <th>Updated at</th>
          <th className='text-center'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {companiesList.map((company) => (
          <tr key={company.prefix} className='align-middle'>
            <td>{company.country}</td>
            <td className='text-center fw-bold'>{company.prefix}</td>
            <td className='fw-bold'>{company.name}</td>
            <td>{company.updated_at.split('T')[0]}</td>

            <td className='text-center'>
              <OverlayTrigger overlay={<Tooltip>Info</Tooltip>}>
                <Button size='sm' variant='info me-2'>
                  <i aria-hidden={true} className='fas fa-info-circle'></i>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger overlay={<Tooltip>Manage</Tooltip>}>
                <Link href={`/companies/${company.prefix}`}>
                  <Button size='sm' variant='success' className='me-2'>
                    <i aria-hidden={true} className='text-white fas fa-wrench'></i>
                  </Button>
                </Link>
              </OverlayTrigger>
              <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                <Button size='sm' variant='danger' onClick={() => handleDelete(company.prefix)}>
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
