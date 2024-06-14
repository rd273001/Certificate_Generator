import React, { useState } from 'react';
import api from '../utils/apiService';
import sweetAlert from '../utils/sweetAlert';
import PrimaryButton from './commons/PrimaryButton';
import LoadingIndicator from './commons/LoadingIndicator';


const CertificateRequestForm = () => {
  const [name, setName] = useState( '' );
  const [course, setCourse] = useState( '' );
  const [email, setEmail] = useState( '' );
  const [errors, setErrors] = useState( {} );
  const [isLoading, setIsLoading] = useState( false );

  const handleSubmit = async ( e ) => {
    e.preventDefault();
    const errors = validateForm();
    if ( Object.keys( errors ).length > 0 ) {
      setErrors( errors );
      return;
    }
    try {
      setIsLoading( true );
      await api.post( '/certificates/request', { name, course, email } );

      // alert for successfully raising a request for Certificate
      sweetAlert( { text: 'Your certificate request has been submitted successfully.' } );

      // Reset form fields
      setName( '' );
      setCourse( '' );
      setEmail( '' );
    } catch ( error ) {
      sweetAlert( { title: 'Error!', text: error.response.data.error, icon: 'error' } );
    } finally {
      setErrors( {} );
      setIsLoading( false );
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ( !email.trim() || !emailRegex.test( email ) ) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  return (
    <div className='flex pt-24 pb-28 relative min-h-screen'>
      
      <form onSubmit={ handleSubmit } className='relative top-0 left-0 right-0 bottom-0 m-auto items-center justify-center lg:w-1/2 md:w-3/4 w-full'>
        <fieldset className='border-[3px] border-purple-400 rounded-xl p-4 sm:p-8 shadow-lg shadow-purple-400 bg-gradient-to-br from-gray-400 to-slate-200'>
          <legend className='sm:text-3xl text-2xl font-bold text-gray-800'>Get Your Certificate</legend>
          <div>
            <label htmlFor='name' className='block text-gray-700 font-bold'>
              Name
            </label>
            <input
              type='text'
              id='name'
              value={ name }
              onChange={ ( e ) => setName( e.target.value ) }
              className='w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
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
              className='w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
            />
            { errors.course && <p className='text-red-500 text-sm -mt-4 mb-4'>{ errors.course }</p> }
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
              className='w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
            />
            { errors.email && <p className='text-red-500 text-sm -mt-4 mb-4'>{ errors.email }</p> }
          </div>

          <PrimaryButton isLoading={ isLoading } title={ isLoading ? 'Sending Request...' : 'Get Certificate' } />

        </fieldset>
        { isLoading && <LoadingIndicator loadingText={ 'Requesting...' } /> }

      </form>

    </div>
  );
};

export default CertificateRequestForm;