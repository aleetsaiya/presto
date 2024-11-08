import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Box, Paper } from '@mui/material';
import Navbar from './Navbar';
import DeletePresentationModal from './DeletePresentationModal';
import Sidebar from './Sidebar';
import { useStore } from '../../hooks/useStore';
import { toast } from 'react-toastify';

const Presentation = () => {
  const params = useParams();
  const id = params.id as string;
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const store = useStore();
  const sidebarWidth = 280;

  const handleDeletePresentation = async () => {
    if (!id) {
      return;
    }
    try {
      await store.deletePresentation(id);
      toast.success('Delete presentation successfully ');
      setOpenModal(false);
      navigate('/dashboard');
    } catch (err) {
      toast.error('Fail to delete presentation');
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (!store.isLoading && !Object.keys(store.store).includes(id)) {
    toast.error('Invalud url');
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <DeletePresentationModal
        open={openModal}
        onDelete={handleDeletePresentation}
        onClose={handleCloseModal}
      />
      <Box
        sx={{
          overflow: 'auto',
          maxHeight: '100vh',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Navbar onDeletePresentation={handleOpenModal} />
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
          }}
        >
          <Sidebar width={sidebarWidth} />
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
                width: '95%',
                height: '95%',
                transform: 'translate(-50%, -50%)'
              }}
              elevation={4}
            >
              Inside Paper
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Presentation;
