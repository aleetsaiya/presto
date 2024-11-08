import { Box, IconButton } from '@mui/material';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  AddCircle,
} from '@mui/icons-material';
import { useStore } from '../../hooks/useStore';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type SidebarRightProps = {
  slideIndex: number;
  onClickPrevSlide: () => void;
  onClickNextSlide: () => void;
};

export const SidebarRight = ({
  slideIndex,
  onClickPrevSlide,
  onClickNextSlide,
}: SidebarRightProps) => {
  const params = useParams();
  const id = params.id as string;

  const store = useStore();
  const presentation = store.store[id];
  const slidesLength = presentation?.slides.length || 0;

  const handleCreateSlide = async () => {
    try {
      await store.createSlide(id);
    } catch (err) {
      toast.error('Fail to create new slide');
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        right: '0',
        width: '10%',
        height: '100%',
        display: {
          // TODO: hidden as default with mobile, can toggle
          xs: 'none',
          md: 'flex',
        },
        flexDirection: 'column',
        justifyContent: 'end',
        alignItems: 'center',
        p: 1,
      }}
    >
      <IconButton
        onClick={handleCreateSlide}
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.5,
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        <AddCircle sx={{ fontSize: 50 }} />
      </IconButton>
      <Box
        sx={{
          display: 'flex',
          position: 'absolute',
          bottom: '20px',
          right: '5px',
        }}
      >
        <IconButton
          onClick={onClickPrevSlide}
          sx={{
            visibility: slideIndex !== 0 ? 'visible' : 'hidden',
          }}
        >
          <KeyboardArrowLeft sx={{ fontSize: 45 }} />
        </IconButton>
        <IconButton
          onClick={onClickNextSlide}
          sx={{
            visibility: slideIndex < slidesLength - 1 ? 'visible' : 'hidden',
          }}
        >
          <KeyboardArrowRight sx={{ fontSize: 45 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SidebarRight;
