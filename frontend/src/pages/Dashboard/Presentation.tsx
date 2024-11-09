import { memo } from 'react';
import { forwardRef } from 'react';
import { Paper, Typography, keyframes } from '@mui/material';
import { Presentation as PresentationType } from '../../hooks/useStore';
import { useNavigate } from 'react-router-dom';

type PresentationProps = {
  presentation: PresentationType;
  showAnimation: boolean;
  setShowAnimation: (id: string) => void;
};

const shakeAnimation = keyframes`
  0% {
    transform: rotate(0deg)
  }
  25% {
    transform: rotate(2deg)
  }
  50% {
    transform: rotate(-2deg)
  }
  75% {
    transform: rotate(2deg)
  }
  100% {
    transform: rotate(0deg)
  }
`;

const Presentation = forwardRef<HTMLDivElement, PresentationProps>(
  ({ presentation, showAnimation, setShowAnimation }, ref) => {
    const navigate = useNavigate();

    const handleAnimationEnd = () => {
      setShowAnimation('');
    };

    const handleClick = () => {
      navigate(`/presentations/${presentation.id}/0`);
    };

    const animation = showAnimation ? `${shakeAnimation} 0.7s 1` : 'none';

    const background = presentation.thumbnail
      ? `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4) 65%, rgba(0, 0, 0, 0.9) ), url(${presentation.thumbnail})`
      : `linear-gradient( rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.6) )`;

    // adjust the alpha value to make it brighter
    const hoverBackground = presentation.thumbnail
      ? `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3) 65%, rgba(0, 0, 0, 0.8) ), url(${presentation.thumbnail})`
      : `linear-gradient( rgba(0, 0, 0, 0.23), rgba(0, 0, 0, 0.38) 70%, rgba(0, 0, 0, 0.55) )`;

    return (
      <Paper
        id={`pre.${presentation.id}`}
        ref={ref}
        onClick={handleClick}
        elevation={8}
        onAnimationEnd={handleAnimationEnd}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'end',
          aspectRatio: '2/1',
          maxWidth: {
            lg: 750,
            xl: 850,
          },
          width: '100%',
          background: `${background}`,
          backgroundSize: '100%',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
          borderRadius: 2,
          cursor: 'pointer',
          color: 'white',
          p: 4,
          position: 'relative',
          pb: {
            xs: 3.2,
            md: 5,
          },
          animation: `${animation}`,
          transition: 'all ease 0.5s',
          '&:hover': {
            background: `${hoverBackground}`,
            backgroundSize: '105%',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
          },
        }}
      >
        <Typography variant="h6" component="div">
          {presentation.name}
        </Typography>
        {presentation?.description && presentation?.description !== '' && (
          <Typography
            sx={{
              mt: {
                sx: 0,
                md: 1,
              },
              width: '100%',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              typography: {
                xs: 'body2',
                sm: 'body1',
              },
            }}
          >
            {presentation.description}
          </Typography>
        )}
        <Typography
          variant="body1"
          sx={{
            mt: {
              sx: 0,
              md: 1,
            },
            typography: {
              xs: 'body2',
              sm: 'body1',
            },
            marginLeft: 'auto',
          }}
        >
          slides: {presentation?.slides.length || 0}
        </Typography>
      </Paper>
    );
  }
);

export default memo(Presentation);
