import { useRef, useState } from 'react';
import Navbar from './Navbar';
import NewPresentationModal from './NewPresentationModal';
import Presentations from './Presentations';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  /** Which presentation (id) should show animation */
  const [presentationAnimation, setPresentationAnimation] = useState('');
  const cardsRef = useRef(new Map<string, HTMLElement>());

  const handleClickNewPresentation: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
  const isInViewPortCenter = (element: HTMLElement) => {
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
      if (!isInViewPortCenter(element)) {
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
      <NewPresentationModal open={openModal} onClose={handleCloseModal} />
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
