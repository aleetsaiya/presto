import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import InputField from '../../components/InputField';
import {
  Typography,
  Button,
  Box,
  SelectChangeEvent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { useStore } from '../../hooks/useStore';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Background, UploadImageType } from '../../hooks/useStore.types';
import { fileToBase64 } from '../../utils';
import ColorInputField from '../../components/ColorInputField';

type EditPresentationModalProps = {
  open: boolean;
  onClose: () => void;
};

const EditPresentationModal = ({
  open,
  onClose,
}: EditPresentationModalProps) => {
  const store = useStore();
  const params = useParams();
  const id = params.id as string;
  const presentation = store.store[id];
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slideBackgroundType, setSlideBackgroundType] =
    useState<Background['type']>('solid-color');
  const [solidColor, setSolidColor] = useState('');
  const [gradientFrom, setGradientFrom] = useState('');
  const [gradientTo, setGradientTo] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imgBase64, setImgBase64] = useState('');
  const [imgBackgroundType, setImgBackgroundType] =
    useState<UploadImageType>('base64');

  useEffect(() => {
    if (!presentation) return;
    setTitle(presentation.name);
    setDescription(presentation.description);
    const backgroundType = presentation.background.type;
    setSlideBackgroundType(presentation.background.type);
    if (backgroundType === 'image') {
      if (presentation.background.imgType === 'url') {
        setImgUrl(presentation.background.img);
        setImgBase64('');
      } else {
        setImgUrl('');
        setImgBase64(presentation.background.img);
      }
      setImgBackgroundType(presentation.background.imgType);
    } else if (backgroundType === 'gradient') {
      setGradientTo(presentation.background.gradientColorTo);
      setGradientFrom(presentation.background.gradientColorFrom);
    } else if (backgroundType === 'solid-color') {
      setSolidColor(presentation.background.solidColor);
    }
  }, [open, presentation]);

  const handleChangeSlideBackgroundType = (e: SelectChangeEvent) => {
    setSlideBackgroundType(e.target.value as Background['type']);
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

  const handleChangeTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPresentation = { ...presentation };
      let background: Background;
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
      newPresentation.name = title;
      newPresentation.description = description;
      newPresentation.background = background;
      await store.updatePresentation(id, newPresentation);
      onClose();
    } catch (err) {
      toast.error('Fail to edit presentation title');
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
          Edit Presentation
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
          }}
        >
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

export default EditPresentationModal;
