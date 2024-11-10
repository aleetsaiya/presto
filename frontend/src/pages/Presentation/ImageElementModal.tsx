import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import InputField from '../../components/InputField';
import {
  Typography,
  Button,
  Box,
  useTheme,
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
        toast.error('Fail to create new image');
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
        toast.error('Fail to create new image');
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
    </Modal>
  );
};

export default ImageElementModal;
