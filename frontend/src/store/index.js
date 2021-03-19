import { configureStore } from '@reduxjs/toolkit';
import incidentReducer from './incidentSlice';

export default configureStore({
  reducer: {
    incident: incidentReducer,
  },
});
