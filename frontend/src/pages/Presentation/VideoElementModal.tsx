import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import InputField from '../../components/InputField';
import {
  Typography,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import { useStore } from '../../hooks/useStore';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  SlideElementBase,
  VideoSlideElement,
} from '../../hooks/useStore.types';
import { ElementModalMode } from './ElementModal.types';

type VideoElementModalProps = {
  mode: ElementModalMode;
  onClose: () => void;
  elementId: string;
};

const VideoElementModal = ({
  mode,
  onClose,
  elementId,
}: VideoElementModalProps) => {
  const store = useStore();
  const params = useParams();
  const id = params.id as string;
  const slideIndex = parseInt(params.slideIdx as string) as number;
  const presentation = store.store[id];
  const slide = presentation?.slides[slideIndex];
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [watchUrl, setWatchUrl] = useState('');
  const [embdedUrl, setEmbdedUrl] = useState('');
  const [autoplay, setAutoplay] = useState(false);

  useEffect(() => {
    if (!slide || mode === 'close') return;
    if (mode === 'create') {
      setX('');
      setY('');
      setWidth('');
      setHeight('');
      setWatchUrl('');
      setEmbdedUrl('');
      setAutoplay(false);
    } else if (mode === 'edit') {
      const element = slide.elements.find(
        (ele) => ele.id === elementId
      ) as VideoSlideElement & SlideElementBase;
      if (element) {
        setX(element.x.toString());
        setY(element.y.toString());
        setWidth(element.width.toString());
        setHeight(element.height.toString());
        setWatchUrl(element.watchUrl);
        setEmbdedUrl(element.embdedUrl);
        setAutoplay(element.autoplay);
      }
    }
  }, [mode, slide, elementId]);

  const handleChangeX = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (/^[0-9]*\.?[0-9]*$/.test(e.target.value)) {
      setX(e.target.value);
    }
  };

  const handleChangeY = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (/^[0-9]*\.?[0-9]*$/.test(e.target.value)) {
      setY(e.target.value);
    }
  };

  const handleChangeWidth = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (/^[0-9]*\.?[0-9]*$/.test(e.target.value)) {
      setWidth(e.target.value);
    }
  };

  const handleChangeHeight = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (/^[0-9]*\.?[0-9]*$/.test(e.target.value)) {
      setHeight(e.target.value);
    }
  };

  const handleChangeUrl = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setWatchUrl(e.target.value);
  };

  const handleChangeAutoplay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoplay(e.target.value === 'true');
  };

  const toEmbdedUrl = (url: string) => {
    if (url.includes(`youtube.com/embed/`)) {
      return url;
    }
    const matches = url.match(/[?&]v=([^&]+)/);
    if (matches) {
      return `https://www.youtube.com/embed/${matches[1]}?`.concat(
        autoplay ? '?autoplay=1&mute=1' : ''
      );
    } else {
      return url.replace('watch?v=', 'embed/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const xFloat = parseFloat(x);
    const yFloat = parseFloat(y);
    const widthFloat = parseFloat(width);
    const heightFloat = parseFloat(height);

    if (isNaN(widthFloat) || widthFloat < 0 || widthFloat > 100) {
      toast.error('Invalid width');
      return;
    }
    if (isNaN(heightFloat) || heightFloat < 0 || heightFloat > 100) {
      toast.error('Invalid height');
      return;
    }
    if (mode === 'create') {
      const videoElement: VideoSlideElement = {
        width: widthFloat,
        height: heightFloat,
        watchUrl,
        embdedUrl: toEmbdedUrl(watchUrl),
        autoplay,
        elementType: 'video',
      };
      try {
        await store.createSlideElement(id, slide.id, videoElement);
        onClose();
      } catch (err) {
        toast.error('Fail to create video');
      }
    } else if (mode === 'edit') {
      if (isNaN(xFloat) || xFloat < 0 || xFloat > 100) {
        toast.error('Invalid x coordinate');
        return;
      }
      if (isNaN(yFloat) || yFloat < 0 || yFloat > 100) {
        toast.error('Invalid y coordinate');
        return;
      }
      const videoElement: VideoSlideElement & SlideElementBase = {
        id: elementId,
        x: xFloat,
        y: yFloat,
        width: widthFloat,
        height: heightFloat,
        watchUrl,
        embdedUrl: toEmbdedUrl(watchUrl),
        autoplay,
        elementType: 'video',
      };
      try {
        await store.updateSlideElement(id, slide.id, elementId, videoElement);
        onClose();
      } catch (err) {
        toast.error('Fail to create video');
      }
    }
  };

  return (
    <Modal
      open={mode !== 'close'}
      onClose={onClose}
      modalContainerStyle={{
        width: 450,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" mb={2}>
          {mode === 'create' ? 'Create' : 'Edit'} Video
        </Typography>
        {mode === 'edit' && (
          <>
            <iframe
              src={embdedUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{
                width: '100%',
                maxHeight: '150px',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                mt: 3,
              }}
            >
              <InputField
                id="video-element-x"
                value={x}
                label="X coordinate (%)"
                onChange={handleChangeX}
                autoComplete="off"
              />
              <InputField
                id="video-element-y"
                value={y}
                label="Y coordinate (%)"
                onChange={handleChangeY}
                autoComplete="off"
              />
            </Box>
          </>
        )}
        <Box
          sx={{
            mt: mode === 'edit' ? 3 : 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          <InputField
            id="video-element-width"
            value={width}
            label="Width (%)"
            onChange={handleChangeWidth}
            autoComplete="off"
          />
          <InputField
            id="video-element-height"
            value={height}
            label="Height (%)"
            onChange={handleChangeHeight}
            autoComplete="off"
          />
        </Box>
        <InputField
          id="video-element-url"
          value={watchUrl}
          label="Youtube URL"
          onChange={handleChangeUrl}
          autoComplete="off"
          sx={{
            mt: 3,
          }}
        />
        <Box
          sx={{
            mt: 3,
          }}
        >
          <FormControl>
            <FormLabel id="video-element-autoplay">Auto Play</FormLabel>
            <RadioGroup
              row
              name="row-radio-buttons-group"
              value={autoplay}
              onChange={handleChangeAutoplay}
            >
              <FormControlLabel value="true" control={<Radio />} label="True" />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="False"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Button
          type='submit'
          variant="contained"
          color="secondary"
          sx={{ mt: 3 }}
        >
          {mode === 'create' ? 'Create' : 'Save'}
        </Button>
      </form>
    </Modal>
  );
};

export default VideoElementModal;
