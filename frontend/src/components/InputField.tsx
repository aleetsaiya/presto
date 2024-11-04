import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import { SxProps } from '@mui/system';

type InputFieldProps = {
  id: string;
  label: string;
  type?: string;
  sx?: SxProps;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const InputField = ({
  id,
  type,
  label,
  sx,
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <FormControl fullWidth size="small" sx={sx}>
      <InputLabel size="small" htmlFor={id}>
        {label}
      </InputLabel>
      <Input
        id={id}
        size="small"
        type={type}
        value={value}
        onChange={onChange}
        sx={{ pl: 2 }}
      ></Input>
    </FormControl>
  );
};

export default InputField;
