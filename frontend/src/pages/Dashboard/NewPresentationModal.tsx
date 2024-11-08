import Modal from '../../components/Modal';
import { Typography, Button } from '@mui/material';
import InputField from '../../components/InputField';

type NewPresentationModalProps = {
  open: boolean;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClose: () => void;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const NewPresentationModal = ({
  open,
  value,
  onClose,
  onChange,
  onClick,
}: NewPresentationModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      modalContainerStyle={{
        width: 400,
      }}
    >
      <Typography variant="h6" mb={2}>
        Create new presentation
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
        onClick={onClick}
        sx={{ mt: 3 }}
      >
        Create
      </Button>
    </Modal>
  );
};

export default NewPresentationModal;
