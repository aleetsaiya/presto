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
import { fileToBase64 } from '../../utils';
import {
  SlideElementBase,
  ImageSlideElement,
  UploadImageType,
} from '../../hooks/useStore.types';
import { ElementModalMode } from './ElementModal.types';

type ImageElementModalProps = {
  mode: ElementModalMode;
  onClose: () => void;
  elementId: string;
};

const ImageElementModal = ({
  mode,
  onClose,
  elementId,
}: ImageElementModalProps) => {
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
  const [url, setUrl] = useState('');
  const [base64, setBase64] = useState('');
  const [imgType, setImgType] = useState<UploadImageType>('url');
  const [currentImg, setCurrentImg] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    if (!slide || mode === 'close') return;
    if (mode === 'create') {
      setX('');
      setY('');
      setWidth('');
      setHeight('');
      setUrl('');
      setBase64('');
      setAlt('');
    } else if (mode === 'edit') {
      const element = slide.elements.find(
        (ele) => ele.id === elementId
      ) as ImageSlideElement & SlideElementBase;
      if (element) {
        setX(element.x.toString());
        setY(element.y.toString());
        setWidth(element.width.toString());
        setHeight(element.height.toString());
        setImgType(element.imgType);
        if (element.imgType === 'url') {
          setUrl(element.img);
          setBase64('');
        } else {
          setUrl('');
          setBase64(element.img);
        }
        setCurrentImg(element.img);
        setAlt(element.alt);
      }
    }
  }, [mode, slide, elementId]);

  const handleChangeX = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (/^[0-9]*$/.test(e.target.value)) {
      setX(e.target.value);
    }
  };

  const handleChangeY = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (/^[0-9]*$/.test(e.target.value)) {
      setY(e.target.value);
    }
  };

  const handleChangeWidth = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (/^[0-9]*$/.test(e.target.value)) {
      setWidth(e.target.value);
    }
  };

  const handleChangeHeight = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (/^[0-9]*$/.test(e.target.value)) {
      setHeight(e.target.value);
    }
  };

  const handleChangeImgType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgType(e.target.value as UploadImageType);
  };

  const handleChangeUrl = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUrl(e.target.value);
  };

  const handleChangeAlt = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAlt(e.target.value);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files) {
      return;
    }
    const file = e.target?.files[0];
    try {
      const base64File = await fileToBase64(file);
      setBase64(base64File);
      setCurrentImg(base64File);
    } catch (err) {
      toast.error('Fail to upload new thumbnail');
    }
  };

  const handleSubmit = async () => {
    const xInt = parseInt(x);
    const yInt = parseInt(y);
    const widthInt = parseInt(width);
    const heightInt = parseInt(height);
    const img = imgType === 'url' ? url : base64;
    if (isNaN(widthInt) || widthInt < 0 || widthInt > 100) {
      toast.error('Invalid width');
      return;
    }
    if (isNaN(heightInt) || heightInt < 0 || heightInt > 100) {
      toast.error('Invalid height');
      return;
    }
    if (mode === 'create') {
      const imgElement: ImageSlideElement = {
        width: widthInt,
        height: heightInt,
        img,
        imgType,
        alt,
        elementType: 'image',
      };
      try {
        await store.createSlideElement(id, slide.id, imgElement);
        onClose();
      } catch (err) {
        console.log('err', err)
        toast.error('Fail to create image');
      }
    } else if (mode === 'edit') {
      if (isNaN(xInt) || xInt < 0 || xInt > 100) {
        toast.error('Invalid x coordinate');
        return;
      }
      if (isNaN(yInt) || yInt < 0 || yInt > 100) {
        toast.error('Invalid y coordinate');
        return;
      }
      const imgElement: ImageSlideElement & SlideElementBase = {
        id: elementId,
        x: xInt,
        y: yInt,
        width: widthInt,
        height: heightInt,
        img,
        imgType,
        alt,
        elementType: 'image',
      };
      try {
        await store.updateSlideElement(id, slide.id, elementId, imgElement);
        onClose();
      } catch (err) {
        toast.error('Fail to create image');
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
      <Typography variant="h6" mb={2}>
        {mode === 'create' ? 'Create' : 'Edit'} Image
      </Typography>
      {mode === 'edit' && (
        <>
          <Box
            component="img"
            sx={{
              width: '50%',
              maxHeight: '150px',
            }}
            src={currentImg}
            alt={alt}
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
              id="img-element-x"
              value={x}
              label="X coordinate (%)"
              onChange={handleChangeX}
              autoComplete="off"
            />
            <InputField
              id="img-element-y"
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
          id="img-element-width"
          value={width}
          label="Width (%)"
          onChange={handleChangeWidth}
          autoComplete="off"
        />
        <InputField
          id="img-element-height"
          value={height}
          label="Height (%)"
          onChange={handleChangeHeight}
          autoComplete="off"
        />
      </Box>
      <Box
        sx={{
          mt: 3,
        }}
      >
        <FormControl>
          <FormLabel id="img-element-img-type">Image Type</FormLabel>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            value={imgType}
            onChange={handleChangeImgType}
          >
            <FormControlLabel value="url" control={<Radio />} label="URL" />
            <FormControlLabel
              value="base64"
              control={<Radio />}
              label="File Upload"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      {imgType === 'url' && (
        <InputField
          id="img-element-url"
          value={url}
          label="Image URL"
          onChange={handleChangeUrl}
          autoComplete="off"
          sx={{
            mt: 1,
          }}
        />
      )}
      {imgType === 'base64' && (
        <Button
          variant="outlined"
          size="small"
          component="label"
          sx={{
            textTransform: 'none',
            mt: 1,
          }}
        >
          Upload Image
          <input
            type="file"
            hidden
            onChange={handleImageUpload}
            accept="image/jpg, image/jpeg, image/png"
          />
        </Button>
      )}
      <InputField
        id="img-element-alt"
        value={alt}
        label="Image Description"
        onChange={handleChangeAlt}
        autoComplete="off"
        sx={{
          mt: 3,
        }}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        {mode === 'create' ? 'Create' : 'Save'}
      </Button>
    </Modal>
  );
};

export default ImageElementModal;
