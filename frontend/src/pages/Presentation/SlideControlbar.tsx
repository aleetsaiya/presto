import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import {
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
  AddCircle as AddCircleIcon,
  Delete as DeleteIcon,
  AutoAwesome as AutoAwesomeIcon,
} from '@mui/icons-material';
import { useStore } from '../../hooks/useStore';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type SlideControlbarProps = {
  slideIndex: number;
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const SlideControlbar = ({
  slideIndex,
  setSlideIndex,
}: SlideControlbarProps) => {
  const params = useParams();
  const id = params.id as string;
  const store = useStore();
  const presentation = store.store[id];
  const slidesLength = presentation?.slides.length || 0;
  const navigate = useNavigate();
  const theme = useTheme();

  const handleCreateSlide = async () => {
    try {
      await store.createSlide(id);
    } catch (err) {
      toast.error('Fail to create new slide');
    }
  };

  const handleDeleteSlide = async () => {
    if (slideIndex === 0 && slidesLength === 1) {
      toast.error('Can not delete the only slide in slideshow');
      return;
    }
    try {
      await store.deleteSlide(id, slideIndex);
      if (slideIndex !== 0) {
        setSlideIndex(slideIndex - 1);
        navigate(`/presentations/${id}/${slideIndex - 1}`);
      }
    } catch (err) {
      toast.error('Fail to delete current slide');
    }
  };

  // TODO: add background feature
  const handleClickNextSlide = () => {
    setSlideIndex((idx) => idx + 1);
    navigate(`/presentations/${id}/${slideIndex + 1}`);
  };

  const handleClickPrevSlide = () => {
    setSlideIndex((idx) => idx - 1);
    navigate(`/presentations/${id}/${slideIndex - 1}`);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        right: '0',
        width: '10%',
        height: '100%',
        // TODO: hidden as default with mobile, can toggle
        p: 1,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '2.5%',
          right: '5px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyItems: 'center',
          background: `${theme.palette.nord.black[0]}60`,
        }}
      >
        <Tooltip
          title={<Typography variant="body2">Delete slide</Typography>}
          placement="left"
        >
          <Button
            onClick={handleDeleteSlide}
            sx={{
              minWidth: '40px',
              '&:hover': {
                background: `${theme.palette.nord.black[0]}`,
              },
            }}
          >
            <DeleteIcon
              sx={{
                color: theme.palette.nord.white[0],
              }}
            />
          </Button>
        </Tooltip>
        <Tooltip
          title={<Typography variant="body2">Slide setting</Typography>}
          placement="left"
        >
          <Button
            sx={{
              minWidth: '40px',
              '&:hover': {
                background: `${theme.palette.nord.black[0]}`,
              },
            }}
          >
            <AutoAwesomeIcon
              sx={{
                color: theme.palette.nord.white[1],
              }}
            />
          </Button>
        </Tooltip>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '5px',
          transform: 'translateY(-50%)',
        }}
      >
        <Tooltip
          placement="left"
          title={<Typography variant="body2">Add new slide</Typography>}
        >
          <IconButton
            onClick={handleCreateSlide}
            sx={{
              color: `${theme.palette.nord.black[0]}60`,
            }}
          >
            <AddCircleIcon
              sx={{
                fontSize: 50,
                '&:hover': {
                  color: theme.palette.nord.black[0],
                },
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          bottom: '20px',
          right: '5px',
        }}
      >
        <IconButton
          onClick={handleClickPrevSlide}
          sx={{
            visibility: slideIndex !== 0 ? 'visible' : 'hidden',
          }}
        >
          <KeyboardArrowLeftIcon
            sx={{
              fontSize: 45,

              '&:hover': {
                color: theme.palette.nord.black[0],
              },
            }}
          />
        </IconButton>
        <IconButton
          onClick={handleClickNextSlide}
          sx={{
            visibility: slideIndex < slidesLength - 1 ? 'visible' : 'hidden',
          }}
        >
          <KeyboardArrowRightIcon
            sx={{
              fontSize: 45,

              '&:hover': {
                color: theme.palette.nord.black[0],
              },
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SlideControlbar;
