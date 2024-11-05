import { forwardRef } from 'react';
import { Box } from '@mui/material';
import Presentation from './Presentation';
import { Typography } from '@mui/material';

// TODO creat global type presentation
type PresentationsProps = {
  presentations: Array<string>;
};

const Presentations = forwardRef<Map<string, HTMLElement>, PresentationsProps>(
  ({ presentations }: PresentationsProps, ref) => {
    const typedRef = ref as React.MutableRefObject<Map<string, HTMLElement>>;
    return (
      <Box component="main" width="100%" sx={{ p: 2 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Presentations
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: {
              xs: 5,
              md: 15,
            },
          }}
        >
          {presentations.map((pre) => {
            return (
              <Presentation
                key={pre}
                name={pre}
                ref={(element) => {
                  if (element) {
                    typedRef?.current.set(pre, element);
                  } else {
                    typedRef?.current.delete(pre);
                  }
                }}
                image={
                  'https://picsum.photos/700/350'
                }
              />
            );
          })}
        </Box>
      </Box>
    );
  }
);

export default Presentations;
