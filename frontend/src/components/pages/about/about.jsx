import styled from "styled-components"
import Container from "@mui/material/Container";

const AboutContainer = ({className}) => {

  return(
    <div className={className}>
      <Container maxWidth="md">
        <h1>About Kanban Planner</h1>

        <p>
          This is a learning project designed to practice building a full-featured Kanban task manager using React, Redux, and Node.js.
        </p>

        <h2>Features</h2>
        <ul>
          <li>Create, update, and delete boards</li>
          <li>Add tasks to boards and move them between columns</li>
          <li>Track task completion with checkboxes</li>
          <li>User authentication and profile management</li>
          <li>Responsive and interactive UI</li>
        </ul>

        <h2>Technologies Used</h2>
        <ul>
          <li>React + Redux Toolkit</li>
          <li>Styled-components</li>
          <li>Material UI</li>
          <li>Node.js + Express + MongoDB</li>
          <li>REST API</li>
        </ul>

        <h2>Purpose</h2>
        <p>
          The goal of this project is to practice building a real-world web application with state management, asynchronous actions, and a clean UI.
        </p>
      </Container>
    </div>
  )
}

export const About = styled(AboutContainer)`
  margin-top: 50px;
  h1 {
    text-align: center;
    font-size: 32px;
    margin-bottom: 20px;
  }
  h2 {
    font-size: 24px;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  p {
    font-size: 16px;
    line-height: 1.6;
    color: #333;
  }
  ul {
    margin-left: 20px;
    li {
      margin-bottom: 8px;
    }
  }
`;