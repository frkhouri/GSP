import { useCallback, useRef, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import FlipCameraAndroidRoundedIcon from '@mui/icons-material/FlipCameraAndroidRounded';
import StopRounded from '@mui/icons-material/StopRounded';
import Webcam from 'react-webcam';
import { useParams } from 'umi';

import styles from './styles.less';

export default () => {
  const [facingMode, setFacingMode] = useState('environment');
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const params = useParams();

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable,
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks(prev => prev.concat(data));
      }
    },
    [setRecordedChunks],
  );

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  async function handleDownload() {
    if (recordedChunks.length) {
      console.log('chunks:', recordedChunks);
      const blob = new Blob(recordedChunks, {
        type: 'video/mp4',
      });
      const url = URL.createObjectURL(blob);

      const file = await fetch(url)
        .then(r => r.blob())
        .then(
          blobFile =>
            new File([blobFile], params.sessionId, { type: blobFile.type }),
        );

      const formData = new FormData();
      formData.append('inputFile', file);

      fetch(
        `http://localhost:3001/api/recordings?sessionId=${params.sessionId}`,
        {
          method: 'POST',
          body: formData,
        },
      );
    }
  }

  return (
    <div className={styles.cameraView}>
      <Webcam
        ref={webcamRef}
        mirrored={facingMode === 'environment'}
        videoConstraints={{ facingMode: facingMode }}
        style={{ height: '100%', position: 'absolute' }}
      />
      <div className={styles.cameraButtonsWrapper}>
        <IconButton
          onClick={() =>
            setFacingMode(facingMode === 'environment' ? 'user' : 'environment')
          }
          style={{ width: '55px' }}
        >
          <FlipCameraAndroidRoundedIcon />
        </IconButton>
        {capturing ? (
          <IconButton onClick={handleStopCaptureClick}>
            <StopRounded fontSize="large" style={{ fill: '#d32f2f' }} />
          </IconButton>
        ) : (
          <IconButton onClick={handleStartCaptureClick}>
            <CircleRoundedIcon fontSize="large" style={{ fill: '#d32f2f' }} />
          </IconButton>
        )}
        <Button
          disabled={recordedChunks.length === 0}
          variant="contained"
          disableElevation
          onClick={handleDownload}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
