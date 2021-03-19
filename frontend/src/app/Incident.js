/** ========================================================================
 * Project     : incident-app
 * Component   : Incident
 * Author      : Adriano Rosa <https://adrianorosa.com>
 * ========================================================================
 * Copyright 2021 Adriano Rosa <https://adrianorosa.com>
 * ======================================================================== */

import React from 'react';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Typography } from '@material-ui/core';
import IncidentList from './IncidentList';
import Layout from '../components/Layout';
import { fetchIncidentList, selectIncident } from '../store/incidentSlice';

const Incident = (props) => {
  const dispatch = useDispatch();
  const incident = useSelector(selectIncident);

  React.useEffect(() => {
    dispatch(fetchIncidentList());
  }, [dispatch]);

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box marginTop={3} marginBottom={3}>
          <Typography variant="h6" id="tableTitle" component="div">
            Incidentes
          </Typography>
        </Box>
        <Box marginTop={1}>
          {incident.error.list && (
            <>
              <Alert severity="error">{incident.error.list}</Alert>
            </>
          )}
        </Box>
        <IncidentList rows={incident.list} loading={incident.loading} />
      </Container>
    </Layout>
  );
};

export default Incident;
