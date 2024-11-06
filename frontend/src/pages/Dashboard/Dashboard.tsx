import { useRef, useState } from 'react';
import Navbar from './Navbar';
import Modal from './Modal';
import Presentations from './Presentations';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';
import { useStore } from '../../hooks/useStore';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [newPresentationName, setNewPresentationName] = useState('');
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
      setNewPresentationName('');
    } catch (err) {
      toast.error('Fail to create new presentation.');
    }
  };

  const handleClickSidebarItem: React.MouseEventHandler = (e) => {
    const id = e.currentTarget.getAttribute('id')?.split('.')[1];
    if (id !== undefined && cardsRef.current.has(id)) {
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
      <Navbar onClickNewPresentation={handleClickNewPresentation} />
      <Modal
        open={openModal}
        value={newPresentationName}
        onChange={handleChangePresentationName}
        onClick={handleClickCreateBtn}
        onClose={handleCloseModal}
      />
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Sidebar onClick={handleClickSidebarItem} />
        <Presentations ref={cardsRef} />
      </Box>
    </Box>
  );
};

export default Dashboard;
