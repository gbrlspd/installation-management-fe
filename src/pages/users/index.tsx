import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Button, Card, Container, Modal } from 'react-bootstrap';
import { IUserProps } from '@/interfaces/user';
import { ICompanyProps } from '@/interfaces/company';
import { authenticatedPage } from '@/authentication/authenticatedPage';
import { api } from '@/services/apiClient';
import { apiConfiguration } from '@/services/api';
import Header from '@/components/Header';
import UsersTable from '@/components/UsersTable';
import CardTableHeader from '@/components/CardTableHeader';
import NewUserModal, { INewUser } from '@/components/NewUserModal';
import ConfirmationModal from '@/components/ConfirmationModal';

interface IUserPageProps {
  user: IUserProps;
  users: IUserProps[];
  companies: ICompanyProps[];
}

export default function Users({ users, user, companies }: IUserPageProps) {
  const companiesList = companies;
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState('');
  const [search, setSearch] = useState('');
  const [usersList, setUsersList] = useState(users || []);
  const [selectedUser, setSelectedUser] = useState(user);
  const toggleRegisterModal = () => setShowRegisterModal(!showRegisterModal);

  const filterBySearch = ({ users, search }) => {
    const tempUsers = users.filter(
      (user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.company.name.toLowerCase().includes(search.toLowerCase())
    );
    /* This function sorts an array alphabetically based on the given field */
    setUsersList(tempUsers.slice().sort((a, b) => a.company.name.localeCompare(b.company.name)));
  };

  async function handleRefresh() {
    const res = await api.get('/user');
    setUsersList(res.data.slice().sort((a, b) => a.company.name.localeCompare(b.company.name)));
  }

  async function handleRegister(data: INewUser) {
    setRegisterLoading(true);
    await api
      .post('/user', data)
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

  const handleDeleteClick = (id: string) => {
    setSelectedUserToDelete(id);
    setShowDeletionModal(true);
  };

  async function handleConfirmDelete() {
    await api
      .delete(`/user/${selectedUserToDelete}`)
      .then(() => {
        handleRefresh();
      })
      .catch((err) => {
        console.log(err);
      });
    setSelectedUserToDelete('');
    setShowDeletionModal(false);
  }

  useEffect(() => {
    filterBySearch({ users, search });
  }, [users, search]);

  return (
    <React.Fragment>
      <Head>
        <title>Installation Management</title>
      </Head>
      <Header />
      <Container>
        <Card>
          <CardTableHeader
            title='Users'
            faIcon='fa-user-friends'
            itemQty={usersList.length}
            search={search}
            handleChangeSearch={(search) => setSearch(search)}
            refreshTable={handleRefresh}
            toggleRegisterModal={toggleRegisterModal}
          />
          <Card.Body className='p-0'>
            <UsersTable usersList={usersList} deleteUser={handleDeleteClick} />
          </Card.Body>
        </Card>
      </Container>
      <ConfirmationModal
        show={showDeletionModal}
        onClose={() => setShowDeletionModal(false)}
        onConfirm={handleConfirmDelete}
      />
      <NewUserModal
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
  const usersRes = await api.get('/user');
  const companiesRes = await api.get('/company');

  return {
    props: {
      users: usersRes.data,
      companies: companiesRes.data,
    },
  };
});
