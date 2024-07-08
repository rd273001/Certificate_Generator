import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/apiService';
import sweetAlert from '../utils/sweetAlert';

// Async thunk for requesting a certificate
export const requestCertificate = createAsyncThunk(
  'certificate/requestCertificate',
  async ( { name, course, email }, { rejectWithValue } ) => {
    try {
      const response = await api.post( '/certificates/request', { name, course, email } );
      sweetAlert( { text: 'Your certificate request has been submitted successfully.' } );
      return response.data;
    } catch ( error ) {
      sweetAlert( { title: 'Error!', text: error.response.data.error, icon: 'error' } );
      return rejectWithValue( error.response.data );
    }
  }
);

// Async thunk for fetching certificate requests
export const fetchRequests = createAsyncThunk(
  'certificate/fetchRequests',
  async ( _, { rejectWithValue } ) => {
    try {
      const response = await api.get( '/certificates/requests' );
      return response.data;
    } catch ( error ) {
      return rejectWithValue( error.response.data );
    }
  }
);

// Async thunk for fetching certificates
export const fetchCertificates = createAsyncThunk(
  'certificate/fetchCertificates',
  async ( _, { rejectWithValue } ) => {
    try {
      const response = await api.get( '/certificates/all' );
      return response.data;
    } catch ( error ) {
      return rejectWithValue( error.response.data );
    }
  }
);

// Async thunk for approving and generating a certificate
export const approveCertificate = createAsyncThunk(
  'certificate/approveCertificate',
  async ( certificateDetails, { dispatch, rejectWithValue } ) => {
    const { _id, name, course, email } = certificateDetails;
    try {
      const generateCertificate = { name, course, email, approvalDate: new Date() };
      await api.put( `/certificates/create/${ _id }`, generateCertificate );
      sweetAlert( { text: 'Certificate generated successfully.' } );
      dispatch( fetchRequests() );
      dispatch( fetchCertificates() );
    } catch ( error ) {
      sweetAlert( { title: 'Error!', text: error.response.data.error, icon: 'error' } );
      return rejectWithValue( error.response.data );
    }
  }
);

// Async thunk for rejecting a certificate
export const rejectCertificate = createAsyncThunk(
  'certificate/rejectCertificate',
  async ( _id, { dispatch, rejectWithValue } ) => {
    try {
      await api.delete( `/certificates/reject/${ _id }` );
      sweetAlert( { text: 'Certificate request rejected.' } );
      dispatch( fetchRequests() );
    } catch ( error ) {
      sweetAlert( { title: 'Error!', text: error.response.data.error, icon: 'error' } );
      return rejectWithValue( error.response.data );
    }
  }
);

const certificateSlice = createSlice( {
  name: 'certificate',
  initialState: {
    requests: [],
    certificates: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: ( builder ) => {
    builder
      // Request Certificate
      .addCase( requestCertificate.pending, ( state ) => {
        state.isLoading = true;
      } )
      .addCase( requestCertificate.fulfilled, ( state ) => {
        state.isLoading = false;
      } )
      .addCase( requestCertificate.rejected, ( state, action ) => {
        state.isLoading = false;
        state.error = action.payload;
      } )
      // Fetch Requests
      .addCase( fetchRequests.pending, ( state ) => {
        state.isLoading = true;
      } )
      .addCase( fetchRequests.fulfilled, ( state, action ) => {
        state.isLoading = false;
        state.requests = action.payload;
      } )
      .addCase( fetchRequests.rejected, ( state, action ) => {
        state.isLoading = false;
        state.error = action.payload;
      } )
      // Fetch Certificates
      .addCase( fetchCertificates.pending, ( state ) => {
        state.isLoading = true;
      } )
      .addCase( fetchCertificates.fulfilled, ( state, action ) => {
        state.isLoading = false;
        state.certificates = action.payload;
      } )
      .addCase( fetchCertificates.rejected, ( state, action ) => {
        state.isLoading = false;
        state.error = action.payload;
      } )
      // Approve Certificate
      .addCase( approveCertificate.pending, ( state ) => {
        state.isLoading = true;
      } )
      .addCase( approveCertificate.fulfilled, ( state ) => {
        state.isLoading = false;
      } )
      .addCase( approveCertificate.rejected, ( state, action ) => {
        state.isLoading = false;
        state.error = action.payload;
      } )
      // Reject Certificate
      .addCase( rejectCertificate.pending, ( state ) => {
        state.isLoading = true;
      } )
      .addCase( rejectCertificate.fulfilled, ( state ) => {
        state.isLoading = false;
      } )
      .addCase( rejectCertificate.rejected, ( state, action ) => {
        state.isLoading = false;
        state.error = action.payload;
      } );
  },
} );

export default certificateSlice.reducer;