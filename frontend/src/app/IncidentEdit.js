import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, Redirect } from 'react-router-dom';
import { Box, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import Layout from '../components/Layout';
import {
  selectIncident,
  updateIncident,
  updateItemCancel,
} from '../store/incidentSlice';
import IncidentForm from './IncidentForm';

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  goBackIcon: {
    color: '#000',
  },
}));

const IncidentEdit = (props) => {
  const dispatch = useDispatch();
  const incident = useSelector(selectIncident);
  const params = useParams();
  const classes = useStyles();

  const handleSubmit = (values, form) => {
    const data = {
      title: values.title,
      description: values.description,
      level: values.level,
      type: values.type,
      status: values.status ? 1 : 0,
    };

    dispatch(updateIncident(params.id, data));
  };

  const handleCancel = () => {
    dispatch(updateItemCancel());
  };

  if (!incident.item.id) {
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box marginTop={3} marginBottom={3}>
          <Typography variant="h6">
            <Link to="/" className={classes.goBackIcon}>
              <ArrowBackIcon fontSize="large" />
            </Link>
            Editar Incidente
          </Typography>
        </Box>

        <Box className={classes.formWrapper}>
          <IncidentForm
            handleSubmit={handleSubmit}
            values={incident.item}
            error={incident.error.update}
            handleCancel={handleCancel}
          />
        </Box>
      </Container>
    </Layout>
  );
};

export default IncidentEdit;
