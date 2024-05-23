import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/apiService';

const AdminDashboard = () => {
  const [requests, setRequests] = useState( [] );
  const [certificates, setCertificates] = useState( [] );

  useEffect( () => {
    // handler for getting all certificate requests
    const fetchRequests = async () => {
      try {
        const res = await api.get( '/certificates/requests' );
        setRequests( res.data );
      } catch ( error ) {
        console.error( 'Error fetching requests:', error.response.data.error );
      }
    };
    // handler for getting all certificates approved
    const fetchCertificates = async () => {
      try {
        const res = await api.get( '/certificates/all' );
        setCertificates( res.data );
      } catch ( error ) {
        console.error( 'Error fetching certificates:', error.response.data.error );
      }
    };

    fetchRequests();
    fetchCertificates();
  }, [] );

  return (
    <div className='flex flex-col items-center gap-y-12 pt-20'>

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
                <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>
                  <Link to={ `new-request/${ request._id }` }
                    className='bg-green-500 hover:bg-green-600 text-white active:opacity-70 py-1 px-3 font-bold rounded-md'
                  >
                    Approve
                  </Link>
                </td>
              </tr>
            ) ) : <tr>
              <td colSpan={ 5 } className='border-2 border-gray-400 px-4 py-2'>No Pending requests.</td>
            </tr>
            }
          </tbody>
        </table>
      </div>

      <div className='bg-white rounded-lg shadow-lg shadow-gray-500 sm:p-8 p-4 mb-7 lg:w-2/3 w-full overflow-x-auto'>
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
                  <a
                    href={ certificate.certificateLink }
                    target='_self'
                    rel='noopener noreferrer'
                    className='bg-blue-500 hover:bg-blue-600 text-white active:opacity-70 py-1 px-3 font-bold rounded-md'
                  >
                    View Certificate
                  </a>
                </td>
              </tr>
            ) ) : <tr>
              <td colSpan={ 5 } className='border-2 border-gray-400 px-4 py-2'>No Certificates.</td>
            </tr>
            }
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminDashboard;