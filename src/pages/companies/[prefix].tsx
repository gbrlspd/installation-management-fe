import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Badge, Card, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { api } from '@/services/apiClient';
import { authenticatedPage } from '@/authentication/authenticatedPage';

import { ICompanyProps, ICompanyUpdate } from '@/interfaces/company';
import Header from '@/components/Header';
import CompanyManagement from '@/components/CompanyManagement';

export default function Companies() {
  const router = useRouter();
  const { prefix } = router.query;
  const [company, setCompany] = useState<ICompanyProps>();
  const [updateLoading, setUpdateLoading] = useState(false);

  async function handleSetCompany(prefix: string) {
    await api
      .get(`/company/${prefix}`)
      .then((res) => {
        setCompany(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleUpdateCompany(prefix: string, updateData: ICompanyUpdate) {
    setUpdateLoading(true);
    await api
      .put(`/company/${prefix}`, updateData)
      .then(() => {
        setUpdateLoading(false);
        toast.success('Company successfully edited', { autoClose: 3000 });
      })
      .catch((err) => {
        console.log(err);
        setUpdateLoading(false);
      });
  }

  useEffect(() => {
    handleSetCompany(String(prefix));
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Installation Management</title>
      </Head>
      <Header />
      <Container>
        <Card>
          <Card.Header>
            <Card.Title className='mt-2 mb-2 d-flex align-items-center'>
              <small className='text-muted me-2'>Company</small>
              {company?.name}
              <Badge className='ms-2 fw-normal bg-success'>{company?.prefix}</Badge>
            </Card.Title>
          </Card.Header>
          {company !== undefined && (
            <CompanyManagement company={company} loading={updateLoading} onSubmit={handleUpdateCompany} />
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
