import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const StyledToolbar = withStyles((theme) => {
  return {
    root: {
      justifyContent: 'center',
      background: theme.palette.primary,
    },
  };
})(Toolbar);

const Header = (props) => {
  return (
    <AppBar position="static" elevation={0}>
      <StyledToolbar>
        <Typography variant="h4">Incidentes App</Typography>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
