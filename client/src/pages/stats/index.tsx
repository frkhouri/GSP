import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import LoadingButton from '@mui/lab/LoadingButton';

import ResultsCard from '../components/ResultsCard';
import styles from './index.less';
import { Typography } from '@mui/material';

export default () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/sessions')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(e => console.log(e));
  }, []);

  return (
    <div className="App" style={{ background: '#f7fafb' }}>
      <Typography variant="h4" style={{ padding: '15px' }}>
        History
      </Typography>
      <>
        <Typography
          variant="subtitle2"
          style={{ padding: '0px 15px', color: '#757575' }}
        >
          Past Sessions
        </Typography>
        {data.length ? (
          data.map(session => <ResultsCard sessionData={session} />)
        ) : (
          <p>loading...</p>
        )}
      </>
    </div>
  );
};
