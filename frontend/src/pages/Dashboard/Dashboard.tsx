import { useRef, useState } from 'react';
import Navbar from './Navbar';
import NewPresentationModal from './NewPresentationModal';
import Presentations from './Presentations';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';
import { useStore } from '../../hooks/useStore';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [newPresentationName, setNewPresentationName] = useState('');
  /** Which presentation (id) should show animation */
  const [presentationAnimation, setPresentationAnimation] = useState('');
  const store = useStore();
  const cardsRef = useRef(new Map<string, HTMLElement>());

  const handleClickNewPresentation: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangePresentationName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewPresentationName(e.target.value);
  };

  const handleClickCreateBtn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const id = uuidv4();
      await store.createPresentation(id, newPresentationName);
      setOpenModal(false);
      toast.success('Creates a new presentation successfully');
      setNewPresentationName('');
    } catch (err) {
      toast.error('Fail to create new presentation.');
    }
  };

  /**
         Return true whenever element center position is in viewport center
                             Viewport
         ------------------------------------------------
         |              False (1/4 height)              |
         ------------------------------------------------
         |              True (1/2 height)               | 
         ------------------------------------------------
         |              False (1/4 height)              |
         ------------------------------------------------
  */
  const isInCenterViewPort = (element: HTMLElement) => {
    const topThreshold = window.innerHeight * 0.25;
    const bottomThreshold = window.innerHeight * 0.75;
    const positionContext = element.getBoundingClientRect();
    const centerPoint = (positionContext.top + positionContext.bottom) / 2;
    return centerPoint >= topThreshold && centerPoint < bottomThreshold;
  };

  const handleClickSidebarItem = (id: string) => {
    if (cardsRef.current.has(id)) {
      const element = cardsRef.current.get(id);
      if (!element) return;
      // If the element is not in the center of the viewport, scroll to element position
      // else show animation to highlight the element
      if (!isInCenterViewPort(element)) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      } else {
        setPresentationAnimation(id);
      }
    }
  };

  return (
    <>
      <NewPresentationModal
        open={openModal}
        value={newPresentationName}
        onChange={handleChangePresentationName}
        onClick={handleClickCreateBtn}
        onClose={handleCloseModal}
      />
      <Box
        sx={{
          overflow: 'auto',
          maxHeight: '100vh',
        }}
      >
        <Navbar onClickNewPresentation={handleClickNewPresentation} />
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Sidebar onClick={handleClickSidebarItem} />
          <Presentations
            presentationAnimation={presentationAnimation}
            setPresentationAnimation={(id: string) =>
              setPresentationAnimation(id)
            }
            ref={cardsRef}
          />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
