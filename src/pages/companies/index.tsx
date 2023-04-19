import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Card, Container } from 'react-bootstrap';
import { ICompanyProps } from '@/interfaces/company';
import { authenticatedPage } from '@/authentication/authenticatedPage';
import { api } from '@/services/apiClient';
import { apiConfiguration } from '@/services/api';
import Header from '@/components/Header';
import CompaniesTable from '@/components/CompaniesTable';
import CardTableHeader from '@/components/CardTableHeader';
import NewCompanyModal, { INewCompany } from '@/components/NewCompanyModal';
import CompanyInfoModal from '@/components/CompanyInfoModal';
import ConfirmationModal from '@/components/ConfirmationModal';

interface ICompanyPageProps {
  company: ICompanyProps;
  companies: ICompanyProps[];
}

export default function Companies({ companies, company }: ICompanyPageProps) {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const [selectedCompanyToDelete, setSelectedCompanyToDelete] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [search, setSearch] = useState('');
  const [companiesList, setCompaniesList] = useState(companies || []);
  const [selectedCompany, setSelectedCompany] = useState(company || companies[0]);
  const toggleRegisterModal = () => setShowRegisterModal(!showRegisterModal);
  const toggleInfoModal = () => setShowInfoModal(!showInfoModal);

  const filterBySearch = ({ companies, search }) => {
    const tempCompanies = companies.filter(
      (company) =>
        company.name.toLowerCase().includes(search.toLowerCase()) ||
        company.prefix.toLowerCase().includes(search.toLowerCase()) ||
        company.country.toLowerCase().includes(search.toLowerCase())
    );
    /* This function sorts an array alphabetically based on the given field */
    setCompaniesList(tempCompanies.slice().sort((a, b) => a.country.localeCompare(b.country)));
  };

  async function handleRefresh() {
    const res = await api.get('/company');
    setCompaniesList(res.data.slice().sort((a, b) => a.country.localeCompare(b.country)));
  }

  async function handleInfoClick(prefix: string) {
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

  async function handleRegister(data: INewCompany) {
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

  const handleDeleteClick = (prefix: string) => {
    setSelectedCompanyToDelete(prefix);
    setShowDeletionModal(true);
  };

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
    setShowDeletionModal(false);
  }

  useEffect(() => {
    filterBySearch({ companies, search });
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
            faIcon='fa-landmark'
            itemQty={companiesList.length}
            search={search}
            handleChangeSearch={(search) => setSearch(search)}
            refreshTable={handleRefresh}
            toggleRegisterModal={toggleRegisterModal}
          />
          <Card.Body className='p-0'>
            <CompaniesTable
              companiesList={companiesList}
              deleteCompany={handleDeleteClick}
              showCompanyInfo={handleInfoClick}
            />
          </Card.Body>
        </Card>
      </Container>
      <ConfirmationModal
        show={showDeletionModal}
        onClose={() => setShowDeletionModal(false)}
        onConfirm={handleConfirmDelete}
      />
      <NewCompanyModal
        loading={registerLoading}
        refreshTable={handleRefresh}
        toggleRegisterModal={toggleRegisterModal}
        isOpen={showRegisterModal}
        onSubmit={handleRegister}
      />
      <CompanyInfoModal show={showInfoModal} onClose={toggleInfoModal} company={selectedCompany} />
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = authenticatedPage(async (ctx) => {
  const api = apiConfiguration(ctx);
  const res = await api.get('/company');

  return {
    props: {
      companies: res.data,
    },
  };
});
