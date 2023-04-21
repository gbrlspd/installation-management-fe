import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Badge, Button, Card, Container, Form, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { api } from '@/services/apiClient';
import { authenticatedPage } from '@/authentication/authenticatedPage';

import { IStoreProps, IStoreUpdate } from '@/interfaces/store';
import { ICompanyProps } from '@/interfaces/company';
import Header from '@/components/Header';
import StoreManagement from '@/components/StoreManagement';

export default function Stores() {
  const router = useRouter();
  const { id } = router.query;
  const [store, setStore] = useState<IStoreProps>();
  const [companiesList, setCompaniesList] = useState<ICompanyProps[]>();
  const [updateLoading, setUpdateLoading] = useState(false);

  async function handleSetStore(id: string) {
    await api
      .get(`/store/${id}`)
      .then((res) => {
        setStore(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleSetCompaniesList() {
    await api
      .get('/company')
      .then((res) => {
        setCompaniesList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleUpdateStore(id: string, updateData: IStoreUpdate) {
    setUpdateLoading(true);
    await api
      .put(`/store/${id}`, updateData)
      .then(() => {
        setUpdateLoading(false);
        toast.success('Store successfully edited', { autoClose: 3000 });
      })
      .catch((err) => {
        toast.error(err, { autoClose: 3000 });
        setUpdateLoading(false);
      });
  }

  useEffect(() => {
    handleSetStore(String(id));
    handleSetCompaniesList();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Installation Management</title>
      </Head>
      <Header />
      <Container>
        <Card className='mb-3'>
          <Card.Header>
            <Card.Title className='mt-2 mb-2 d-flex align-items-center'>
              {store?.name}
              <Badge className='ms-2 fw-normal bg-success'>{store?.id}</Badge>
              <small className='text-muted ms-2'>{store?.company.name}</small>
            </Card.Title>
          </Card.Header>
          {store && companiesList !== undefined && (
            <StoreManagement
              store={store}
              companiesList={companiesList}
              loading={updateLoading}
              onSubmit={handleUpdateStore}
            />
          )}
        </Card>
      </Container>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = authenticatedPage(async (ctx) => {
  return {
    props: {},
  };
});
