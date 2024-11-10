import { SxProps } from '@mui/system';
import { Input, InputLabel, FormControl, TextField } from '@mui/material';

export type InputFieldProps = {
  id: string;
  outlined?: boolean;
  label?: React.ReactNode;
  type?: string;
  sx?: SxProps;
  value?: string;
  autoComplete?: string;
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
  autoComplete,
  onChange,
}: InputFieldProps) => {
  return outlined ? (
    <TextField
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      sx={{
        width: '100%',
        ...sx,
      }}
      autoComplete={
        autoComplete
          ? autoComplete
          : type === 'password'
            ? 'current-password'
            : undefined
      }
    />
  ) : (
    <FormControl fullWidth size="small" sx={sx}>
      {label && (
        <InputLabel size="small" htmlFor={id}>
          {label}
        </InputLabel>
      )}
      <Input
        id={id}
        size="small"
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={
          autoComplete
            ? autoComplete
            : type === 'password'
              ? 'current-password'
              : undefined
        }
      ></Input>
    </FormControl>
  );
};

export default InputField;
