import { useState } from 'react';
import Navbar from './Navbar';
import Modal from '../../components/Modal';
import { Button, Typography } from '@mui/material';
import InputField from '../../components/InputField';

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [newPresentationValue, setNewPresentationValue] = useState('');

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

  return (
    <>
      <Navbar onClickNewPresentation={onClickNewPresentation} />
      <Modal open={openModal} onClose={handleCloseModal}>
        <Typography variant="h6" mb={2}>
          Create new presentation
        </Typography>
        <InputField
          id="new-presentation-input"
          outlined
          value={newPresentationValue}
          onChange={handleChangePresentationValue}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickCreateBtn}
          sx={{ mt: 3 }}
        >
          Create
        </Button>
      </Modal>
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
