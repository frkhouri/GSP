import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import * as dayjs from 'dayjs';

import ProgressChart from './ProgressChart';

const ProgressCard = ({ sessionData }) => {
  return (
    <Card
      variant="outlined"
      style={{ margin: '5px 15px', borderRadius: '20px' }}
    >
      {sessionData ? (
        <CardActionArea>
          <CardContent>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ProgressChart data={sessionData} />
                  </Grid>
                </Grid>
              </Box>
          </CardContent>
        </CardActionArea>
      ) : (
        <p>loading</p>
      )}
    </Card>
  );
};

export default ProgressCard;
