import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/apiService';
import LoadingIndicator from '../components/commons/LoadingIndicator';
import sweetAlert from '../utils/sweetAlert';
import PrimaryButton from '../components/commons/PrimaryButton';

const AdminDashboard = () => {
  const [requests, setRequests] = useState( [] );
  const [certificates, setCertificates] = useState( [] );
  const [isLoading, setIsLoading] = useState( false );

  useEffect( () => {
    // Handler to fetch both requests & certificates
    const fetchData = async () => {
      setIsLoading( true );
      // Make both API calls(for requests & certificates) concurrently using Promise.all
      await Promise.all( [fetchRequests(), fetchCertificates()] );
      setIsLoading( false );
    };

    fetchData();
  }, [] );

  // Handler to fetch certificate requests
  const fetchRequests = async () => {
    try {
      const requestsRes = await api.get( '/certificates/requests' );
      setRequests( requestsRes.data );
    } catch ( error ) {
      console.error( 'Error fetching requests:', error.response?.data?.error || error.message );
    }
  };

  // Handler to fetch approved certificates
  const fetchCertificates = async () => {
    try {
      const certificatesRes = await api.get( '/certificates/all' );
      setCertificates( certificatesRes.data );
    } catch ( error ) {
      console.error( 'Error fetching certificates:', error.response?.data?.error || error.message );
    }
  };

  // handler for approving and generating the certificate
  const handleApprove = async ( certificateDetails ) => {
    const { _id, name, course, email } = certificateDetails;
    try {
      setIsLoading( true );
      const generateCertificate = { name, course, email, approvalDate: new Date() };
      await api.put( `/certificates/create/${ _id }`, generateCertificate );

      sweetAlert( { text: 'Certificate generated successfully.' } );
      // refresh the requests & certificates data
      await Promise.all( [fetchRequests(), fetchCertificates()] );
    } catch ( error ) {
      sweetAlert( { title: 'Error!', text: error.response.data.error, icon: 'error', } );
    } finally {
      setIsLoading( false );
    }
  };

  // handler for rejecting the certificate
  const handleReject = async ( _id ) => {
    try {
      setIsLoading( true );
      await api.delete( `/certificates/reject/${ _id }` );

      sweetAlert( { text: 'Certificate request rejected.' } );
      //  refresh the requests data
      await fetchRequests();
    } catch ( error ) {
      sweetAlert( { title: 'Error!', text: error.response.data.error, icon: 'error', } );
    } finally {
      setIsLoading( false );
    }
  };

  return (
    <div className='flex flex-col items-center gap-y-16 pt-24 pb-28 relative min-h-screen'>

      <div className='bg-white rounded-lg shadow-lg shadow-gray-500 sm:p-8 p-4 lg:w-2/3 w-full overflow-x-auto'>
        <h2 className='sm:text-3xl text-xl font-bold text-gray-800 mb-6'>Pending Requests</h2>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Name</th>
              <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Course</th>
              <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Email</th>
              <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            { requests.length > 0 ? requests.map( ( request ) => (
              <tr key={ request._id }>
                <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{ request.name }</td>
                <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{ request.course }</td>
                <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{ request.email }</td>
                <td className='border-2 border-gray-400 text-nowrap px-2 sm:px-4 py-2'>
                  <PrimaryButton
                    title='Approve'
                    isLoading={ isLoading }
                    onClick={ () => { handleApprove( request ) } }
                    className={ `${ isLoading ? 'opacity-40 cursor-not-allowed' : '' } bg-green-500 hover:bg-green-600 text-white text-nowrap md:mr-4 mr-2 active:opacity-70 py-1 px-3 font-semibold rounded-md` }
                  />

                  <PrimaryButton
                    title='Reject'
                    isLoading={ isLoading }
                    onClick={ () => { handleReject( request._id ) } }
                    className={ `${ isLoading ? 'opacity-40 cursor-not-allowed' : '' } bg-red-500 hover:bg-red-600 text-white text-nowrap active:opacity-70 py-1 px-3 font-semibold rounded-md` }
                  />
                </td>
              </tr>
            ) ) : <tr>
              <td colSpan={ 5 } className='border-2 border-gray-400 px-4 py-2'>No Pending requests.</td>
            </tr>
            }
          </tbody>
        </table>
      </div>

      <div className='bg-white rounded-lg shadow-lg shadow-gray-500 sm:p-8 p-4 lg:w-2/3 w-full overflow-x-auto'>
        <h2 className='sm:text-3xl text-xl font-bold text-gray-800 mb-6'>Issued Certificates</h2>
        <table className='w-full table-auto'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Name</th>
              <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Course</th>
              <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Email</th>
              <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Certificate Link</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            { certificates.length > 0 ? certificates.map( ( certificate ) => (
              <tr key={ certificate._id }>
                <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{ certificate.name }</td>
                <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{ certificate.course }</td>
                <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{ certificate.email }</td>
                <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>
                  <Link
                    to={ certificate.certificateLink }
                    target='_self'
                    rel='noopener noreferrer'
                    className='bg-blue-500 hover:bg-blue-600 text-white text-nowrap active:opacity-70 py-1 px-3 font-semibold rounded-md'
                  >
                    View Certificate
                  </Link>
                </td>
              </tr>
            ) ) : <tr>
              <td colSpan={ 5 } className='border-2 border-gray-400 px-4 py-2'>No Certificates.</td>
            </tr>
            }
          </tbody>
        </table>
      </div>

      { isLoading && <LoadingIndicator loadingText={ 'Loading...' } /> }

    </div>
  );
};

export default AdminDashboard;