import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Navbar from './Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <Container
        sx={{
          mt: 7,
        }}
      >
        <Typography variant="h3">Welcome to Presto!</Typography>
      </Container>
    </>
  );
};

export default Home;
