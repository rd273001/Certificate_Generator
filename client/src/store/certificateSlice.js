import { createSlice } from '@reduxjs/toolkit';
import { approveCertificate, fetchRequests, fetchRequestsAndCertificates, rejectCertificate, requestCertificate } from './certificateActions';

const certificateSlice = createSlice( {
  name: 'certificate',
  initialState: {
    requests: [],
    certificates: [],
    isLoading: false,
    isRequesting: false,
    error: null,
  },
  reducers: {},
  extraReducers: ( builder ) => {
    builder
      // Request Certificate
      .addCase( requestCertificate.pending, ( state ) => {
        state.isRequesting = true;
      } )
      .addCase( requestCertificate.fulfilled, ( state ) => {
        state.isRequesting = false;
      } )
      .addCase( requestCertificate.rejected, ( state, action ) => {
        state.isRequesting = false;
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
      // Fetch Requests and Certificates
      .addCase( fetchRequestsAndCertificates.pending, ( state ) => {
        state.isLoading = true;
      } )
      .addCase( fetchRequestsAndCertificates.fulfilled, ( state, action ) => {
        state.isLoading = false;
        state.requests = action.payload.requests;
        state.certificates = action.payload.certificates;
      } )
      .addCase( fetchRequestsAndCertificates.rejected, ( state, action ) => {
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