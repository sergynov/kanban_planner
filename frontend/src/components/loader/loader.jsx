import styled from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';

const LoaderContainer = ({className}) => {

return(
  <div className={className}>
    <CircularProgress />
  </div>
) 
}

export const Loader = styled(LoaderContainer)`
  display: flex;
  justify-content: center;
  margin-top: 200px;
`;