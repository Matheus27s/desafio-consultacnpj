import React, { useRef, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import InputCnpjMask from "../../components/InputCnpjMask";

import { FiMapPin } from "react-icons/fi";

import { Form } from "@unform/web";
import * as Yup from "yup";
import getValidationErros from "../../utils/getValidationErros";
import api from "../../services/api";

import { ContainerCnpj, Gap, ContainerCard, Card } from "./styles";

const Home = () => {
  const formRef = useRef(null);
  const formMediaRef = useRef(null);

  const [isCard, setIsCard] = useState(false);
  const [endereco, setEndereco] = useState({});
  const [messageError, setMessageError] = useState("");
  const [media, setMedia] = useState("");

  const handleCnpj = async (cnpjProps) => {
    const formatCnpjProps = cnpjProps.replace(/([^\d])+/gim, "");

    try {
      const response = await api.get(`endereco/${formatCnpjProps}`);

      if (
        response.data ===
          "CNPJ não existe, por favor digite um valor válido." ||
        response.data ===
          "CNPJ não existe, por favor verifique a quantidade de número digitados."
      ) {
        setMessageError(response.data);
        return false;
      } else {
        setEndereco(response.data);
        setMessageError("");
        return true;
      }
    } catch (err) {
      console.log(err.message);
      return false;
    }
  };

  const handleCalcMedia = async (data) => {
    try {
      const response = await api.post("media/", data);
      console.log(response.data.total)

      setMedia(response.data.total);
    } catch (err) {
      console.log(err.message);
      return false;
    }
  };

  const handleSubmit = async (data) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        cnpj: Yup.string().required("CNPJ Obrigatório"),
      });

      await schema.validate(data, {
        abortEarly: false, // Retorna todos os erros
      });

      if (handleCnpj(data.cnpj)) {
        setIsCard(true);
      } else {
        setIsCard(false);
      }

      //signIn(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
        return;
      }
    }
  };

  const handleSubmitMedia = async (data) => {
    try {
      formMediaRef.current?.setErrors({});
      const schema = Yup.object().shape({
        valorA: Yup.string().required("Valor A Obrigatório"),
        valorB: Yup.string().required("Valor B Obrigatório"),
      });

      await schema.validate(data, {
        abortEarly: false, // Retorna todos os erros
      });

      handleCalcMedia(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formMediaRef.current?.setErrors(erros);
        return;
      }
    }
  };

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <ContainerCnpj>
          <InputCnpjMask name="cnpj" type="text" label="CNPJ" />
          <Gap>
            <Button type="submit">
              <FiMapPin color="#FFFFFF" size={24} />
            </Button>
          </Gap>
        </ContainerCnpj>
      </Form>

      {isCard && (
        <ContainerCard>
          {messageError !== "" ? (
            <p>{messageError}</p>
          ) : (
            <Card>
              <strong>Endereço</strong>
              <p>{endereco.logradouro}</p>
              <p>{endereco.bairro}</p>
              <p>{endereco.numero}</p>
              <p>{endereco.municipio}</p>
              <p>CEP {endereco.cep}</p>
            </Card>
          )}
        </ContainerCard>
      )}

      {messageError === "" && isCard && (
        <>
          <Form ref={formMediaRef} onSubmit={handleSubmitMedia}>
            <Input type="text" name="valorA" label="Valor A" />
            <Input type="text" name="valorB" label="Valor B" />
            <Button type="submit">Calcular Média</Button>
          </Form>
          <strong>A média é: {media}</strong>
        </>
      )}
    </>
  );
};
export default Home;
