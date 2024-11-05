import { forwardRef } from 'react';
import { Box, Typography } from '@mui/material';

type PresentationProps = {
  name: string;
  image: string;
};

const Presentation = forwardRef<HTMLDivElement, PresentationProps>(
  ({ name, image }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'end',
          aspectRatio: '2/1',
          maxWidth: 750,
          width: '100%',
          background: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.65) 70%, rgba(0, 0, 0, 0.9) ), url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
          borderRadius: 2,
          cursor: 'pointer',
          boxShadow: 'rgba(0, 0, 0, 0.5) 0px 3px 8px',
          color: 'white',
          p: 4,
          pb: 5,
          '&:hover': {
            background: `no-repeat linear-gradient( rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0.85) ), url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
            transition: 'all ease 0.5s',
          },
        }}
      >
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: {
              sx: 0,
              md: 1,
            },
            width: '100%',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica Lizards are a
          widespread group of squamate reptiles, with over 6,000 Lizards are a
          widespread group of squamate reptiles, with over 6,000 Lizards are a
          widespread group of squamate reptiles, with over 6,000 species,
          ranging across all continents except Antarctica species, ranging
          across all continents except Antarctica species, ranging across all
          continents except Antarctica
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mt: {
              sx: 0,
              md: 1,
            },
            marginLeft: 'auto',
          }}
        >
          pages: 20
        </Typography>
      </Box>
    );
  }
);

export default Presentation;
