import { useState } from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import SlideControlbar from './SlideControlbar';
import { useStore } from '../../hooks/useStore';
import { useParams } from 'react-router-dom';
import { Slide, SlideElementsWithoutBase } from '../../hooks/useStore.types';
import { ElementModalMode } from './ElementModal.types';
import { toast } from 'react-toastify';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type SlideAreaProps = {
  slideIndex: number;
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
  handleShowSlideSettingModal: () => void;
  handleTextElementModal: (
    mode: ElementModalMode,
    focusElementId?: string
  ) => void;
  handleImgElementModal: (
    mode: ElementModalMode,
    focusElementId?: string
  ) => void;
  handleVideoElementModal: (
    mode: ElementModalMode,
    focusElementId?: string
  ) => void;
  handleCodeElementModal: (
    mode: ElementModalMode,
    focusElementId?: string
  ) => void;
};

let counterTimeoutId: number;

const SlideArea = ({
  slideIndex,
  setSlideIndex,
  handleShowSlideSettingModal,
  handleTextElementModal,
  handleImgElementModal,
  handleVideoElementModal,
  handleCodeElementModal,
}: SlideAreaProps) => {
  const params = useParams();
  const id = params.id as string;
  const store = useStore();
  const [clickCounter, setClickCounter] = useState(0);
  const presentation = store.store[id];
  const slides = presentation?.slides;
  const theme = useTheme();

  const handleClickElement = (
    type: SlideElementsWithoutBase['elementType'],
    elementId: string
  ) => {
    if (clickCounter >= 1) {
      if (type === 'text') {
        handleTextElementModal('edit', elementId);
      } else if (type === 'image') {
        handleImgElementModal('edit', elementId);
      } else if (type === 'video') {
        handleVideoElementModal('edit', elementId);
      } else if (type === 'code') {
        handleCodeElementModal('edit', elementId);
      }
      clearTimeout(counterTimeoutId);
      setClickCounter(0);
    } else {
      setClickCounter((clickCounter) => clickCounter + 1);
      counterTimeoutId = setTimeout(() => {
        setClickCounter(0);
      }, 500);
    }
  };

  const handleContextMenu = async (e: React.MouseEvent, elementId: string) => {
    e.preventDefault();
    try {
      await store.deleteSlideElement(id, slides[slideIndex].id, elementId);
    } catch (err) {
      toast.error('Fail to delete element');
    }
  };

  const getSlideBackground = (background: Slide['background']) => {
    if (background.type === 'image') {
      return {
        background: `url(${background.img})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      };
    } else if (background.type === 'gradient') {
      return {
        background: `linear-gradient(to right, ${background.gradientColorFrom}, ${background.gradientColorTo})`,
      };
    } else {
      return { background: background.solidColor };
    }
  };

  const renderElements = (slide: Slide) =>
    slide.elements.map((element) => {
      let innerElement;
      let containerStyles;
      if (element.elementType === 'text') {
        innerElement = (
          <Typography
            sx={{
              userSelect: 'none',
              fontSize: `${element.fontSize}em`,
              color: element.color,
              fontFamily: 'inherit',
            }}
          >
            {element.text}
          </Typography>
        );
        containerStyles = {
          border: `solid 1px ${theme.palette.nord.white[2]}`,
        };
      } else if (element.elementType === 'image') {
        innerElement = (
          <Box
            component="img"
            sx={{
              userSelect: 'none',
              width: '100%',
            }}
            src={element.img}
            alt={element.alt}
          />
        );
        containerStyles = {
          border: `solid 1px ${theme.palette.nord.white[2]}`,
        };
      } else if (element.elementType === 'video') {
        innerElement = (
          <iframe
            src={element.embdedUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{
              width: '100%',
              height: '100%',
              userSelect: 'none',
            }}
          />
        );
        containerStyles = {
          border: `solid 5px ${theme.palette.nord.white[2]}`,
        };
      } else if (element.elementType === 'code') {
        innerElement = (
          <SyntaxHighlighter
            language={element.language}
            style={docco}
            customStyle={{
              padding: 0,
              margin: 0,
              width: '100%',
              height: '100%',
            }}
          >
            {element.code}
          </SyntaxHighlighter>
        );
      }
      return (
        <Box
          key={element.id}
          onClick={() => handleClickElement(element.elementType, element.id)}
          onContextMenu={(e) => handleContextMenu(e, element.id)}
          overflow="hidden"
          sx={{
            position: 'absolute',
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.width}%`,
            height: `${element.height}%`,
            cursor: 'pointer',
            ...containerStyles,
          }}
        >
          {innerElement}
        </Box>
      );
    });

  return (
    <>
      <Box
        sx={{
          flex: '1 1 auto',
          position: 'relative',
        }}
      >
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '95%',
            overflowX: 'hidden',
            maxWidth: {
              md: 800,
              xl: 1000,
            },
            aspectRatio: '1.37/1',
          }}
          elevation={2}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '100%',
              transition: 'all 0.3s',
              transform: `translateX(-${slideIndex * 100}%)`,
            }}
          >
            {slides &&
              slides.map((slide) => {
                return (
                  <Box
                    key={slide.id}
                    sx={{
                      width: '100%',
                      height: '100%',
                      flexShrink: '0',
                      position: 'relative',
                      overflow: 'hidden',
                      fontFamily: slide.fontFamily,
                      ...getSlideBackground(slide.background),
                    }}
                  >
                    {renderElements(slide)}
                  </Box>
                );
              })}
          </Box>
          <Typography
            sx={{
              fontSize: '1em',
              position: 'absolute',
              bottom: '3%',
              left: '20px',
            }}
          >
            {presentation?.slides.length === 1
              ? '1'
              : `${slideIndex + 1}/${presentation?.slides.length}`}
          </Typography>
        </Paper>
      </Box>
      <SlideControlbar
        slideIndex={slideIndex}
        setSlideIndex={setSlideIndex}
        handleShowSlideSettingModal={handleShowSlideSettingModal}
      />
    </>
  );
};

export default SlideArea;
