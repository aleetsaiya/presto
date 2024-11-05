import { useRef, useState } from 'react';
import Navbar from './Navbar';
import Modal from './Modal';
import { Box } from '@mui/material';
import Presentations from './Presentations';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [newPresentationValue, setNewPresentationValue] = useState('');
  const [presentations, setPresentations] = useState<Array<string>>([
    'slide_1',
    'slide_2',
    'slide_3',
    'slide_4',
    'slide_5',
    'slide_6',
    'slide_7',
    'slide_8',
    'slide_9',
    'slide_10',
    'slide_11',
    'slide_12',
    'slide_13',
    'slide_14',
    'slide_15',
    'slide_16',
    'slide_17',
    'slide_18',
    'slide_19',
    'slide_20',
  ]); // TODO

  const cardsRef = useRef(new Map<string, HTMLElement>());

  const onClickNewPresentation: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangePresentationValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewPresentationValue(e.target.value);
  };

  const handleClickCreateBtn = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send api to create new presentation
    setOpenModal(false);
    setNewPresentationValue('');
  };

  const handleClickSidebarItem: React.MouseEventHandler = (e) => {
    const id = e.currentTarget.getAttribute('id')?.split('-')[1];
    if (id) {
      cardsRef.current.get(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Box
      sx={{
        overflow: 'auto',
        maxHeight: '100vh',
        /* '&::-webkit-scrollbar': {
          display: 'none',
        }, */
      }}
    >
      <Navbar onClickNewPresentation={onClickNewPresentation} />
      <Modal
        open={openModal}
        value={newPresentationValue}
        onChange={handleChangePresentationValue}
        onClick={handleClickCreateBtn}
        onClose={handleCloseModal}
      />
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Sidebar items={presentations} onClick={handleClickSidebarItem} />
        <Presentations presentations={presentations} ref={cardsRef} />
      </Box>
    </Box>
  );
};

export default Dashboard;
