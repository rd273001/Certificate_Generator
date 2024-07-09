import React, { useState } from 'react';
import PrimaryButton from '../components/commons/PrimaryButton';
import LoadingIndicator from '../components/commons/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { requestCertificate } from '../store/certificateSlice';


const CertificateRequestForm = () => {
  const dispatch = useDispatch();
  const isRequesting = useSelector( ( state ) => state.certificate.isRequesting );
  const [name, setName] = useState( '' );
  const [course, setCourse] = useState( '' );
  const [email, setEmail] = useState( '' );
  const [errors, setErrors] = useState( {} );

  const handleSubmit = async ( e ) => {
    e.preventDefault();
    const errors = validateForm();
    if ( Object.keys( errors ).length > 0 ) {
      setErrors( errors );
      return;
    }
    dispatch( requestCertificate( { name, course, email } ) );
    setName( '' );
    setCourse( '' );
    setEmail( '' );
    setErrors( {} );
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
    <div className='flex flex-grow items-center justify-center md:px-8 px-4 md:pt-12 pt-10 md:pb-14 pb-12'>

      <form onSubmit={ handleSubmit } className={ `lg:w-1/2 md:w-3/4 w-full ${ isRequesting ? 'opacity-35' : '' }` }>
        <fieldset className='rounded-xl p-4 sm:p-8 shadow-lg shadow-purple-600 bg-gradient-to-br from-gray-400 to-slate-200'>
          <legend className='sm:text-3xl text-2xl font-semibold text-gray-800'>Get Your Certificate</legend>
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

          <PrimaryButton isRequesting={ isRequesting } title={ isRequesting ? 'Sending Request...' : 'Get Certificate' } />

        </fieldset>

      </form>

      { isRequesting && <LoadingIndicator loadingText={ 'Requesting...' } /> }

    </div>
  );
};

export default CertificateRequestForm;