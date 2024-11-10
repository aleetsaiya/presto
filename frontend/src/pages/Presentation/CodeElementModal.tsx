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
  TextField,
} from '@mui/material';
import { useStore } from '../../hooks/useStore';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SlideElementBase, CodeSlideElement } from '../../hooks/useStore.types';
import { ElementModalMode } from './ElementModal.types';

type CodeElementModalProps = {
  mode: ElementModalMode;
  onClose: () => void;
  elementId: string;
};

const CodeElementModal = ({
  mode,
  onClose,
  elementId,
}: CodeElementModalProps) => {
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
  const [language, setLanguage] = useState<CodeSlideElement['language'] | ''>(
    ''
  );
  const [fontSize, setFontSize] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    if (!slide || mode === 'close') return;
    if (mode === 'create') {
      setX('');
      setY('');
      setWidth('');
      setHeight('');
      setFontSize('');
      setCode('');
      setLanguage('');
    } else if (mode === 'edit') {
      const element = slide.elements.find(
        (ele) => ele.id === elementId
      ) as CodeSlideElement & SlideElementBase;
      if (element) {
        setX(element.x.toString());
        setY(element.y.toString());
        setWidth(element.width.toString());
        setHeight(element.height.toString());
        setLanguage(element.language);
        setFontSize(element.fontSize.toString());
        setCode(element.code);
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

  const handleChangeCode = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCode(e.target.value);
  };

  const handleChangeFontSize = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (/^[0-9]*$/.test(e.target.value)) {
      setFontSize(e.target.value);
    }
  };

  const handleChangeLanguage = (e: SelectChangeEvent) => {
    setLanguage(e.target.value as CodeSlideElement['language']);
  };

  const handleSubmit = async () => {
    const xInt = parseInt(x);
    const yInt = parseInt(y);
    const widthInt = parseInt(width);
    const heightInt = parseInt(height);
    const fontSizeInt = parseInt(fontSize);
    if (isNaN(widthInt) || widthInt < 0 || widthInt > 100) {
      toast.error('Invalid width');
      return;
    }
    if (isNaN(heightInt) || heightInt < 0 || heightInt > 100) {
      toast.error('Invalid height');
      return;
    }
    if (language === '') {
      toast.error('Should choose a language');
      return;
    }
    if (mode === 'create') {
      const codeElement: CodeSlideElement = {
        width: widthInt,
        height: heightInt,
        code,
        fontSize: fontSizeInt,
        language,
        elementType: 'code',
      };
      try {
        await store.createSlideElement(id, slide.id, codeElement);
        onClose();
      } catch (err) {
        toast.error('Fail to create code');
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
      const codeElement: CodeSlideElement & SlideElementBase = {
        id: elementId,
        x: xInt,
        y: yInt,
        width: widthInt,
        height: heightInt,
        code,
        fontSize: fontSizeInt,
        language,
        elementType: 'code',
      };
      try {
        await store.updateSlideElement(id, slide.id, elementId, codeElement);
        onClose();
      } catch (err) {
        toast.error('Fail to create code');
      }
    }
  };

  return (
    <Modal
      open={mode !== 'close'}
      onClose={onClose}
      modalContainerStyle={{
        width: 600,
      }}
    >
    </Modal>
  );
};

export default CodeElementModal;
