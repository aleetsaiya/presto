import { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useStore } from '../../hooks/useStore';
import { toast } from 'react-toastify';
import { ElementModalMode } from './ElementModal.types';
import Navbar from './Navbar';
import DeletePresentationModal from './DeletePresentationModal';
import Sidebar from './Sidebar';
import SlideArea from './SlideArea';
import EditPresentationModal from './EditPresentationModal';
import TextElementModal from './TextElementModal';

const Presentation = () => {
  const params = useParams();
  const id = params.id as string;
  const paramSlideIndex = parseInt(params.slideIdx as string) as number;
  const [showDeletePresModal, setShowDeletePresModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showTextElementModal, setShowTextElementModal] =
    useState<ElementModalMode>('close');
  const [slideIndex, setSlideIndex] = useState(paramSlideIndex || 0);
  const [editElementId, setEditElementId] = useState('');
  const store = useStore();
  const navigate = useNavigate();
  const presentation = store.store[id];
  const slides = presentation?.slides;

  if (
    !store.isLoading &&
    (!Object.keys(store.store).includes(id) ||
      store.store[id].slides.length <= paramSlideIndex)
  ) {
    toast.error('Invalud url');
    return <Navigate to="/dashboard" />;
  }

  const handleShowDeletePresModal = () => {
    setShowDeletePresModal(true);
  };

  const handleCloseDeletePresModal = () => {
    setShowDeletePresModal(false);
  };

  const handleShowEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleCloseTextElementModal = () => {
    setShowTextElementModal('close');
  };

  const handleTextElementModal = (
    mode: ElementModalMode,
    focusElementId?: string
  ) => {
    if (focusElementId) {
      setEditElementId(focusElementId);
    }
    setShowTextElementModal(mode);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;
    if (key === 'ArrowRight' && slideIndex + 1 < (slides?.length || 0)) {
      setSlideIndex((slideIndex) => slideIndex + 1);
      navigate(`/presentations/${id}/${slideIndex + 1}`);
      return;
    }
    if (key === 'ArrowLeft' && slideIndex > 0) {
      setSlideIndex((slideIndex) => slideIndex - 1);
      navigate(`/presentations/${id}/${slideIndex - 1}`);
      return;
    }
  };
  return (
    <>
      <DeletePresentationModal
        open={showDeletePresModal}
        onClose={handleCloseDeletePresModal}
      />
      <EditPresentationModal
        open={showEditModal}
        onClose={handleCloseEditModal}
      />
      <TextElementModal
        mode={showTextElementModal}
        elementId={editElementId}
        onClose={handleCloseTextElementModal}
      />
      <Box
        sx={{
          overflow: 'auto',
          maxHeight: '100vh',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <Navbar onDeletePresentation={handleShowDeletePresModal} />
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            position: 'relative',
          }}
        >
          <Sidebar
            width={280}
            handleShowEditModal={handleShowEditModal}
            handleTextElementModal={handleTextElementModal}
          />
          <SlideArea
            slideIndex={slideIndex}
            setSlideIndex={setSlideIndex}
            handleTextElementModal={handleTextElementModal}
          />
        </Box>
      </Box>
    </>
  );
};

export default Presentation;
