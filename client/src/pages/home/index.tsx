import { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';

import ProgressCard from '../components/ProgressCard';
import ResultsCard from '../components/ResultsCard';
import styles from './styles.less';

export default () => {
  const [sessions, setSessions] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/sessions')
      .then(res => res.json())
      .then(data => setSessions(data))
      .catch(e => console.error(e));
  }, []);

  return (
    <div className="App" style={{ background: '#f7fafb' }}>
      {/* <AppBar elevation={0} color="#f7fafb">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            K.H.A.B.I.B.
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Typography variant="h4" style={{ padding: '15px' }}>
        Overview
      </Typography>
      <>
        <Typography
          variant="subtitle2"
          style={{ padding: '0px 15px', color: '#757575' }}
        >
          Latest Session
        </Typography>
        {sessions ? (
          <ResultsCard sessionData={sessions[0]} />
        ) : (
          <p>loading...</p>
        )}
      </>
      <>
        <Typography
          variant="subtitle2"
          style={{ padding: '0px 15px', color: '#757575' }}
        >
          My Progress
        </Typography>
        {sessions ? (
          <ProgressCard
            sessionData={sessions.reverse().map(session => {
              return {
                date: new Date(session.start).getTime(),
                accuracy: session.accuracy,
                performance: session.performance,
              };
            })}
          />
        ) : (
          <p>loading...</p>
        )}
      </>
      {/* <LoadingButton
        variant="contained"
        loading={loading}
        onClick={() => startSession()}
      >
        START SESSION
      </LoadingButton> */}
    </div>
  );
};
