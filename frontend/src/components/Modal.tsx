import { Box, IconButton, Modal as MuiModal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ open, onClose, children }: ModalProps) => {
  const theme = useTheme();

  return (
    <MuiModal
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          boxShadow: 8,
          bgcolor: theme.palette.nord.white[1],
          p: 2,
        }}
      >
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            marginLeft: 'auto',
          }}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
        <Box
          sx={{
            pl: 3,
            pr: 3,
            pb: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </MuiModal>
  );
};

export default Modal;
