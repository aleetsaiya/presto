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
import {
  Title as TitleIcon,
  ModeEdit as ModeEditIcon,
  Image as ImageIcon,
  Videocam as VideocamIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { ElementModalMode } from './ElementModal.types';

type SidebarProps = {
  width: number;
  handleShowEditModal: () => void;
  handleTextElementModal: (
    mode: ElementModalMode,
    focusElement?: string
  ) => void;
};

const Sidebar = ({
  width,
  handleShowEditModal,
  handleTextElementModal,
}: SidebarProps) => {
  const store = useStore();
  const params = useParams();
  const id = params.id as string;
  const presentation = store.store[id];
  const paddingHorizontal = 4;

  const fileToBase64 = (file: File): Promise<string> => {
    const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validFileTypes.includes(file.type)) {
      toast.error(`Invalid file type ${file.type}`);
      return Promise.reject();
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise<string>((resolve, reject) => {
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result as string);
    });
  };

  const handleShowTextModal = () => {
    handleTextElementModal('create');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // TODO: temporary drawer variant to make it responsive
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: {
          sm: 'none',
          xs: 'none',
          md: 'block',
        },
        width: width,
        flexShrink: 0,
        borderRight: 'solid 1px #e7e7e7',
        [`& .MuiDrawer-paper`]: {
          width: width,
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
          onChange={handleFileUpload}
          accept="image/jpg, image/jpeg, image/png"
        />
      </Box>
      <Divider
        sx={{
          mt: 3,
          px: paddingHorizontal,
        }}
      />
    </Drawer>
  );
};

export default Sidebar;
