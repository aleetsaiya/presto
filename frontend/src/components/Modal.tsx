import {
  Box,
  IconButton,
  Modal as MuiModal,
  SxProps,
  Theme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  contentContainerStyle?: SxProps<Theme>;
  modalContainerStyle?: SxProps<Theme>;
};

const Modal = ({
  open,
  onClose,
  children,
  modalContainerStyle,
  contentContainerStyle,
}: ModalProps) => {
  const theme = useTheme();

  return (
    <MuiModal open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '90%',
          boxShadow: 8,
          bgcolor: theme.palette.nord.white[1],
          p: 2,
          ...modalContainerStyle
        }}
      >
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            marginLeft: 'auto',
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
        <Box
          sx={{
            pl: 3,
            pr: 3,
            pb: 3,
            ...contentContainerStyle,
          }}
        >
          {children}
        </Box>
      </Box>
    </MuiModal>
  );
};

export default Modal;
