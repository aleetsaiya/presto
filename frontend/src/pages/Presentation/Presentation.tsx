import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

const Presentation = () => {
  const { id } = useParams();
  return <Typography variant="h2">This is presentation page: {id}</Typography>;
};

export default Presentation;
