import Link from 'next/link';
import React from 'react';
import { Alert, Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { ICompanyProps } from '@/interfaces/company';

export interface ICompanyTableProps {
  companiesList: ICompanyProps[];
  deleteCompany: (prefix: string) => void;
  showCompanyInfo: (prefix: string) => void;
}

export default function CompaniesTable(props: ICompanyTableProps) {
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
          <th className='text-center'>Stores</th>
          <th>Updated at</th>
          <th className='text-center'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.companiesList.map((company) => (
          <tr key={company.prefix} className='align-middle'>
            <td>{company.country}</td>
            <td className='text-center fw-bold'>{company.prefix}</td>
            <td className='fw-bold'>{company.name}</td>
            <td className='text-center d-flex justify-content-center'>
              <Alert
                variant='info'
                className='px-0 py-1 m-0 d-flex align-items-center justify-content-center'
                style={{ height: '31px', width: '51px' }}>
                {company.stores.length}
              </Alert>
            </td>
            <td>{company.updated_at.split('T')[0]}</td>

            <td className='text-center'>
              <OverlayTrigger overlay={<Tooltip>Info</Tooltip>}>
                <Button size='sm' variant='info me-2' onClick={() => props.showCompanyInfo(company.prefix)}>
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
                <Button size='sm' variant='danger' onClick={() => props.deleteCompany(company.prefix)}>
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
