import { useState, useEffect } from 'react';
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
import ImageElementModal from './ImageElementModal';
import VideoElementModal from './VideoElementModal';
import CodeElementModal from './CodeElementModal';
import SlideSettingModal from './SlideSettingModal';

type PresentationProps = {
  preview: boolean;
};

const Presentation = ({ preview }: PresentationProps) => {
  const params = useParams();
  const id = params.id as string;
  const paramSlideIndex = parseInt(params.slideIdx as string) as number;
  const store = useStore();
  const navigate = useNavigate();
  const presentation = store.store[id];
  const slides = presentation?.slides;

  const [showSidebar, setShowSidebar] = useState(false);
  const [showDeletePresModal, setShowDeletePresModal] = useState(false);
  const [showSlideSettingModal, setShowSlideSettingModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [slideIndex, setSlideIndex] = useState(paramSlideIndex || 0);
  const [editElementId, setEditElementId] = useState('');
  const [showTextElementModal, setShowTextElementModal] =
    useState<ElementModalMode>('close');
  const [showImgElementModal, setShowImgElementModal] =
    useState<ElementModalMode>('close');
  const [showVideoElementModal, setShowVideoElementModal] =
    useState<ElementModalMode>('close');
  const [showCodeElementModal, setShowCodeElementModal] =
    useState<ElementModalMode>('close');

  useEffect(() => {
    setSlideIndex(paramSlideIndex);
  }, [paramSlideIndex]);

  if (
    !store.isLoading &&
    (!Object.keys(store.store).includes(id) || paramSlideIndex >= slides.length)
  ) {
    toast.error('Invalud url');
    return <Navigate to="/dashboard" />;
  }

  const handleShowSlideSettingModal = () => {
    setShowSlideSettingModal(true);
  };

  const handleCloseSlideSettingModal = () => {
    setShowSlideSettingModal(false);
  };

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

  const handleCloseImgElementModal = () => {
    setShowImgElementModal('close');
  };

  const handleImgElementModal = (
    mode: ElementModalMode,
    focusElementId?: string
  ) => {
    if (focusElementId) {
      setEditElementId(focusElementId);
    }
    setShowImgElementModal(mode);
  };

  const handleCloseVideoElementModal = () => {
    setShowVideoElementModal('close');
  };

  const handleVideoElementModal = (
    mode: ElementModalMode,
    focusElementId?: string
  ) => {
    if (focusElementId) {
      setEditElementId(focusElementId);
    }
    setShowVideoElementModal(mode);
  };

  const handleCloseCodeElementModal = () => {
    setShowCodeElementModal('close');
  };

  const handleCodeElementModal = (
    mode: ElementModalMode,
    focusElementId?: string
  ) => {
    if (focusElementId) {
      setEditElementId(focusElementId);
    }
    setShowCodeElementModal(mode);
  };

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;
    if (key === 'ArrowRight' && slideIndex + 1 < (slides?.length || 0)) {
      if (preview) {
        navigate(`/preview-presentations/${id}/${slideIndex + 1}`);
      } else {
        navigate(`/presentations/${id}/${slideIndex + 1}`);
      }

      return;
    }
    if (key === 'ArrowLeft' && slideIndex > 0) {
      if (preview) {
        navigate(`/preview-presentations/${id}/${slideIndex - 1}`);
      } else {
        navigate(`/presentations/${id}/${slideIndex - 1}`);
      }
      return;
    }
  };
  return (
    <>
      {!preview && (
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
          <ImageElementModal
            mode={showImgElementModal}
            elementId={editElementId}
            onClose={handleCloseImgElementModal}
          />
          <VideoElementModal
            mode={showVideoElementModal}
            elementId={editElementId}
            onClose={handleCloseVideoElementModal}
          />
          <CodeElementModal
            mode={showCodeElementModal}
            elementId={editElementId}
            onClose={handleCloseCodeElementModal}
          />
          <SlideSettingModal
            open={showSlideSettingModal}
            onClose={handleCloseSlideSettingModal}
          />
        </>
      )}
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
        {!preview && (
          <Navbar
            handleShowSidebar={handleShowSidebar}
            onDeletePresentation={handleShowDeletePresModal}
          />
        )}
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            position: 'relative',
          }}
        >
          {!preview && (
            <Sidebar
              width={280}
              showInMobile={showSidebar}
              onClose={handleCloseSidebar}
              handleShowEditModal={handleShowEditModal}
              handleTextElementModal={handleTextElementModal}
              handleImgElementModal={handleImgElementModal}
              handleVideoElementModal={handleVideoElementModal}
              handleCodeElementModal={handleCodeElementModal}
            />
          )}
          <SlideArea
            preview={preview}
            slideIndex={slideIndex}
            showControlbar={!showSidebar}
            handleShowSlideSettingModal={handleShowSlideSettingModal}
            handleTextElementModal={handleTextElementModal}
            handleImgElementModal={handleImgElementModal}
            handleVideoElementModal={handleVideoElementModal}
            handleCodeElementModal={handleCodeElementModal}
          />
        </Box>
      </Box>
    </>
  );
};

export default Presentation;
