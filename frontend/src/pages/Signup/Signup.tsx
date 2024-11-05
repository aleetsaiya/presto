import { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputField from '../../components/InputField';
import Navbar from './Navbar';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

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

  const handleConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const validate = (): boolean => {
    if (name.trim() === '' || email === '' || password === '') {
      toast.error('Please complete the form before submit');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      return false;
    }
    if (!email.includes('@')) {
      toast.error("Email should contains '@'");
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      return false;
    }
    if (confirmPassword !== password) {
      toast.error('Passwords do no match. Please try again');
      setPassword('');
      setConfirmPassword('');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    try {
      await auth.signup(name, email, password);
      navigate('/dashboard');
      toast.success('You have successfully signed up');
    } catch (err) {
      toast.error('Email address has already been registered');
    }
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <Navbar />
      <Container
        maxWidth="sm"
        sx={{
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
            <InputField
              id="signup-confirm-password"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              sx={{ mt: 4 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ mt: 5, marginRight: 'auto' }}
            >
              Sign up
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Signup;
