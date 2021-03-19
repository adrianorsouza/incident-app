import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import {
  formatDateTime,
  formatLevel,
  formatStatus,
  formatType,
} from '../utils/formatters';
import Loader from '../components/Loader';
import { getComparator, stableSort } from '../utils/sorters';
import EnhancedTableHead from '../components/table/EnhancedTableHead';
import EnhancedTableToolbar from '../components/table/EnhancedTableToolbar';
import { columns } from '../components/table/columns';
import { readItem } from '../store/incidentSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  container: {
    maxHeight: 600,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  nowrap: {
    whiteSpace: 'nowrap',
  },
}));

const IncidentList = ({ rows, loading, ...props }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((row) => ({
        id: row.id,
        title: row.title,
      }));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelectClick = (event, { id, title }) => {
    const selectedIndex = selected.findIndex((i) => i.id === id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, [{ id, title }]);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (event, row) => {
    event.preventDefault();
    const path = event.currentTarget.getAttribute('href');
    dispatch(readItem(row));
    history.push(path);
  };

  const isSelected = (row) => selected.some((i) => i.id === row.id);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          selectedItems={selected}
          setSelected={setSelected}
        />
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="Lista de Incidentes"
            stickyHeader
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${row.id}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) => handleSelectClick(event, row)}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell id={labelId} padding="none">
                        <strong>{row.title}</strong>
                      </TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>
                        <Box color={`level.${row.level}`}>
                          {formatLevel(row.level)}
                        </Box>
                      </TableCell>
                      <TableCell>{formatType(row.type)}</TableCell>
                      <TableCell>
                        <Box
                          color={row.status ? `secondary.main` : `gray.main`}
                        >
                          {formatStatus(row.status)}
                        </Box>
                      </TableCell>
                      <TableCell className={classes.nowrap}>
                        {formatDateTime(row.created_at)}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Modificar Incidente">
                          <IconButton
                            component={Link}
                            to={`/edit/${row.id}`}
                            aria-label="Modificar Incidente"
                            onClick={(event) => handleEditClick(event, row)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {!rows.length && loading === false && (
                <TableRow style={{ height: 400 }}>
                  <TableCell
                    colSpan={columns.length + 1}
                    style={{ textAlign: 'center' }}
                  >
                    Nenhum registro encontrado.
                  </TableCell>
                </TableRow>
              )}
              {!rows.length && loading === true && (
                <TableRow style={{ height: 400 }}>
                  <TableCell
                    colSpan={columns.length + 1}
                    style={{ textAlign: 'center' }}
                  >
                    <Loader show={true} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

IncidentList.propTypes = {
  rows: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default IncidentList;
