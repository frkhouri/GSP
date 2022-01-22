import Box from '@mui/material/Box';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import * as dayjs from 'dayjs';

import CustomCard from './CustomCard';
import ProgressChart from './ProgressChart';

const ProgressCard = ({ sessionData }) => {
  return (
    <CustomCard>
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
    </CustomCard>
  );
};

export default ProgressCard;
