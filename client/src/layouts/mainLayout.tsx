import BottomBar from './components/BottomBar';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import styles from './styles.less';

type MainLayoutProps = {
  children?: any;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#f44336',
      },
      secondary: {
        main: '#000000',
      },
    },
    typography: {
      fontFamily: `"Oxygen", "Roboto", "Helvetica", "Arial", sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Oxygen:wght@300;400;700&display=swap"
      />
      <div className={styles.body}>{children}</div>
      <BottomBar />
    </ThemeProvider>
  );
};

export default MainLayout;
