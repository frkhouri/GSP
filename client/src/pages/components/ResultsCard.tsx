import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import * as dayjs from 'dayjs';
import { history } from 'umi';

import CustomCard from './CustomCard';
import PerformanceChart from './PerformanceChart';

const ResultsCard = ({ sessionData }) => {
  return (
    <CustomCard>
      {sessionData ? (
        <CardActionArea
          onClick={() =>
            history.push({
              pathname: `/sessions/${sessionData._id}`,
              state: sessionData,
            })
          }
        >
          <CardHeader
            title={dayjs(sessionData.start).format('MMM. D, YYYY')}
            action={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  color: '#757575',
                }}
              >
                <Typography variant="caption">
                  {dayjs(sessionData.start).format('h:mm A')}
                </Typography>{' '}
                <ArrowRightAltRoundedIcon />{' '}
                <Typography variant="caption">
                  {dayjs(sessionData.end).format('h:mm A')}
                </Typography>
              </Box>
            }
          />
          <CardContent>
            {sessionData ? (
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4} align="center">
                    <Box
                      sx={{
                        position: 'relative',
                        display: 'inline-flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography fontSize={'2rem'} color={'primary'}>
                        {sessionData.performance.toFixed(0)}
                      </Typography>
                      <Typography variant="caption">Performance</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4} align="center">
                    <Box
                      sx={{
                        position: 'relative',
                        display: 'inline-flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography fontSize={'2rem'} color={'primary'}>
                        {sessionData.force} N
                      </Typography>
                      <Typography variant="caption">Force</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4} align="center">
                    <Box
                      sx={{
                        position: 'relative',
                        display: 'inline-flex',
                        flexDirection: 'column',
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        value={(sessionData.accuracy * 100).toFixed(1)}
                        size={70}
                        thickness={3}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '70px',
                        }}
                      >
                        <Typography variant="caption">
                          {sessionData.accuracy * 100}%
                        </Typography>
                      </Box>
                      <Typography variant="caption">Accuracy</Typography>
                    </Box>
                  </Grid>
                  {/* <Grid item xs={4}>
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                      variant="determinate"
                      value={sessionData.accuracy}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption">
                        {sessionData.accuracy}%
                      </Typography>
                    </Box>
                  </Box>
                </Grid> */}
                  <Grid item xs={12}>
                    <PerformanceChart combos={sessionData.combos} />
                  </Grid>
                </Grid>
              </Box>
            ) : (
              <p>loading</p>
            )}
          </CardContent>
        </CardActionArea>
      ) : (
        <p>loading</p>
      )}
    </CustomCard>
  );
};

export default ResultsCard;
