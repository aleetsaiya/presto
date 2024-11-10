import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import InputField from '../../components/InputField';
import {
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup,
} from '@mui/material';
import { useStore } from '../../hooks/useStore';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontFamily, Slide, UploadImageType } from '../../hooks/useStore.types';
import { fileToBase64 } from '../../utils';
import ColorInputField from '../../components/ColorInputField';

type SlideSettingProps = {
  open: boolean;
  onClose: () => void;
};

const SlideSettingModal = ({ open, onClose }: SlideSettingProps) => {
  const store = useStore();
  const params = useParams();
  const id = params.id as string;
  const slideIndex = parseInt(params.slideIdx as string) as number;
  const presentation = store.store[id];
  const slide = presentation?.slides[slideIndex];

  const [slideBackgroundType, setSlideBackgroundType] =
    useState<Slide['background']['type']>('solid-color');
  const [fontFamily, setFontFamily] = useState<FontFamily>('Roboto');
  const [solidColor, setSolidColor] = useState('');
  const [gradientFrom, setGradientFrom] = useState('');
  const [gradientTo, setGradientTo] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imgBase64, setImgBase64] = useState('');
  const [imgBackgroundType, setImgBackgroundType] =
    useState<UploadImageType>('base64');

  useEffect(() => {
    if (!slide) return;
    setFontFamily(slide.fontFamily);
    const backgroundType = slide.background.type;
    setSlideBackgroundType(slide.background.type);
    if (backgroundType === 'image') {
      if (slide.background.imgType === 'url') {
        setImgUrl(slide.background.img);
        setImgBase64('');
      } else {
        setImgUrl('');
        setImgBase64(slide.background.img);
      }
      setImgBackgroundType(slide.background.imgType);
    } else if (backgroundType === 'gradient') {
      setGradientTo(slide.background.gradientColorTo);
      setGradientFrom(slide.background.gradientColorFrom);
    } else if (backgroundType === 'solid-color') {
      setSolidColor(slide.background.solidColor);
    }
  }, [slide]);

  const handleChangeSlideBackgroundType = (e: SelectChangeEvent) => {
    setSlideBackgroundType(e.target.value as Slide['background']['type']);
  };

  const handleChangeFontFamily = (e: SelectChangeEvent) => {
    setFontFamily(e.target.value as FontFamily);
  };

  const handleChangeSolidColor = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSolidColor(e.target.value);
  };

  const handleChangeGradientFrom = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGradientFrom(e.target.value);
  };

  const handleChangeGradientTo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setGradientTo(e.target.value);
  };

  const handleChangeImgBackgroundType = (e: SelectChangeEvent) => {
    setImgBackgroundType(e.target.value as UploadImageType);
  };

  const handleChangeImgUrl = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setImgUrl(e.target.value);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files) {
      return;
    }
    const file = e.target?.files[0];
    try {
      const base64File = await fileToBase64(file);
      setImgBase64(base64File);
      toast.success('Upload successfully');
    } catch (err) {
      toast.error('Fail to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let background: Slide['background'];
    if (slideBackgroundType === 'image') {
      background = {
        type: 'image',
        img: imgBackgroundType === 'base64' ? imgBase64 : imgUrl,
        imgType: imgBackgroundType,
      };
    } else if (slideBackgroundType === 'gradient') {
      background = {
        type: 'gradient',
        gradientColorFrom: gradientFrom,
        gradientColorTo: gradientTo,
      };
    } else {
      background = {
        type: 'solid-color',
        solidColor,
      };
    }
    const newSlide: Slide = {
      ...slide,
      fontFamily,
      background,
    };
    try {
      await store.updateSlide(id, slideIndex, newSlide);
      onClose();
    } catch (err) {
      toast.error('Fail to update slide');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      modalContainerStyle={{
        width: 600,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" mb={2}>
          Slide Theme
        </Typography>
        <FormControl
          fullWidth
          variant="standard"
          sx={{
            maxWidth: 150,
          }}
        >
          <InputLabel id="code-element-language-label">Font Family</InputLabel>
          <Select
            labelId="code-element-languate-label"
            id="code-element-language"
            value={fontFamily}
            label="Font Family"
            onChange={handleChangeFontFamily}
          >
            <MenuItem value="Roboto">Roboto</MenuItem>
            <MenuItem value="Sour Gummy">Sour Gummy</MenuItem>
            <MenuItem value="PT Serif">PT Serif</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 3 }}>
          <FormLabel id="video-element-autoplay">Slide Background</FormLabel>
          <RadioGroup
            row
            name="row-radio-buttons-group"
            value={slideBackgroundType}
            onChange={handleChangeSlideBackgroundType}
          >
            <FormControlLabel
              value="solid-color"
              control={<Radio />}
              label="Solid Colour"
            />
            <FormControlLabel
              value="gradient"
              control={<Radio />}
              label="Gradient colour"
            />
            <FormControlLabel value="image" control={<Radio />} label="Image" />
          </RadioGroup>
        </FormControl>
        {slideBackgroundType === 'image' && (
          <Box
            sx={{
              mt: 2.2,
            }}
          >
            <FormControl>
              <FormLabel id="img-element-img-type">Image Type</FormLabel>
              <RadioGroup
                row
                name="row-radio-buttons-group"
                value={imgBackgroundType}
                onChange={handleChangeImgBackgroundType}
              >
                <FormControlLabel value="url" control={<Radio />} label="URL" />
                <FormControlLabel
                  value="base64"
                  control={<Radio />}
                  label="File Upload"
                />
              </RadioGroup>
            </FormControl>
            {imgBackgroundType === 'url' && (
              <InputField
                id="img-element-url"
                value={imgUrl}
                label="Image URL"
                onChange={handleChangeImgUrl}
                autoComplete="off"
                sx={{
                  mt: 1,
                }}
              />
            )}
            {imgBackgroundType === 'base64' && (
              <Box>
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
              </Box>
            )}
          </Box>
        )}
        {slideBackgroundType === 'solid-color' && (
          <Box
            sx={{
              mt: 2.5,
            }}
          >
            <ColorInputField
              id="text-element-color"
              value={solidColor}
              onChange={handleChangeSolidColor}
              autoComplete="off"
            />
          </Box>
        )}
        {slideBackgroundType === 'gradient' && (
          <Box
            sx={{
              mt: 2.5,
            }}
          >
            <ColorInputField
              id="code-element-gradient-from"
              value={gradientFrom}
              label="Gradient Colour From"
              onChange={handleChangeGradientFrom}
              autoComplete="off"
            />
            <ColorInputField
              id="code-element-gradient-to"
              value={gradientTo}
              label="Gradient Colour To"
              onChange={handleChangeGradientTo}
              autoComplete="off"
              sx={{
                mt: 3,
              }}
            />
          </Box>
        )}
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ mt: 4 }}
        >
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default SlideSettingModal;
