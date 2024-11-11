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

  const handleChangeCode = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCode(e.target.value);
  };

  const handleChangeFontSize = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (/^[0-9]*\.?[0-9]*$/.test(e.target.value)) {
      setFontSize(e.target.value);
    }
  };

  const handleChangeLanguage = (e: SelectChangeEvent) => {
    setLanguage(e.target.value as CodeSlideElement['language']);
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
    if (language === '') {
      toast.error('Should choose a language');
      return;
    }
    if (mode === 'create') {
      const codeElement: CodeSlideElement = {
        width: widthFloat,
        height: heightFloat,
        code,
        fontSize: fontSizeFloat,
        language,
        elementType: 'code',
      };
      try {
        await store.createSlideElement(id, slide.id, codeElement);
        onClose();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error('Fail to create code');
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
      const codeElement: CodeSlideElement & SlideElementBase = {
        id: elementId,
        x: xFloat,
        y: yFloat,
        width: widthFloat,
        height: heightFloat,
        code,
        fontSize: fontSizeFloat,
        language,
        elementType: 'code',
      };
      try {
        await store.updateSlideElement(id, slide.id, elementId, codeElement);
        onClose();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" mb={2}>
          {mode === 'create' ? 'Create' : 'Edit'} Code
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
              id="code-element-x"
              value={x}
              label="X coordinate (%)"
              onChange={handleChangeX}
              autoComplete="off"
            />
            <InputField
              id="code-element-y"
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
            id="code-element-width"
            value={width}
            label="Width (%)"
            onChange={handleChangeWidth}
            autoComplete="off"
          />
          <InputField
            id="code-element-height"
            value={height}
            label="Height (%)"
            onChange={handleChangeHeight}
            autoComplete="off"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          <InputField
            id="code-element-fontSize"
            value={fontSize}
            label="Font Size"
            onChange={handleChangeFontSize}
            autoComplete="off"
            sx={{
              mt: 3,
            }}
          />
          <FormControl fullWidth variant="standard">
            <InputLabel id="code-element-language-label">Language</InputLabel>
            <Select
              labelId="code-element-languate-label"
              id="code-element-language"
              value={language}
              label="Language"
              onChange={handleChangeLanguage}
            >
              <MenuItem value="javascript">Javascript</MenuItem>
              <MenuItem value="python">Python</MenuItem>
              <MenuItem value="c">C</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            mt: 3,
          }}
        >
          <Typography variant="body1">Code</Typography>
          <TextField
            multiline
            variant="outlined"
            rows={8}
            sx={{
              mt: 1,
              width: '100%',
            }}
            value={code}
            onChange={handleChangeCode}
          />
        </Box>
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

export default CodeElementModal;
