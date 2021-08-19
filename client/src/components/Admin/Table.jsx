import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { CircularProgress } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import TableToolBar from './Table/TableToolBar';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis?.map(el => el[0]);
}

const headCells = [
  { id: 'course_name', disablePadding: true, label: 'Course Name' },
  { id: 'name', disablePadding: false, label: 'Task Name' },
  { id: 'description', disablePadding: false, label: 'Description' },
  { id: 'max_points', disablePadding: false, label: 'Max Points' },
  { id: 'duration', disablePadding: false, label: 'Duration' },
  { id: 'level', disablePadding: false, label: 'Level' },
  { id: 'edit_task', disablePadding: false, label: 'Edit Task' }
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: 20
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
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
    width: 1
  }
}));

export default function EnhancedTable({ allTasks, openModal }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState();

  const getData = () => {
    let newData;
    switch (filter) {
      case 'web_dev':
        newData = allTasks.web_dev_tasks;
        break;
      case 'sketching':
        newData = allTasks.sketching_tasks;
        break;
      case 'ui-design':
        newData = allTasks.UI_design_tasks;
        break;
      case 'content-writing':
        newData = allTasks.content_writing_tasks;
        break;
      default:
        newData = allTasks.tasks;
    }

    newData = newData?.map(item => {
      return {
        id: item.id,
        course_name: item.course_name,
        name: item.name,
        description: item.description,
        max_points: item.max_points,
        duration: item.time_complete,
        level: item.level
      };
    });
    return newData;
  };

  useEffect(() => {
    setRows(getData());
    // eslint-disable-next-line
  }, [allTasks, filter]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = name => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolBar numSelected={selected.length} setFilter={setFilter} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      {/* optimise */}
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={() => handleClick(row.id)}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell id={labelId} scope="row" padding="none">
                        {row.course_name}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">{row.max_points}</TableCell>
                      <TableCell align="center">{row.duration}</TableCell>
                      <TableCell align="center">{row.level}</TableCell>
                      <TableCell align="center">
                        <EditIcon style={{ cursor: 'pointer' }} onClick={() => openModal()} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {rows?.length === 0 && (
                <TableRow>
                  <CircularProgress style={{ margin: 10 }} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
