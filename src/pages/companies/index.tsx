import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Card, Container } from 'react-bootstrap';

import { api } from '@/services/apiClient';
import { apiConfiguration } from '@/services/api';
import { authenticatedPage } from '@/authentication/authenticatedPage';

import { ICompanyProps, INewCompany } from '@/interfaces/company';
import Header from '@/components/Header';
import CardTableHeader from '@/components/CardTableHeader';
import CompaniesTable from '@/components/CompaniesTable';
import NewCompanyModal from '@/components/NewCompanyModal';
import CompanyInfoModal from '@/components/CompanyInfoModal';
import DeleteModal from '@/components/DeleteModal';

interface ICompanyPageProps {
  company: ICompanyProps;
  companies: ICompanyProps[];
}

export default function Companies({ companies, company }: ICompanyPageProps) {
  const [companiesList, setCompaniesList] = useState(companies || []);
  const [search, setSearch] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(company || companies[0]);
  const [selectedCompanyToDelete, setSelectedCompanyToDelete] = useState('');

  function handleSearchChange({ companies, search }) {
    const tempCompanies = companies.filter(
      (company) =>
        company.name.toLowerCase().includes(search.toLowerCase()) ||
        company.prefix.toLowerCase().includes(search.toLowerCase()) ||
        company.country.toLowerCase().includes(search.toLowerCase())
    );
    setCompaniesList(tempCompanies.slice().sort((a, b) => a.country.localeCompare(b.country)));
  }

  async function handleRefresh() {
    const res = await api.get('/company');
    setCompaniesList(res.data.slice().sort((a, b) => a.country.localeCompare(b.country)));
  }

  async function handleRegisterCompany(data: INewCompany) {
    setRegisterLoading(true);
    await api
      .post('/company', data)
      .then(() => {
        setShowRegisterModal(false);
        setRegisterLoading(false);
        handleRefresh();
      })
      .catch((err) => {
        console.log(err);
        setRegisterLoading(false);
      });
  }

  async function handleCompanyInfoClick(prefix: string) {
    await api
      .get(`/company/${prefix}`)
      .then((res) => {
        setSelectedCompany(res.data);
        setShowInfoModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteCompanyClick(prefix: string) {
    setSelectedCompanyToDelete(prefix);
    setShowDeleteModal(true);
  }

  async function handleConfirmDelete() {
    await api
      .delete(`/company/${selectedCompanyToDelete}`)
      .then(() => {
        handleRefresh();
      })
      .catch((err) => {
        console.log(err);
      });
    setSelectedCompanyToDelete('');
    setShowDeleteModal(false);
  }

  useEffect(() => {
    handleSearchChange({ companies, search });
  }, [companies, search]);

  return (
    <React.Fragment>
      <Head>
        <title>Installation Management</title>
      </Head>
      <Header />
      <Container>
        <Card>
          <CardTableHeader
            title='Companies'
            icon='fa-landmark'
            totalItems={companiesList.length}
            searchValue={search}
            onSearchChange={(search) => setSearch(search)}
            onRefresh={handleRefresh}
            onRegisterClick={() => setShowRegisterModal(!showRegisterModal)}
          />
          <Card.Body className='p-0'>
            <CompaniesTable
              companiesList={companiesList}
              onCompanyInfoClick={handleCompanyInfoClick}
              onDeleteCompanyClick={handleDeleteCompanyClick}
            />
          </Card.Body>
        </Card>
      </Container>
      <NewCompanyModal
        show={showRegisterModal}
        loading={registerLoading}
        onSubmit={handleRegisterCompany}
        onRefresh={handleRefresh}
        onClose={() => setShowRegisterModal(!showRegisterModal)}
      />
      <CompanyInfoModal
        company={selectedCompany}
        show={showInfoModal}
        onClose={() => setShowInfoModal(!showInfoModal)}
      />
      <DeleteModal show={showDeleteModal} onConfirm={handleConfirmDelete} onClose={() => setShowDeleteModal(false)} />
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = authenticatedPage(async (ctx) => {
  const api = apiConfiguration(ctx);
  const getCompanies = await api.get('/company');

  return {
    props: {
      companies: getCompanies.data,
    },
  };
});
