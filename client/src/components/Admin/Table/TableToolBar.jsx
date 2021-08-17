import React, { useState, useRef } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, IconButton, Tooltip, Menu, MenuItem } from '@material-ui/core';
import { Delete as DeleteIcon, FilterList as FilterListIcon } from '@material-ui/icons';

import clsx from 'clsx';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: '1 1 100%'
  }
}));

const menuItems = [
  { key: 'web_dev', value: 'Web Development Tasks' },
  { key: 'sketching', value: 'Sketching Tasks' },
  { key: 'ui-design', value: 'UI Design Tasks' },
  { key: 'content-writing', value: 'Content Writing Tasks' }
];

const TableToolBar = ({ numSelected, setFilter }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const classes = useToolbarStyles();

  const handleClose = key => {
    setOpen(() => false);
    if (key) setFilter(key);
  };
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            ref={menuRef}
            onClick={() => setOpen(true)}
          >
            <FilterListIcon />
          </IconButton>
          <Menu id="simple-menu" anchorEl={menuRef.current} open={open} onClose={handleClose}>
            {menuItems.map((item, k) => (
              <MenuItem key={k} onClick={() => handleClose(item.key)}>
                {item.value}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Toolbar>
  );
};

export default TableToolBar;
