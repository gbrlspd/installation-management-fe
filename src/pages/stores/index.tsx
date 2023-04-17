import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Card, Container } from 'react-bootstrap';
import { IStoreProps } from '@/interfaces/store';
import { ICompanyProps } from '@/interfaces/company';
import { authenticatedPage } from '@/authentication/authenticatedPage';
import { api } from '@/services/apiClient';
import { apiConfiguration } from '@/services/api';
import Header from '@/components/Header';
import StoresTable from '@/components/StoresTable';
import CardTableHeader from '@/components/CardTableHeader';
import NewStoreModal, { INewStore } from '@/components/NewStoreModal';

export interface IStorePageProps {
  stores: IStoreProps[];
  companies: ICompanyProps[];
}

export default function Stores({ stores, companies }: IStorePageProps) {
  const companiesList = companies;
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [storesList, setStoresList] = useState(stores || []);
  const toggleRegisterModal = () => setShowRegisterModal(!showRegisterModal);

  async function filterBySearch({ stores, search }) {
    const tempStores = stores.filter(
      (store) =>
        store.name.toLowerCase().includes(search.toLowerCase()) ||
        store.id.toLowerCase().includes(search.toLowerCase()) ||
        store.company.name.toLowerCase().includes(search.toLowerCase())
    );
    /* This function sorts an array alphabetically based on the given field */
    setStoresList(tempStores.slice().sort((a, b) => a.company.name.localeCompare(b.company.name)));
  }

  async function handleRefresh() {
    const res = await api.get('/store');
    setStoresList(res.data.slice().sort((a, b) => a.company.name.localeCompare(b.company.name)));
  }

  async function handleRegister(data: INewStore) {
    setRegisterLoading(true);
    await api
      .post('/store', data)
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

  async function handleDelete(id: string) {
    await api
      .delete(`/store/${id}`)
      .then(() => {
        handleRefresh();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    filterBySearch({ stores, search });
  }, [stores, search]);

  return (
    <React.Fragment>
      <Head>
        <title>Installation Management</title>
      </Head>
      <Header />
      <Container>
        <Card>
          <CardTableHeader
            title='Stores'
            faIcon='fa-store'
            itemQty={storesList.length}
            search={search}
            handleChangeSearch={(search) => setSearch(search)}
            refreshTable={handleRefresh}
            toggleRegisterModal={toggleRegisterModal}
          />
          <Card.Body className='p-0'>
            <StoresTable storesList={storesList} refreshTable={handleRefresh} deleteStore={handleDelete} />
          </Card.Body>
        </Card>
      </Container>
      <NewStoreModal
        loading={registerLoading}
        companiesList={companiesList}
        refreshTable={handleRefresh}
        toggleRegisterModal={toggleRegisterModal}
        isOpen={showRegisterModal}
        onSubmit={handleRegister}
      />
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = authenticatedPage(async (ctx) => {
  const api = apiConfiguration(ctx);
  const storesRes = await api.get('/store');
  const companiesRes = await api.get('/company');

  return {
    props: {
      stores: storesRes.data,
      companies: companiesRes.data,
    },
  };
});
