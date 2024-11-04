import { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputField from '../components/InputField';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const auth = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
    auth.login(email, password);

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
        Wekcome back!
      </Typography>
      <Typography variant="h5" component="p" fontWeight="bold">
        Let's get you signed in
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
            id="login-email"
            label="Email"
            value={email}
            onChange={handleEmail}
          />
          <InputField
            id="login-password"
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
            onSubmit={handleSubmit}
          >
            Log in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
