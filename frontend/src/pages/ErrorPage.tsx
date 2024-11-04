import { useRouteError } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  let errmsg: string;

  if (isRouteErrorResponse(error)) {
    errmsg = `${error.status} ${error.statusText}`;
  }
  else if (error instanceof Error) {
    errmsg = error.message;
  }
  else if (typeof error == 'string') {
    errmsg = error;
  }
  else {
    errmsg = 'Unknown Error';
  }

  return (
    <Container
      sx={{
        m: 3,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Oops!</h1>
      <Typography>An unexpected error has occurred.</Typography>
      <Typography>{errmsg}</Typography>
    </Container>
  )
}

export default ErrorPage;
