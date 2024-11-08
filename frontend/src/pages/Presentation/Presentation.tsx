import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { useStore } from '../../hooks/useStore';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import DeletePresentationModal from './DeletePresentationModal';
import SideLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';

const Presentation = () => {
  const params = useParams();
  const id = params.id as string;

  const [openModal, setOpenModal] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();
  const store = useStore();

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

  const handleClickNextSlide = () => {
    setSlideIndex((idx) => idx + 1);
  };

  const handleClickPrevSlide = () => {
    setSlideIndex((idx) => idx - 1);
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
          <SideLeft width={280} />
          {/* Main Area */}
          <Box
            component="main"
            sx={{
              flex: '1 1 auto',
              position: 'relative',
            }}
          >
            <Paper
              sx={{
                position: 'absolute',
                top: '50%',
                left: {
                  xs: '50%',
                  md: 0,
                },
                width: '95%',
                height: '95%',
                transform: {
                  xs: 'translate(-50%, -50%)',
                  md: 'translateY(-50%)',
                },
              }}
              elevation={4}
            ></Paper>
            <SidebarRight
              slideIndex={slideIndex}
              onClickPrevSlide={handleClickPrevSlide}
              onClickNextSlide={handleClickNextSlide}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Presentation;
