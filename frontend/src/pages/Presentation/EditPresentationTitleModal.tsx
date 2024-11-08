import Modal from '../../components/Modal';
import InputField from '../../components/InputField';
import { Typography, Button } from '@mui/material';

type EditPresentationTitleModalProps = {
  open: boolean;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onConfirmEdit: () => void;
  onClose: () => void;
};

const EditPresentationTitleModal = ({
  open,
  onConfirmEdit,
  value,
  onChange,
  onClose,
}: EditPresentationTitleModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      modalContainerStyle={{
        width: 400,
      }}
    >
      <Typography variant="h6" mb={2}>
        New title
      </Typography>
      <InputField
        id="new-presentation-input"
        outlined
        value={value}
        onChange={onChange}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={onConfirmEdit}
        sx={{ mt: 3 }}
      >
        Create
      </Button>
    </Modal>
  );
};

export default EditPresentationTitleModal;
