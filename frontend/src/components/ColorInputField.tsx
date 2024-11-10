import { Box, useTheme } from '@mui/material';
import { InputFieldProps } from './InputField';
import InputField from './InputField';

const ColorInputField = (props: InputFieldProps) => {
  const theme = useTheme();
  return (
    <InputField
      {...props}
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 2,
          }}
        >
          <Box>{props.label || 'Colour (hex)'}</Box>
          <Box
            sx={{
              aspectRatio: '1/1',
              width: '12px',
              backgroundColor: props.value,
              border: `solid 1px ${theme.palette.nord.white[3]}`,
            }}
          />
        </Box>
      }
    />
  );
};

export default ColorInputField;
