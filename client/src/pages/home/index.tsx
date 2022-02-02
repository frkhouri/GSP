import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import '@fontsource/oxygen/700.css';

import CustomCard from '../components/CustomCard';
import ProgressCard from '../components/ProgressCard';
import ResultsCard from '../components/ResultsCard';
import StartDialog from '../components/StartDialog';

export default () => {
  const [sessions, setSessions] = useState();
  const [loading, setLoading] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);

  async function startSession() {
    setLoading(true);
    setBackdropOpen(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  useEffect(() => {
    fetch('http://localhost:3001/api/sessions')
      .then(res => res.json())
      .then(data => setSessions(data))
      .catch(e => console.error(e));
  }, []);

  return (
    <div className="App">
      {/* <AppBar elevation={0} color="#f7fafb">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            K.H.A.B.I.B.
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Typography
        variant="h4"
        gutterBottom
        style={{ padding: '15px', fontWeight: '700' }}
      >
        Overview
      </Typography>
      <CustomCard>
        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={<AddRoundedIcon />}
          onClick={() => startSession()}
          style={{ height: '100px', fontFamily: 'Oxygen', fontSize: 'large' }}
        >
          NEW SESSION
        </Button>
      </CustomCard>
      <StartDialog open={backdropOpen} setOpen={setBackdropOpen} />
      <>
        <Typography
          variant="subtitle1"
          style={{ padding: '0px 20px', marginTop: '15px', color: '#757575' }}
        >
          Latest Session
        </Typography>
        {sessions ? (
          <ResultsCard sessionData={sessions[sessions.length - 1]} />
        ) : (
          <p>loading...</p>
        )}
      </>
      <>
        <Typography
          variant="subtitle1"
          style={{ padding: '0px 20px', marginTop: '15px', color: '#757575' }}
        >
          My Progress
        </Typography>
        {sessions ? (
          <ProgressCard
            sessionData={sessions.map(session => {
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
    </div>
  );
};
