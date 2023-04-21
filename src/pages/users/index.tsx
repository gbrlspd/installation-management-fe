import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { Card, Container } from 'react-bootstrap';

import { api } from '@/services/apiClient';
import { apiConfiguration } from '@/services/api';
import { authenticatedPage } from '@/authentication/authenticatedPage';

import { INewUser, IUserProps, IUserUpdate } from '@/interfaces/user';
import { ICompanyProps } from '@/interfaces/company';
import Header from '@/components/Header';
import CardTableHeader from '@/components/CardTableHeader';
import UsersTable from '@/components/UsersTable';
import NewUserModal from '@/components/NewUserModal';
import UserManagementModal from '@/components/UserManagementModal';
import DeleteModal from '@/components/DeleteModal';
import { toast } from 'react-toastify';

interface IUsersPageProps {
  user: IUserProps;
  users: IUserProps[];
  companies: ICompanyProps[];
}

export default function Users({ users, user, companies }: IUsersPageProps) {
  const companiesList = companies;
  const [usersList, setUsersList] = useState(users || []);
  const [search, setSearch] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showManagementModal, setShowManagementModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(user || users[0]);
  const [selectedUserToDelete, setSelectedUserToDelete] = useState('');

  function handleSearchChange({ users, search }: { users: IUserProps[]; search: string }) {
    const tempUsers = users.filter(
      (user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.company.name.toLowerCase().includes(search.toLowerCase())
    );
    setUsersList(tempUsers.slice().sort((a, b) => a.company.name.localeCompare(b.company.name)));
  }

  async function handleRefresh() {
    const res = await api.get('/user');
    setUsersList(res.data.slice().sort((a, b) => a.company.name.localeCompare(b.company.name)));
  }

  async function handleRegisterUser(data: INewUser) {
    setRegisterLoading(true);
    await api
      .post('/user', data)
      .then(() => {
        setShowRegisterModal(false);
        setRegisterLoading(false);
        handleRefresh();
        toast.success('User successfully created', { autoClose: 3000 });
      })
      .catch((err) => {
        console.log(err);
        setRegisterLoading(false);
      });
  }

  async function handleUserManagementClick(id: string) {
    await api
      .get(`/user/${id}`)
      .then((res) => {
        setSelectedUser(res.data);
        setShowManagementModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function handleUpdateUser(id: string, updateData: IUserUpdate) {
    setUpdateLoading(true);
    await api
      .put(`/user/${id}`, updateData)
      .then(() => {
        setShowManagementModal(false);
        setUpdateLoading(false);
        handleRefresh();
        toast.success('User successfully updated', { autoClose: 3000 });
      })
      .catch((err) => {
        console.log(err);
        setUpdateLoading(false);
      });
  }

  function handleDeleteUserClick(id: string, username: string) {
    if (username === '') {
      console.log('Do not delete my user bro...');
    } else {
      setSelectedUserToDelete(id);
      setShowDeleteModal(true);
    }
  }

  async function handleConfirmDelete() {
    await api
      .delete(`/user/${selectedUserToDelete}`)
      .then(() => {
        handleRefresh();
        toast.success('User successfully deleted', { autoClose: 3000 });
      })
      .catch((err) => {
        console.log(err);
      });
    setSelectedUserToDelete('');
    setShowDeleteModal(false);
  }

  useEffect(() => {
    handleSearchChange({ users, search });
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
            icon='fa-user-friends'
            totalItems={usersList.length}
            searchValue={search}
            onSearchChange={(search) => setSearch(search)}
            onRefresh={handleRefresh}
            onRegisterClick={() => setShowRegisterModal(true)}
          />
          <Card.Body className='p-0'>
            <UsersTable
              usersList={usersList}
              onUserManagementClick={handleUserManagementClick}
              onDeleteUserClick={handleDeleteUserClick}
            />
          </Card.Body>
        </Card>
      </Container>
      <NewUserModal
        companiesList={companiesList}
        show={showRegisterModal}
        loading={registerLoading}
        onSubmit={handleRegisterUser}
        onRefresh={handleRefresh}
        onClose={() => setShowRegisterModal(false)}
      />
      <UserManagementModal
        user={selectedUser}
        companiesList={companiesList}
        show={showManagementModal}
        loading={updateLoading}
        onSubmit={handleUpdateUser}
        onRefresh={handleRefresh}
        onClose={() => setShowManagementModal(false)}
      />
      <DeleteModal show={showDeleteModal} onConfirm={handleConfirmDelete} onClose={() => setShowDeleteModal(false)} />
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = authenticatedPage(async (ctx) => {
  const api = apiConfiguration(ctx);
  const getUsers = await api.get('/user');
  const getCompanies = await api.get('/company');

  return {
    props: {
      users: getUsers.data,
      companies: getCompanies.data,
    },
  };
});
