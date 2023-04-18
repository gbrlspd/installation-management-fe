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
          <th className='d-none d-sm-table-cell'>
            Country
            <i aria-hidden={true} className='fas fa-arrow-down ms-2'></i>
          </th>
          <th className='text-center d-none d-sm-table-cell'>Prefix</th>
          <th>Name</th>
          <th className='text-center d-none d-sm-table-cell'>Stores</th>
          <th className='d-none d-sm-table-cell'>Updated at</th>
          <th className='text-center'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.companiesList.map((company) => (
          <tr key={company.prefix} className='align-middle'>
            <td className='d-none d-sm-table-cell'>{company.country}</td>
            <td className='text-center fw-bold d-none d-sm-table-cell'>{company.prefix}</td>
            <td className='fw-bold'>{company.name}</td>
            <td className='text-center d-none d-sm-table-cell'>{company.stores.length}</td>
            <td className='d-none d-sm-table-cell'>{company.updated_at.split('T')[0]}</td>

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
