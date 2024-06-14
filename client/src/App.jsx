import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import CertificateRequestForm from './components/CertificateRequestForm';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={ <CertificateRequestForm /> } />
          <Route path='admin' element={ <AdminDashboard /> } />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;