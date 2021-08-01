import styled from "styled-components";
import Tooltip from "../Tooltip";

export const Container = styled.div`

margin-top: 16px;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;

  > p {
    color: #8E8E8E;
    margin-left: 8px;
    margin-bottom: 4px;
  }
`;

export const ContainerInput = styled.div`
  border-radius: 5px;
  border: 2px solid #9C9C9C;
  padding: 12px;
  width: 100%;
  background: #FFF;
  color: #9C9C9C;

  & + div {
    margin-top: 8px;
  }

  display: flex;
  align-items: center;

  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #AC5EEA;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
