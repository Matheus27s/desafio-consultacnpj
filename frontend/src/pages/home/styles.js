import styled from "styled-components";

export const ContainerCnpj = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-gap: 1rem;
  width: 100%;
`;

export const Gap = styled.div`
  margin-top: 0.4rem;
`;

export const ContainerCard = styled.div`
  margin-top: 1rem;

  p {
    color: red;
  }
`;

export const Card = styled.div`
  margin-top: 1rem;
  width: 100%;
  border-radius: 5;
  background: #FFFFFF;
  padding: 1rem;

  strong {
    color: #AC5EEA;
    margin-bottom: 0.5rem;
    display: inline-block;
  }

  p {
    color: #333333;
  }

  p + p {
    margin-top: 0.3rem;
    color: #333333;
  }
`;

export const ContainerMedia = styled.div`
  margin-top: 1rem;
  width: 100%;
  border-radius: 5;
  background: #FFFFFF;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  p {
    color: #333333;
    font-size: 1.2rem;
  }

  strong {
    color: #1BC47D;
    display: inline-block;
    margin-left: 0.5rem;
  }
`;

export const ErrorMessage = styled.p`
  color: #FE4F4F;
  margin-top: 1rem;
`;