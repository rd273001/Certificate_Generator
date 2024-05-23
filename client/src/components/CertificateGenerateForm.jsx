import React, { useState } from 'react';
import api from '../utils/apiService';
import { useParams } from 'react-router-dom';
import sweetAlert from '../utils/sweetAlert';
import PrimaryButton from './commons/PrimaryButton';

const CertificateGenerateForm = () => {
  const { _id } = useParams();   // retrieving _id from params passed in uri from previous page

  const [name, setName] = useState( '' );
  const [course, setCourse] = useState( '' );
  const [email, setEmail] = useState( '' );
  const [approvalDate, setApprovalDate] = useState( '' );
  const [errors, setErrors] = useState( {} );

  const handleSubmit = async ( e ) => {
    e.preventDefault();
    const errors = validateForm();
    if ( Object.keys( errors ).length > 0 ) {
      setErrors( errors );
      return;
    }
    try {
      await api.post( `/certificates/create/${ _id }`, { name, course, email, approvalDate } );

      sweetAlert( {
        text: 'Redirecting to Admin Dashboard...', title: 'Certificate Generated', timer: null,
        // redirecting to AdminDashboard after generating the certificate either when Sweet alert is confirmed or dismissed
        preConfirm: () => {
          window.location.href = '/admin';
        },
        didDestroy: () => {
          window.location.href = '/admin';
        },
      } );

      // Reset form fields after Certificate is generated
      setName( '' );
      setCourse( '' );
      setApprovalDate( '' );
      setEmail( '' );
    } catch ( error ) {
      sweetAlert( { title: 'Error!', text: error.response.data.error, icon: 'error', } );
    } finally {
      setErrors( {} );
    }
  };

  // handler for error validation
  const validateForm = () => {
    const errors = {};
    if ( !name.trim() ) {
      errors.name = 'Name is required';
    }
    if ( !course.trim() ) {
      errors.course = 'Course is required';
    }
    if ( !approvalDate ) {
      errors.approvalDate = 'Approval Date is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ( !email.trim() || !emailRegex.test( email ) ) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  return (
    <div className='flex justify-center items-center sm:pt-14 pt-24 pb-8'>
      <div className='lg:w-1/2 md:w-3/4 w-full'>
        <form onSubmit={ handleSubmit }>
          <fieldset className='border-[3px] border-purple-400 rounded-xl p-4 sm:p-8 shadow-lg shadow-purple-400 bg-gradient-to-br from-gray-300 to-white'>
            <legend className='sm:text-3xl text-2xl font-bold text-gray-800'>Certificate Details</legend>
            <div>
              <label htmlFor='name' className='block text-gray-700 font-bold'>
                Name
              </label>
              <input
                type='text'
                id='name'
                value={ name }
                onChange={ ( e ) => setName( e.target.value ) }
                className={ `w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ${ errors.name ? 'border-red-500' : 'border-gray-300'
                  }` }
              />
              { errors.name && <p className='text-red-500 text-sm -mt-4 mb-4'>{ errors.name }</p> }
            </div>
            <div>
              <label htmlFor='course' className='block text-gray-700 font-bold'>
                Course
              </label>
              <input
                type='text'
                id='course'
                value={ course }
                onChange={ ( e ) => setCourse( e.target.value ) }
                className={ `w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ${ errors.course ? 'border-red-500' : 'border-gray-300'
                  }` }
              />
              { errors.course && <p className='text-red-500 text-sm -mt-4 mb-4'>{ errors.course }</p> }
            </div>
            <div>
              <label htmlFor='approvalDate' className='block text-gray-700 font-bold'>
                Approval Date
              </label>
              <input
                type='date'
                id='approvalDate'
                value={ approvalDate }
                onChange={ ( e ) => setApprovalDate( e.target.value ) }
                className={ `w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ${ errors.approvalDate ? 'border-red-500' : 'border-gray-300'
                  }` }
              />
              { errors.approvalDate && <p className='text-red-500 text-sm -mt-4 mb-4'>{ errors.approvalDate }</p> }
            </div>
            <div>
              <label htmlFor='email' className='block text-gray-700 font-bold'>
                Email
              </label>
              <input
                type='email'
                id='email'
                value={ email }
                onChange={ ( e ) => setEmail( e.target.value ) }
                className={ `w-full px-3 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ${ errors.email ? 'border-red-500' : 'border-gray-300'
                  }` }
              />
              { errors.email && <p className='text-red-500 text-sm -mt-4 mb-4'>{ errors.email }</p> }
            </div>

            <PrimaryButton title={ 'Generate Certificate' } />

          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default CertificateGenerateForm;