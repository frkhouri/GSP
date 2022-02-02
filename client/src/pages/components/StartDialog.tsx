import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import styles from './styles.less';
import LoadingButton from '@mui/lab/LoadingButton';

type StartDialogProps = {
  open: boolean;
  setOpen: any;
};

type DrillProps = {
  type: string;
  duration: number;
};

const StartDialog = ({ open, setOpen }: StartDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [difficulty, setDifficulty] = useState();
  const [drills, setDrills] = useState<Array<DrillProps>>([
    { type: 'Jabs', duration: 3 },
    { type: 'Crosses', duration: 3 },
    { type: 'Punching Bag', duration: 3 },
  ]);
  const [newDrill, setNewDrill] = useState<DrillProps>({});

  const handleCancel = () => {
    setOpen(false);
    setDifficulty('');
    setDrills([]);
    setNewDrill({});
  };

  const handleStart = () => {
    setIsLoading(true);
    const body = {
      difficulty: difficulty,
      sequence: drills,
    };

    fetch('http://localhost:3001/api/start-session', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: new Headers({ 'content-type': 'application/json' }),
    })
      .then(data => {
        setIsLoading(false);
      })
      .catch(e => console.error(e));
  };

  const addDrill = () => {
    setDrills([...drills, newDrill]);
    setNewDrill({});
  };

  return (
    <Dialog id={open ? 'session-dialog' : undefined} open={open} fullWidth>
      <DialogTitle>New Session</DialogTitle>
      <DialogContent>
        <DialogContentText className={styles.formLabel}>
          Difficulty
        </DialogContentText>
        <ToggleButtonGroup
          color="primary"
          value={difficulty}
          exclusive
          onChange={(_event, difficulty) => {
            difficulty && setDifficulty(difficulty);
          }}
          aria-label="difficulty"
          className={styles.formItem}
        >
          <ToggleButton value="0" aria-label="easy">
            Easy
          </ToggleButton>
          <ToggleButton value="1" aria-label="medium">
            Medium
          </ToggleButton>
          <ToggleButton value="2" aria-label="hard">
            Hard
          </ToggleButton>
        </ToggleButtonGroup>
        <DialogContentText className={styles.formLabel}>
          Drills
        </DialogContentText>
        <List
          dense
          style={{ width: '100%', maxHeight: '300px', overflow: 'auto' }}
        >
          {drills.map((drill, i) => (
            <ListItem divider key={i}>
              <ListItemIcon style={{ minWidth: '30px' }}>{i + 1}</ListItemIcon>
              <ListItemText
                primary={drill.type}
                secondary={drill.duration + ' minutes'}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() =>
                    setDrills([...drills.filter((drill, index) => i !== index)])
                  }
                >
                  <DeleteRoundedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <ListItem style={{ padding: '15px 0px 5px 5px ' }}>
            <FormControl style={{ width: '100%' }}>
              <InputLabel id="demo-simple-select-label">New Drill</InputLabel>
              <div>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={newDrill.type || ''}
                  variant="filled"
                  onChange={e =>
                    setNewDrill({ ...newDrill, type: e.target.value as string })
                  }
                  style={{ width: '55%' }}
                >
                  <MenuItem value={'Jabs'}>Jabs</MenuItem>
                  <MenuItem value={'Crosses'}>Crosses</MenuItem>
                  <MenuItem value={'Punching Bag'}>Punching Bag</MenuItem>
                </Select>
                <TextField
                  id="duration"
                  label="Duration"
                  type="number"
                  variant="filled"
                  value={newDrill.duration || ''}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={e =>
                    setNewDrill({ ...newDrill, duration: e.target.value })
                  }
                  style={{ width: '25%' }}
                />
              </div>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="add"
                  onClick={() => addDrill()}
                  disabled={!newDrill.type || !newDrill.duration}
                >
                  <AddRoundedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </FormControl>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCancel(false)}>Cancel</Button>
        <LoadingButton
          variant="contained"
          onClick={() => handleStart()}
          loading={isLoading}
          disabled={!difficulty || drills.length === 0}
          disableElevation
        >
          Start
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default StartDialog;
