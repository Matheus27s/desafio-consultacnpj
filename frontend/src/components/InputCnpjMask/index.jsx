import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import { useField } from "@unform/core";

import InputMask from "react-input-mask";

import { Container, ContainerInput, Error } from "./styles";

const InputCnpjMask = ({ label, name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsField(!!inputRef.current?.value);
  }, []);

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
      <ContainerInput
        isErrored={!!error}
        isField={isField}
        isFocused={isFocused}
      >
        {Icon && <Icon fontSize={20} />}
        <InputMask
          mask="99.999.999/9999-99"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
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

export default InputCnpjMask;
