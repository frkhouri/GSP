import { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import { history, useLocation } from 'umi';

import styles from '../styles.less';

const BottomBar = () => {
  const [value, setValue] = useState(
    useLocation().pathname.substring(1) || 'home',
  );

  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
    history.push(`/${newValue}`);
  };

  return (
    <Paper elevation={5} className={styles.bottomNav}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction value="home" icon={<HomeRoundedIcon />} />
        <BottomNavigationAction value="stats" icon={<InsightsRoundedIcon />} />
        <BottomNavigationAction value="schedule" icon={<TodayRoundedIcon />} />
        <BottomNavigationAction value="settings" icon={<PersonRoundedIcon />} />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomBar;
