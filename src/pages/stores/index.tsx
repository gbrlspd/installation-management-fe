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
import ConfirmationModal from '@/components/ConfirmationModal';
import StoreInfoModal from '@/components/StoreInfoModal';
import StoreCredentialsModal from '@/components/StoreCredentialsModal';

export interface IStorePageProps {
  store: IStoreProps;
  stores: IStoreProps[];
  companies: ICompanyProps[];
}

export default function Stores({ stores, store, companies }: IStorePageProps) {
  const companiesList = companies;

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const [selectedStoreToDelete, setSelectedStoreToDelete] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [search, setSearch] = useState('');
  const [storesList, setStoresList] = useState(stores || []);
  const [selectedStore, setSelectedStore] = useState(store || stores[0]);

  const toggleRegisterModal = () => setShowRegisterModal(!showRegisterModal);
  const toggleInfoModal = () => setShowInfoModal(!showInfoModal);
  const toggleCredentialsModal = () => setShowCredentialsModal(!showCredentialsModal);

  function filterBySearch({ stores, search }) {
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

  async function handleInfoClick(id: string) {
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

  async function handleCredentialsClick(id: string) {
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

  function handleDeleteClick(id: string) {
    setSelectedStoreToDelete(id);
    setShowDeletionModal(true);
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
    setShowDeletionModal(false);
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
            <StoresTable
              storesList={storesList}
              deleteStore={handleDeleteClick}
              showStoreInfo={handleInfoClick}
              showStoreCredentials={handleCredentialsClick}
            />
          </Card.Body>
        </Card>
      </Container>
      <ConfirmationModal
        show={showDeletionModal}
        onClose={() => setShowDeletionModal(false)}
        onConfirm={handleConfirmDelete}
      />
      <NewStoreModal
        loading={registerLoading}
        companiesList={companiesList}
        refreshTable={handleRefresh}
        toggleRegisterModal={toggleRegisterModal}
        isOpen={showRegisterModal}
        onSubmit={handleRegister}
      />
      <StoreInfoModal show={showInfoModal} onClose={toggleInfoModal} store={selectedStore} />
      <StoreCredentialsModal show={showCredentialsModal} onClose={toggleCredentialsModal} store={selectedStore} />
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
