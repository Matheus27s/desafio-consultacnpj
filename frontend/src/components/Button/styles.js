import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.button`
  border-radius: 5px;
  border: 0;
  padding: 0 12px;
  width: 100%;
  background: #AC5EEA;
  color: #FFF;
  height: 48px;
  font-weight: 700;
  margin-top: 32px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, "#AC5EEA")};
  }
`;
