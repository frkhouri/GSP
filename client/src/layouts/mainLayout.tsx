import { useState } from 'react';
import BottomBar from './components/BottomBar';
import { CssBaseline } from '@material-ui/core';
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from '@mui/material/styles';
import '@fontsource/oxygen';
import styles from './styles.less';

type MainLayoutProps = {
  children?: any;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#d32f2f',
      },
      secondary: {
        main: '#000000',
      },
      // info: {
      //   main: '#f44336',
      // },
      background: {
        default: '#f2f4f5',
      },
    },
    // typography: {
    //   fontFamily: [
    //     '"Oxygen"',
    //     'Roboto',
    //     '"Helvetica"',
    //     'Arial',
    //     'sans-serif',
    //   ].join(','),
    //   fontSize: 14,
    //   fontWeightLight: 300,
    //   fontWeightRegular: 400,
    //   fontWeightMedium: 500,
    // },
  });

  return (
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className={styles.body}>{children}</div>
        <BottomBar />
      </MuiThemeProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
