import { useState } from 'react';
import { Drawer, Box, Toolbar, Typography, Chip, Button } from '@mui/material';
import { useStore } from '../../hooks/useStore';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditPresentationTitleModal from './EditPresentationTitleModal';

type SidebarProps = {
  width: number;
};

const Sidebar = ({ width }: SidebarProps) => {
  const store = useStore();
  const param = useParams();
  const id = param.id as string;
  const [editTitle, setEditTitle] = useState(store.store[id]?.name || '');
  const [showEditTitleModal, setShowEditTitleModal] = useState(false);

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
      const newPresentation = { ...store.store[id] };
      newPresentation.name = editTitle;
      await store.updatePresentation(id, newPresentation);
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
      const newPresentation = { ...store.store[id] };
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
            pl: 3,
            pr: 3,
            gap: 1,
          }}
        >
          <Typography variant="h6" textAlign="center">
            {store.store[id]?.name || ''}
          </Typography>
          <Chip label="edit" size="small" onClick={handleShowEditTitleModal} />
        </Box>
        <Box
          sx={{
            overflow: 'auto',
            marginBottom: 4,
          }}
        >
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Button variant="contained" component="label" color="primary">
              Upload Thumbnail
              <input
                type="file"
                hidden
                onChange={handleFileUpload}
                accept="image/jpg, image/jpeg, image/png"
              />
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
