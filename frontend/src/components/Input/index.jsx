import React, { useEffect, useRef } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useField } from "@unform/core";

import { Container, ContainerInput, Error } from "./styles";

const Input = ({ label, name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <p>{label}</p>
      <ContainerInput isErrored={!!error}>
        {Icon && <Icon fontSize={20} />}
        <input
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </ContainerInput>
    </Container>
  );
};

export default Input;
