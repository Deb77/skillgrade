import React from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import CardContainer from '../../components/Admin/CardContainer';
import Table from '../../components/Admin/Table';
const Admin = () => {
  return (
    <AdminLayout>
      <CardContainer />
      <Table />
    </AdminLayout>
  );
};

export default Admin;
