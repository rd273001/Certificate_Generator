import { configureStore } from '@reduxjs/toolkit';
import certificateReducer from './certificateSlice';

const store = configureStore( {
  reducer: {
    certificate: certificateReducer,
  },
} );

export default store;