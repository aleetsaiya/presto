import {
  Drawer,
  Box,
  Toolbar,
  Typography,
  Chip,
  IconButton,
  Button,
  Divider,
} from '@mui/material';
import { useStore } from '../../hooks/useStore';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fileToBase64 } from '../../utils';
import {
  Title as TitleIcon,
  ModeEdit as ModeEditIcon,
  Image as ImageIcon,
  Videocam as VideocamIcon,
  Code as CodeIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { ElementModalMode } from './ElementModal.types';

type SidebarProps = {
  width: number;
  showInMobile: boolean;
  onClose: () => void;
  handleShowEditModal: () => void;
  handleTextElementModal: (
    mode: ElementModalMode,
    focusElement?: string
  ) => void;
  handleImgElementModal: (
    mode: ElementModalMode,
    focusElement?: string
  ) => void;
  handleVideoElementModal: (
    mode: ElementModalMode,
    focusElement?: string
  ) => void;
  handleCodeElementModal: (
    mode: ElementModalMode,
    focusElement?: string
  ) => void;
};

const Sidebar = ({
  width,
  showInMobile,
  onClose,
  handleShowEditModal,
  handleTextElementModal,
  handleImgElementModal,
  handleVideoElementModal,
  handleCodeElementModal,
}: SidebarProps) => {
  const store = useStore();
  const params = useParams();
  const id = params.id as string;
  const presentation = store.store[id];
  const paddingHorizontal = 4;

  const handleShowTextModal = () => {
    handleTextElementModal('create');
  };

  const handleShowImageModal = () => {
    handleImgElementModal('create');
  };

  const handleShowVideoModal = () => {
    handleVideoElementModal('create');
  };

  const handleShowCodeModal = () => {
    handleCodeElementModal('create');
  };

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target || !e.target.files) {
      return;
    }
    const file = e.target?.files[0];
    try {
      const base64File = await fileToBase64(file);
      const newPresentation = { ...presentation };
      newPresentation.thumbnail = base64File;
      newPresentation.thumbnailType = 'base64';
      await store.updatePresentation(id, newPresentation);
    } catch (err) {
      toast.error('Fail to upload new thumbnail');
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: {
          xs: showInMobile ? 'block' : 'none',
          md: 'block',
        },
        width: {
          xs: '100%',
          md: width,
        },
        flexShrink: 0,
        borderRight: 'solid 1px #e7e7e7',
        [`& .MuiDrawer-paper`]: {
          width: {
            xs: '100%',
            md: width,
          },
          boxSizing: 'border-box',
          border: 'none',
          backgroundColor: 'inherit',
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          mt: 3,
          px: paddingHorizontal,
          position: 'relative',
        }}
      >
        <Typography variant="h6" textAlign="center" component="h2">
          {presentation?.name || ''}
        </Typography>
        {showInMobile && (
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '15px',
              transform: 'translateY(-50%)',
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        <IconButton
          size="small"
          onClick={handleShowEditModal}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '5px',
            transform: 'translateY(-50%)',
          }}
        >
          <ModeEditIcon fontSize="small" color="secondary" />
        </IconButton>
      </Box>
      {presentation?.description && (
        <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
          {presentation.description}
        </Typography>
      )}
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          overflow: 'auto',
          px: paddingHorizontal,
        }}
      >
        {presentation?.thumbnail ? (
          <Box
            component="img"
            src={presentation.thumbnail}
            alt="presentation-thumbnail"
            sx={{
              width: '100%',
              maxWidth: '250px',
              borderRadius: 2,
            }}
          />
        ) : (
          <Typography>No Thumbnail</Typography>
        )}
        <Chip
          label="update thumbnail"
          variant="outlined"
          size="small"
          component="label"
          htmlFor="update-thumbnail"
          onClick={() => { }}
        />
        <input
          id="update-thumbnail"
          type="file"
          hidden
          onChange={handleThumbnailUpload}
          accept="image/jpg, image/jpeg, image/png"
        />
      </Box>
      <Divider
        sx={{
          mt: 3,
          px: paddingHorizontal,
        }}
      />
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 2,
          px: paddingHorizontal,
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Button
            size="large"
            onClick={handleShowTextModal}
            sx={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textTransform: 'none',
              flexShrink: 0,
            }}
          >
            <TitleIcon fontSize="large" />
            <Typography variant="body1">Text</Typography>
          </Button>
          <Button
            size="large"
            onClick={handleShowImageModal}
            sx={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textTransform: 'none',
              flexShrink: 0,
            }}
          >
            <ImageIcon fontSize="large" />
            <Typography variant="body1">Image</Typography>
          </Button>
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Button
            size="large"
            onClick={handleShowVideoModal}
            sx={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textTransform: 'none',
              flexShrink: 0,
            }}
          >
            <VideocamIcon fontSize="large" />
            <Typography variant="body2">Video</Typography>
          </Button>
          <Button
            size="large"
            onClick={handleShowCodeModal}
            sx={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textTransform: 'none',
              flexShrink: 0,
            }}
          >
            <CodeIcon fontSize="large" />
            <Typography variant="body2">Code</Typography>
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
