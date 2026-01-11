import styled from "styled-components";
import { Container, Button } from "@mui/material";
import { Link } from "react-router";

const AccessDeniedContainer = ({className}) => {
  return(
    <div className={className}>
      <Container>
      <h2>Acess Denied</h2>
      <h4>Please login</h4>
      <Link to='/login'>
          <Button  variant="contained" >Login</Button>
          </Link>
      </Container>
    </div>
  )
}

export const AccessDenied = styled(AccessDeniedContainer)`
`;