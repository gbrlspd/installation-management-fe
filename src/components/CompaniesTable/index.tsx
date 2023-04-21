import React from 'react';
import Link from 'next/link';
import { Button, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { ICompanyProps } from '@/interfaces/company';

export interface ICompanyTableProps {
  companiesList: ICompanyProps[];
  onCompanyInfoClick: (prefix: string) => void;
  onDeleteCompanyClick: (prefix: string) => void;
}

export default function CompaniesTable(props: ICompanyTableProps) {
  const renderInfoTooltip = (props) => <Tooltip {...props}>Info</Tooltip>;
  const renderManagementTooltip = (props) => <Tooltip {...props}>Management</Tooltip>;
  const renderDeleteTooltip = (props) => <Tooltip {...props}>Delete</Tooltip>;

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
            <td className='text-center d-none d-sm-table-cell'>{company.prefix}</td>
            <td>{company.name}</td>
            <td className='text-center d-none d-sm-table-cell'>{company.stores.length}</td>
            <td className='d-none d-sm-table-cell'>{company.updated_at.split('T')[0]}</td>

            <td className='text-center'>
              <OverlayTrigger overlay={renderInfoTooltip}>
                <Button size='sm' variant='info me-2' onClick={() => props.onCompanyInfoClick(company.prefix)}>
                  <i aria-hidden={true} className='fas fa-info-circle'></i>
                </Button>
              </OverlayTrigger>
              <Link href={`/companies/${company.prefix}`}>
                <OverlayTrigger overlay={renderManagementTooltip}>
                  <Button size='sm' variant='success' className='me-2'>
                    <i aria-hidden={true} className='text-white fas fa-wrench'></i>
                  </Button>
                </OverlayTrigger>
              </Link>
              <OverlayTrigger overlay={renderDeleteTooltip}>
                <Button size='sm' variant='danger' onClick={() => props.onDeleteCompanyClick(company.prefix)}>
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
