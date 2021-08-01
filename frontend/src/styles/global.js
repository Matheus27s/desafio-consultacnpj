import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  };

  body { 
    background-color: #F8F9E9;
    color: #F8F9E9;
    -webkit-font-smoothing: antialiased; 
    width: 25rem;
    margin: 5rem auto;
  }

  body, input, button {
    font-family: 'Roboto';
    font-size: 1rem;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 500;
    color: #333333;
    font-size: 1.8rem;
  }

  strong {
    font-weight: 500;
    color: #AC5EEA;
    font-size: 1.5rem;
  }

  button {
    cursor: pointer;
  }
`;
