import React from "react";

import { Container } from "./styles";

const Botton = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Botton;
