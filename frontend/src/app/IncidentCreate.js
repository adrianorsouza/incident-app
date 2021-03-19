import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Dialog, DialogTitle, IconButton, Paper } from '@material-ui/core';
import { createIncident, selectIncident } from '../store/incidentSlice';
import IncidentForm from './IncidentForm';

const useStyles = makeStyles((theme) => ({
  formTitle: {
    textAlign: 'center',
  },
}));

const IncidentCreate = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const incident = useSelector(selectIncident);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values, form) => {
    const data = {
      title: values.title,
      description: values.description,
      level: values.level,
      type: values.type,
      status: values.status ? 1 : 0,
    };
    dispatch(createIncident(data));

    if (!incident.error.create) {
      form.setSubmitting(false);
      handleClose();
    }
  };

  return (
    <div>
      <IconButton color="default" onClick={handleClickOpen}>
        <AddBoxIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.formTitle}>
          Novo Incidente
        </DialogTitle>
        <Paper elevation={0}>
          <IncidentForm
            handleSubmit={handleSubmit}
            handleCancel={handleClose}
            values={{}}
            error={incident.error.create}
            elevation={0}
          />
        </Paper>
      </Dialog>
    </div>
  );
};

export default IncidentCreate;
