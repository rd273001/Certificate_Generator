import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CertificateGenerateForm from './components/CertificateGenerateForm';
import AdminDashboard from './pages/AdminDashboard';
import CertificateRequestForm from './components/CertificateRequestForm';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={ <CertificateRequestForm /> } />
          <Route path='admin' element={ <AdminDashboard /> } />
          <Route path='admin/new-request/:_id' element={ <CertificateGenerateForm /> } />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;