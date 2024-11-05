import { SxProps } from '@mui/system';
import { OutlinedInput, Input, InputLabel, FormControl } from '@mui/material';

type InputFieldProps = {
  id: string;
  outlined?: boolean;
  label?: string;
  type?: string;
  sx?: SxProps;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const InputField = ({
  id,
  outlined = false,
  type,
  label,
  sx,
  value,
  onChange,
}: InputFieldProps) => {
  return (
    <FormControl fullWidth size="small" sx={sx}>
      {!outlined && label && (
        <InputLabel size="small" htmlFor={id}>
          {label}
        </InputLabel>
      )}
      {outlined ? (
        <OutlinedInput
          id={id}
          size="small"
          type={type}
          value={value}
          onChange={onChange}
        />
      ) : (
        <Input
          id={id}
          size="small"
          type={type}
          value={value}
          onChange={onChange}
          sx={{ pl: 2 }}
        ></Input>
      )}
    </FormControl>
  );
};

export default InputField;
