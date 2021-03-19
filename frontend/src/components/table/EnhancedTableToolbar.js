import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { lighten, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import SyncIcon from '@material-ui/icons/Sync';
import { Alert } from '@material-ui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';

import IncidentCreate from '../../app/IncidentCreate';
import {
  deleteCancel,
  deleteIncident,
  fetchIncidentList,
  selectIncident,
} from '../../store/incidentSlice';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  },
  title: {
    flex: '1 1 auto',
  },
  center: {
    textAlign: 'center',
  },
  actionsRoot: {
    paddingTop: theme.spacing(2.3),
    paddingBottom: theme.spacing(2.2),
    display: 'flex',
    justifyContent: 'flex-end',
    flex: '1 1 auto',
  },
}));

const EnhancedTableToolbar = ({ selectedItems, setSelected }) => {
  const [openConfirm, setOpenConfirm] = React.useState(false);

  const dispatch = useDispatch();
  const incident = useSelector(selectIncident);

  const classes = useToolbarStyles();
  const numSelected = selectedItems.length;

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setSelected([]);
    dispatch(deleteCancel());
  };

  const handleDeleteAllSelected = () => {
    dispatch(deleteIncident(selectedItems))
      .then(() => {
        handleCloseConfirm();
        setSelected([]);
      })
      .catch(() => {
        // just do nothing to keep dialog opened
      });
  };

  const handleSyncTable = () => {
    dispatch(fetchIncidentList());
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 && (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selecionado(s)
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={handleOpenConfirm}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Dialog
            open={openConfirm}
            onClose={handleCloseConfirm}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" disableTypography>
              <h3>Deseja realmente remover os itens selecionados?</h3>
            </DialogTitle>
            <DialogContent dividers>
              <DialogContentText id="alert-dialog-description" component="div">
                {incident.selected.error ? (
                  <Alert severity="error">
                    <span>Não foi possível remover um ou mais itens:</span>{' '}
                    <br />
                    <small>{incident.selected.error}</small>
                  </Alert>
                ) : (
                  <Alert severity="warning">
                    Atenção, esta ação é irreversível!
                  </Alert>
                )}
              </DialogContentText>
              <DialogContentText component="div">
                {incident.selected.pending === true && (
                  <div className={classes.center}>
                    <LinearProgress />
                  </div>
                )}

                {selectedItems.length && (
                  <List dense>
                    {selectedItems.map((item) => (
                      <ListItem key={item.id}>
                        <ListItemText primary={`${item.id}: ${item.title}`} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseConfirm}
                color="secondary"
                disabled={incident.selected.pending}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDeleteAllSelected}
                color="secondary"
                variant="contained"
                autoFocus
                disabled={incident.selected.pending}
              >
                Remover itens
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <>
          <Box className={classes.actionsRoot}>
            <Tooltip title="Sincronizar Dados">
              <span>
                <IconButton
                  aria-label="atualizar dados"
                  onClick={handleSyncTable}
                  disabled={incident.loading}
                >
                  <SyncIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Novo Incidente">
              <span>
                <IncidentCreate />
              </span>
            </Tooltip>
          </Box>
        </>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  selectedItems: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default EnhancedTableToolbar;
