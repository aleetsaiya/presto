import { forwardRef } from 'react';
import { Box } from '@mui/material';
import Presentation from './Presentation';
import { useStore } from '../../hooks/useStore';
import { useNavigate } from 'react-router-dom';

type PresentationsProps = {
  /** Which presentation (id) should show animation */
  presentationAnimation: string;
  setPresentationAnimation: (id: string) => void;
};

const Presentations = forwardRef<Map<string, HTMLElement>, PresentationsProps>(
  ({ presentationAnimation, setPresentationAnimation }, ref) => {
    const store = useStore();
    const typedRef = ref as React.MutableRefObject<Map<string, HTMLElement>>;
    const navigate = useNavigate();
    const ids = Object.keys(store.store);
    // sort id by created time, the newest will be at the top
    ids.sort((a, b) => store.store[b].createAt - store.store[a].createAt);

    const handleClick = (id: string) => {
      navigate(`/presentations/${id}`);
    };

    return (
      <Box
        component="main"
        sx={{
          flex: '1 1 auto',
          overflow: 'hidden',
          mt: 5,
          pl: 2,
          pr: 2,
          pt: {
            xs: 0,
            md: 8,
          },
          pb: {
            xs: 0,
            md: 15,
          },
        }}
      >
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
          {ids.map((id) => {
            const presentation = store.store[id];
            return (
              <Presentation
                key={id}
                presentation={presentation}
                onClick={handleClick}
                showAnimation={presentationAnimation === id}
                setShowAnimation={setPresentationAnimation}
                ref={(element) => {
                  if (element) {
                    typedRef?.current.set(id, element);
                  } else {
                    typedRef?.current.delete(id);
                  }
                }}
              />
            );
          })}
        </Box>
      </Box>
    );
  }
);

export default Presentations;
