import { useState, useEffect } from 'react';
import Modal from '../../components/Modal';
import InputField from '../../components/InputField';
import { Typography, Button } from '@mui/material';
import { useStore } from '../../hooks/useStore';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type EditPresentationModalProps = {
  open: boolean;
  onClose: () => void;
};

const EditPresentationModal = ({
  open,
  onClose,
}: EditPresentationModalProps) => {
  const store = useStore();
  const param = useParams();
  const id = param.id as string;
  const presentation = store.store[id];
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTitle(presentation?.name);
    setDescription(presentation?.description);
  }, [open, presentation]);

  const handleChangeTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPresentation = { ...presentation };
      newPresentation.name = title;
      newPresentation.description = description;
      await store.updatePresentation(id, newPresentation);
      onClose();
    } catch (err) {
      toast.error('Fail to edit presentation title');
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
          Edit Presentation
        </Typography>
        <InputField
          id="edit-presentation-name"
          value={title}
          label="Title"
          onChange={handleChangeTitle}
          autoComplete="off"
        />
        <InputField
          id="edit-presentation-description"
          value={description}
          label="Description"
          onChange={handleChangeDescription}
          autoComplete="off"
          sx={{
            mt: 3,
          }}
        />
        <Button
          type='submit'
          variant="contained"
          color="secondary"
          sx={{ mt: 3 }}
        >
          Save
        </Button>
      </form>
    </Modal>
  );
};

export default EditPresentationModal;
