import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import CertificateRequestForm from './pages/Home';
import { Provider } from 'react-redux';
import store from './store/configureStore';

const App = () => {

  return (
    <Provider store={ store }>
      <Router>
        <Routes>
          <Route path='/' element={ <Layout /> }>
            <Route index element={ <CertificateRequestForm /> } />
            <Route path='admin' element={ <AdminDashboard /> } />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;