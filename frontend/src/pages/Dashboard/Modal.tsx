import ModalContainer from '../../components/Modal';
import { Typography, Button } from '@mui/material';
import InputField from '../../components/InputField';

type ModalProps = {
  open: boolean;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClose: () => void;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Modal = ({ open, value, onClose, onChange, onClick }: ModalProps) => {
  return (
    <ModalContainer open={open} onClose={onClose}>
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
    </ModalContainer>
  );
};

export default Modal;
