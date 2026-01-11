import styled from "styled-components";

const year = new Date().getFullYear()

const FooterContainer = ({className}) => {

  return(
    <>
    <div className={className}>
      <div className="wrapper">
      <div className="logo">
        Kanban Planner
      </div>
      <div className="content">
        Copyright © {year}
      </div>
      </div>
    </div>
    </>
  )
}

export const Footer = styled(FooterContainer)`
  margin-top: auto;
  box-shadow: 0 -4px 16px -10px #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .wrapper {
    margin-left: 20px;
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    margin-left: 112px;
    margin-right: 112px;
    margin-bottom: 10px;
  }
  .logo{
    font-size: 20px;
  }
  .content{
    font-size: 15px;
    color: grey;
    
  }
`;