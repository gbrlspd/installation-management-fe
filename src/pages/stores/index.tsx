import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Card, Container } from 'react-bootstrap';

import { api } from '@/services/apiClient';
import { apiConfiguration } from '@/services/api';
import { authenticatedPage } from '@/authentication/authenticatedPage';

import { INewStore, IStoreProps } from '@/interfaces/store';
import { ICompanyProps } from '@/interfaces/company';
import Header from '@/components/Header';
import CardTableHeader from '@/components/CardTableHeader';
import StoresTable from '@/components/StoresTable';
import NewStoreModal from '@/components/NewStoreModal';
import StoreInfoModal from '@/components/StoreInfoModal';
import StoreCredentialsModal from '@/components/StoreCredentialsModal';
import DeleteModal from '@/components/DeleteModal';

export interface IStoresPageProps {
  store: IStoreProps;
  stores: IStoreProps[];
  companies: ICompanyProps[];
}

export default function Stores({ stores, store, companies }: IStoresPageProps) {
  const companiesList = companies;
  const [storesList, setStoresList] = useState(stores || []);
  const [search, setSearch] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [selectedStore, setSelectedStore] = useState(store || stores[0]);
  const [selectedStoreToDelete, setSelectedStoreToDelete] = useState('');

  function handleSearchChange({ stores, search }: { stores: IStoreProps[]; search: string }) {
    const tempStores = stores.filter(
      (store) =>
        store.name.toLowerCase().includes(search.toLowerCase()) ||
        store.id.toLowerCase().includes(search.toLowerCase()) ||
        store.company.name.toLowerCase().includes(search.toLowerCase())
    );
    setStoresList(tempStores.slice().sort((a, b) => a.company.name.localeCompare(b.company.name)));
  }

  async function handleRefresh() {
    const res = await api.get('/store');
    setStoresList(res.data.slice().sort((a, b) => a.company.name.localeCompare(b.company.name)));
  }

  async function handleRegisterStore(data: INewStore) {
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

  async function handleStoreInfoClick(id: string) {
    await api
      .get(`/store/${id}`)
      .then((res) => {
        setSelectedStore(res.data);
        setShowInfoModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleStoreCredentialsClick(id: string) {
    await api
      .get(`/store/${id}`)
      .then((res) => {
        setSelectedStore(res.data);
        setShowCredentialsModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteStoreClick(id: string) {
    if (id === 'U0') {
      console.log('Do not delete the U0 store bro...');
    } else {
      setSelectedStoreToDelete(id);
      setShowDeleteModal(true);
    }
  }

  async function handleConfirmDelete() {
    await api
      .delete(`/store/${selectedStoreToDelete}`)
      .then(() => {
        handleRefresh();
      })
      .catch((err) => {
        console.log(err);
      });
    setSelectedStoreToDelete('');
    setShowDeleteModal(false);
  }

  useEffect(() => {
    handleSearchChange({ stores, search });
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
            icon='fa-store'
            totalItems={storesList.length}
            searchValue={search}
            onSearchChange={(search) => setSearch(search)}
            onRefresh={handleRefresh}
            onRegisterClick={() => setShowRegisterModal(true)}
          />
          <Card.Body className='p-0'>
            <StoresTable
              storesList={storesList}
              onStoreInfoClick={handleStoreInfoClick}
              onStoreCredentialsClick={handleStoreCredentialsClick}
              onDeleteStoreClick={handleDeleteStoreClick}
            />
          </Card.Body>
        </Card>
      </Container>
      <NewStoreModal
        companiesList={companiesList}
        show={showRegisterModal}
        loading={registerLoading}
        onSubmit={handleRegisterStore}
        onRefresh={handleRefresh}
        onClose={() => setShowRegisterModal(false)}
      />
      <StoreInfoModal store={selectedStore} show={showInfoModal} onClose={() => setShowInfoModal(!showInfoModal)} />
      <StoreCredentialsModal
        store={selectedStore}
        show={showCredentialsModal}
        onClose={() => setShowCredentialsModal(!showCredentialsModal)}
      />
      <DeleteModal show={showDeleteModal} onConfirm={handleConfirmDelete} onClose={() => setShowDeleteModal(false)} />
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = authenticatedPage(async (ctx) => {
  const api = apiConfiguration(ctx);
  const getStores = await api.get('/store');
  const getCompanies = await api.get('/company');

  return {
    props: {
      stores: getStores.data,
      companies: getCompanies.data,
    },
  };
});
