import { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputField from '../components/InputField';
import { useAuth } from '../hooks/useAuth';

const Signup = () => {
  const auth = useAuth();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(e.target.value);
  };

  const handleEmail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
  };

  const handlePassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    auth.signup(name, email, password);

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        mt: 3,
      }}
    >
      <Typography variant="h5" component="p" fontWeight="bold">
        Create your account
      </Typography>
      <Paper
        sx={{
          p: 5,
          mt: 5,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
        }}
        elevation={3}
      >
        <form onSubmit={handleSubmit}>
          <InputField
            id="signup-name"
            label="Name"
            value={name}
            onChange={handleName}
          />
          <InputField
            id="signup-email"
            label="Email"
            value={email}
            onChange={handleEmail}
            sx={{ mt: 4 }}
          />
          <InputField
            id="signup-password"
            label="Password"
            type="password"
            value={password}
            onChange={handlePassword}
            sx={{ mt: 4 }}
          />
          <Button
            type='submit'
            variant="contained"
            color="secondary"
            sx={{ mt: 5, marginRight: 'auto' }}
          >
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
