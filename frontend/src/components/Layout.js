import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { CSSTransition } from 'react-transition-group';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme';
import Header from './Header';

const Layout = (props) => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    setShow(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <CSSTransition in={show} timeout={100} classNames="page-transition">
        <main>{props.children}</main>
      </CSSTransition>
    </ThemeProvider>
  );
};

export default Layout;
