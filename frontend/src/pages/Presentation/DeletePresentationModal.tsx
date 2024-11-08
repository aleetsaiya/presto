import Modal from '../../components/Modal';
import { Typography, Button, Box } from '@mui/material';

type DeletePresentationModalProps = {
  open: boolean;
  onDelete: () => void;
  onClose: () => void;
};

const DeletePresentationModal = ({
  open,
  onDelete,
  onClose,
}: DeletePresentationModalProps) => {
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
        <Button variant="contained" onClick={onDelete}>
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
