import { useState } from 'react';
import Modal from '../../components/Modal';
import { Typography, Button } from '@mui/material';
import InputField from '../../components/InputField';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '../../hooks/useStore';
import { toast } from 'react-toastify';

type NewPresentationModalProps = {
  open: boolean;
  onClose: () => void;
};

const NewPresentationModal = ({ open, onClose }: NewPresentationModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const store = useStore();

  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name === '') {
      toast.error('Slide name can not be empty');
      return;
    }
    try {
      const id = uuidv4();
      await store.createPresentation(id, name, description);
      onClose();
      toast.success('Creates a new presentation successfully');
      setName('');
    } catch (err) {
      toast.error('Fail to create new presentation.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      modalContainerStyle={{
        width: 400,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" mb={2}>
          Create new presentation
        </Typography>
        <InputField
          id="new-presentation-name"
          label="Presentation Name"
          value={name}
          onChange={handleChangeName}
          sx={{ mb: 3 }}
          autoComplete="off"
        />
        <InputField
          id="new-presentation-description"
          label="Description (optional)"
          value={description}
          onChange={handleChangeDescription}
          autoComplete="off"
        />
        <Button
          type='submit'
          variant="contained"
          color="secondary"
          sx={{ mt: 3 }}
        >
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default NewPresentationModal;
