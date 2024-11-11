import Modal from '../../components/Modal';
import { Typography, Button, Box } from '@mui/material';
import { useStore } from '../../hooks/useStore';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

type DeletePresentationModalProps = {
  open: boolean;
  onClose: () => void;
};

const DeletePresentationModal = ({
  open,
  onClose,
}: DeletePresentationModalProps) => {
  const store = useStore();
  const params = useParams();
  const id = params.id as string;
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!id) {
      return;
    }
    try {
      await store.deletePresentation(id);
      onClose();
      navigate('/dashboard');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('Fail to delete presentation');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      contentContainerStyle={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" mb={2}>
        Are you sure?
      </Typography>
      <Box
        sx={{
          display: 'flex',
          mt: 2,
          gap: 3,
          justifyContent: 'center',
        }}
      >
        <Button variant="contained" onClick={handleSubmit}>
          Yes
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          No
        </Button>
      </Box>
    </Modal>
  );
};

export default DeletePresentationModal;
