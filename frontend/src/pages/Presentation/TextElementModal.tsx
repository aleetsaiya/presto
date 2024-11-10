import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import InputField from '../../components/InputField';
import { Typography, Button, Box, useTheme } from '@mui/material';
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
  const theme = useTheme();
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
    if (!slide || mode === 'close') return;
    if (mode === 'create') {
      setX('');
      setY('');
      setWidth('');
      setHeight('');
      setText('');
      setFontSize('');
      setColor('');
    } else if (mode === 'edit') {
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

  const handleChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };

  const handleChangeFontSize = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (/^[0-9]*\.?[0-9]*$/.test(e.target.value)) {
      setFontSize(e.target.value);
    }
  };

  const handleChangeColor = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setColor(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const xFloat = parseFloat(x);
    const yFloat = parseFloat(y);
    const widthFloat = parseFloat(width);
    const heightFloat = parseFloat(height);
    const fontSizeFloat = parseFloat(fontSize);
    if (isNaN(widthFloat) || widthFloat < 0 || widthFloat > 100) {
      toast.error('Invalid width');
      return;
    }
    if (isNaN(heightFloat) || heightFloat < 0 || heightFloat > 100) {
      toast.error('Invalid height');
      return;
    }
    if (isNaN(fontSizeFloat)) {
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
        width: widthFloat,
        height: heightFloat,
        fontSize: fontSizeFloat,
        elementType: 'text',
      };
      try {
        await store.createSlideElement(id, slide.id, textElement);
        onClose();
      } catch (err) {
        toast.error('Fail to create new text');
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
      const textElement: TextSlideElement & SlideElementBase = {
        id: elementId,
        x: xFloat,
        y: yFloat,
        text,
        color,
        width: widthFloat,
        height: heightFloat,
        fontSize: fontSizeFloat,
        elementType: 'text',
      };
      try {
        await store.updateSlideElement(id, slide.id, elementId, textElement);
        onClose();
      } catch (err) {
        toast.error('Fail to create new text');
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
              id="text-element-x"
              value={x}
              label="X coordinate (%)"
              onChange={handleChangeX}
              autoComplete="off"
            />
            <InputField
              id="text-element-y"
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
          id="text-element-color"
          value={color}
          label={
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 2,
              }}
            >
              <Box>Colour (hex)</Box>
              <Box
                sx={{
                  aspectRatio: '1/1',
                  width: '12px',
                  backgroundColor: color,
                  border: `solid 1px ${theme.palette.nord.white[3]}`,
                }}
              ></Box>
            </Box>
          }
          onChange={handleChangeColor}
          autoComplete="off"
          sx={{
            mt: 3,
          }}
        />
        <Button
          type="submit"
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

export default TextElementModal;
