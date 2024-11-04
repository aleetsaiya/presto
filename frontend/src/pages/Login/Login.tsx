import { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputField from '../../components/InputField';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const auth = useAuth();
  const navigate = useNavigate();

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

  const validate = (): boolean => {
    if (email.trim() === '') {
      toast.error('Email should no be empty');
      return false;
    }
    if (password.trim() === '') {
      toast.error('Password should no be empty');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setEmail('');
      setPassword('');
      return;
    }
    try {
      await auth.login(email, password);
      navigate('/dashboard');
    } catch (err) {
      toast.error('Invalid email or password');
    }
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <Navbar />
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
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ mt: 5, marginRight: 'auto' }}
            >
              Log in
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
