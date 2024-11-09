import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import InputField from '../../components/InputField';
import { Typography, Button, Box } from '@mui/material';
import { useStore } from '../../hooks/useStore';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SlideElementBase, TextSlideElement } from '../../hooks/useStore.types';
import { ElementModalMode } from './ElementModal.types';

type TextElementModalProps = {
  mode: ElementModalMode;
  onClose: () => void;
  elementId: string;
};

const TextElementModal = ({
  mode,
  onClose,
  elementId,
}: TextElementModalProps) => {
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
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    if (!slide || mode !== 'edit') return;
    const element = slide.elements.find(
      (ele) => ele.id === elementId
    ) as TextSlideElement & SlideElementBase;
    if (element) {
      setX(element.x.toString());
      setY(element.y.toString());
      setWidth(element.width.toString());
      setHeight(element.height.toString());
      setText(element.text);
      setFontSize(element.fontSize.toString());
      setColor(element.color);
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

  const handleChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const handleChangeFontSize = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (/^[0-9]*$/.test(e.target.value)) {
      setFontSize(e.target.value);
    }
  };

  const handleChangeColor = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (/^#/.test(e.target.value)) {
      setColor(e.target.value);
    }
  };

  const handleSubmit = async () => {
    const xInt = parseInt(x);
    const yInt = parseInt(y);
    const widthInt = parseInt(width);
    const heightInt = parseInt(height);
    const fontSizeInt = parseInt(fontSize);
    if (isNaN(xInt) || xInt < 0 || xInt > 100) {
      toast.error('Invalid x coordinate');
      return;
    }
    if (isNaN(yInt) || yInt < 0 || yInt > 100) {
      toast.error('Invalid y coordinate');
      return;
    }
    if (isNaN(widthInt) || widthInt < 0 || widthInt > 100) {
      toast.error('Invalid width');
      return;
    }
    if (isNaN(heightInt) || heightInt < 0 || heightInt > 100) {
      toast.error('Invalid height');
      return;
    }
    if (isNaN(fontSizeInt)) {
      toast.error('Invalid fontSize');
      return;
    }
    if (!color.startsWith('#')) {
      toast.error('Colour should start with #');
      return;
    }
    if (text === '') {
      toast.error('Text should not be empty');
      return;
    }
    if (mode === 'create') {
      const textElement: TextSlideElement = {
        text,
        color,
        width: widthInt,
        height: heightInt,
        fontSize: fontSizeInt,
        elementType: 'text',
      };
      try {
        await store.createSlideElement(id, slide.id, textElement);
        onClose();
      } catch (err) {
        toast.error('Fail to create text element');
      }
    } else if (mode === 'edit') {
      const textElement: TextSlideElement & SlideElementBase = {
        id: elementId,
        x: xInt,
        y: yInt,
        text,
        color,
        width: widthInt,
        height: heightInt,
        fontSize: fontSizeInt,
        elementType: 'text',
      };
      try {
        await store.updateSlideElement(id, slide.id, elementId, textElement);
        onClose();
      } catch (err) {
        toast.error('Fail to create text element');
      }
    }
    setX('');
    setY('');
    setWidth('');
    setHeight('');
    setText('');
    setFontSize('');
    setColor('');
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
        {mode === 'create' ? 'Create' : 'Edit'} Text
      </Typography>
      {mode === 'edit' && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            mb: 3,
          }}
        >
          <InputField
            id="text-element-width"
            value={x}
            label="X coordinate (%)"
            onChange={handleChangeX}
            autoComplete="off"
          />
          <InputField
            id="text-element-height"
            value={y}
            label="Y coordinate (%)"
            onChange={handleChangeY}
            autoComplete="off"
          />
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <InputField
          id="text-element-width"
          value={width}
          label="Width (%)"
          onChange={handleChangeWidth}
          autoComplete="off"
        />
        <InputField
          id="text-element-height"
          value={height}
          label="Height (%)"
          onChange={handleChangeHeight}
          autoComplete="off"
        />
      </Box>
      <InputField
        id="text-element-text"
        value={text}
        label="Text"
        onChange={handleChangeText}
        autoComplete="off"
        sx={{
          mt: 3,
        }}
      />
      <InputField
        id="text-element-fontSize"
        value={fontSize}
        label="Font Size (em)"
        onChange={handleChangeFontSize}
        autoComplete="off"
        sx={{
          mt: 3,
        }}
      />
      <InputField
        id="text-element-fontSize"
        value={color}
        label="Colour (hex)"
        onChange={handleChangeColor}
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

export default TextElementModal;
