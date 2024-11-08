import { useState } from 'react';
import {
  Drawer,
  Box,
  Toolbar,
  Typography,
  Chip,
  IconButton,
} from '@mui/material';
import { useStore } from '../../hooks/useStore';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditPresentationTitleModal from './EditPresentationTitleModal';

type SidebarLeftProps = {
  width: number;
};

const SideLeft = ({ width }: SidebarLeftProps) => {
  const store = useStore();
  const param = useParams();
  const id = param.id as string;
  const presentation = store.store[id];
  const [editTitle, setEditTitle] = useState(presentation?.name || '');
  const [showEditTitleModal, setShowEditTitleModal] = useState(false);
  const paddingHorizontal = 3;

  /**************************************
            Presentation Title
  ***************************************/
  const handleShowEditTitleModal = () => {
    setShowEditTitleModal(true);
  };

  const handleCloseEditTitleModal = () => {
    setShowEditTitleModal(false);
  };

  const handleChangeTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditTitle(e.target.value);
  };

  const handleEditTitle = async () => {
    try {
      const newPresentation = { ...presentation };
      newPresentation.name = editTitle;
      await store.updatePresentation(id, newPresentation);
      setShowEditTitleModal(false);
    } catch (err) {
      toast.error('Fail to edit presentation title');
    }
  };

  /**************************************
                Thumbnail 
  ***************************************/
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
    <>
      <EditPresentationTitleModal
        open={showEditTitleModal}
        value={editTitle}
        onChange={handleChangeTitle}
        onConfirmEdit={handleEditTitle}
        onClose={handleCloseEditTitleModal}
      />
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
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { paddingHorizontal },
            gap: 0.5,
          }}
        >
          <Typography variant="h6" textAlign="center">
            {presentation?.name || ''}
          </Typography>
          <IconButton size="small" onClick={handleShowEditTitleModal}>
            <ModeEditIcon fontSize="small" color="secondary" />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            overflow: 'auto',
            px: paddingHorizontal,
            marginBottom: 4,
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
            <Box>No Thumbnail</Box>
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
      </Drawer>
    </>
  );
};

export default SideLeft;
