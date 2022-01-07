import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { history, useParams } from 'umi';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

// import ProgressCard from '../components/ProgressCard';
import ResultsCard from '../../components/ResultsCard';
import PerformanceChart from '../../components/PerformanceChart';
// import styles from './index.less';
// import { Typography } from '@mui/material';

export default () => {
  const [sessionData, setSessionData] = useState();
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    history.location.state
      ? setSessionData(history.location.state)
      : fetch(
          `http://localhost:3001/api/sessions?sessionId=${params.sessionId}`,
        )
          .then(res => res.json())
          .then(data => setSessionData(data))
          .catch(e => console.error(e));
  }, []);

  // const startSession = () => {
  //   setLoading(true);

  //   fetch('http://localhost:3001/api/sessions', {
  //     method: 'POST',
  //   }).then(res => setLoading(false));
  // };

  return (
    <>
      {/* <AppBar elevation={0} style={{background: "#f7fafb"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            onClick={() => history.goBack()}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          {sessionData && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="#0000008a">
              {dayjs(sessionData.start).format('dddd, MMM. D, YYYY')}
            </Typography>
          )}
        </Toolbar>
      </AppBar> */}
      <Card style={{ padding: '15px', margin: '15px' }}>
        {sessionData && <PerformanceChart data={sessionData.combos} />}
      </Card>
    </>
  );
};
