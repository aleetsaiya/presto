import { forwardRef } from 'react';
import { Box } from '@mui/material';
import Presentation from './Presentation';
import { useStore } from '../../hooks/useStore';

const Presentations = forwardRef<Map<string, HTMLElement>>((_, ref) => {
  const store = useStore();
  const typedRef = ref as React.MutableRefObject<Map<string, HTMLElement>>;
  return (
    <Box component="main" width="100%" sx={{ mt: 5, p: 2 }}>
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
        {Object.keys(store.store).map((id) => {
          const presentation = store.store[id];
          return (
            <Presentation
              key={id}
              name={presentation.name}
              ref={(element) => {
                if (element) {
                  console.log('before', typedRef?.current);
                  console.log('set', id, element);
                  typedRef?.current.set(id, element);
                  console.log('after', typedRef?.current);
                } else {
                  typedRef?.current.delete(id);
                }
              }}
              image={'https://picsum.photos/700/350'} // TODO use thumbnail
            />
          );
        })}
      </Box>
    </Box>
  );
});

export default Presentations;
